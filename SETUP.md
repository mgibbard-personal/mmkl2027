# 🌸 Lexi & Max — Wedding Website Setup Guide

A step-by-step guide for everything you need to do to get your site live at **mmkl2027.com**.

---

## Step 1 — Personalize the content

Open `index.html` in any text editor (even Notepad works). Look for the `✏️ EDIT` comments — they mark every spot you need to update:

| What to change | Where |
|---|---|
| Your story | `#our-story` section |
| Ceremony & reception details | `.event-card` blocks |
| Venue name & address | `#venue` section |
| Google Maps embed URL | `<iframe src="...">` in the venue section |
| RSVP deadline date | "Please reply by" line |

---

## Step 2 — Add a hero photo (optional but recommended)

1. Get a nice photo of you two (landscape, at least 1920px wide).
2. Name it `hero.jpg` and place it in the `img/` folder.
3. In `css/styles.css`, find the `.hero` block and uncomment the `background-image` lines:
   ```css
   .hero {
     background: url('../img/hero.jpg') center center / cover no-repeat;
   }
   ```
4. You can also delete or comment out the `linear-gradient(...)` line above it.

---

## Step 3 — Set up RSVP collection (Google Sheets)

This lets RSVPs go straight into a Google spreadsheet you own.

### 3a. Create the spreadsheet
1. Go to [sheets.google.com](https://sheets.google.com) and create a new blank spreadsheet.
2. Name row 1 headers: `Timestamp | Name | Email | Attending | Guests | Dietary`

### 3b. Add the Apps Script
1. In your spreadsheet, click **Extensions → Apps Script**.
2. Delete any existing code and paste this:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data  = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.timestamp,
    data.name,
    data.email,
    data.attending,
    data.guests,
    data.dietary
  ]);
  return ContentService.createTextOutput('OK');
}
```

3. Click **Save** (the floppy disk icon).

### 3c. Deploy the script
1. Click **Deploy → New Deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy** → authorize it → copy the **Web app URL**.

### 3d. Paste the URL into your website
1. Open `js/main.js`.
2. Find this line near the top:
   ```js
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with the URL you copied.

---

## Step 4 — Push to GitHub

1. Go to [github.com](https://github.com) and create a **new repository**.
   - Name it anything (e.g. `wedding-website`).
   - Leave it **Public** (required for free GitHub Pages).

2. Upload your files. The simplest way as a beginner:
   - Click **Add file → Upload files**
   - Drag your entire `wedding-website` folder contents in
   - Click **Commit changes**

   Or if you have Git installed:
   ```bash
   git init
   git add .
   git commit -m "Initial wedding website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/wedding-website.git
   git push -u origin main
   ```

---

## Step 5 — Enable GitHub Pages

1. In your GitHub repository, click **Settings**.
2. Scroll to **Pages** in the left sidebar.
3. Under **Source**, select **Deploy from a branch**.
4. Set branch to **main**, folder to **/ (root)**.
5. Click **Save**.

Your site will be live at `https://YOUR-USERNAME.github.io/wedding-website` within a minute or two.

---

## Step 6 — Connect your custom domain (mmkl2027.com)

### 6a. Add the domain in GitHub
1. Still in **Settings → Pages**, find the **Custom domain** box.
2. Type `mmkl2027.com` and click **Save**.
3. GitHub will create a file called `CNAME` in your repo automatically.

### 6b. Update your domain's DNS records
Log in to wherever you bought `mmkl2027.com` (GoDaddy, Namecheap, Google Domains, etc.) and add these DNS records:

**A Records** (point the root domain to GitHub):
| Type | Name | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

**CNAME Record** (for www):
| Type | Name | Value |
|------|------|-------|
| CNAME | www | YOUR-USERNAME.github.io |

DNS can take up to 24 hours to propagate. Once it does, GitHub will automatically provision a free HTTPS certificate.

### 6c. Enable HTTPS
Back in **Settings → Pages**, check the **Enforce HTTPS** checkbox once it becomes available.

---

## Step 7 — Making updates later

Any time you want to change text or photos:
1. Edit the file on your computer.
2. Upload the changed file to GitHub (Add file → Upload files, or `git push`).
3. GitHub Pages redeploys automatically — changes are live within ~30 seconds.

---

## 📋 Quick checklist

- [ ] Personalized names, story, and dates in `index.html`
- [ ] Updated venue name, address, and map embed
- [ ] Added hero photo (optional)
- [ ] Set up Google Sheets RSVP collection
- [ ] Pasted Google Apps Script URL into `js/main.js`
- [ ] Created GitHub repository and uploaded files
- [ ] Enabled GitHub Pages
- [ ] Connected custom domain `mmkl2027.com`
- [ ] Confirmed HTTPS is active
- [ ] Tested RSVP form end-to-end

---

*Congratulations, Lexi & Max! 🎉*
