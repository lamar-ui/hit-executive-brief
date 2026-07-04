# Desktop handoff — deploy the 22 Lights On + Coach Lamar AI to n8n

**Paste this to Claude Code on Mac desktop to resume:**

> "Read DESKTOP_HANDOFF.md and deploy my n8n workflows. The files are in this
> repo. Register + use the n8n MCP, then import, credential, and activate both
> workflows. I have my Anthropic API key ready."

---

## Context (what's already built, on branch `claude/instagram-voice-sample-ThnkD`)
- `coach-lamar-n8n-workflow-hub.json` — live chat: 2 voices (Train with Lamar +
  22 Lights On) + conversation memory + crisis guard (988) + Google Sheets logging.
- `coach-lamar-daily-signal.json` — scheduled 7:00 AM broadcast: generates a
  daily high-frequency "signal" + a ready-to-post IG/FB caption.
- Voice/persona docs: `COACH_LAMAR_AI_VOICE_PROMPT.md`, `22LIGHTSON_AI_MODE.md`.
- Reels: `COACH_LAMAR_IG_REELS.md`, `22LIGHTSON_VOICE_AND_REELS.md`.
- Full setup guide: `COACH_LAMAR_N8N_SETUP.md`.

n8n instance: **https://alwaysbeme.app.n8n.cloud**

## Why desktop (not web)
The web session couldn't reach `alwaysbeme.app.n8n.cloud` (network policy) and the
n8n MCP OAuth can't complete in a non-interactive session. Desktop fixes both.

## Steps for the desktop session
1. **Register the n8n MCP** (user scope persists on desktop):
   ```
   claude mcp add --scope user --transport http n8n "https://alwaysbeme.app.n8n.cloud/mcp-server/http"
   ```
2. **Restart Claude Code**, then run `/mcp` and complete the **n8n OAuth** login.
3. **Deploy** — I (Claude) will then:
   - import both workflow JSONs into n8n,
   - attach the **Anthropic** Header-Auth credential (`x-api-key`) to each Claude node,
   - wire the Google Sheets logging (you log into Google once),
   - set the schedule/timezone on the daily workflow,
   - activate both and run a test.

## Have ready
- **Anthropic API key** (console.anthropic.com → API Keys).
- **Google account** login (for Sheets logging) — optional, can skip at first.
- Your broadcast channel choice (email / SMS / social) for Daily Signals.

## Still open (make it truly your voice)
Paste the **manifesto script** or the copy from **www.22lightson.com** so the
`[CONFIRM]` placeholders get replaced and every message sounds exactly like you.
