# Contributing Guidelines – College Fest Website

Thank you for contributing to the College Fest Website project.
Please follow these guidelines to keep the project organized and maintainable.

## Workflow Overview
We follow this branch workflow:

feature branch → develop → main

- main = Final stable website
- develop = Combined development work
- feature branches = Individual tasks

---

## Branch Naming Rules
Each task must have its own branch.

Branch name format:
feature/<feature-name>

Examples:
feature/homepage
feature/about-page
feature/navbar
feature/events-page
feature/animations
feature/gallery

Do NOT commit directly to main or develop.

---

## Steps to Contribute
Follow these steps when working on a task:

1. Switch to develop branch
2. Pull latest changes
3. Create a new feature branch
4. Write your code
5. Commit changes
6. Push branch
7. Create Pull Request to develop
8. After merge, delete the branch

### Commands:
```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
