export function getWelcomeEmailHtml(firstName: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your HIT™ Executive Brief Request</title>
</head>
<body style="margin:0;padding:0;background-color:#060606;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#060606;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="padding:0 0 32px;">
              <span style="font-size:14px;font-weight:600;color:#ffffff;letter-spacing:0.5px;">
                RSI<span style="color:#C9A84C;">&nbsp;Advisory</span>
              </span>
            </td>
          </tr>

          <!-- Gold divider -->
          <tr>
            <td style="padding:0 0 32px;">
              <div style="height:1px;background:linear-gradient(90deg,#C9A84C,rgba(201,168,76,0.2));"></div>
            </td>
          </tr>

          <!-- Main content -->
          <tr>
            <td style="color:#e5e7eb;font-size:15px;line-height:1.7;">
              <p style="margin:0 0 20px;color:#ffffff;font-size:18px;font-weight:600;">
                Hi ${firstName},
              </p>

              <p style="margin:0 0 20px;">
                Thank you for requesting <strong style="color:#ffffff;">The HIT&#8482; Executive Brief</strong>.
              </p>

              <p style="margin:0 0 24px;">
                Your submission has been received and is now in our review queue. Here&rsquo;s what happens next:
              </p>

              <!-- Steps -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #1a1a1a;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:32px;vertical-align:top;">
                          <div style="width:24px;height:24px;border-radius:50%;background:rgba(201,168,76,0.1);border:1px solid rgba(201,168,76,0.2);text-align:center;line-height:24px;font-size:11px;font-weight:700;color:#C9A84C;">1</div>
                        </td>
                        <td style="color:#d1d5db;font-size:14px;">
                          <strong style="color:#ffffff;">Review</strong> &mdash; We personally review every submission to assess fit.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #1a1a1a;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:32px;vertical-align:top;">
                          <div style="width:24px;height:24px;border-radius:50%;background:rgba(201,168,76,0.1);border:1px solid rgba(201,168,76,0.2);text-align:center;line-height:24px;font-size:11px;font-weight:700;color:#C9A84C;">2</div>
                        </td>
                        <td style="color:#d1d5db;font-size:14px;">
                          <strong style="color:#ffffff;">Intake</strong> &mdash; If accepted, we may schedule a brief 15-minute discovery call.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:32px;vertical-align:top;">
                          <div style="width:24px;height:24px;border-radius:50%;background:rgba(201,168,76,0.1);border:1px solid rgba(201,168,76,0.2);text-align:center;line-height:24px;font-size:11px;font-weight:700;color:#C9A84C;">3</div>
                        </td>
                        <td style="color:#d1d5db;font-size:14px;">
                          <strong style="color:#ffffff;">Delivery</strong> &mdash; Your custom executive brief arrives within 5 business days.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Accelerate CTA -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;background:#0C0C0C;border:1px solid #1a1a1a;border-radius:8px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 6px;color:#ffffff;font-size:14px;font-weight:600;">
                      Want to accelerate your brief?
                    </p>
                    <p style="margin:0;color:#9ca3af;font-size:13px;line-height:1.6;">
                      Reply to this email with your <strong style="color:#ffffff;">top 2 technology constraints</strong> and we&rsquo;ll prioritize your analysis.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Book Debrief Button -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
                <tr>
                  <td align="center">
                    <a href="https://cal.com/lamar-dunn-gffmqj/30min"
                       target="_blank"
                       style="display:inline-block;padding:14px 32px;background-color:#C9A84C;color:#060606;font-size:13px;font-weight:700;text-decoration:none;border-radius:6px;letter-spacing:0.3px;">
                      Book a Strategic Debrief &rarr;
                    </a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding:10px 0 0;">
                    <span style="font-size:11px;color:#6b7280;">
                      Optional 30-minute call after your brief is delivered
                    </span>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 4px;color:#ffffff;">
                We look forward to serving you.
              </p>
              <p style="margin:0 0 0;color:#9ca3af;font-size:14px;">
                <strong style="color:#ffffff;">Lamar Dunn</strong><br />
                Founder, RSI Advisory<br />
                <span style="font-size:12px;">Former CIO/CTO &bull; 20+ Years in Enterprise Technology</span>
              </p>
            </td>
          </tr>

          <!-- Footer divider -->
          <tr>
            <td style="padding:32px 0 0;">
              <div style="height:1px;background:rgba(201,168,76,0.15);"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 0 0;text-align:center;">
              <p style="margin:0;font-size:11px;color:#4b5563;">
                &copy; 2026 RSI Advisory. All rights reserved.<br />
                Built with precision. Delivered with confidentiality.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
}

export function getWelcomeEmailText(firstName: string): string {
  return `Hi ${firstName},

Thank you for requesting The HIT Executive Brief.

Your submission has been received and is now in our review queue. Here's what happens next:

1. REVIEW — We personally review every submission to assess fit.
2. INTAKE — If accepted, we may schedule a brief 15-minute discovery call.
3. DELIVERY — Your custom executive brief arrives within 5 business days.

Want to accelerate your brief? Reply to this email with your top 2 technology constraints and we'll prioritize your analysis.

Book a Strategic Debrief (optional 30-min call):
https://cal.com/lamar-dunn-gffmqj/30min

We look forward to serving you.

Lamar Dunn
Founder, RSI Advisory
Former CIO/CTO | 20+ Years in Enterprise Technology

---
(c) 2026 RSI Advisory. All rights reserved.`;
}
