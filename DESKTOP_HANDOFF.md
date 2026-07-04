# Desktop handoff — deploy the 22 Lights On + Coach Lamar AI to n8n

**Paste this to Claude Code on Mac desktop to resume:**

> "Read DESKTOP_HANDOFF.md and deploy my n8n workflows. The files are in this
> repo. Register + use the n8n MCP, then import, credential, and activate both
> workflows. I have my Anthropic API key ready."

---

## Deploy list for tomorrow (do these in order)
1. Confirm the n8n tools are loaded (fresh session boots with the connector).
2. `list_credentials` — if no **Anthropic Header Auth** credential exists, ask Lamar
   to create one in n8n (Header Auth: name `x-api-key`, value = his Anthropic key),
   or have his key ready to paste.
3. Deploy the **hub**: `create_workflow_from_code` using `n8n-sdk/coach-lamar-hub.sdk.ts`
   → then `validate_workflow`.
4. Deploy the **daily signal**: `create_workflow_from_code` using
   `n8n-sdk/coach-lamar-daily-signal.sdk.ts` → `validate_workflow`.
5. Attach the **Anthropic Header Auth** credential to every Claude node.
   (Optional now: Google Sheets + SMTP creds for logging/broadcast.)
6. Live test the hub: send a normal message and a crisis-phrase message; confirm
   the crisis one returns the 988 card. Then `test_workflow` / Execute the daily one.
7. Activate both (or `publish_workflow`).

> SDK files (`n8n-sdk/*.sdk.ts`) are generated from the QA-passed logic but were
> NOT validated live (connector was down when written) — run `validate_workflow`
> after creating each, and fix any node version/param mismatch it flags.
> The `coach-lamar-*.json` files are the same workflows as importable JSON (a
> manual-import fallback if the SDK path has any issue).

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
