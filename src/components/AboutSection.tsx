import { motion } from 'framer-motion';

type Profile = {
  name: string;
  about: string;
};

export default function AboutSection({ profile }: { profile: Profile }) {
  return (
    <section id="about" className="relative z-10 mx-auto w-full max-w-6xl px-4 py-14 sm:py-16">
      <div className="grid gap-6 md:grid-cols-12 md:items-start">
        <div className="md:col-span-5">
          <div className="sticky top-6">
            <h2 className="text-2xl font-[650] tracking-tight text-white sm:text-3xl">
              Origin story — <span className="text-cyan-200">Phnom Penh build mode</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base">
              No corporate slogans. Just the real routine: classes, code, caffeine, and shipping.
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <div className="text-xs text-white/55">Currently:</div>
              <div className="mt-2 text-sm font-semibold text-white">2nd-Year IT & English Student (NUM & RUPP)</div>
              <div className="mt-2 text-xs text-white/55">
                <span className="font-mono">obsidian</span> theme • <span className="font-mono">cyber-cyan</span> accents
              </div>
            </div>
          </div>
        </div>

        <motion.div
          className="md:col-span-7"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_50px_140px_rgba(0,0,0,0.55)] sm:p-8">
            <div className="absolute -right-16 -top-16 h-60 w-60 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl" />

            <div className="relative">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/60">
                <span className="font-mono">// about_{profile.name.toLowerCase().replace(/\s+/g, '_')}</span>
              </div>

              {profile.about
                .split('\n\n')
                .filter(Boolean)
                .map((para, i) => (
                  <p key={i} className="mt-4 text-pretty text-sm leading-relaxed text-white/70 sm:text-base">
                    {para}
                  </p>
                ))}

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs text-white/55">Daily driver</div>
                  <div className="mt-1 text-sm font-semibold text-white">ASUS ROG Strix • compile & iterate</div>
                  <div className="mt-2 text-xs text-white/55">
                    <span className="font-mono">javac</span> → <span className="font-mono">tests</span> →{' '}
                    <span className="font-mono">refactor</span>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs text-white/55">Fuel</div>
                  <div className="mt-1 text-sm font-semibold text-white">Tech customization + anime energy</div>
                  <div className="mt-2 text-xs text-white/55">
                    clean UI layers • heavy backend logic
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
