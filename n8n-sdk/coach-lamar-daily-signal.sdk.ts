import { workflow, node, trigger, newCredential, expr } from '@n8n/workflow-sdk';

const dailyTrigger = trigger({
  type: 'n8n-nodes-base.scheduleTrigger', version: 1.3,
  config: { name: 'Every morning 7:00', parameters: { rule: { interval: [{ field: 'days', triggerAtHour: 7, triggerAtMinute: 0 }] } } },
  output: [{}]
});

const signalSeed = node({
  type: 'n8n-nodes-base.code', version: 2,
  config: { name: 'Signal seed', parameters: { jsCode: "const now = new Date();\nconst start = new Date(now.getFullYear(), 0, 0);\nconst doy = Math.floor((now - start) / 86400000);\nconst wd = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][now.getDay()];\nconst themes = [\n  'brotherhood — you are not alone in this',\n  'small wins — one honest step today',\n  'asking for help is strength, not weakness',\n  'honoring the fallen by living forward',\n  'purpose after the uniform',\n  'just one more day — stay',\n  'you are seen and you matter',\n  'rebuild — you are still being written',\n  'reach out to one battle buddy',\n  'the light you keep on saves someone else'\n];\nconst theme = themes[doy % themes.length];\nconst dateISO = now.toISOString();\nconst systemPrompt = \"You are the voice of 22 Lights On \\u2014 a movement for veterans and the people who love them. \\\"22\\\" honors those lost to veteran suicide; the belief is YOUR LIGHT STILL MATTERS. Your words are warm, steady, and uplifting \\u2014 you raise the frequency of whoever reads them.\\n\\nRules of the voice:\\n- Lift people WITHOUT bypassing pain. Honor the hard first, then point to the light. No toxic positivity.\\n- Brotherhood, presence, hope, forward motion. Plain and real. Short lines that hit.\\n- Speak to ONE person reading this on a hard morning.\\n- Never reference suicide methods or give medical/clinical advice.\";\nconst userPrompt = 'Write today\\'s 22 Lights On DAILY SIGNAL — a short (60-90 word) high-frequency message for veterans and their families. Today is ' + wd + '. Theme: ' + theme + '. Requirements: uplifting without bypassing pain; include ONE small, doable nudge (text a buddy, step outside, breathe, reach the VA); no hashtags in the body; end with the exact line \"Keep your light on. — www.22lightson.com\". Return ONLY the message text.';\nreturn [{ json: { dateISO, weekday: wd, theme, systemPrompt, userPrompt } }];" } },
  output: [{ dateISO: '2026-07-05T07:00:00.000Z', weekday: 'Sunday', theme: 'brotherhood — you are not alone in this', systemPrompt: 'voice', userPrompt: 'Write today\'s 22 Lights On DAILY SIGNAL ...' }]
});

const generateSignal = node({
  type: 'n8n-nodes-base.httpRequest', version: 4.3,
  config: {
    name: "Claude — generate signal",
    parameters: { method: 'POST', url: 'https://api.anthropic.com/v1/messages', authentication: 'genericCredentialType', genericAuthType: 'httpHeaderAuth', sendHeaders: true, headerParameters: { parameters: [{ name: 'anthropic-version', value: '2023-06-01' }] }, sendBody: true, specifyBody: 'json', jsonBody: expr("{{ { \"model\": \"claude-sonnet-4-6\", \"max_tokens\": 400, \"system\": [ { \"type\": \"text\", \"text\": $json.systemPrompt, \"cache_control\": { \"type\": \"ephemeral\" } } ], \"messages\": [ { \"role\": \"user\", \"content\": $json.userPrompt } ] } }}"), options: {} },
    credentials: { httpHeaderAuth: newCredential('Anthropic Header Auth') }
  },
  output: [{ content: [{ text: 'a short daily signal.' }] }]
});

const formatSignal = node({
  type: 'n8n-nodes-base.code', version: 2,
  config: { name: 'Format signal', parameters: { jsCode: "const seed = $('Signal seed').item.json;\nconst signal = ($json.content && $json.content[0]) ? $json.content[0].text.trim() : '';\nreturn [{ json: { date: seed.dateISO, weekday: seed.weekday, theme: seed.theme, signal } }];" } },
  output: [{ date: '2026-07-05T07:00:00.000Z', weekday: 'Sunday', theme: 'brotherhood', signal: 'a short daily signal.' }]
});

const captionSeed = node({
  type: 'n8n-nodes-base.code', version: 2,
  config: { name: 'Caption seed', parameters: { jsCode: "const s = $json;\nconst systemPrompt = \"You are the voice of 22 Lights On \\u2014 a movement for veterans and the people who love them. \\\"22\\\" honors those lost to veteran suicide; the belief is YOUR LIGHT STILL MATTERS. Your words are warm, steady, and uplifting \\u2014 you raise the frequency of whoever reads them.\\n\\nRules of the voice:\\n- Lift people WITHOUT bypassing pain. Honor the hard first, then point to the light. No toxic positivity.\\n- Brotherhood, presence, hope, forward motion. Plain and real. Short lines that hit.\\n- Speak to ONE person reading this on a hard morning.\\n- Never reference suicide methods or give medical/clinical advice.\";\nconst userPrompt = 'Turn this 22 Lights On daily signal into an Instagram/Facebook caption. Keep the heart of the message. Start with a scroll-stopping first line (hook). Stay warm and high-frequency without bypassing pain. Add a gentle CTA to join the movement at www.22lightson.com. Then on new lines add exactly:\\n\\n\\uD83D\\uDCDE Veterans Crisis Line: dial 988, then press 1 \\u2022 Text 838255\\n\\n#22LightsOn #YourLightStillMatters #AlwaysBeMe #Veterans #NotOneMore #KeepYourLightOn\\n\\nReturn ONLY the caption. Here is the signal:\\n\\n' + s.signal;\nreturn [{ json: { date: s.date, weekday: s.weekday, theme: s.theme, signal: s.signal, systemPrompt, userPrompt } }];" } },
  output: [{ date: '2026-07-05T07:00:00.000Z', weekday: 'Sunday', theme: 'brotherhood', signal: 'a short daily signal.', systemPrompt: 'voice', userPrompt: 'Turn this into an IG caption ...' }]
});

const draftCaption = node({
  type: 'n8n-nodes-base.httpRequest', version: 4.3,
  config: {
    name: "Claude — draft caption",
    parameters: { method: 'POST', url: 'https://api.anthropic.com/v1/messages', authentication: 'genericCredentialType', genericAuthType: 'httpHeaderAuth', sendHeaders: true, headerParameters: { parameters: [{ name: 'anthropic-version', value: '2023-06-01' }] }, sendBody: true, specifyBody: 'json', jsonBody: expr("{{ { \"model\": \"claude-sonnet-4-6\", \"max_tokens\": 500, \"system\": [ { \"type\": \"text\", \"text\": $json.systemPrompt, \"cache_control\": { \"type\": \"ephemeral\" } } ], \"messages\": [ { \"role\": \"user\", \"content\": $json.userPrompt } ] } }}"), options: {} },
    credentials: { httpHeaderAuth: newCredential('Anthropic Header Auth') }
  },
  output: [{ content: [{ text: 'caption text #22LightsOn' }] }]
});

const formatCaption = node({
  type: 'n8n-nodes-base.code', version: 2,
  config: { name: 'Format caption', parameters: { jsCode: "const seed = $('Caption seed').item.json;\nconst caption = ($json.content && $json.content[0]) ? $json.content[0].text.trim() : '';\nreturn [{ json: { date: seed.date, weekday: seed.weekday, theme: seed.theme, signal: seed.signal, caption } }];" } },
  output: [{ date: '2026-07-05T07:00:00.000Z', weekday: 'Sunday', theme: 'brotherhood', signal: 'a short daily signal.', caption: 'caption text #22LightsOn' }]
});

const logSignals = node({
  type: 'n8n-nodes-base.googleSheets', version: 4.5,
  config: {
    name: 'Log — Signals + Caption',
    onError: 'continueRegularOutput',
    parameters: { resource: 'sheet', operation: 'append', documentId: { __rl: true, value: 'REPLACE_WITH_YOUR_SPREADSHEET_ID', mode: 'id' }, sheetName: { __rl: true, value: 'Signals', mode: 'name' }, columns: {"mappingMode": "defineBelow", "value": {"Date": "={{ $json.date }}", "Weekday": "={{ $json.weekday }}", "Theme": "={{ $json.theme }}", "Signal": "={{ $json.signal }}", "Caption": "={{ $json.caption }}"}, "matchingColumns": [], "schema": []}, options: {} },
    credentials: { googleSheetsOAuth2Api: newCredential('Google Sheets') }
  },
  output: [{ appended: true }]
});

const broadcastEmail = node({
  type: 'n8n-nodes-base.emailSend', version: 2.1,
  config: {
    name: 'Broadcast — Email (configure)',
    onError: 'continueRegularOutput',
    parameters: { fromEmail: 'lamar@22lightson.com', toEmail: 'REPLACE_WITH_LIST_OR_YOUR_EMAIL', subject: '🕯️ Your 22 Lights On Daily Signal + caption', emailFormat: 'text', text: expr("{{ 'TODAY\\'S SIGNAL:\\n\\n' + $json.signal + '\\n\\n— — — — —\\n\\nREADY-TO-POST CAPTION:\\n\\n' + $json.caption }}"), options: {} },
    credentials: { smtp: newCredential('SMTP Email') }
  },
  output: [{ sent: true }]
});

export default workflow('coach-lamar-daily-signal', '22 Lights On — Daily Signal + Caption')
  .add(dailyTrigger)
  .to(signalSeed)
  .to(generateSignal)
  .to(formatSignal)
  .to(captionSeed)
  .to(draftCaption)
  .to(formatCaption)
  .to(logSignals)
  .add(formatCaption)
  .to(broadcastEmail);
