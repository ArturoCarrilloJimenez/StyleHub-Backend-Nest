export const emailResetPasswordTemplate = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background-color:#eef2f7;font-family:Helvetica,Arial,sans-serif;color:#333333;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#eef2f7;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.05);">
          <!-- Header -->
          <tr>
            <td style="background-color:#1e293b;padding:24px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:400;">StyleHub</h1>
            </td>
          </tr>

          <!-- Hero / Intro -->
          <tr>
            <td style="padding:32px;">
              <h2 style="margin:0 0 16px;color:#1e293b;font-size:22px;font-weight:500;">Password Reset Request</h2>
              <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#4b5563;">
                Hello <strong>\${user_name}</strong>,
              </p>
              <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#4b5563;">
                We received a request to reset the password for your StyleHub account. Click the button below to set a new password. This link is valid for <strong>30 minutes</strong>.
              </p>
              
              <!-- Button -->
              <div style="text-align:center;margin:32px 0;">
                <a
                  href="\${link_reset_password}"
                  target="_blank"
                  style="background-color:#3b82f6;color:#ffffff;text-decoration:none;font-size:16px;font-weight:500;padding:14px 28px;border-radius:8px;display:inline-block;box-shadow:0 2px 6px rgba(59,130,246,0.3);"
                >
                  Reset My Password
                </a>
              </div>

              <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#4b5563;">
                If you did not request a password reset, simply ignore this email and your password will remain unchanged.
              </p>
              <p style="margin:0;font-size:16px;line-height:1.6;color:#4b5563;">
                Thank you for being part of our community. Stay tuned for more updates and exclusive offers!
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 32px;">
              <hr style="border:none;border-top:1px solid #e5e7eb;" />
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px;background-color:#f9fafb;text-align:center;">
              <p style="margin:0;font-size:14px;line-height:1.5;color:#6b7280;">
                StyleHub • E-commerce<br/>
                Innovation Avenue, 123, Madrid, Spain
              </p>
              <p style="margin:8px 0 0;font-size:14px;line-height:1.5;color:#6b7280;">
                © 2025 StyleHub. All rights reserved.<br/>
                <a href="\${link_front}" target="_blank" style="color:#3b82f6;text-decoration:none;font-weight:500;">\${link_front}</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
