# EmailJS Setup Guide 📧

## Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Connect Your Email Service
1. Go to "Email Services" in dashboard
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Follow the instructions to connect
5. Copy your **Service ID**

## Step 3: Create Email Template
1. Go to "Email Templates" in dashboard
2. Click "Create New Template"
3. Set template like this:

```
Subject: New Message from Portfolio - {{from_name}}

Content:
You received a new message from your portfolio:

Message: {{message}}

From: {{from_name}}
To: {{to_name}}
```

4. Save and copy your **Template ID**

## Step 4: Get Your Public Key
1. Go to "Account" → "General"
2. Find your **Public Key** (starts with something like "user_...")
3. Copy it

## Step 5: Update Your Website Code

Open `script.js` and replace these values:

```javascript
// Line 7: Replace YOUR_PUBLIC_KEY
emailjs.init("YOUR_PUBLIC_KEY_HERE");

// Line 151-152: Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID  
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

## Example:
```javascript
emailjs.init("user_abc123XYZ456");
emailjs.send('service_gmail123', 'template_contact456', templateParams)
```

## Step 6: Test It!
1. Save all files
2. Push to GitHub
3. Wait 2-3 minutes for deployment
4. Test the message feature on your live site!

## Troubleshooting:
- **"EmailJS is not defined"**: Make sure the EmailJS script is in your HTML head
- **"Failed to send"**: Check your Service ID and Template ID are correct
- **No email received**: Check your email service connection and spam folder

## Free Tier Limits:
- ✅ 200 emails per month
- ✅ Unlimited templates
- ✅ All major email providers

Perfect for a portfolio! 🚀
