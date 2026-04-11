import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

type Skill = {
  id: number;
  category: 'Frontend' | 'Backend' | 'Database' | string;
  name: string;
  level: number | null;
  highlight: boolean;
  note: string | null;
};

const catMeta: Record<string, { accent: string; glow: string; icon: string }> = {
  Frontend: {
    accent: 'from-cyan-200/20 to-white/5',
    glow: 'shadow-[0_0_0_1px_rgba(0,243,255,0.08),0_30px_80px_rgba(0,243,255,0.08)]',
    icon: '< />',
  },
  Backend: {
    accent: 'from-indigo-300/20 to-white/5',
    glow: 'shadow-[0_0_0_1px_rgba(99,102,241,0.10),0_30px_80px_rgba(99,102,241,0.10)]',
    icon: 'Σ',
  },
  Database: {
    accent: 'from-emerald-300/20 to-white/5',
    glow: 'shadow-[0_0_0_1px_rgba(16,185,129,0.10),0_30px_80px_rgba(16,185,129,0.08)]',
    icon: '⟐',
  },
};

export default function SkillsGrid({ skills }: { skills: Skill[] }) {
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    acc[s.category] = acc[s.category] || [];
    acc[s.category].push(s);
    return acc;
  }, {});

  const categories = Object.keys(grouped);

  return (
    <section id="skills" className="relative z-10 mx-auto w-full max-w-6xl px-4 py-14 sm:py-16">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl font-[650] tracking-tight text-white sm:text-3xl">
            Skills — <span className="text-cyan-200">stacked with intent</span>
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
            I like clean UI, but I’m happiest when the backend is structured, testable, and fast. Here’s what I actually
            use.
          </p>
        </div>
        <a
          href="#projects"
          className="hidden rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/70 backdrop-blur transition hover:bg-white/10 sm:inline-flex"
        >
          Jump to projects →
        </a>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-12">
        {categories.map((cat, idx) => {
          const meta = catMeta[cat] || catMeta.Backend;
          const items = grouped[cat];

          const colSpan = cat === 'Backend' ? 'md:col-span-7' : cat === 'Frontend' ? 'md:col-span-5' : 'md:col-span-12';

          return (
            <motion.div
              key={cat}
              className={cn(
                'group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur',
                'transition duration-300 hover:border-cyan-300/25',
                meta.glow,
                colSpan
              )}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
            >
              <div className={cn('absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100', 'bg-gradient-to-br', meta.accent)} />
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-300/10 blur-2xl" />

              <div className="relative flex items-start justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs text-white/55">
                    <span className="rounded-lg border border-white/10 bg-black/20 px-2 py-1 font-mono">{meta.icon}</span>
                    <span className="font-mono">{cat.toUpperCase()}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-white">{cat}</h3>
                </div>
                <div className="hidden text-xs text-white/45 md:block">
                  <span className="font-mono">{items.length}</span> tools
                </div>
              </div>

              <div className="relative mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {items.map((s) => (
                  <div
                    key={s.id}
                    className={cn(
                      'rounded-xl border border-white/10 bg-black/20 px-3 py-2 transition',
                      'hover:border-cyan-300/25 hover:bg-black/25',
                      s.highlight && 'shadow-[0_0_0_1px_rgba(0,243,255,0.10),0_10px_30px_rgba(0,243,255,0.06)]'
                    )}
                    title={s.note ?? undefined}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-sm font-semibold text-white/85">{s.name}</div>
                      {typeof s.level === 'number' && (
                        <div className="text-[11px] text-white/50">
                          <span className="font-mono">{s.level}%</span>
                        </div>
                      )}
                    </div>
                    {s.note && <div className="mt-1 line-clamp-2 text-[11px] leading-snug text-white/50">{s.note}</div>}
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
