# Legal Documents Customization Checklist

**Status:** ⚠️ DRAFT TEMPLATES - Require legal review and customization

---

## What's Already Done ✅

The Privacy Policy and Terms of Service include:
- ✅ Accurate tech stack (Stripe, PostgreSQL)
- ✅ Real payment details (one-time download, e.g. $1.99)
- ✅ Actual features (QR codes, wallpaper creation)
- ✅ GDPR/CCPA compliant structure
- ✅ Industry-standard SaaS legal language
- ✅ Proper third-party service disclosures

---

## Required Customizations Before Production

### 🏢 Company Information (CRITICAL)

**Files to Update:**
- `src/app/privacy/page.tsx`
- `src/app/terms/page.tsx`

**What to Change:**

1. **Company Legal Name**
   - Current: "QR Canvas" (generic)
   - Update to: Your registered business name

2. **Business Address**
   - Current: Not specified
   - Add: Your registered business address

3. **Contact Emails**
   - Current (placeholders):
     - `privacy@qrcanvas.app`
     - `support@qrcanvas.app`
   - Update to: Your actual contact emails

4. **Governing Law/Jurisdiction**
   - Current: "United States" (generic)
   - Update to: Your specific state/country
   - Example: "State of California, United States"

---

## Detailed Customization Tasks

### Privacy Policy (`src/app/privacy/page.tsx`)

#### Section: Contact Us
```typescript
// Current (line ~290):
<a href="mailto:privacy@qrcanvas.app">
  privacy@qrcanvas.app
</a>

// Update to:
<a href="mailto:YOUR_REAL_EMAIL">
  YOUR_REAL_EMAIL
</a>
```

**Also add:**
- Physical mailing address
- Phone number (optional but recommended)
- GDPR representative contact (if applicable for EU users)

#### Section: Data Retention
```typescript
// Current:
"When you delete your account, we will delete or anonymize your 
personal data within 30 days"

// Verify:
- Is 30 days accurate for your process?
- Do you have any legal requirements for longer retention?
- Update timeframe if needed
```

#### Section: Third-Party Services
**Verify accuracy:**
- [ ] Stripe privacy policy URL is current
- [ ] Google Analytics mentioned (if you're using it)
- [ ] Any other third-party services you use are listed

---

### Terms of Service (`src/app/terms/page.tsx`)

#### Section: Contact Information
```typescript
// Current (line ~290):
<a href="mailto:support@qrcanvas.app">
  support@qrcanvas.app
</a>

// Update to:
<a href="mailto:YOUR_REAL_EMAIL">
  YOUR_REAL_EMAIL
</a>
```

#### Section: Refund Policy (Critical!)
```typescript
// Current:
"We offer a 7-day money-back guarantee for first-time subscribers."

// Verify:
- [ ] Is 7 days your actual refund window?
- [ ] Do you offer refunds at all?
- [ ] Any exceptions to refund policy?
- [ ] State-specific refund requirements?
```

#### Section: Subscription and Billing
```typescript
// Current:
"Subscriptions are billed monthly at $3.95"

// Verify:
- [ ] Price is accurate
- [ ] Billing cycle is monthly
- [ ] Cancellation process is described correctly
- [ ] Auto-renewal terms are clear
```

#### Section: Governing Law
```typescript
// Current:
"These Terms shall be governed by and construed in accordance 
with the laws of the United States"

// Update to:
"These Terms shall be governed by and construed in accordance 
with the laws of [YOUR STATE], United States"

// Add if applicable:
- Specific court jurisdiction
- Arbitration clauses
- Class action waivers (consult lawyer!)
```

---

## Legal Review Checklist

### Before Going to Production

- [ ] **Hire a lawyer** specializing in:
  - Internet/technology law
  - SaaS/subscription businesses
  - Privacy law (GDPR/CCPA)

- [ ] **Lawyer should review:**
  - [ ] Entire Privacy Policy
  - [ ] Entire Terms of Service
  - [ ] Subscription/refund terms
  - [ ] Liability limitations
  - [ ] Data handling practices
  - [ ] State-specific requirements
  - [ ] International law compliance (if serving EU/UK)

- [ ] **Verify compliance with:**
  - [ ] GDPR (if serving EU users)
  - [ ] CCPA (California users)
  - [ ] COPPA (users under 13)
  - [ ] State consumer protection laws
  - [ ] FTC guidelines for online advertising

- [ ] **Additional considerations:**
  - [ ] Do you need cookie consent banners?
  - [ ] Do you need age verification?
  - [ ] International data transfer agreements?
  - [ ] Stripe's legal requirements met?

---

## State-Specific Requirements

Depending on your jurisdiction, you may need:

### California (CCPA)
- [ ] "Do Not Sell My Personal Information" link
- [ ] California residents' rights section
- [ ] Disclosure of data categories collected

### European Union (GDPR)
- [ ] Legal basis for processing
- [ ] Data Protection Officer contact (if required)
- [ ] Right to erasure ("right to be forgotten")
- [ ] Data portability details
- [ ] EU representative (if not in EU)

### Other States
- Research specific requirements for:
  - [ ] Virginia (VCDPA)
  - [ ] Colorado (CPA)
  - [ ] Connecticut (CTDPA)
  - [ ] Utah (UCPA)

---

## Quick Customization Guide

### Step 1: Replace Placeholders (15 minutes)

Search for these in both files and replace:

```bash
# In src/app/privacy/page.tsx and src/app/terms/page.tsx

Find: "QR Canvas"
Replace with: "[Your Company Legal Name]"

Find: "privacy@qrcanvas.app"
Replace with: "your-email@yourdomain.com"

Find: "support@qrcanvas.app"
Replace with: "support@yourdomain.com"

Find: "United States" (in governing law section)
Replace with: "[Your State], United States"
```

### Step 2: Add Contact Information

Add to both Privacy Policy and Terms:

```typescript
<p className="text-slate-700 dark:text-slate-300 mb-2">
  <strong>Mailing Address:</strong><br />
  [Your Company Name]<br />
  [Street Address]<br />
  [City, State ZIP]<br />
  [Country]
</p>
<p className="text-slate-700 dark:text-slate-300 mb-2">
  <strong>Email:</strong> [your-email@domain.com]
</p>
<p className="text-slate-700 dark:text-slate-300 mb-2">
  <strong>Phone:</strong> [Your Phone Number] (optional)
</p>
```

### Step 3: Verify Policies Match Reality

Go through each section and verify:
- Refund policy matches what you actually offer
- Data retention periods are accurate
- Features listed match your actual product
- Pricing is current
- Third-party services are all listed

---

## Production Deployment Checklist

**Before removing draft warnings:**

- [ ] All placeholder text replaced with real info
- [ ] Lawyer has reviewed and approved
- [ ] Company information is accurate
- [ ] Contact emails are monitored
- [ ] Refund policy matches Stripe setup
- [ ] Data handling matches actual practices
- [ ] Third-party services list is complete
- [ ] State/country laws compliance verified

**To remove draft warnings:**

Remove these sections from both files:

```typescript
// Remove from src/app/privacy/page.tsx and src/app/terms/page.tsx:
<div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
  <p className="text-amber-800 dark:text-amber-200 font-semibold">
    ⚠️ DRAFT DOCUMENT - [...]
  </p>
</div>
```

---

## Recommended Legal Resources

### Find a Lawyer
- **LegalZoom** - Legal document review services
- **Rocket Lawyer** - Affordable legal services
- **UpCounsel** - Connect with tech lawyers
- **Local Bar Association** - Find local attorneys

### Legal Templates (for reference)
- **Termly** - Policy generator (review carefully!)
- **TermsFeed** - Policy templates
- **Iubenda** - Privacy policy generator

### Compliance Tools
- **OneTrust** - GDPR compliance platform
- **Cookiebot** - Cookie consent management
- **Termly Cookie Consent** - Cookie banner

---

## Cost Estimates

**Legal Review:**
- Basic review: $500 - $1,500
- Comprehensive review + customization: $1,500 - $3,000
- Ongoing legal counsel: $200 - $400/month

**Worth it?** Absolutely. The cost of non-compliance is much higher:
- GDPR fines: Up to €20M or 4% of revenue
- CCPA fines: Up to $7,500 per violation
- Lawsuits: Can be devastating

---

## FAQs

### Q: Can I use these as-is for my MVP?
**A:** For internal testing only. Not for public/paying users.

### Q: Do I really need a lawyer?
**A:** YES, especially if you're:
- Collecting payment information
- Storing user data
- Serving international users
- Running a business (not a hobby project)

### Q: What if I can't afford a lawyer right now?
**A:** Minimum steps:
1. Use policy generators (Termly, TermsFeed) 
2. Replace ALL placeholder info
3. Verify accuracy
4. Get legal review ASAP (before significant revenue)

### Q: How often should I update these?
**A:** 
- When you add new features
- When you add new third-party services
- When laws change
- At least annually

---

## Next Steps

1. **Immediate (for development):**
   - ✅ Keep draft warnings visible
   - ✅ Replace email placeholders with real ones
   - ✅ Test that links work

2. **Before public beta:**
   - [ ] Replace all placeholder information
   - [ ] Get basic legal review
   - [ ] Set up monitoring for contact emails

3. **Before charging customers:**
   - [ ] Complete legal review by qualified attorney
   - [ ] Verify Stripe compliance
   - [ ] Set up refund process
   - [ ] Remove draft warnings

4. **After launch:**
   - [ ] Annual legal review
   - [ ] Update when adding features
   - [ ] Monitor regulatory changes

---

**Remember:** These templates are a strong starting point, but legal documents are critical for protecting your business and your users. Invest in proper legal review before going to production.

**Status:** Draft templates requiring customization  
**Last Updated:** November 12, 2025  
**Next Action:** Schedule legal review

