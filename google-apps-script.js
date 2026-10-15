/**
 * GOOGLE APPS SCRIPT: Portfolio Enquiry Form Integration & Email Notifier
 * 
 * Target Email for Notifications: karthick.c.g6@gmail.com
 * 
 * HOW TO UPDATE YOUR SCRIPT IN GOOGLE SHEETS:
 * 1. Open the Google Sheet connected to your portfolio enquiries.
 * 2. In the top menu, click "Extensions" > "Apps Script".
 * 3. Replace all the code in the editor with this entire file.
 * 4. Click the Save icon (💾) or press Cmd+S / Ctrl+S.
 * 5. In the top right, click "Deploy" > "Manage deployments".
 * 6. Click the pencil icon (Edit) on the active deployment.
 * 7. In the "Version" dropdown, select "New version".
 * 8. Click "Deploy".
 * 9. (First time only) If Google prompts for permissions ("Authorization required"),
 *    click "Review permissions" > Select your account > "Advanced" > "Go to ... (unsafe)" > "Allow".
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    var timestamp = data.timestamp || new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    var name = data.name || "N/A";
    var email = data.email || "N/A";
    var website = data.website || "N/A";
    var service = data.service || "N/A";
    var message = data.message || "N/A";
    var source = data.source || "Website Form";
    
    // 1. Ensure Header Row exists in the Google Sheet
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Date & Time",
        "Full Name",
        "Email Address",
        "Website / Company",
        "Primary Goal / Service",
        "Project Details / Message",
        "Form Source"
      ]);
      // Format header row bold with soft background
      sheet.getRange(1, 1, 1, 7).setFontWeight("bold").setBackground("#f1f5f9");
    }
    
    // 2. Append lead row to Google Sheet
    sheet.appendRow([
      timestamp,
      name,
      email,
      website,
      service,
      message,
      source
    ]);
    
    // 3. Send Instant Email Notification to karthick.c.g6@gmail.com
    var recipient = "karthick.c.g6@gmail.com";
    var subject = "🚀 New Enquiry: " + name + " (" + service + ")";
    
    var plainTextBody = 
      "You have received a new business enquiry on your portfolio site!\n\n" +
      "--------------------------------------------------\n" +
      "📅 Date & Time: " + timestamp + "\n" +
      "👤 Name: " + name + "\n" +
      "📧 Email: " + email + "\n" +
      "🌐 Website/Company: " + website + "\n" +
      "🎯 Primary Goal / Service: " + service + "\n" +
      "📍 Source: " + source + "\n\n" +
      "💬 Project Details / Message:\n" + message + "\n" +
      "--------------------------------------------------\n\n" +
      "This lead has also been saved to your Google Sheet.";
      
    var htmlBody = 
      '<div style="font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">' +
        '<div style="border-bottom: 2px solid #2563eb; padding-bottom: 16px; margin-bottom: 20px;">' +
          '<h2 style="color: #0f172a; margin: 0 0 6px 0; font-size: 20px;">🚀 New Portfolio Business Enquiry</h2>' +
          '<p style="color: #64748b; margin: 0; font-size: 14px;">A new potential client has submitted an enquiry through your portfolio website.</p>' +
        '</div>' +
        '<table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">' +
          '<tr><td style="padding: 10px 12px; font-weight: 600; color: #475569; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0; width: 35%;">📅 Date & Time</td><td style="padding: 10px 12px; color: #0f172a; border-bottom: 1px solid #e2e8f0;">' + timestamp + '</td></tr>' +
          '<tr><td style="padding: 10px 12px; font-weight: 600; color: #475569; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">👤 Full Name</td><td style="padding: 10px 12px; color: #0f172a; font-weight: 600; border-bottom: 1px solid #e2e8f0;">' + name + '</td></tr>' +
          '<tr><td style="padding: 10px 12px; font-weight: 600; color: #475569; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">📧 Email Address</td><td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0;"><a href="mailto:' + email + '" style="color: #2563eb; text-decoration: none; font-weight: 600;">' + email + '</a></td></tr>' +
          '<tr><td style="padding: 10px 12px; font-weight: 600; color: #475569; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">🌐 Website / Company</td><td style="padding: 10px 12px; color: #0f172a; border-bottom: 1px solid #e2e8f0;">' + website + '</td></tr>' +
          '<tr><td style="padding: 10px 12px; font-weight: 600; color: #475569; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">🎯 Service / Goal</td><td style="padding: 10px 12px; color: #2563eb; font-weight: 700; border-bottom: 1px solid #e2e8f0;">' + service + '</td></tr>' +
          '<tr><td style="padding: 10px 12px; font-weight: 600; color: #475569; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">📍 Form Location</td><td style="padding: 10px 12px; color: #64748b; border-bottom: 1px solid #e2e8f0;">' + source + '</td></tr>' +
        '</table>' +
        '<div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 20px;">' +
          '<div style="font-weight: 700; color: #0f172a; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">💬 Project Details / Message:</div>' +
          '<div style="color: #334155; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">' + message + '</div>' +
        '</div>' +
        '<div style="text-align: center; margin-top: 24px;">' +
          '<a href="mailto:' + email + '?subject=Re: Growth Marketing Consultation for ' + encodeURIComponent(name) + '" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">Reply to ' + name + '</a>' +
        '</div>' +
        '<p style="font-size: 12px; color: #94a3b8; text-align: center; margin-top: 24px; border-top: 1px solid #f1f5f9; padding-top: 16px;">⚡ Automatically saved to your Google Sheet & notified via Google Apps Script.</p>' +
      '</div>';
    
    // Dispatch email
    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      body: plainTextBody,
      htmlBody: htmlBody,
      replyTo: (email && email.indexOf("@") !== -1) ? email : recipient
    });
    
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
