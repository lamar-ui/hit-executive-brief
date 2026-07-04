# Wire your AI Coach into n8n

This connects your app → n8n → Claude (in your voice) → back to your app.

```
[Your app] --POST question--> [n8n Webhook] --> [Build prompt] --> [Claude] --> [Respond] --> [Your app]
```

Import file: **`coach-lamar-n8n-workflow.json`**

---

## 1. Import the workflow
In n8n (already open in your Chrome): top-right **⋯ menu → Import from File** →
pick `coach-lamar-n8n-workflow.json`. You'll see 4 nodes wired left to right.

## 2. Add your Anthropic API key (once)
1. Get a key at console.anthropic.com → **API Keys**.
2. In n8n: **Credentials → New → "Header Auth"** (Generic).
   - **Name:** `Anthropic`
   - **Header Name:** `x-api-key`
   - **Header Value:** *your Anthropic key*
3. Open the **Claude (Anthropic)** node → under Credential for Header Auth,
   select the `Anthropic` credential you just made.

> The key lives in n8n's credential store, never in the workflow JSON.

## 3. Activate + get your URL
- Toggle the workflow **Active** (top-right).
- Click the **Webhook** node → copy the **Production URL**. It looks like:
  `https://<your-n8n>/webhook/coach-lamar`

## 4. Call it from your app
Send a POST with the client's question:

```bash
curl -X POST https://<your-n8n>/webhook/coach-lamar \
  -H "Content-Type: application/json" \
  -d '{ "question": "I only have 20 minutes and no equipment. What do I do?" }'
```

Response:
```json
{ "answer": "No gym, no gear, no excuse. Here's 20 minutes..." }
```

In your `coach-lamar-alwaysbeme` front-end, replace your current AI call with a
`fetch` to that webhook URL, send `{ question }`, and render `data.answer`.

---

## What's already built in
- **Your voice** — the full Coach Lamar system prompt is embedded in the
  *Build prompt* node (same one from `COACH_LAMAR_AI_VOICE_PROMPT.md`).
- **Prompt caching** — the system prompt is sent with `cache_control: ephemeral`,
  so after the first call Anthropic caches it: faster replies + lower cost.
- **Model** — `claude-sonnet-4-6` (great quality/speed/price for a chatbot).
  Swap to `claude-opus-4-8` in the Claude node's JSON body for max quality.

## Nice upgrades (say the word and I'll add them)
- **Conversation memory** — pass a `sessionId` and keep chat history so the coach
  remembers the thread (needs a small data store, e.g. n8n's static data or a DB).
- **Rate limiting / abuse guard** before the Claude call.
- **Logging** — drop each Q&A into a Google Sheet or Airtable.
- **Safety post-check** — second pass that flags medical/distress messages.

---

## Hub version (two voices + crisis guard) — `coach-lamar-n8n-workflow-hub.json`

Use this instead of the single-voice file if you want the **Train with Lamar +
22 Lights On** hub (see `22LIGHTSON_AI_MODE.md`). Same import steps; same
Anthropic Header-Auth credential on the **Claude** node. Flow:

```
Webhook → Route & crisis detect → Crisis? ──true──► Respond: Veterans Crisis card (988→1)
                                            └─false─► Claude (voice by mode) → Save memory → Respond: answer
```

- Your app sends `{ "question": "...", "mode": "fitness" | "22lightson", "sessionId": "abc123" }`.
- **Conversation memory:** pass a stable `sessionId` per user/thread. The workflow
  remembers the last ~10 exchanges for that session (stored in n8n's built-in
  workflow storage — no database needed) and feeds them to Claude so it holds
  context. New/absent `sessionId` = fresh conversation.
  > Note: n8n static storage persists on **active** (production) runs, is
  > best-effort, and is per-workflow. For durable, multi-instance memory, swap the
  > *Save memory* / load step for a real store (Postgres, Redis, Airtable) — ask
  > and I'll wire it. Also nothing is stored on the crisis path.
- **Both system prompts are embedded** in the *Route & crisis detect* Code node;
  it picks the voice by `mode`.
- **Crisis guard runs first:** a regex check on the message. On a hit it returns
  the Veterans Crisis Line card immediately (dial 988 → press 1 / text 838255 /
  911) and never sends the message to the model. Deterministic = safe.
- Test both paths:
  ```bash
  # normal (22 Lights On voice)
  curl -X POST https://alwaysbeme.app.n8n.cloud/webhook/coach-lamar \
    -H "Content-Type: application/json" \
    -d '{"question":"Some days I feel invisible.","mode":"22lightson"}'

  # crisis path — should return the 988 card, not an AI reply
  curl -X POST https://alwaysbeme.app.n8n.cloud/webhook/coach-lamar \
    -H "Content-Type: application/json" \
    -d '{"question":"I don't want to be here anymore","mode":"22lightson"}'
  ```

> The regex is a safety net, not a diagnosis. Keep the app-level crisis check too
> (belt and suspenders) as described in `22LIGHTSON_AI_MODE.md`.

### Q&A logging to Google Sheets
Two **Log** nodes append every exchange to a Google Sheet so you can see what
people ask and catch who needs a human:

- **Log — Q&A** runs after each normal answer.
- **Log — Crisis** runs on the crisis path and flags `FollowUpNeeded = YES`.

Both log **after** the reply is sent, so logging never delays or blocks a
response (and `onError: continue` means a logging hiccup can't break the chat).

**One-time setup:**
1. Create a Google Sheet with a tab named **`Log`** and a header row:
   `Timestamp | SessionId | Mode | Question | Answer | Crisis | FollowUpNeeded`
2. In n8n: **Credentials → New → Google Sheets OAuth2**, connect your Google account.
3. Open each **Log** node → pick that credential → set **Document** to your
   sheet (replace `REPLACE_WITH_YOUR_SPREADSHEET_ID` with the sheet's ID from its URL).
4. 💡 Filter the sheet on `FollowUpNeeded = YES` (or `Crisis = YES`) to see who to
   reach out to personally.

> Prefer Airtable, a database, or Slack alerts for crisis flags instead? Say the
> word and I'll swap the Log nodes.

---

## Daily Signals (scheduled broadcast) — `coach-lamar-daily-signal.json`

A separate workflow that sends a fresh, high-frequency "keep your light on"
message every morning — in your 22 Lights On voice, never repeating.

```
Every morning 7:00 → Signal seed (pick theme) → Claude (generate) → Format
                                                                       ├─► Log — Signals (sheet)
                                                                       └─► Broadcast — Email
```

- **Fresh daily:** the *Signal seed* node rotates through 10 themes by day of
  year (brotherhood, small wins, honoring the fallen, "just one more day," etc.)
  and passes the weekday, so each morning's message is new.
- **60–90 words**, uplifting-without-bypassing-pain, always closing with
  *"Keep your light on. — www.22lightson.com."*
- **Logged** to a `Signals` tab in your Google Sheet (same sheet is fine).
- **Broadcast** via the email node — or swap it for SMS/social (see below).

**Setup:**
1. Import `coach-lamar-daily-signal.json`, attach the same **Anthropic** Header-Auth
   credential to the Claude node.
2. Set the schedule (default **7:00 AM**, n8n's server timezone — set your zone in
   the trigger or n8n settings).
3. Pick your broadcast channel on the **Broadcast** node:
   - **Email:** add SMTP/Gmail credentials, set `toEmail` (your list or a group alias).
   - **SMS:** replace with a **Twilio** node (great for a daily text to members).
   - **Social/Discord/Slack:** replace with the matching node to auto-post.
4. (Optional) Add a `Signals` tab to your sheet: `Date | Weekday | Theme | Signal`.
5. Toggle **Active**. Test now with **Execute Workflow** to preview today's signal.

> Want it to also post the day's signal as an Instagram/Facebook caption draft,
> or text it to the Founders 100 list? Say the word and I'll wire that channel.

### Tone: inspiring / high-frequency
Both system prompts now carry an **Energy** directive — radiate positive,
motivating, frequency-raising energy. In the 22 Lights On lane it's tuned to
lift **without** bypassing pain (meet them first, then raise the light), so it
stays safe for someone who's hurting.
