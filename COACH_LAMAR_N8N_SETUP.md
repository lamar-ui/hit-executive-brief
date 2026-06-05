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
