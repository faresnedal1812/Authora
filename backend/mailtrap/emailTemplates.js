export const VERIFICATION_EMAIL_TEMPLATE = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Email Verification</title>
    </head>
    <body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" style="padding:40px 0;">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px;">
              
              <!-- Header -->
              <tr>
                <td style="background:#005F5F; padding:20px; text-align:center; color:#ffffff;">
                  <h1 style="margin:0;">Verify Your Email</h1>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding:30px; text-align:center; color:#333;">
                  <p style="font-size:16px;">
                    Use the verification code below to confirm your email address:
                  </p>

                  <!-- OTP Code -->
                  <div style="
                    margin:30px 0;
                    font-size:32px;
                    letter-spacing:8px;
                    font-weight:bold;
                    color:#005F5F;
                    background:#f4f6f8;
                    padding:15px 25px;
                    border-radius:8px;
                    display:inline-block;
                  ">
                    {verificationCode}
                  </div>

                  <p style="font-size:14px; color:#555;">
                    This code will expire in <b>7 days</b>.
                  </p>

                  <p style="font-size:14px; color:#999; margin-top:30px;">
                    If you didn’t request this, you can safely ignore this email.
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background:#f4f6f8; padding:15px; text-align:center; font-size:12px; color:#777;">
                  © ${new Date().getFullYear()} Your App. All rights reserved.
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;

export const RESET_PASSWORD_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Reset Your Password</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f6f8;
      font-family: Arial, Helvetica, sans-serif;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
    .header {
      background-color: #005F5F;
      color: #ffffff;
      padding: 20px;
      text-align: center;
    }
    .content {
      padding: 30px;
      color: #333333;
      line-height: 1.6;
    }
    .btn-wrapper {
      text-align: center;
      margin: 30px 0;
    }
    .reset-btn {
      display: inline-block;
      padding: 14px 28px;
      background-color: #005F5F;
      color: #ffffff !important;
      text-decoration: none;
      font-size: 16px;
      font-weight: bold;
      border-radius: 6px;
    }
    .reset-btn:hover {
      background-color: #005F5F;
    }
    .footer {
      padding: 20px;
      font-size: 12px;
      color: #777777;
      text-align: center;
      background-color: #f9fafb;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Password Reset</h2>
    </div>

    <div class="content">
      <p>Hello,</p>

      <p>
        We received a request to reset your password. Click the button below
        to choose a new password.
      </p>

      <div class="btn-wrapper">
        <a
          href="{RESET_URL}"
          class="reset-btn"
          target="_blank"
        >
          Reset Password
        </a>
      </div>

      <p>
        If the button doesn’t work, copy and paste this link into your browser:
      </p>

      <p>
        This link will expire in <strong>1 hour</strong>.  
        If you didn’t request a password reset, please ignore this email.
      </p>

      <p>Best regards,<br />Authora Team</p>
    </div>

    <div class="footer">
      © 2026 Your App. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

export const RESET_PASSWORD_SUCCESS_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Password Reset Successful</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f6f8;
      font-family: Arial, Helvetica, sans-serif;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
    .header {
      background-color: #005F5F;
      color: #ffffff;
      padding: 20px;
      text-align: center;
    }
    .content {
      padding: 30px;
      color: #333333;
      line-height: 1.6;
      text-align: center;
    }
    .success-icon {
      font-size: 48px;
      color: #005F5F;
      margin-bottom: 20px;
    }
    .footer {
      padding: 20px;
      font-size: 12px;
      color: #777777;
      text-align: center;
      background-color: #f9fafb;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Password Reset Successful</h2>
    </div>

    <div class="content">
      <div class="success-icon">✅</div>

      <p>
        Your password has been <strong>successfully reset</strong>.
      </p>

      <p>
        You can now log in using your new password.
      </p>

      <p>
        If you did not perform this action, please contact our support team
        immediately.
      </p>

      <p>
        Stay safe,<br />
        <strong>Authora Team</strong>
      </p>
    </div>

    <div class="footer">
      © 2026 Your App. All rights reserved.
    </div>
  </div>
</body>
</html>
`;
