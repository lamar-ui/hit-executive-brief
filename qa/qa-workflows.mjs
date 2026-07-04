// QA harness for the n8n workflow JSON files.
// Validates structure AND executes the real Code-node logic against scenarios.
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
let pass = 0, fail = 0;
const log = [];
function check(name, cond, detail = '') {
  if (cond) { pass++; log.push(`  ✅ ${name}`); }
  else { fail++; log.push(`  ❌ ${name}${detail ? ' — ' + detail : ''}`); }
}
function section(t){ log.push(`\n=== ${t} ===`); }

const load = f => JSON.parse(fs.readFileSync(path.join(ROOT, f), 'utf8'));
const nodeByName = (wf, n) => wf.nodes.find(x => x.name === n);

// Run an n8n Code node's jsCode with mocked n8n globals.
function runCode(jsCode, { input = {}, staticData = {}, refs = {} } = {}) {
  const $input = { first: () => ({ json: input }), all: () => [{ json: input }] };
  const $getWorkflowStaticData = () => staticData;
  const $ = (name) => ({ item: { json: refs[name] || {} } });
  const $json = input;
  const $now = { toISO: () => '2026-07-04T07:00:00.000Z' };
  const fn = new Function('$input','$getWorkflowStaticData','$','$json','$now', jsCode);
  return fn($input, $getWorkflowStaticData, $, $json, $now);
}

// ---------- Structural validation (all workflows) ----------
function validateStructure(file, wf) {
  section(`Structure: ${file}`);
  check('valid JSON + has nodes[]', Array.isArray(wf.nodes) && wf.nodes.length > 0);
  const names = new Set(wf.nodes.map(n => n.name));
  // every connection references existing nodes
  let connOk = true, connDetail = '';
  for (const [src, conn] of Object.entries(wf.connections || {})) {
    if (!names.has(src)) { connOk = false; connDetail = `missing source ${src}`; }
    for (const arr of (conn.main || [])) for (const c of (arr || [])) {
      if (!names.has(c.node)) { connOk = false; connDetail = `missing target ${c.node}`; }
    }
  }
  check('all connections reference existing nodes', connOk, connDetail);
  // Anthropic HTTP nodes are well-formed
  const http = wf.nodes.filter(n => n.type === 'n8n-nodes-base.httpRequest');
  check('has >=1 Anthropic HTTP node', http.length >= 1);
  for (const h of http) {
    check(`  ${h.name}: points to Anthropic API`, (h.parameters.url||'').includes('api.anthropic.com'));
    check(`  ${h.name}: uses header-auth credential`, h.parameters.genericAuthType === 'httpHeaderAuth');
    check(`  ${h.name}: sends anthropic-version header`,
      JSON.stringify(h.parameters.headerParameters||{}).includes('anthropic-version'));
    check(`  ${h.name}: prompt caching enabled`, (h.parameters.jsonBody||'').includes('cache_control'));
  }
  return names;
}

// ---------- HUB workflow logic ----------
section('HUB workflow');
const hub = load('coach-lamar-n8n-workflow-hub.json');
validateStructure('coach-lamar-n8n-workflow-hub.json', hub);
const routeCode = nodeByName(hub, 'Route & crisis detect').parameters.jsCode;
const saveCode  = nodeByName(hub, 'Save memory').parameters.jsCode;

section('Logic: mode routing');
let r = runCode(routeCode, { input: { body: { question: 'build me a 3-day workout', mode: 'fitness', sessionId: 'u1' } }, staticData: {} })[0].json;
check('fitness → Coach Lamar prompt', r.systemPrompt.includes('Coach Lamar'));
check('fitness → not crisis', r.isCrisis === false);
check('first turn → messages = [user]', r.messages.length === 1 && r.messages[0].role === 'user');

r = runCode(routeCode, { input: { body: { question: 'some days I feel invisible', mode: '22lightson', sessionId: 'u2' } }, staticData: {} })[0].json;
check('22lightson → 22 Lights On prompt', r.systemPrompt.includes('22 Lights On'));
check('22lightson benign → not crisis', r.isCrisis === false);
check('default mode when absent → fitness', runCode(routeCode,{input:{body:{question:'hi'}},staticData:{}})[0].json.systemPrompt.includes('Coach Lamar'));

section('Logic: crisis detection (must catch)');
for (const q of ['I don\'t want to be here anymore','I want to die','thinking about suicide','I might kill myself','no reason to live','I want to hurt myself']) {
  check(`crisis caught: "${q}"`, runCode(routeCode,{input:{body:{question:q,mode:'22lightson'}},staticData:{}})[0].json.isCrisis === true);
}
section('Logic: crisis detection (must NOT false-fire on gym talk)');
for (const q of ['I killed it at the gym today','dead lift PR tomorrow','I\'m dead tired after leg day','let\'s crush this workout']) {
  check(`no false alarm: "${q}"`, runCode(routeCode,{input:{body:{question:q,mode:'fitness'}},staticData:{}})[0].json.isCrisis === false);
}

section('Logic: conversation memory + trim');
// existing history of 2 turns
const hist = [{role:'user',content:'hi'},{role:'assistant',content:'hey'}];
r = runCode(routeCode, { input:{body:{question:'next q',mode:'fitness',sessionId:'u3'}}, staticData:{ sessions:{ u3: hist.slice() } } })[0].json;
check('history loaded + new user appended', r.messages.length === 3 && r.messages[2].content === 'next q');
// save appends assistant + caps at 20
const store = { sessions: {} };
const bigHist = Array.from({length:19},(_,i)=>({role: i%2?'assistant':'user', content:'m'+i}));
const routeOut = { sessionId:'u4', mode:'fitness', messages: bigHist.concat([{role:'user',content:'q20'}]) }; // 20 msgs
const saved = runCode(saveCode, { input:{ content:[{text:'reply21'}] }, staticData: store, refs:{ 'Route & crisis detect': routeOut } })[0].json;
check('save returns answer text', saved.answer === 'reply21');
check('memory capped at 20 messages', store.sessions.u4.length === 20);
check('newest exchange retained after trim', store.sessions.u4[store.sessions.u4.length-1].content === 'reply21');

// ---------- DAILY SIGNAL workflow logic ----------
section('DAILY SIGNAL workflow');
const sig = load('coach-lamar-daily-signal.json');
validateStructure('coach-lamar-daily-signal.json', sig);
const seedCode = nodeByName(sig, 'Signal seed').parameters.jsCode;
const fmtCode  = nodeByName(sig, 'Format signal').parameters.jsCode;
const capSeedCode = nodeByName(sig, 'Caption seed').parameters.jsCode;
const capFmtCode  = nodeByName(sig, 'Format caption').parameters.jsCode;

section('Logic: signal seed');
let s = runCode(seedCode)[0].json;
check('theme chosen', typeof s.theme === 'string' && s.theme.length > 0);
check('weekday valid', ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'].includes(s.weekday));
check('userPrompt asks for DAILY SIGNAL', s.userPrompt.includes('DAILY SIGNAL'));
check('userPrompt enforces closing line', s.userPrompt.includes('www.22lightson.com'));
check('system prompt is 22 Lights On voice', s.systemPrompt.includes('22 Lights On'));

section('Logic: format signal');
let fs1 = runCode(fmtCode, { input:{ content:[{text:'  today\'s signal.  '}] }, refs:{ 'Signal seed': s } })[0].json;
check('signal trimmed + extracted', fs1.signal === "today's signal.");
check('carries theme/weekday through', fs1.weekday === s.weekday);

section('Logic: caption seed + format');
let cs = runCode(capSeedCode, { input: fs1 })[0].json;
check('caption prompt includes hashtags', cs.userPrompt.includes('#22LightsOn'));
check('caption prompt includes crisis line 988', cs.userPrompt.includes('988'));
check('caption prompt includes site CTA', cs.userPrompt.includes('www.22lightson.com'));
let cf = runCode(capFmtCode, { input:{ content:[{text:'CAPTION TEXT #22LightsOn'}] }, refs:{ 'Caption seed': cs } })[0].json;
check('caption extracted + signal retained', cf.caption.includes('#22LightsOn') && cf.signal === fs1.signal);

// ---------- single-voice workflow (structure only) ----------
section('SINGLE-VOICE workflow');
validateStructure('coach-lamar-n8n-workflow.json', load('coach-lamar-n8n-workflow.json'));

// ---------- report ----------
console.log(log.join('\n'));
console.log(`\n──────────────\nRESULT: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
