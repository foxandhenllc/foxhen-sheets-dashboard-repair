# Sheets Dashboard Repair Studio

## Purpose

Google Sheets-style dashboard repair studio for formula health, source rows, chart cleanup, and handoff notes.

A portfolio-grade Google Sheets-style repair demo for a fixed-scope dashboard cleanup offer. The app is a local-only React mini product with fictional workbook data, interactive diagnosis, repair controls, and a simulated handoff.

## Demo Narrative

The sample presents a messy workbook as a repair workbench:

- Audit fictional sheet tabs with row counts, formula counts, open issues, and owner notes.
- Filter formula health by broken, risky, clean, or all formulas.
- Select a broken metric to view the symptom, recommended repair, and related source rows.
- Preview chart cleanup from noisy chart labels to a clearer repaired state.
- Toggle before/after KPI tiles to show the improvement story.
- Check off repair tasks and prepare a simulated handoff export.

## Service Mapping

- Fox & Hen offer: Google Sheets dashboard repair and handoff
- Upwork-style proof point: spreadsheet dashboard cleanup
- Live demo: https://foxhen-sheets-dashboard-repair.vercel.app
- Repository: https://github.com/foxandhenllc/foxhen-sheets-dashboard-repair

| Service moment | Demo artifact | Buyer takeaway |
| --- | --- | --- |
| Audit | Sheet tabs, owner notes, formula health filters, and issue counts | Shows where the workbook is fragile before repair. |
| Repair | Before/after formulas, broken metric diagnosis, and source rows | Connects dashboard symptoms to practical spreadsheet fixes. |
| Clarify | Chart preview and KPI toggle | Turns visual cleanup into a measurable decision story. |
| Handoff | Repair checklist, validation checks, notes, and local export state | Demonstrates a public-safe package for future maintenance. |

## Screenshot

![Sheets Dashboard Repair demo screenshot](docs/demo-screenshot.png)

## Key Interactions To Test

1. Switch workbook tabs in the dark spreadsheet preview.
2. Use the formula health filter buttons in the workbench.
3. Select each diagnosis item and inspect the source row table.
4. Toggle the chart preview between before and after states.
5. Toggle KPI tiles, complete the repair checklist, and prepare the handoff export.

## SEO / AIO Discoverability

**Plain-language answer:** Use this repo to model a spreadsheet dashboard repair engagement with formula health, source-row checks, chart cleanup, and handoff notes.

**Who it helps:** spreadsheet-heavy teams with brittle dashboards or reporting workbooks.

**Search intents covered:**

- Google Sheets dashboard repair
- formula health checker demo
- spreadsheet QA handoff
- dashboard cleanup template

**Why this repo is useful:** It shows how to connect dashboard symptoms to formula issues, source rows, chart clarity, and maintenance-ready documentation.

## Local Run

```bash
npm install --package-lock=false
npm run dev
```

## Build

```bash
npm run build
```

## Scope Note

This repository is a public sample app. It uses React, TypeScript, Vite, Tailwind, and local static data only. It does not require environment variables, accounts, payments, databases, or third-party services.

## Forking Notes

- Customize `src/data/sample.ts` for workbook tabs, formulas, issues, rows, chart notes, KPIs, and handoff content.
- Keep rows fictional or anonymized; do not publish real sheets, customer metrics, formulas tied to internal systems, screenshots, or credentials.
- Update `repo`, `liveUrl`, screenshot assets, and service copy before using a fork as a public template.
- Do not add Google APIs, OAuth, Apps Script, analytics, forms, or external data sources without changing the scope and documenting the new setup.
