# Contributing to OrderDesk

Thanks for taking an interest in OrderDesk. The project is intentionally small and focused. Contributions should make a real business task easier without making the app harder to understand.

## Before opening an issue
- Search existing issues to avoid duplicates.
- Use fictional example data only. Never attach real customer records, phone numbers, backups, passwords or API keys.
- Include the edition (Local or Cloud), browser/device, steps to reproduce and expected behaviour.

## Before opening a pull request
1. Explain the business-owner problem the change solves.
2. Keep the change focused and avoid unrelated redesigns.
3. Preserve the Local edition's no-login/no-backend promise.
4. Keep Cloud-only dependencies inside the Cloud edition.
5. Do not add analytics or third-party data collection without a clear privacy review.
6. Add or update tests for calculations, migration or synchronisation logic.
7. Run:
   ```bash
   node --test apps/local/tests/*.test.cjs
   cd apps/cloud && npm test && npm run build
   ```
8. Update the relevant documentation and changelog.

## Style
- Prefer readable, straightforward JavaScript.
- Validate user input and show useful error messages.
- Avoid dependencies where a native browser feature is sufficient.
- Keep accessibility, keyboard navigation, readable contrast and responsive layouts in mind.

## Pull request checklist
- [ ] The change solves a stated user problem.
- [ ] Local and Cloud responsibilities remain separate.
- [ ] No secrets or private data are included.
- [ ] Relevant tests/checks pass.
- [ ] Documentation/changelog is updated.