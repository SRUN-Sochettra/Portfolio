import { useEffect, useState } from 'react';
import { cn } from '../lib/utils';

export default function TopNav({ name }: { name: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div
        className={cn(
          'mx-auto flex max-w-6xl items-center justify-between px-4 py-3 transition',
          scrolled ? 'rounded-b-2xl border-b border-white/10 bg-black/30 backdrop-blur' : 'bg-transparent'
        )}
      >
        <a href="#" className="group inline-flex items-center gap-2" onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur">
            <span className="absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_50%,rgba(0,243,255,0.22),transparent_60%)]" />
            <span className="relative font-mono text-xs text-cyan-200">SS</span>
          </span>
          <span className="text-sm font-semibold text-white/80 transition group-hover:text-white">{name}</span>
        </a>

        <nav className="hidden items-center gap-2 sm:flex">
          {[
            { href: '#about', label: 'Origin' },
            { href: '#skills', label: 'Stack' },
            { href: '#projects', label: 'Projects' },
            { href: '#contact', label: 'Contact' },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-xl border border-white/0 px-3 py-2 text-sm font-semibold text-white/60 transition hover:border-white/10 hover:bg-white/5 hover:text-white/85"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-sm font-semibold text-cyan-100 shadow-[0_0_24px_rgba(0,243,255,0.12)] backdrop-blur transition hover:bg-cyan-300/15"
        >
          Hire me
        </a>
      </div>
    </div>
  );
}
