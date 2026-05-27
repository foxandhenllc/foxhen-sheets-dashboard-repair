export type FormulaStatus = 'broken' | 'risky' | 'clean';
export type IssueType = 'formula' | 'source-row' | 'chart' | 'validation';
export type ChartState = 'noisy' | 'review' | 'ready';
export type ValidationStatus = 'fail' | 'warn' | 'pass';

export type SheetTab = {
  id: string;
  name: string;
  role: string;
  rows: number;
  formulas: number;
  issues: number;
  ownerNote: string;
};

export type FormulaAudit = {
  id: string;
  tabId: string;
  cell: string;
  label: string;
  status: FormulaStatus;
  severity: 'High' | 'Medium' | 'Low';
  before: string;
  after: string;
  diagnosis: string;
  repair: string;
};

export type DashboardIssue = {
  id: string;
  type: IssueType;
  title: string;
  tabId: string;
  cellRange: string;
  severity: 'High' | 'Medium' | 'Low';
  symptom: string;
  fix: string;
  sourceRows: number[];
};

export type SourceRow = {
  row: number;
  tabId: string;
  date: string;
  channel: string;
  spend: string;
  revenue: string;
  state: 'Included' | 'Excluded' | 'Needs review';
  note: string;
};

export type ChartRepair = {
  id: string;
  title: string;
  state: ChartState;
  beforeTitle: string;
  afterTitle: string;
  beforeProblems: string[];
  afterImprovements: string[];
  insight: string;
};

export type KpiRepair = {
  label: string;
  before: string;
  after: string;
  delta: string;
  explanation: string;
};

export type ValidationCheck = {
  id: string;
  label: string;
  status: ValidationStatus;
  detail: string;
};

export type HandoffNote = {
  title: string;
  body: string;
};

export type DemoData = {
  title: string;
  offer: string;
  service: string;
  tagline: string;
  repo: string;
  liveUrl: string;
  tabs: SheetTab[];
  formulas: FormulaAudit[];
  issues: DashboardIssue[];
  rows: SourceRow[];
  charts: ChartRepair[];
  kpis: KpiRepair[];
  checks: ValidationCheck[];
  notes: HandoffNote[];
  deliverables: string[];
};

export const demo: DemoData = {
  title: 'Sheets Dashboard Repair Studio',
  offer: 'Google Sheets dashboard repair and handoff',
  service: 'Fixed-scope spreadsheet cleanup',
  tagline:
    'A public-safe mini product that audits fictional workbook tabs, diagnoses broken metrics, previews chart cleanup, and packages a clear handoff.',
  repo: 'https://github.com/foxandhenllc/foxhen-sheets-dashboard-repair',
  liveUrl: 'https://freetoolsforpeople.com/sheets-dashboard-repair',
  tabs: [
    {
      id: 'overview',
      name: 'Overview',
      role: 'Executive dashboard',
      rows: 42,
      formulas: 18,
      issues: 3,
      ownerNote: 'Primary view for weekly performance decisions.',
    },
    {
      id: 'campaigns',
      name: 'Campaign Inputs',
      role: 'Source records',
      rows: 128,
      formulas: 6,
      issues: 4,
      ownerNote: 'Fictional campaign rows with mixed naming and blanks.',
    },
    {
      id: 'lookup',
      name: 'Lookup Map',
      role: 'Helper table',
      rows: 31,
      formulas: 11,
      issues: 2,
      ownerNote: 'Normalization layer for channel and region labels.',
    },
    {
      id: 'handoff',
      name: 'Handoff Notes',
      role: 'Maintenance guide',
      rows: 16,
      formulas: 0,
      issues: 0,
      ownerNote: 'Plain-language notes for future edits.',
    },
  ],
  formulas: [
    {
      id: 'f1',
      tabId: 'overview',
      cell: 'B7',
      label: 'Blended ROAS',
      status: 'broken',
      severity: 'High',
      before: '=SUM(Revenue)/SUM(Spend)',
      after: '=IFERROR(SUM(Revenue)/NULLIF(SUM(Spend),0),"Needs spend")',
      diagnosis: 'A zero-spend segment can break the headline metric.',
      repair: 'Wrap the division with a clear fallback message.',
    },
    {
      id: 'f2',
      tabId: 'overview',
      cell: 'D12',
      label: 'Weekly Forecast',
      status: 'risky',
      severity: 'Medium',
      before: '=C12*1.17',
      after: '=C12*(1+Assumptions!B4)',
      diagnosis: 'A hard-coded growth rate hides the forecast assumption.',
      repair: 'Move the assumption to a named helper cell.',
    },
    {
      id: 'f3',
      tabId: 'campaigns',
      cell: 'H:H',
      label: 'Campaign Margin',
      status: 'broken',
      severity: 'High',
      before: '=G2-F2',
      after: '=ARRAYFORMULA(IF(A2:A="","",G2:G-F2:F))',
      diagnosis: 'The formula stops after row 2, leaving new rows blank.',
      repair: 'Use a guarded array formula for the full input range.',
    },
    {
      id: 'f4',
      tabId: 'lookup',
      cell: 'C4:C34',
      label: 'Channel Family',
      status: 'clean',
      severity: 'Low',
      before: '=VLOOKUP(A4,Map!A:B,2,FALSE)',
      after: '=XLOOKUP(A4,Map!A:A,Map!B:B,"Unmapped")',
      diagnosis: 'Already repaired with an unmapped fallback.',
      repair: 'Keep the helper map visible and sorted.',
    },
    {
      id: 'f5',
      tabId: 'overview',
      cell: 'F18',
      label: 'Traffic Mix',
      status: 'risky',
      severity: 'Medium',
      before: '=B18/$B$22',
      after: '=IF($B$22=0,0,B18/$B$22)',
      diagnosis: 'The percentage can show an error during empty weeks.',
      repair: 'Add a zero-total guard for cleaner chart labels.',
    },
  ],
  issues: [
    {
      id: 'i1',
      type: 'formula',
      title: 'Headline ROAS breaks on zero spend',
      tabId: 'overview',
      cellRange: 'B7',
      severity: 'High',
      symptom: 'The main KPI can flip to an error when a channel has revenue but no spend.',
      fix: 'Add a guarded denominator and human-readable fallback.',
      sourceRows: [12, 26],
    },
    {
      id: 'i2',
      type: 'source-row',
      title: 'Two input rows use inconsistent channel names',
      tabId: 'campaigns',
      cellRange: 'B12:B26',
      severity: 'Medium',
      symptom: 'Paid Social and Social Paid split into separate chart slices.',
      fix: 'Normalize through the lookup map instead of editing old rows by hand.',
      sourceRows: [12, 26],
    },
    {
      id: 'i3',
      type: 'chart',
      title: 'Revenue chart hides the action',
      tabId: 'overview',
      cellRange: 'Chart 2',
      severity: 'Medium',
      symptom: 'The title says Revenue, the axis is crowded, and the target line is unlabeled.',
      fix: 'Rename the chart, simplify ticks, and label the target.',
      sourceRows: [8, 9, 10],
    },
    {
      id: 'i4',
      type: 'validation',
      title: 'Lookup map has one unmapped channel',
      tabId: 'lookup',
      cellRange: 'A31:C31',
      severity: 'Low',
      symptom: 'One fictional row rolls into Unmapped in the helper table.',
      fix: 'Add an explicit channel family before the next refresh.',
      sourceRows: [31],
    },
  ],
  rows: [
    {
      row: 8,
      tabId: 'campaigns',
      date: 'May 03',
      channel: 'Search',
      spend: '$820',
      revenue: '$2,460',
      state: 'Included',
      note: 'Clean naming and complete cost data.',
    },
    {
      row: 9,
      tabId: 'campaigns',
      date: 'May 04',
      channel: 'Email',
      spend: '$140',
      revenue: '$1,090',
      state: 'Included',
      note: 'Strong return, no repair needed.',
    },
    {
      row: 10,
      tabId: 'campaigns',
      date: 'May 05',
      channel: 'Organic',
      spend: '$0',
      revenue: '$880',
      state: 'Needs review',
      note: 'Zero spend should not break blended metrics.',
    },
    {
      row: 12,
      tabId: 'campaigns',
      date: 'May 07',
      channel: 'Paid Social',
      spend: '$470',
      revenue: '$1,020',
      state: 'Needs review',
      note: 'Same family as Social Paid; needs normalization.',
    },
    {
      row: 26,
      tabId: 'campaigns',
      date: 'May 14',
      channel: 'Social Paid',
      spend: '$510',
      revenue: '$1,180',
      state: 'Needs review',
      note: 'Alternate label found by the issue inspector.',
    },
    {
      row: 31,
      tabId: 'lookup',
      date: 'May 15',
      channel: 'Partner Boost',
      spend: '$300',
      revenue: '$520',
      state: 'Excluded',
      note: 'Unmapped helper value until a category is chosen.',
    },
  ],
  charts: [
    {
      id: 'c1',
      title: 'Revenue trend',
      state: 'noisy',
      beforeTitle: 'Revenue',
      afterTitle: 'Weekly revenue vs. target',
      beforeProblems: ['Crowded axis', 'Missing target label', 'Generic title'],
      afterImprovements: ['Readable 4-week ticks', 'Named target line', 'Decision-focused title'],
      insight: 'Shows whether the fictional tracker is above or below target without extra explanation.',
    },
    {
      id: 'c2',
      title: 'Channel mix',
      state: 'review',
      beforeTitle: 'Pie Chart 1',
      afterTitle: 'Spend mix by normalized channel',
      beforeProblems: ['Duplicate channel slices', 'Tiny labels', 'No helper note'],
      afterImprovements: ['Normalized labels', 'Legend on the right', 'Helper note added'],
      insight: 'Connects chart cleanup to the lookup repair.',
    },
    {
      id: 'c3',
      title: 'Margin by campaign',
      state: 'ready',
      beforeTitle: 'Margin',
      afterTitle: 'Campaign margin after formula fill',
      beforeProblems: ['Blank new rows', 'No status color', 'Unsorted campaigns'],
      afterImprovements: ['Formula fills down', 'Positive/negative colors', 'Sorted by margin'],
      insight: 'Makes the repaired formula visible as an operational chart.',
    },
  ],
  kpis: [
    {
      label: 'Formula health',
      before: '61%',
      after: '92%',
      delta: '+31 pts',
      explanation: 'High-risk formulas are isolated and rewritten with fallbacks.',
    },
    {
      label: 'Chart clarity',
      before: '4 / 10',
      after: '9 / 10',
      delta: '+5',
      explanation: 'Titles, labels, and targets now explain the dashboard intent.',
    },
    {
      label: 'Input trust',
      before: '72%',
      after: '96%',
      delta: '+24 pts',
      explanation: 'Rows with naming drift are routed through one helper map.',
    },
    {
      label: 'Handoff readiness',
      before: 'Draft',
      after: 'Ready',
      delta: 'Packaged',
      explanation: 'Repair notes, checks, and next-review guidance are bundled.',
    },
  ],
  checks: [
    {
      id: 'v1',
      label: 'No blank required fields',
      status: 'pass',
      detail: 'Required fictional input columns are populated.',
    },
    {
      id: 'v2',
      label: 'Charts point to repaired ranges',
      status: 'pass',
      detail: 'All preview charts use the cleaned ranges in this demo.',
    },
    {
      id: 'v3',
      label: 'Lookup map reviewed',
      status: 'warn',
      detail: 'One unmapped helper row remains as a visible follow-up.',
    },
    {
      id: 'v4',
      label: 'Broken formulas remaining',
      status: 'fail',
      detail: 'Two high-risk formulas are shown before checklist completion.',
    },
  ],
  notes: [
    {
      title: 'What changed',
      body: 'Repaired fragile formulas, normalized channel labels, and clarified dashboard charts.',
    },
    {
      title: 'How to maintain it',
      body: 'Add new channels to the lookup map first, then refresh the overview and review warnings.',
    },
    {
      title: 'Next review',
      body: 'Schedule a 20-minute check after the next fictional reporting cycle.',
    },
  ],
  deliverables: [
    'Formula health map',
    'Broken metric diagnosis',
    'Source row inspector',
    'Chart cleanup preview',
    'Repair checklist',
    'Handoff summary',
  ],
};
