# Contributing Guide

Thank you for considering a contribution to this project. This document outlines the conventions and processes that keep the codebase clean and maintainable.

---

## Branch Naming Convention

All branches must follow this pattern:

```
<type>/<short-description>
```

| Type | Purpose | Example |
|------|---------|---------|
| `feature/` | New functionality | `feature/add-blog-section` |
| `fix/` | Bug fixes | `fix/cors-header-missing` |
| `refactor/` | Code restructuring (no behavior change) | `refactor/extract-service-layer` |
| `docs/` | Documentation updates | `docs/update-api-endpoints` |
| `chore/` | Tooling, CI, dependencies | `chore/upgrade-spring-boot` |
| `test/` | Adding or updating tests | `test/controller-integration` |

**Rules:**
- Use lowercase and hyphens (no underscores or uppercase).
- Keep descriptions concise — 2 to 4 words maximum.
- Never commit directly to `main`.

---

## Commit Message Format

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification.

```
<type>(scope): <description>

[optional body]

[optional footer]
```

### Types

| Type | When to Use |
|------|-------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation changes only |
| `style` | Formatting, whitespace (no logic change) |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `test` | Adding or correcting tests |
| `chore` | Build process, dependencies, CI changes |
| `perf` | Performance improvement |

### Scope

Use the affected module as the scope:

- `backend` — Java / Spring Boot changes
- `frontend` — React / Vite changes
- `ci` — GitHub Actions workflow changes
- `db` — Database schema or migration changes
- `docs` — Documentation files

### Examples

```
feat(backend): add pagination to projects endpoint

fix(frontend): resolve mobile overflow on hero section

docs(readme): add API endpoint documentation

chore(ci): add frontend lint step to workflow

refactor(backend): extract contact service from controller
```

---

## Pull Request Process

1. **Fork** the repository and create your branch from `main`.
2. **Follow** the branch naming and commit conventions above.
3. **Ensure** the CI pipeline passes:
   - Backend builds successfully (`mvn clean package`).
   - Frontend builds successfully (`npm run build`).
   - No lint errors (`npm run lint`).
4. **Fill out** the pull request template completely.
5. **Request review** from a maintainer.
6. **Squash and merge** is the preferred merge strategy.

---

## Code Style

### Backend (Java)
- Follow standard Java naming conventions.
- Use Lombok annotations where appropriate to reduce boilerplate.
- All new endpoints must include OpenAPI annotations (`@Operation`, `@ApiResponses`).
- Use constructor injection (no `@Autowired` on fields).

### Frontend (TypeScript/React)
- Use functional components with hooks.
- Follow the existing Tailwind CSS utility-first pattern.
- Use TypeScript strict mode — no `any` types without justification.
- Components go in `src/components/`, pages in `src/pages/`.

---

## Reporting Issues

Use the provided issue templates:
- **Bug Report** — for unexpected behavior or errors.
- **Feature Request** — for proposing new functionality.

---

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).

