# EmailJS Gmail Setup Guide

## Steps to Configure EmailJS for Gmail

### 1. Create EmailJS Account
- Go to https://www.emailjs.com/
- Sign up with your email

### 2. Add Gmail Service
- In EmailJS dashboard, go to **Email Services**
- Click **Add New Service**
- Select **Gmail**
- Connect your Gmail account (the one you want to receive emails)
- Name it something like `gmail_service`
- Copy the **Service ID** (you'll need this)

### 3. Create Email Template
- Go to **Email Templates**
- Click **Create New Template**
- Use the following template:

```
Subject: رسالة جديدة من {{from_name}}

رسالة من الموقع:
الاسم: {{from_name}}
البريد الإلكتروني: {{from_email}}

الرسالة:
{{message}}
```

- Variable names: `from_name`, `from_email`, `message`, `to_email`
- Copy the **Template ID** (you'll need this)

### 4. Get Your Public Key
- In EmailJS dashboard, go to **Account** (top right)
- Copy your **Public Key**

### 5. Create `.env.local` in Frontend
Create `/frontend/.env.local` with:
```
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=gmail_service
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_API_URL=http://localhost:5001/api
```

### 6. Free Plan Limits
- EmailJS free plan: **200 emails/month**
- Perfect for a contact form

### 7. Test the Form
- Go to Contact page
- Submit a test message
- Check your Gmail inbox (midomostafa1901650@gmail.com)

## Notes
- The email recipient is hardcoded as `midomostafa1901650@gmail.com`
- Emails are sent directly from the frontend (no backend needed)
- No database storage of messages
