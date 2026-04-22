import { useState } from 'react';
import { Github, Loader2, Send } from 'lucide-react';
import { motion } from 'framer-motion';

type Profile = {
  github: string;
};

export default function ContactSection({ profile }: { profile: Profile }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setError(null);

    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
      const res = await fetch(`${baseUrl}/api/contact_messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to send');
      setStatus('sent');
      setName('');
      setEmail('');
      setMessage('');
      window.setTimeout(() => setStatus('idle'), 2200);
    } catch (err: any) {
      setStatus('error');
      setError(err?.message || 'Something went wrong');
    }
  };

  const ghUrl = `https://github.com/${profile.github}`;

  return (
    <section id="contact" className="relative z-10 mx-auto w-full max-w-6xl px-4 py-14 sm:py-16">
      <div className="grid gap-8 md:grid-cols-12 md:items-start">
        <div className="md:col-span-5">
          <h2 className="text-2xl font-[650] tracking-tight text-white sm:text-3xl">
            Contact — <span className="text-cyan-200">send payload</span>
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/65 sm:text-base">
            If you’re building something real and you want a developer who cares about architecture and details, let’s
            talk.
          </p>

          <a
            href={ghUrl}
            target="_blank"
            rel="noreferrer"
            className="group mt-6 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/80 backdrop-blur transition hover:bg-white/10"
          >
            <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-white/10 bg-black/20">
              <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent transition duration-700 group-hover:translate-x-[120%]" />
              <Github className="relative h-5 w-5" />
            </span>
            <div>
              <div className="text-xs text-white/55">GitHub</div>
              <div className="font-mono text-sm text-white/85">{profile.github}</div>
            </div>
            <span className="ml-auto text-sm text-white/45 transition group-hover:text-cyan-200">→</span>
          </a>
        </div>

        <motion.div
          className="md:col-span-7"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <form
            onSubmit={onSubmit}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_50px_140px_rgba(0,0,0,0.55)] sm:p-8"
          >
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="absolute -left-16 -bottom-20 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl" />

            <div className="relative grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-xs text-white/55">Name</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11 rounded-xl border border-white/10 bg-black/25 px-3 text-sm text-white/85 outline-none transition focus:border-cyan-300/30 focus:ring-2 focus:ring-cyan-300/10"
                    placeholder="Your name"
                    required
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-xs text-white/55">Email</span>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 rounded-xl border border-white/10 bg-black/25 px-3 text-sm text-white/85 outline-none transition focus:border-cyan-300/30 focus:ring-2 focus:ring-cyan-300/10"
                    placeholder="you@domain.com"
                    type="email"
                    required
                  />
                </label>
              </div>

              <label className="grid gap-2">
                <span className="text-xs text-white/55">Message</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[130px] resize-y rounded-xl border border-white/10 bg-black/25 px-3 py-3 text-sm text-white/85 outline-none transition focus:border-cyan-300/30 focus:ring-2 focus:ring-cyan-300/10"
                  placeholder="Tell me what you're building. The goal, the constraints, and the timeline."
                  required
                />
              </label>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-white/45">
                  <span className="font-mono">POST</span> {import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/contact_messages
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group relative inline-flex items-center gap-2 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-5 py-3 text-sm font-semibold text-cyan-100 shadow-[0_0_0_1px_rgba(0,243,255,0.10),0_25px_80px_rgba(0,243,255,0.12)] backdrop-blur transition hover:bg-cyan-300/15 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <span className="absolute inset-0 -z-10 opacity-0 blur-2xl transition duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,rgba(0,243,255,0.25),transparent_55%)]" />
                  {status === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  <span>{status === 'sending' ? 'Sending…' : 'Send Payload'}</span>
                </button>
              </div>

              {status === 'sent' && (
                <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-100">
                  Payload delivered. I’ll respond soon.
                </div>
              )}
              {status === 'error' && (
                <div className="rounded-2xl border border-red-300/20 bg-red-300/10 px-4 py-3 text-sm text-red-100">
                  {error || 'Failed to send.'}
                </div>
              )}
            </div>
          </form>
        </motion.div>
      </div>

      <footer className="mt-10 border-t border-white/10 pt-6 text-xs text-white/45">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="font-mono">©</span> {new Date().getFullYear()} Srun Sochettra — built in dark mode.
          </div>
          <a href="#" className="font-mono text-white/55 hover:text-cyan-200 transition" onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}>
            back_to_top()
          </a>
        </div>
      </footer>
    </section>
  );
}
