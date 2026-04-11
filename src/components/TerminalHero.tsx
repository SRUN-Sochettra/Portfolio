import { useEffect, useMemo, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import useReducedMotion from '../lib/useReducedMotion';
import { cn } from '../lib/utils';

type Profile = {
  name: string;
  tagline: string;
  github: string;
};

function useTypewriter(text: string, enabled: boolean, speedMs = 16) {
  const reduced = useReducedMotion();
  const [out, setOut] = useState('');

  useEffect(() => {
    if (!enabled) return;
    if (reduced) {
      setOut(text);
      return;
    }
    let i = 0;
    setOut('');
    const t = window.setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) window.clearInterval(t);
    }, speedMs);
    return () => window.clearInterval(t);
  }, [text, enabled, speedMs, reduced]);

  return out;
}

export default function TerminalHero({ profile }: { profile: Profile }) {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);

  const javaSnippet = useMemo(() => {
    return `public static DeveloperProfile init() {
  var me = new DeveloperProfile();
  me.name("${profile.name}");
  me.tagline("${profile.tagline.replace(/\"/g, '\\"')}");
  me.coreStack(List.of(
    "Java", "Spring Boot", "PostgreSQL",
    "Python", "JavaScript", "Tailwind",
    "MyBatis"
  ));
  me.github("${profile.github}");
  return me;
}`;
  }, [profile]);

  const typed = useTypewriter(javaSnippet, true, 12);

  // If profile changes (e.g. data loads), restart the headline transition cleanly.
  useEffect(() => {
    setDone(false);
  }, [javaSnippet]);

  useEffect(() => {
    if (typed.length >= javaSnippet.length) {
      const t = window.setTimeout(() => setDone(true), reduced ? 0 : 380);
      return () => window.clearTimeout(t);
    }
  }, [typed.length, javaSnippet.length, reduced]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.8 });
  const sy = useSpring(my, { stiffness: 120, damping: 18, mass: 0.8 });
  const rx = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const ry = useTransform(sx, [-0.5, 0.5], [-10, 10]);

  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-4 pt-20 pb-14 sm:pt-24">
      <div className="grid gap-10 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(0,243,255,0.65)]" />
            <span className="font-mono">Boot sequence: active</span>
          </div>

          <motion.h1
            className={cn(
              'mt-6 text-balance font-[650] tracking-tight',
              'text-4xl sm:text-6xl lg:text-7xl',
              'text-white'
            )}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {done ? (
              <>
                Build systems with
                <span className="relative mx-2 inline-block">
                  <span className="absolute -inset-x-2 -inset-y-1 -z-10 rounded-lg bg-cyan-400/10 blur" />
                  <span className="bg-gradient-to-r from-cyan-200 via-cyan-300 to-white bg-clip-text text-transparent drop-shadow-[0_0_22px_rgba(0,243,255,0.35)]">
                    neon precision
                  </span>
                </span>
                and obsidian focus.
              </>
            ) : (
              <>
                {profile.name}
                <span className="text-white/50"> — booting…</span>
              </>
            )}
          </motion.h1>

          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
            {profile.tagline}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 shadow-[0_0_0_1px_rgba(0,243,255,0.08),0_20px_50px_rgba(0,243,255,0.12)] backdrop-blur transition hover:bg-cyan-300/15"
            >
              <span>See Projects</span>
              <span className="inline-block translate-x-0 transition group-hover:translate-x-0.5">→</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 backdrop-blur transition hover:bg-white/8"
            >
              Contact
            </a>
          </div>
        </div>

        <motion.div
          className="relative"
          style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
          onMouseMove={(e) => {
            if (reduced) return;
            const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            mx.set(x);
            my.set(y);
          }}
          onMouseLeave={() => {
            mx.set(0);
            my.set(0);
          }}
        >
          <div className="absolute -inset-6 -z-10 rounded-3xl bg-cyan-500/10 blur-2xl" />

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_30px_80px_rgba(0,0,0,0.55)] backdrop-blur">
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/90" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/90" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/90" />
              </div>
              <div className="ml-2 flex-1 truncate text-xs text-white/60">
                <span className="font-mono">~/srun/portfolio/init.java</span>
              </div>
              <div className="text-[11px] text-white/45">UTF-8</div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(0,243,255,0.20),transparent_45%),radial-gradient(circle_at_80%_60%,rgba(99,102,241,0.16),transparent_55%)]" />
              <pre className="relative max-h-[360px] overflow-x-auto overflow-y-hidden p-5 text-[12px] leading-5 text-white/70 sm:text-[13px]">
                <code className="font-mono">
                  <span className="text-white/45">// profile loader</span>
                  {'\n'}
                  <span className="text-cyan-200">{typed}</span>
                  <span className={cn('ml-0.5 inline-block h-4 w-2 align-middle', reduced ? 'opacity-0' : 'animate-pulse bg-cyan-200/70')} />
                </code>
              </pre>
            </div>
          </div>

          <div className="pointer-events-none absolute -bottom-6 left-6 right-6 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
