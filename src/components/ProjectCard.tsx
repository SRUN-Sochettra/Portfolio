import { useEffect, useMemo, useRef } from 'react';
import { cn, clamp } from '../lib/utils';

type Project = {
  id: number;
  title: string;
  subtitle: string | null;
  description: string;
  tech: string[];
  featured: boolean;
  sort: number;
};

function use3DTilt(enabled: boolean) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotateY = clamp(x * 18, -12, 12);
      const rotateX = clamp(-y * 14, -10, 10);
      el.style.setProperty('--rx', `${rotateX}deg`);
      el.style.setProperty('--ry', `${rotateY}deg`);
      el.style.setProperty('--mx', `${(x + 0.5) * 100}%`);
      el.style.setProperty('--my', `${(y + 0.5) * 100}%`);
    };

    const onLeave = () => {
      el.style.setProperty('--rx', `0deg`);
      el.style.setProperty('--ry', `0deg`);
    };

    const onResize = () => {
      // Prevent “stuck” transforms when the viewport changes while hovering.
      onLeave();
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', onResize);
    };
  }, [enabled]);

  return ref;
}

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = use3DTilt(true);

  const badges = useMemo(() => project.tech || [], [project.tech]);

  const big = project.featured || index === 0;

  return (
    <div
      ref={ref}
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur',
        'transition duration-300 hover:border-cyan-300/25',
        'shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_40px_120px_rgba(0,0,0,0.55)]',
        'will-change-transform',
        big ? 'md:p-8' : 'md:p-7'
      )}
      style={{
        transform: 'perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) translateZ(0)',
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mx,50%)_var(--my,50%),rgba(0,243,255,0.22),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.06)_30%,transparent_60%)]" />
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-3xl shadow-[0_0_0_1px_rgba(0,243,255,0.18),0_0_40px_rgba(0,243,255,0.14)]" />
      </div>

      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs text-white/55">
              <span className="font-mono">PROJECT_{String(index + 1).padStart(2, '0')}</span>
            </div>
            <h3 className={cn('mt-2 font-[650] tracking-tight text-white', big ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl')}>
              {project.title}
            </h3>
            {project.subtitle && <p className="mt-1 text-sm text-white/60">{project.subtitle}</p>}
          </div>

          {project.featured && (
            <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100 shadow-[0_0_24px_rgba(0,243,255,0.14)]">
              Featured
            </div>
          )}
        </div>

        <p className={cn('mt-4 text-pretty leading-relaxed text-white/70', big ? 'text-base sm:text-lg' : 'text-sm sm:text-base')}>
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {badges.map((t) => (
            <span
              key={t}
              className="rounded-lg border border-white/10 bg-black/25 px-2.5 py-1 text-[12px] font-semibold text-white/75 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
            >
              <span className="font-mono">{t}</span>
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <div className="text-xs text-white/45">
            <span className="font-mono">hover</span> for tilt • neon border
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white/80 backdrop-blur transition hover:bg-white/10"
          >
            Request demo
            <span className="inline-block transition group-hover:translate-x-0.5">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
