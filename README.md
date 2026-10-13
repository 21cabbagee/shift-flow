# ShiftFlow — Gig-Worker Embedded Payout-Deducted Fintech

[![License: MIT](https://img.shields.io/badge/License-MIT-orange.svg)](https://opensource.org/licenses/MIT)
[![Deploy to GitHub Pages](https://github.com/21cabbagee/shift-flow/actions/workflows/deploy.yml/badge.svg)](https://github.com/21cabbagee/shift-flow/actions/workflows/deploy.yml)

> **Closed-loop micro-credit, fuel advances, and daily income-protection insurance underwritten and deducted directly from rideshare and delivery platform earnings.**

---

## 1. Executive Summary & Problem Thesis
- **System Name:** ShiftFlow
- **Market Sizing (TAM):** 12,000,000 full-time gig workers in Southeast Asia, Africa, and LatAm × $20/month blended fintech margin = **$2.88 Billion TAM**.
- **The Problem:** Gig couriers and rideshare drivers across emerging markets (Grab, Bolt, Yassir, GoTo) are unbanked or underbanked. Standalone consumer fintechs attempt open-banking lending and suffer 25%+ non-performing loan (NPL) rates because drivers withdraw cash and default. Meanwhile, a broken tyre or empty gas tank halts driver livelihood completely, driving them to predatory street lenders charging 20% weekly interest.
- **The Solution:** Embedded micro-credit ($15–$65) capped at 30% of trailing earnings and repaid painlessly through automated 15% deductions from daily platform trips. Bundled with $1/day micro-insurance takaful providing hospital cash and repair subsidies. Default rates plummet below 1.2%.

---

## 2. Technical Architecture & Agent Build Stack
- **Frontend:** React 18, Vite, TailwindCSS, Lucide Icons.
- **Engine Architecture:**
  1. **Capacity Underwriter:** Algorithmic scoring evaluating trailing 7-day driver gross revenue and completion ratios.
  2. **15% Closed-Loop Splitter:** Automated webhook interceptor deducting 15% from trip gross fares before mobile wallet payout.
  3. **Daily Takaful Protection:** Shift-based micro-insurance model auto-deducting $1/working day for emergency hospitalization cash.
  4. **Payment Rails:** Integrations with Flutterwave (Nigeria), Xendit (Indonesia), and Mercado Pago (Mexico).

---

## 3. SEO & Canonical Setup
- **H1:** `Embedded Fintech for Gig Workers: Closed-Loop Micro-Credit & Daily Protection`
- **Canonical Slug:** `/solutions/gig-worker-embedded-fintech`
- **Keywords:** `gig worker fintech lending platform`, `rideshare driver fuel advance micro credit`, `embedded insurance for delivery couriers`, `source deducted driver lending api`

---

## 4. Local Development
```bash
npm install
npm run dev
# Or preview production bundle:
npm run build
python3 -m http.server 8122 --directory dist
```
Navigate to `http://localhost:8122`.
