import { useEffect, useMemo, useState } from 'react';
import NoiseCanvas from './components/NoiseCanvas';
import TerminalHero from './components/TerminalHero';
import AboutSection from './components/AboutSection';
import SkillsGrid from './components/SkillsGrid';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import TopNav from './components/TopNav';

type Profile = {
  id: number;
  name: string;
  tagline: string;
  github: string;
  about: string;
};

type Skill = {
  id: number;
  category: string;
  name: string;
  level: number | null;
  highlight: boolean;
  note: string | null;
  sort: number;
};

type Project = {
  id: number;
  title: string;
  subtitle: string | null;
  description: string;
  tech: string[];
  featured: boolean;
  sort: number;
};

export default function App() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    try {
      const [pRes, sRes, prRes] = await Promise.all([
        fetch('http://localhost:8080/api/profile'),
        fetch('http://localhost:8080/api/skills'),
        fetch('http://localhost:8080/api/projects'),
      ]);
      const [p, s, pr] = await Promise.all([pRes.json(), sRes.json(), prRes.json()]);
      setProfile(p);
      setSkills(Array.isArray(s) ? s : []);
      setProjects(Array.isArray(pr) ? pr : []);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const bg = useMemo(() => {
    return {
      backgroundImage:
        'radial-gradient(circle at 20% 0%, rgba(0,243,255,0.16), transparent 45%), radial-gradient(circle at 80% 30%, rgba(99,102,241,0.18), transparent 52%), radial-gradient(circle at 30% 80%, rgba(16,185,129,0.12), transparent 55%)',
    } as React.CSSProperties;
  }, []);

  const effectiveProfile: Profile =
    profile ||
    ({
      id: 0,
      name: 'Srun Sochettra',
      tagline: '2nd-Year IT & English Student (NUM & RUPP) | Backend Architecture & Full-Stack Development',
      github: 'SRUN-Sochettra',
      about:
        'Loading origin story…',
    } as Profile);

  return (
    <div className="min-h-dvh bg-[#0b0f19] text-white" style={bg}>
      <NoiseCanvas />

      <div className="pointer-events-none fixed inset-0 z-[1] opacity-40 [background:linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:100%_24px]" />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-25 [background:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:24px_100%]" />

      <TopNav name={effectiveProfile.name} />

      <main className="relative z-10">
        <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-gradient-to-b from-black/35 via-transparent to-transparent" />

        <TerminalHero profile={effectiveProfile} />

        {loading ? (
          <div className="mx-auto w-full max-w-6xl px-4 pb-20">
            <div className="grid gap-4 md:grid-cols-12">
              <div className="md:col-span-5 h-[220px] rounded-3xl border border-white/10 bg-white/5 backdrop-blur animate-pulse" />
              <div className="md:col-span-7 h-[320px] rounded-3xl border border-white/10 bg-white/5 backdrop-blur animate-pulse" />
              <div className="md:col-span-12 h-[260px] rounded-3xl border border-white/10 bg-white/5 backdrop-blur animate-pulse" />
            </div>
          </div>
        ) : (
          <>
            <AboutSection profile={effectiveProfile} />
            <SkillsGrid skills={skills as any} />
            <ProjectsSection projects={projects as any} />
            <ContactSection profile={effectiveProfile} />
          </>
        )}
      </main>
    </div>
  );
}
