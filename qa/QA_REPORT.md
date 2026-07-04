# QA Report — n8n workflows

**Result: 56 passed / 0 failed.** Run it yourself: `node qa/qa-workflows.mjs`

The harness executes the **actual Code-node JavaScript shipped inside the
workflow JSON** (not a copy) against mocked n8n globals, so it verifies real
behavior — plus structural validation of every workflow file.

## Covered

### Structure (all 3 workflows)
- Valid JSON; every connection references an existing node.
- Every Anthropic HTTP node: points to `api.anthropic.com`, uses header-auth,
  sends `anthropic-version`, and has **prompt caching** (`cache_control`).

### Hub — routing
- `mode: fitness` → Coach Lamar prompt; `mode: 22lightson` → 22 Lights On prompt.
- Missing mode → defaults to fitness. First turn → `messages = [user]`.

### Hub — crisis detection
- **Catches:** "don't want to be here," "want to die," "suicide," "kill myself,"
  "no reason to live," "hurt myself."
- **Does NOT false-fire on:** "killed it at the gym," "dead lift PR," "dead
  tired after leg day," "crush this workout."

### Hub — conversation memory
- Prior history loads and the new user turn is appended.
- After the reply, the exchange is saved and **capped at 20 messages**; the
  newest turn is always retained.

### Daily Signal + Caption
- Seed picks a theme + weekday; prompt demands the DAILY SIGNAL and the
  `www.22lightson.com` closing line.
- Signal text is trimmed/extracted correctly.
- Caption prompt includes the hashtags, the **988** crisis line, and the site CTA;
  caption is extracted while the signal is retained.

## Not covered here (needs a live n8n + keys)
- Real Anthropic API round-trip (needs the API key + network to n8n).
- Google Sheets append + email send (need credentials).
- Schedule trigger firing at 7:00 in your timezone.

These are covered by the **live smoke tests** in `COACH_LAMAR_N8N_SETUP.md`
(curl the webhook; Execute Workflow on the daily job) once deployed.
