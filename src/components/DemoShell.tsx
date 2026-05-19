import { useMemo, useState } from 'react';
import type {
  ChartRepair,
  ChartState,
  DashboardIssue,
  DemoData,
  FormulaStatus,
  ValidationStatus,
} from '../data/sample';

type DemoShellProps = {
  demo: DemoData;
};

type FormulaFilter = FormulaStatus | 'all';

const statusLabels: Record<FormulaFilter, string> = {
  all: 'All',
  broken: 'Broken',
  risky: 'Risky',
  clean: 'Clean',
};

const statusTone: Record<FormulaStatus, string> = {
  broken: 'border-rose-200 bg-rose-50 text-rose-700',
  risky: 'border-amber-200 bg-amber-50 text-amber-800',
  clean: 'border-emerald-200 bg-emerald-50 text-emerald-700',
};

const chartTone: Record<ChartState, string> = {
  noisy: 'bg-rose-100 text-rose-700',
  review: 'bg-amber-100 text-amber-800',
  ready: 'bg-emerald-100 text-emerald-700',
};

const checkTone: Record<ValidationStatus, string> = {
  fail: 'bg-rose-500',
  warn: 'bg-amber-400',
  pass: 'bg-emerald-500',
};

function progressPercent(total: number, complete: number) {
  return Math.round((complete / Math.max(total, 1)) * 100);
}

function severityTone(severity: DashboardIssue['severity']) {
  if (severity === 'High') return 'text-rose-700 bg-rose-50 border-rose-200';
  if (severity === 'Medium') return 'text-amber-800 bg-amber-50 border-amber-200';
  return 'text-emerald-700 bg-emerald-50 border-emerald-200';
}

function MiniBarChart({ chart, repaired }: { chart: ChartRepair; repaired: boolean }) {
  const values = repaired ? [62, 74, 68, 87, 92, 96] : [38, 82, 41, 96, 52, 68];

  return (
    <div className="rounded-[1.4rem] border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Chart preview</p>
          <h3 className="mt-1 text-lg font-black tracking-tight text-slate-950">
            {repaired ? chart.afterTitle : chart.beforeTitle}
          </h3>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-black ${chartTone[chart.state]}`}>{chart.state}</span>
      </div>

      <div className="flex h-40 items-end gap-3 rounded-2xl bg-slate-50 px-4 pb-4 pt-6">
        {values.map((value, index) => (
          <div key={`${chart.id}-${value}-${index}`} className="flex flex-1 flex-col items-center gap-2">
            <div
              className={`w-full rounded-t-xl transition-all duration-500 ${
                repaired ? 'bg-emerald-500/85' : index % 2 ? 'bg-slate-400' : 'bg-amber-500/80'
              }`}
              style={{ height: `${value}%` }}
            />
            <span className="text-[0.65rem] font-bold text-slate-400">W{index + 1}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(repaired ? chart.afterImprovements : chart.beforeProblems).map((item) => (
          <div key={item} className="rounded-2xl bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export function DemoShell({ demo }: DemoShellProps) {
  const [activeTabId, setActiveTabId] = useState(demo.tabs[0]?.id ?? '');
  const [formulaFilter, setFormulaFilter] = useState<FormulaFilter>('all');
  const [selectedIssueId, setSelectedIssueId] = useState(demo.issues[0]?.id ?? '');
  const [activeChartId, setActiveChartId] = useState(demo.charts[0]?.id ?? '');
  const [showRepairedChart, setShowRepairedChart] = useState(true);
  const [showAfterKpis, setShowAfterKpis] = useState(true);
  const [checkedRepairs, setCheckedRepairs] = useState<string[]>(['i2']);
  const [handoffState, setHandoffState] = useState<'draft' | 'exported'>('draft');

  const activeTab = demo.tabs.find((tab) => tab.id === activeTabId) ?? demo.tabs[0];
  const selectedIssue = demo.issues.find((issue) => issue.id === selectedIssueId) ?? demo.issues[0];
  const activeChart = demo.charts.find((chart) => chart.id === activeChartId) ?? demo.charts[0];
  const visibleRows = demo.rows.filter((row) => selectedIssue?.sourceRows.includes(row.row));
  const completedPercent = progressPercent(demo.issues.length, checkedRepairs.length);

  const filteredFormulas = useMemo(
    () =>
      demo.formulas.filter((formula) => {
        const matchesTab = activeTabId === formula.tabId;
        const matchesFilter = formulaFilter === 'all' || formula.status === formulaFilter;
        return matchesTab && matchesFilter;
      }),
    [activeTabId, demo.formulas, formulaFilter],
  );

  const formulaCounts = useMemo(
    () =>
      demo.formulas.reduce(
        (counts, formula) => {
          counts.all += 1;
          counts[formula.status] += 1;
          return counts;
        },
        { all: 0, broken: 0, risky: 0, clean: 0 } as Record<FormulaFilter, number>,
      ),
    [demo.formulas],
  );

  const repairedChecks = useMemo(
    () =>
      demo.checks.map((check) => {
        if (check.id === 'v4' && completedPercent === 100) {
          return { ...check, status: 'pass' as const, detail: 'All simulated repairs are checked for handoff.' };
        }

        return check;
      }),
    [completedPercent, demo.checks],
  );

  function toggleRepair(issueId: string) {
    setCheckedRepairs((current) =>
      current.includes(issueId) ? current.filter((id) => id !== issueId) : [...current, issueId],
    );
    setHandoffState('draft');
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#eef3ec] text-slate-950">
      <section className="relative px-4 py-5 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(68,116,86,0.22),transparent_32%),radial-gradient(circle_at_78%_0%,rgba(189,139,84,0.24),transparent_30%),linear-gradient(180deg,#f8fbf5_0%,#eef3ec_55%,#e7eee9_100%)]" />
        <div className="relative mx-auto max-w-7xl">
          <nav className="flex flex-wrap items-center justify-between gap-3 rounded-[1.5rem] border border-white/70 bg-white/75 px-4 py-3 shadow-sm backdrop-blur-xl">
            <a href="https://foxandhenllc.com" className="flex items-center gap-3" aria-label="Fox and Hen website">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#245840] text-sm font-black text-white shadow-lg shadow-emerald-900/10">
                F&H
              </span>
              <span>
                <span className="block text-sm font-black tracking-tight">Fox & Hen</span>
                <span className="block text-xs font-semibold text-slate-500">Public workbook repair demo</span>
              </span>
            </a>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
              <a className="rounded-full px-3 py-2 hover:bg-slate-100" href="#workbench">
                Workbench
              </a>
              <a className="rounded-full px-3 py-2 hover:bg-slate-100" href="#handoff">
                Handoff
              </a>
              <a className="hidden rounded-full bg-slate-950 px-4 py-2 font-black !text-white shadow-sm ring-1 ring-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800 sm:inline-flex" href={demo.repo}>
                Repository
              </a>
            </div>
          </nav>

          <div className="grid gap-8 py-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:py-14">
            <div>
              <h1 className="max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.06em] text-slate-950 sm:text-7xl">
                {demo.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">{demo.tagline}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {demo.kpis.slice(0, 2).map((kpi) => (
                  <div key={kpi.label} className="rounded-[1.4rem] border border-white/80 bg-white/70 p-4 shadow-sm backdrop-blur">
                    <p className="text-sm font-bold text-slate-500">{kpi.label}</p>
                    <div className="mt-3 flex items-end gap-2">
                      <span className="text-3xl font-black tracking-tight text-slate-950">{kpi.after}</span>
                      <span className="mb-1 rounded-full bg-emerald-100 px-2 py-1 text-xs font-black text-emerald-700">
                        {kpi.delta}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-900/10 bg-slate-950 p-3 shadow-2xl shadow-emerald-950/15">
              <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0e1512] text-white">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-rose-400" />
                    <span className="h-3 w-3 rounded-full bg-amber-300" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">Local sample workbook</span>
                </div>
                <div className="grid lg:grid-cols-[14rem_1fr]">
                  <aside className="border-b border-white/10 bg-white/[0.03] p-4 lg:border-b-0 lg:border-r">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-white/40">Sheet tabs</p>
                    <div className="mt-4 space-y-2">
                      {demo.tabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTabId(tab.id)}
                          className={`w-full rounded-2xl px-3 py-3 text-left transition ${
                            activeTabId === tab.id ? 'bg-white text-slate-950' : 'bg-white/5 text-white/70 hover:bg-white/10'
                          }`}
                        >
                          <span className="block text-sm font-black">{tab.name}</span>
                          <span className="mt-1 block text-xs opacity-70">{tab.issues} open issues</span>
                        </button>
                      ))}
                    </div>
                  </aside>
                  <div className="p-4">
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl bg-white/[0.06] p-4">
                        <p className="text-xs text-white/45">Rows</p>
                        <p className="mt-2 text-2xl font-black">{activeTab.rows}</p>
                      </div>
                      <div className="rounded-2xl bg-white/[0.06] p-4">
                        <p className="text-xs text-white/45">Formulas</p>
                        <p className="mt-2 text-2xl font-black">{activeTab.formulas}</p>
                      </div>
                      <div className="rounded-2xl bg-white/[0.06] p-4">
                        <p className="text-xs text-white/45">Role</p>
                        <p className="mt-2 text-sm font-black">{activeTab.role}</p>
                      </div>
                    </div>
                    <div className="mt-4 rounded-2xl bg-white p-4 text-slate-950">
                      <div className="mb-3 flex items-center justify-between">
                        <h2 className="text-base font-black">Formula health map</h2>
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
                          {formulaCounts.clean}/{formulaCounts.all} clean
                        </span>
                      </div>
                      <div className="space-y-2">
                        {demo.formulas.slice(0, 4).map((formula) => (
                          <div key={formula.id} className="grid grid-cols-[4rem_1fr_auto] items-center gap-2 rounded-xl bg-slate-50 px-3 py-2">
                            <span className="font-mono text-xs font-bold text-slate-500">{formula.cell}</span>
                            <span className="truncate text-sm font-bold">{formula.label}</span>
                            <span className={`rounded-full border px-2 py-1 text-[0.65rem] font-black ${statusTone[formula.status]}`}>
                              {formula.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="workbench" className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-700">Repair workbench</p>
              <h2 className="mt-2 text-4xl font-black tracking-[-0.045em] text-slate-950">Diagnose, repair, and package the workbook.</h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-600">
              Every control updates local React state only. The sample data is fictional, static, and designed to show the service workflow clearly.
            </p>
          </div>

          <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[2rem] border border-slate-200 bg-white/80 p-4 shadow-xl shadow-slate-900/5 backdrop-blur">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-black">Formula health filters</h3>
                  <p className="mt-1 text-sm text-slate-500">Filter by status and inspect the repaired formula language.</p>
                </div>
                <div className="flex rounded-full bg-slate-100 p-1">
                  {(Object.keys(statusLabels) as FormulaFilter[]).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setFormulaFilter(filter)}
                      className={`rounded-full px-3 py-2 text-xs font-black transition ${
                        formulaFilter === filter ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-600 hover:bg-white'
                      }`}
                    >
                      {statusLabels[filter]} {formulaCounts[filter]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                {filteredFormulas.length > 0 ? (
                  filteredFormulas.map((formula) => (
                    <article key={formula.id} className="rounded-[1.4rem] border border-slate-200 bg-white p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <span className="rounded-xl bg-slate-100 px-3 py-2 font-mono text-xs font-black text-slate-600">
                            {formula.cell}
                          </span>
                          <div>
                            <h4 className="font-black">{formula.label}</h4>
                            <p className="text-xs font-bold text-slate-400">{formula.severity} severity</p>
                          </div>
                        </div>
                        <span className={`rounded-full border px-3 py-1 text-xs font-black ${statusTone[formula.status]}`}>
                          {formula.status}
                        </span>
                      </div>
                      <div className="mt-4 grid gap-3 lg:grid-cols-2">
                        <div className="rounded-2xl bg-rose-50 p-3">
                          <p className="text-xs font-black uppercase tracking-[0.14em] text-rose-500">Before</p>
                          <p className="mt-2 font-mono text-xs text-rose-950">{formula.before}</p>
                        </div>
                        <div className="rounded-2xl bg-emerald-50 p-3">
                          <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-600">After</p>
                          <p className="mt-2 font-mono text-xs text-emerald-950">{formula.after}</p>
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        <strong className="text-slate-950">Diagnosis:</strong> {formula.diagnosis} {formula.repair}
                      </p>
                    </article>
                  ))
                ) : (
                  <div className="rounded-[1.4rem] border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                    <p className="font-black text-slate-700">No formulas match this tab and filter.</p>
                    <p className="mt-2 text-sm text-slate-500">Try another tab or status to continue the inspection.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white/80 p-4 shadow-xl shadow-slate-900/5 backdrop-blur">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black">Broken metric diagnosis</h3>
                  <p className="mt-1 text-sm text-slate-500">Select an issue to see symptoms, fixes, and source rows.</p>
                </div>
                <span className={`rounded-full border px-3 py-1 text-xs font-black ${severityTone(selectedIssue.severity)}`}>
                  {selectedIssue.severity}
                </span>
              </div>

              <div className="mt-5 grid gap-2">
                {demo.issues.map((issue) => (
                  <button
                    key={issue.id}
                    onClick={() => setSelectedIssueId(issue.id)}
                    className={`rounded-2xl border p-3 text-left transition ${
                      selectedIssueId === issue.id ? 'border-slate-950 bg-slate-950 text-white' : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <span className="text-sm font-black">{issue.title}</span>
                    <span className={`mt-2 block text-xs ${selectedIssueId === issue.id ? 'text-white/60' : 'text-slate-500'}`}>
                      {issue.cellRange} · {issue.type}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-5 rounded-[1.4rem] bg-slate-50 p-4">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">Symptom</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{selectedIssue.symptom}</p>
                <p className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-slate-400">Recommended repair</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{selectedIssue.fix}</p>
              </div>

              <div className="mt-5 overflow-hidden rounded-[1.4rem] border border-slate-200">
                <div className="grid grid-cols-[4rem_1fr_5rem_5rem] bg-slate-100 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                  <span>Row</span>
                  <span>Channel</span>
                  <span>Spend</span>
                  <span>State</span>
                </div>
                {visibleRows.map((row) => (
                  <div key={row.row} className="grid grid-cols-[4rem_1fr_5rem_5rem] items-center border-t border-slate-200 bg-white px-3 py-3 text-sm">
                    <span className="font-mono font-bold text-slate-500">{row.row}</span>
                    <span>
                      <span className="block font-black">{row.channel}</span>
                      <span className="block text-xs text-slate-500">{row.note}</span>
                    </span>
                    <span className="font-bold">{row.spend}</span>
                    <span className="text-xs font-black text-slate-500">{row.state}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[2rem] border border-slate-200 bg-white/80 p-4 shadow-xl shadow-slate-900/5 backdrop-blur">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-black">Chart cleanup preview</h3>
                  <p className="mt-1 text-sm text-slate-500">Toggle the mocked chart from noisy to repaired.</p>
                </div>
                <button
                  onClick={() => setShowRepairedChart((current) => !current)}
                  className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-black text-white shadow-lg shadow-emerald-900/10"
                >
                  {showRepairedChart ? 'Show before' : 'Show after'}
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {demo.charts.map((chart) => (
                  <button
                    key={chart.id}
                    onClick={() => setActiveChartId(chart.id)}
                    className={`rounded-full px-3 py-2 text-xs font-black transition ${
                      activeChartId === chart.id ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-600 hover:bg-white'
                    }`}
                  >
                    {chart.title}
                  </button>
                ))}
              </div>
              <div className="mt-4">
                <MiniBarChart chart={activeChart} repaired={showRepairedChart} />
              </div>
              <p className="mt-4 rounded-2xl bg-emerald-50 p-3 text-sm font-semibold leading-6 text-emerald-900">
                {activeChart.insight}
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white/80 p-4 shadow-xl shadow-slate-900/5 backdrop-blur">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-black">Before / after KPI tiles</h3>
                  <p className="mt-1 text-sm text-slate-500">Switch the summary view to show the measurable repair story.</p>
                </div>
                <button
                  onClick={() => setShowAfterKpis((current) => !current)}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm"
                >
                  Viewing {showAfterKpis ? 'after' : 'before'}
                </button>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {demo.kpis.map((kpi) => (
                  <div key={kpi.label} className="rounded-[1.4rem] border border-slate-200 bg-white p-4">
                    <p className="text-sm font-black text-slate-500">{kpi.label}</p>
                    <div className="mt-3 flex items-end justify-between gap-3">
                      <span className="text-3xl font-black tracking-tight">{showAfterKpis ? kpi.after : kpi.before}</span>
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">{kpi.delta}</span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{kpi.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="handoff" className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white/80 p-5 shadow-xl shadow-slate-900/5 backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black">Repair checklist</h3>
                <p className="mt-1 text-sm text-slate-500">{completedPercent}% simulated completion</p>
              </div>
              <div className="h-14 w-14 rounded-full bg-slate-100 p-1">
                <div className="grid h-full w-full place-items-center rounded-full bg-white text-sm font-black text-slate-950">{completedPercent}%</div>
              </div>
            </div>
            <div className="mt-4 h-2 rounded-full bg-slate-100">
              <div className="h-2 rounded-full bg-emerald-500 transition-all duration-500" style={{ width: `${completedPercent}%` }} />
            </div>
            <div className="mt-5 space-y-3">
              {demo.issues.map((issue) => {
                const checked = checkedRepairs.includes(issue.id);
                return (
                  <button
                    key={issue.id}
                    onClick={() => toggleRepair(issue.id)}
                    className={`flex w-full items-start gap-3 rounded-[1.2rem] border p-4 text-left transition ${
                      checked ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-black ${checked ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                      {checked ? '✓' : ''}
                    </span>
                    <span>
                      <span className="block font-black">{issue.title}</span>
                      <span className="mt-1 block text-sm leading-6 text-slate-600">{issue.fix}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-900/10 bg-slate-950 p-5 text-white shadow-2xl shadow-emerald-950/10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Simulated handoff</p>
                <h3 className="mt-2 text-2xl font-black tracking-tight">{demo.offer}</h3>
              </div>
              <button
                onClick={() => setHandoffState('exported')}
                className="rounded-full bg-white px-4 py-2 text-sm font-black text-slate-950"
              >
                {handoffState === 'exported' ? 'Export prepared' : 'Prepare export'}
              </button>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {repairedChecks.map((check) => (
                <div key={check.id} className="rounded-[1.2rem] border border-white/10 bg-white/[0.06] p-4">
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${checkTone[check.status]}`} />
                    <h4 className="font-black">{check.label}</h4>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-white/60">{check.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-[1.4rem] border border-white/10 bg-white/[0.06] p-4">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="font-black">Handoff notes</h4>
                <span className={`rounded-full px-3 py-1 text-xs font-black ${handoffState === 'exported' ? 'bg-emerald-300 text-emerald-950' : 'bg-amber-300 text-amber-950'}`}>
                  {handoffState}
                </span>
              </div>
              <div className="grid gap-3">
                {demo.notes.map((note) => (
                  <div key={note.title} className="rounded-2xl bg-white/[0.06] p-3">
                    <p className="font-black">{note.title}</p>
                    <p className="mt-1 text-sm leading-6 text-white/60">{note.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {demo.deliverables.map((item) => (
                <span key={item} className="rounded-full bg-white/10 px-3 py-2 text-xs font-black text-white/75">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
