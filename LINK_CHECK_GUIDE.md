# Link Verification Checklist

## 🔗 All Links to Test

### **Header Navigation (Desktop & Mobile)**
- [ ] Logo → Home page (/)
- [ ] Work → #projects section
- [ ] Services → #services section
- [ ] Approach → #approach section
- [ ] Founder → #about section
- [ ] Plans → #plans section
- [ ] Reviews → #reviews section
- [ ] "Get in Touch" button → #contact section

### **Mobile Drawer Menu**
- [ ] Work → #projects
- [ ] Services → #services
- [ ] Approach → #approach
- [ ] Founder → #about
- [ ] Plans → #plans
- [ ] Reviews → #reviews
- [ ] Contact → #contact
- [ ] "Get in Touch" button → #contact
- [ ] Theme toggle works

### **Hero Section**
- [ ] "Start a Project" button → #contact
- [ ] "View My Work" button → #projects

### **Featured Projects Section**
Each project card should have:
- [ ] Project title → /work/[project-id]
- [ ] "View Case Study" → /work/[project-id]
- [ ] "Live Site" (if available) → External URL
- [ ] "View All Projects" → /work

**Project IDs to test:**
1. `/work/varasiddi-function-hall` (Live: https://varasiddi.netlify.app/)
2. `/work/hr-analytics-excel-dashboard` (GitHub only)
3. `/work/hr-analytics-sql` (GitHub only)
4. `/work/my-trading-bot` (GitHub only)
5. `/work/trading-indicator` (GitHub only)

### **Plans Section**
- [ ] Basic plan "Get Started" → /contact?plan=basic
- [ ] Medium plan "Get Started" → /contact?plan=medium
- [ ] High plan "Get Started" → /contact?plan=high

### **Contact/Enquiry Section**
- [ ] WhatsApp link → https://wa.me/917670860094?text=Hi%2C%20I%20need%20to%20connect%20with%20you.
- [ ] GitHub link → https://github.com/kovvurujavidh

### **Footer**
**Navigation Links:**
- [ ] Projects → #projects
- [ ] Services → #services
- [ ] Approach → #approach
- [ ] Founder → #about
- [ ] Reviews → #reviews
- [ ] Contact → #contact

**Connect Links:**
- [ ] GitHub → https://github.com/kovvurujavidh (opens in new tab)
- [ ] WhatsApp → https://wa.me/917670860094 (opens in new tab)

**CTA:**
- [ ] "Start a Project" button → #contact

### **/work Page (All Projects)**
- [ ] Back to Home → /
- [ ] Each project card title → /work/[id]
- [ ] "Explore Case Study" → /work/[id]

### **/work/[id] Page (Individual Project)**
- [ ] Back arrow → /#projects
- [ ] "Live Site" button (if liveUrl exists) → External URL (new tab)
- [ ] "View on GitHub" button (if githubUrl exists) → GitHub (new tab)
- [ ] Next project card → /work/[next-project-id]

### **/contact Page**
- [ ] Back arrow → /#plans
- [ ] "Change plan" link → /#plans
- [ ] WhatsApp link → https://wa.me/917670860094
- [ ] GitHub link → https://github.com/kovvurujavidh

### **404 Not Found Page**
- [ ] "Go Home" button → /

---

## 🧪 How to Test

### Step 1: Start the Development Server
```bash
npm run dev
```

### Step 2: Open in Browser
Visit: `http://localhost:3000`

### Step 3: Test Each Section

#### **Home Page Tests**
1. **Header Navigation:**
   - Click each nav link and verify smooth scroll to section
   - Open mobile menu (resize to <860px) and test all links
   - Verify drawer closes after clicking a link

2. **Hero Section:**
   - Click "Start a Project" → should scroll to contact form
   - Click "View My Work" → should scroll to projects

3. **Projects Section:**
   - Click on each project card title → should go to /work/[id]
   - Click "View Case Study" → should go to /work/[id]
   - Click "Live Site" (Varasiddi only) → opens https://varasiddi.netlify.app/
   - Click "View All Projects" → goes to /work

4. **Services Section:**
   - No links to test here (informational only)

5. **Plans Section:**
   - Click "Get Started" on Basic → goes to /contact?plan=basic
   - Click "Get Started" on Medium → goes to /contact?plan=medium
   - Click "Get Started" on High → goes to /contact?plan=high
   - Verify plan is pre-selected in contact form

6. **Reviews Section:**
   - Submit a test review (form validation)
   - Verify reviews display after submission

7. **Contact Section:**
   - Click WhatsApp icon → opens WhatsApp chat
   - Click GitHub icon → opens GitHub profile in new tab
   - Submit contact form (test validation)

8. **Footer:**
   - Test all navigation links (same as header)
   - Test GitHub link (new tab)
   - Test WhatsApp link (new tab)
   - Click "Start a Project" → scrolls to contact

#### **/work Page Tests**
1. Navigate to `http://localhost:3000/work`
2. Click "← Back to Home" → returns to home page
3. Click each project card → goes to individual project page
4. Verify all 5 projects are displayed

#### **/work/[id] Page Tests**
Test each project individually:
1. `http://localhost:3000/work/varasiddi-function-hall`
   - Click back arrow → goes to /#projects
   - Click "Live Site" → opens https://varasiddi.netlify.app/ (new tab)
   - Scroll down to "Next Project" card → click → goes to next project

2. `http://localhost:3000/work/hr-analytics-excel-dashboard`
   - Click back arrow → goes to /#projects
   - Click "View on GitHub" → opens GitHub repo (new tab)
   - Test next project card

3. `http://localhost:3000/work/hr-analytics-sql`
   - Same tests as above

4. `http://localhost:3000/work/my-trading-bot`
   - Same tests as above

5. `http://localhost:3000/work/trading-indicator`
   - Same tests as above

#### **/contact Page Tests**
1. Navigate to `http://localhost:3000/contact`
2. Click back arrow → goes to /#plans
3. If URL has `?plan=basic` → verify "Basic" is selected
4. Click "Change plan" → goes to /#plans
5. Test WhatsApp and GitHub links
6. Submit the form (test validation)

#### **404 Page Test**
1. Navigate to `http://localhost:3000/invalid-page`
2. Verify 404 page shows
3. Click "Go Home" → returns to home page

---

## 🎯 Anchor Links (Smooth Scroll)

These should smoothly scroll to their sections:
- `#projects` → Featured Projects section
- `#services` → Services section
- `#approach` → How It Works section
- `#about` → About/Founder section
- `#plans` → Plans section
- `#reviews` → Reviews section
- `#contact` → Contact/Enquiry section

---

## 🌐 External Links

**GitHub:**
- https://github.com/kovvurujavidh (should open in new tab)
- https://github.com/kovvurujavidh/HR-Analytics-Excel-Dashboard
- https://github.com/kovvurujavidh/HR-Analytics-SQL
- https://github.com/kovvurujavidh/MyTradingBot
- https://github.com/kovvurujavidh/Trading-Indicator

**WhatsApp:**
- https://wa.me/917670860094?text=Hi%2C%20I%20need%20to%20connect%20with%20you.

**Live Sites:**
- https://varasiddi.netlify.app/ (Varasiddi Function Hall)

---

## 📱 Mobile-Specific Tests

### Test on Mobile Viewport (375px width)
1. Open Chrome DevTools (F12)
2. Click "Toggle device toolbar" (Ctrl+Shift+M)
3. Select "iPhone SE" or set to 375px width
4. Test all the above links again

**Mobile-Specific Checks:**
- [ ] Burger menu opens/closes smoothly
- [ ] Drawer links work correctly
- [ ] Drawer closes after clicking a link
- [ ] All buttons are easily tappable (48px height)
- [ ] No horizontal scroll on any page

---

## ✅ Expected Results

### Internal Links (Anchor)
- Smooth scroll to section
- URL updates with #section-id
- Header remains visible

### Internal Links (Pages)
- Page loads without refresh (client-side navigation)
- Loading indicator shows briefly
- URL updates correctly

### External Links
- Opens in new tab (`target="_blank"`)
- Has `rel="noopener noreferrer"` for security
- Original tab stays on your site

---

## 🚨 Common Issues to Watch For

1. **Broken anchor links:** Section IDs must match exactly
2. **404 on project pages:** Project ID must exist in `projects.ts`
3. **WhatsApp not opening:** Check phone number format
4. **GitHub 404:** Verify repository exists and is public
5. **Mobile drawer not closing:** onClick handler must call `close()`
6. **Query params not working:** Check `/contact` page URLSearchParams
7. **Smooth scroll not working:** Verify `scroll-behavior: smooth` in CSS

---

## 📊 Testing Summary Template

```
✅ Header navigation: [PASS/FAIL]
✅ Mobile drawer: [PASS/FAIL]
✅ Hero CTAs: [PASS/FAIL]
✅ Project cards: [PASS/FAIL]
✅ Plans CTAs: [PASS/FAIL]
✅ Contact links: [PASS/FAIL]
✅ Footer links: [PASS/FAIL]
✅ /work page: [PASS/FAIL]
✅ /work/[id] pages: [PASS/FAIL]
✅ /contact page: [PASS/FAIL]
✅ 404 page: [PASS/FAIL]
✅ External links: [PASS/FAIL]
✅ Mobile drawer: [PASS/FAIL]
```

---

## 🎉 Ready to Test!

Run this command and start testing:
```bash
npm run dev
```

Then open: **http://localhost:3000**

Work through each section systematically and check off the items above!
