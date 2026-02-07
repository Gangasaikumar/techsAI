/**
 * Beautiful HTML template for the admin notification
 * Uses TechsAI Brand Yellow (#FFC107) - Light Mode & Centered
 */
export const notifyAdminTemplate = (email: string) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f1f5f9;
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    table {
      border-spacing: 0;
    }
    td {
      padding: 0;
    }
    img {
      border: 0;
    }
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #f1f5f9;
      padding-bottom: 60px;
    }
    .main {
      background-color: #ffffff;
      margin: 0 auto;
      width: 100%;
      max-width: 600px;
      border-spacing: 0;
      font-family: sans-serif;
      color: #1e293b;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      border: 1px solid #e2e8f0;
    }
    .content {
      padding: 40px;
      text-align: center;
    }
    .badge {
      display: inline-block;
      padding: 8px 16px;
      background: #FFC107;
      color: #0f172a;
      border-radius: 50px;
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 24px;
    }
    h1 {
      margin: 0 0 16px 0;
      font-size: 26px;
      color: #0f172a;
      font-weight: 800;
    }
    .highlight-box {
      background: #f8fafc;
      border: 1px dashed #cbd5e1;
      border-radius: 12px;
      padding: 24px;
      margin: 24px 0;
    }
    .email-text {
      font-size: 18px;
      font-weight: 700;
      color: #0f172a;
      word-break: break-all;
      text-decoration: none;
    }
    p {
      line-height: 1.6;
      color: #64748b;
      margin: 0;
    }
    .footer {
      margin-top: 32px;
      font-size: 11px;
      color: #94a3b8;
    }
  </style>
</head>
<body>
  <center class="wrapper">
    <table class="main" width="100%">
      <tr>
        <td class="content">
          <div class="badge">New Growth</div>
          <h1>New Wishlist Subscriber</h1>
          <p>Great news! A new user has just joined the TechsAI waiting list.</p>
          
          <div class="highlight-box">
            <a href="mailto:${email}" class="email-text">${email}</a>
          </div>
          
          <p>They want to stay in touch and be notified about upcoming releases.</p>
          
          <div class="footer">
            Sent automatically by TechsAI Backend System
          </div>
        </td>
      </tr>
    </table>
  </center>
</body>
</html>
`; /**
 * Beautiful HTML template for the contact request notification
 * Uses TechsAI Brand Yellow (#FFC107) - Light Mode & Centered
 */
export const contactAdminTemplate = (
  fullName: string,
  email: string,
  mobile: string,
  message: string,
  hasAttachment: boolean,
) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f1f5f9;
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    table {
      border-spacing: 0;
    }
    td {
      padding: 0;
    }
    img {
      border: 0;
    }
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #f1f5f9;
      padding-bottom: 60px;
      padding-top: 40px;
    }
    .main {
      background-color: #ffffff;
      margin: 0 auto;
      width: 100%;
      max-width: 600px;
      border-spacing: 0;
      font-family: sans-serif;
      color: #1e293b;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      border: 1px solid #e2e8f0;
    }
    .content {
      padding: 40px;
      text-align: left;
    }
    .badge {
      display: inline-block;
      padding: 8px 16px;
      background: #FFC107;
      color: #0f172a;
      border-radius: 50px;
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 24px;
    }
    h1 {
      margin: 0 0 16px 0;
      font-size: 26px;
      color: #0f172a;
      font-weight: 800;
      text-align: center;
    }
    .info-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 24px;
      margin: 24px 0;
    }
    .label {
      font-size: 11px;
      text-transform: uppercase;
      color: #94a3b8;
      font-weight: 700;
      margin-bottom: 4px;
    }
    .value {
      font-size: 16px;
      color: #0f172a;
      font-weight: 600;
      margin-bottom: 16px;
      word-break: break-all;
    }
    .message-box {
      border-left: 4px solid #FFC107;
      padding-left: 16px;
      margin-top: 8px;
      background: #fff;
      padding: 12px;
      border-radius: 0 8px 8px 0;
    }
    .attachment-badge {
      display: inline-flex;
      align-items: center;
      background: #e2e8f0;
      padding: 4px 12px;
      border-radius: 4px;
      font-size: 12px;
      color: #475569;
      margin-top: 8px;
    }
    .footer {
      margin-top: 32px;
      font-size: 11px;
      color: #94a3b8;
      text-align: center;
    }
  </style>
</head>
<body>
  <center class="wrapper">
    <table class="main" width="100%">
      <tr>
        <td class="content">
          <div style="text-align: center;"><div class="badge">Contact Request</div></div>
          <h1>New Message for TechsAI</h1>
          
          <div class="info-box">
            <div class="label">Full Name</div>
            <div class="value">${fullName}</div>
            
            <div class="label">Email Address</div>
            <div class="value"><a href="mailto:${email}" style="color: #0f172a; text-decoration: none;">${email}</a></div>
            
            <div class="label">Mobile Number</div>
            <div class="value">${mobile || "Not provided"}</div>
            
            <div class="label">Message</div>
            <div class="message-box">
              <p style="margin: 0; line-height: 1.6; color: #334155;">${message}</p>
            </div>
            
            ${hasAttachment ? `<div class="attachment-badge">📎 File attached (View on Server)</div>` : ""}
          </div>
          
          <div class="footer">
            Sent automatically by TechsAI Contact Service
          </div>
        </td>
      </tr>
    </table>
  </center>
</body>
</html>
`;

/**
 * Beautiful HTML template for the user confirmation email
 * Uses TechsAI Brand Yellow (#FFC107) and includes a countdown
 */
export const userConfirmationTemplate = (
  email: string,
  countdown: { months: number; days: number; hours: number },
) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f8fafc;
      margin: 0;
      padding: 40px 0;
      color: #1e293b;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border-radius: 16px;
      padding: 40px;
      text-align: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      border: 1px solid #e2e8f0;
    }
    .logo {
      font-size: 32px;
      font-weight: 800;
      color: #FFC107;
      margin-bottom: 24px;
    }
    h1 {
      margin: 0 0 16px 0;
      font-size: 24px;
      color: #0f172a;
    }
    .highlight {
      color: #0f172a;
      font-weight: 700;
      background: rgba(255, 193, 7, 0.4);
      padding: 2px 6px;
      border-radius: 4px;
    }
    p {
      line-height: 1.6;
      color: #475569;
      margin-bottom: 16px;
    }
    .countdown-table {
      width: 100%;
      margin: 32px 0;
      background: #0f172a;
      border-radius: 12px;
      padding: 24px;
      color: white;
      border-bottom: 4px solid #FFC107;
    }
    .countdown-label-top {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #94a3b8;
      padding-bottom: 20px;
    }
    .digit-value {
      font-size: 36px;
      font-weight: 800;
      color: #FFC107;
      line-height: 1;
    }
    .digit-label {
      font-size: 10px;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding-top: 8px;
    }
    .separator {
      font-size: 36px;
      font-weight: 800;
      color: #1e293b;
      padding: 0 10px;
      line-height: 1;
    }
    .cta-container {
      margin: 32px 0;
    }
    .cta-button {
      display: inline-block;
      padding: 16px 40px;
      background-color: #FFC107;
      color: #0f172a;
      text-decoration: none;
      border-radius: 50px;
      font-weight: 800;
      font-size: 16px;
      box-shadow: 0 4px 12px rgba(255, 193, 7, 0.2);
    }
    .footer {
      margin-top: 40px;
      padding-top: 24px;
      border-top: 1px solid #f1f5f9;
      font-size: 12px;
      color: #94a3b8;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">TechsAI</div>
    <h1>Welcome to the Inner Circle! 🎉</h1>
    <p>Hi there,</p>
    <p>You've successfully joined the <span class="highlight">TechsAI</span> wishlist. We're thrilled to have you with us!</p>
    
    <table class="countdown-table" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td colspan="5" align="center" class="countdown-label-top">Time until major release</td>
      </tr>
      <tr>
        <td align="center">
          <div class="digit-value">${countdown.months.toString().padStart(2, "0")}</div>
          <div class="digit-label">Months</div>
        </td>
        <td align="center" class="separator">-</td>
        <td align="center">
          <div class="digit-value">${countdown.days.toString().padStart(2, "0")}</div>
          <div class="digit-label">Days</div>
        </td>
        <td align="center" class="separator">-</td>
        <td align="center">
          <div class="digit-value">${countdown.hours.toString().padStart(2, "0")}</div>
          <div class="digit-label">Hours</div>
        </td>
      </tr>
    </table>

    <div class="cta-container">
      <a href="https://techsai.in/gangsaikumar" target="_blank" class="cta-button">Visit Profile</a>
    </div>

    <p>You are now officially prioritized for our upcoming releases and exclusive updates.</p>
    <p>We'll keep you posted as we get closer to launch on <strong>June 4, 2026</strong>.</p>
    
    <div class="footer">
      You are receiving this because you subscribed to TechsAI's wishlist with the email: ${email}<br>
      © 2026 TechsAI. All rights reserved.
    </div>
  </div>
</body>
</html>
`;
