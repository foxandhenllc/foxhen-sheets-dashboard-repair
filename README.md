# Sheets Dashboard Repair Studio

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

## Screenshot

![Sheets Dashboard Repair demo screenshot](docs/demo-screenshot.png)

## Key Interactions To Test

1. Switch workbook tabs in the dark spreadsheet preview.
2. Use the formula health filter buttons in the workbench.
3. Select each diagnosis item and inspect the source row table.
4. Toggle the chart preview between before and after states.
5. Toggle KPI tiles, complete the repair checklist, and prepare the handoff export.

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
