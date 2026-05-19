export type Metric = readonly [label: string, value: string, note: string];

export type WorkCard = {
  title: string;
  stage: string;
  detail: string;
  health: number;
};

export type DemoSection = readonly [title: string, body: string];

export type DemoData = {
  title: string;
  offer: string;
  service: string;
  tagline: string;
  demoLabel: string;
  accent: string;
  warm: string;
  bg: string;
  repo: string;
  liveUrl: string;
  metrics: Metric[];
  pipeline: string[];
  cards: WorkCard[];
  sections: DemoSection[];
  deliverables: string[];
};

export const demo: DemoData = {
  "title": "Sheets Dashboard Repair",
  "offer": "Google Sheets dashboard repair and handoff",
  "service": "Spreadsheet dashboard cleanup",
  "tagline": "Repair a noisy spreadsheet dashboard with cleaner formulas, clearer chart status, and maintainable notes.",
  "demoLabel": "Sheets repair demo",
  "accent": "#2f6247",
  "warm": "#bd8b54",
  "bg": "#f6f4e9",
  "repo": "https://github.com/foxandhenllc/foxhen-sheets-dashboard-repair",
  "liveUrl": "https://foxhen-sheets-dashboard-repair.vercel.app",
  "metrics": [
    [
      "Formula issues",
      "9 → 2",
      "Fragile references are isolated"
    ],
    [
      "Readable charts",
      "3 → 7",
      "Key outputs now explain themselves"
    ],
    [
      "Handoff clarity",
      "92%",
      "Owners can maintain the tracker"
    ]
  ],
  "pipeline": [
    "Workbook reviewed",
    "Formula risks flagged",
    "Charts cleaned",
    "Notes delivered"
  ],
  "cards": [
    {
      "title": "Broken lookup chain",
      "stage": "Formula",
      "detail": "A mocked lookup dependency is marked and simplified.",
      "health": 55
    },
    {
      "title": "Chart label cleanup",
      "stage": "Dashboard",
      "detail": "Ambiguous chart labels become action-oriented headings.",
      "health": 88
    },
    {
      "title": "Maintenance notes",
      "stage": "Handoff",
      "detail": "The repaired view includes owner notes and next review date.",
      "health": 95
    }
  ],
  "sections": [
    [
      "Inspect the workbook",
      "Review tabs, formulas, chart intent, and the target output."
    ],
    [
      "Repair the dashboard",
      "Clean one focused formula, chart, layout, or data-view issue."
    ],
    [
      "Document ownership",
      "Leave notes that make the spreadsheet easier to maintain."
    ]
  ],
  "deliverables": [
    "Formula health map",
    "Dashboard cleanup",
    "Maintenance notes"
  ]
};
