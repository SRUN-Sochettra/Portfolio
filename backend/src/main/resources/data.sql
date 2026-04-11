-- Profile
INSERT INTO portfolio_profile (id, name, tagline, github, about)
VALUES (1, 'Srun Sochettra', '2nd-Year IT & English Student (NUM & RUPP)', 'SRUN-Sochettra', 'I build backend architectures and full-stack systems.')
ON CONFLICT (id) DO NOTHING;

-- Skills
INSERT INTO portfolio_skill (id, category, name, level, highlight, note, sort) VALUES
(1, 'Backend', 'Java', 85, true, NULL, 1),
(2, 'Backend', 'Spring Boot', 80, true, NULL, 2),
(3, 'Database', 'PostgreSQL', 75, true, NULL, 3),
(4, 'Backend', 'Python', 70, false, NULL, 4),
(5, 'Frontend', 'JavaScript', 80, true, NULL, 5),
(6, 'Frontend', 'Tailwind CSS', 85, true, NULL, 6),
(7, 'Backend', 'MyBatis', 70, false, NULL, 7)
ON CONFLICT (id) DO NOTHING;

SELECT setval('portfolio_skill_id_seq', (SELECT MAX(id) FROM portfolio_skill));

-- Projects
INSERT INTO portfolio_project (id, title, subtitle, description, tech, featured, sort) VALUES
(1, 'Staff Management System', NULL, 'A comprehensive staff management system with automated ID generation, tracking, and management via a Java-based application with PostgreSQL backend.', '["Java", "Spring Boot", "PostgreSQL", "MyBatis"]', true, 1),
(2, 'Stock Management System', NULL, 'A stock management backend architecture ensuring reliable tracking and updates, built with robust database principles.', '["Java", "Spring Boot", "PostgreSQL", "MyBatis"]', false, 2)
ON CONFLICT (id) DO NOTHING;

SELECT setval('portfolio_project_id_seq', (SELECT MAX(id) FROM portfolio_project));
