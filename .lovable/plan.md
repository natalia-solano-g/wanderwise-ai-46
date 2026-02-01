

# Switch to Production Webhook URL

## Change Required

Update the n8n webhook URL from test mode to production mode.

| Current (Test) | New (Production) |
|----------------|------------------|
| `https://natisolanog.app.n8n.cloud/webhook-test/voyager` | `https://natisolanog.app.n8n.cloud/webhook/voyager` |

## File to Update

**`src/services/voyagerApi.ts`** - Line 3

```text
// Before
const N8N_WEBHOOK_URL = 'https://natisolanog.app.n8n.cloud/webhook-test/voyager';

// After
const N8N_WEBHOOK_URL = 'https://natisolanog.app.n8n.cloud/webhook/voyager';
```

## Important Reminder

Make sure your n8n workflow is set to **Active** (toggle in the top-right corner of the n8n editor). Production webhooks only work when the workflow is active.

