import type { DemoData } from '../data/sample';

type DemoShellProps = {
  demo: DemoData;
};

function scoreTone(score: number) {
  if (score >= 90) return 'text-emerald-950 bg-emerald-100 border-emerald-200';
  if (score >= 75) return 'text-lime-950 bg-lime-100 border-lime-200';
  if (score >= 60) return 'text-amber-950 bg-amber-100 border-amber-200';
  return 'text-rose-950 bg-rose-100 border-rose-200';
}

export function DemoShell({ demo }: DemoShellProps) {
  return (
    <main className="min-h-screen overflow-hidden" style={{ background: demo.bg }}>
      <section className="relative px-6 py-8 sm:px-10 lg:px-16">
        <div className="absolute left-[-10rem] top-[-14rem] h-[28rem] w-[28rem] rounded-full bg-white/60 blur-3xl" />
        <div className="absolute right-[-14rem] top-24 h-[34rem] w-[34rem] rounded-full opacity-30 blur-3xl" style={{ background: demo.accent }} />

        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between rounded-full border border-black/10 bg-white/65 px-5 py-3 shadow-sm backdrop-blur">
          <a href="https://foxandhenllc.com" className="flex items-center gap-3" aria-label="Fox & Hen website">
            <span className="grid h-10 w-10 place-items-center rounded-full text-sm font-black text-white" style={{ background: demo.accent }}>F&H</span>
            <span>
              <span className="block text-sm font-black tracking-tight text-stone-950">Fox & Hen</span>
              <span className="block text-xs text-stone-600">Public sample app</span>
            </span>
          </a>
          <div className="hidden items-center gap-2 text-sm text-stone-700 md:flex">
            <a className="rounded-full px-3 py-2 hover:bg-white" href="#workflow">Workflow</a>
            <a className="rounded-full px-3 py-2 hover:bg-white" href="#handoff">Handoff</a>
            <a className="rounded-full px-3 py-2 hover:bg-white" href={demo.repo}>Repository</a>
          </div>
        </nav>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 pb-16 pt-14 lg:grid-cols-[1fr_0.92fr] lg:items-center">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-semibold text-stone-700 shadow-sm">{demo.demoLabel}</p>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.94] tracking-[-0.055em] text-stone-950 sm:text-7xl">{demo.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-700 sm:text-xl">{demo.tagline}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#workflow" className="rounded-full px-6 py-3 text-center text-sm font-black text-white shadow-lg shadow-black/10" style={{ background: demo.accent }}>View the sample flow</a>
              <a href={demo.repo} className="rounded-full border border-black/10 bg-white/75 px-6 py-3 text-center text-sm font-black text-stone-900 shadow-sm">Open the repo</a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/10 bg-white/75 p-4 shadow-2xl shadow-black/10 backdrop-blur">
            <div className="rounded-[1.5rem] border border-black/10 bg-stone-950 p-4 text-white">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-white/45">Offer mapped</p>
                  <h2 className="mt-1 text-xl font-black">{demo.service}</h2>
                </div>
                <span className="rounded-full px-3 py-1 text-xs font-bold text-stone-950" style={{ background: demo.warm }}>Public-safe</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {demo.metrics.map(([label, value, note]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/8 p-4">
                    <p className="text-sm text-white/55">{label}</p>
                    <p className="mt-3 text-3xl font-black tracking-tight">{value}</p>
                    <p className="mt-2 text-sm leading-5 text-white/60">{note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="workflow" className="px-6 pb-10 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-black/10 bg-white/72 p-5 shadow-xl shadow-black/5 backdrop-blur lg:p-8">
          <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-stone-500">Workflow</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-stone-950 sm:text-4xl">A scoped sample of the buyer experience</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-stone-600">This demo uses fictional rows and local state only. It shows the structure Fox & Hen uses to make a small project legible, scoped, and ready for handoff.</p>
          </div>

          <div className="grid gap-4 lg:grid-cols-4">
            {demo.pipeline.map((step, index) => (
              <div key={step} className="rounded-3xl border border-black/10 bg-stone-50 p-5">
                <span className="grid h-9 w-9 place-items-center rounded-full text-sm font-black text-white" style={{ background: index === demo.pipeline.length - 1 ? demo.warm : demo.accent }}>{index + 1}</span>
                <p className="mt-5 text-lg font-black text-stone-950">{step}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {demo.cards.map((card) => (
              <article key={card.title} className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-stone-600">{card.stage}</span>
                  <span className={
                    'rounded-full border px-3 py-1 text-xs font-black ' + scoreTone(card.health)
                  }>{card.health}%</span>
                </div>
                <h3 className="mt-5 text-xl font-black tracking-tight text-stone-950">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-600">{card.detail}</p>
                <div className="mt-5 h-2 rounded-full bg-stone-100">
                  <div className="h-2 rounded-full" style={{ width: card.health + '%', background: card.health >= 90 ? demo.accent : demo.warm }} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="handoff" className="px-6 pb-16 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-black/10 bg-stone-950 p-7 text-white shadow-xl shadow-black/10">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/45">Service mapping</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">{demo.offer}</h2>
            <p className="mt-5 text-sm leading-7 text-white/65">Built as a generic public sample for a fixed-scope service. All rows, metrics, and outputs are invented for demonstration.</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {demo.deliverables.map((item) => (
                <span key={item} className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white/85">{item}</span>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/10 bg-white/75 p-7 shadow-xl shadow-black/5 backdrop-blur">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-stone-500">Handoff pattern</p>
            <div className="mt-5 grid gap-4">
              {demo.sections.map(([title, body]) => (
                <div key={title} className="rounded-3xl border border-black/10 bg-stone-50 p-5">
                  <h3 className="text-lg font-black text-stone-950">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
