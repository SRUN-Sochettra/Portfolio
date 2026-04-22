import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

type Project = {
  id: number;
  title: string;
  subtitle: string | null;
  description: string;
  tech: string[];
  featured: boolean;
  sort: number;
};

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="relative z-10 mx-auto w-full max-w-6xl px-4 py-14 sm:py-16">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl font-[650] tracking-tight text-white sm:text-3xl">
            Projects — <span className="text-cyan-200">built under pressure</span>
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
            The fun part: turning “it should work” into “it holds up.” These are the systems I’ve been building while
            studying.
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-12">
        {projects.map((p, i) => {
          const span = p.featured || i === 0 ? 'md:col-span-12' : i % 2 === 0 ? 'md:col-span-7' : 'md:col-span-5';
          return (
            <motion.div
              key={p.id}
              className={span}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
            >
              <ProjectCard project={p} index={i} />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
