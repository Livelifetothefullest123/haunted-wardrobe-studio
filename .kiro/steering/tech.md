# Tech steering

- Stack: plain HTML, CSS, and vanilla JavaScript only. No backend, no build step, no dependencies, no API keys, no secrets, no login.
- One logic file, `app.js`, powers both the browser UI and the Node tests. Do not split the plan logic into a second copy; tests must test the code judges run.
- Money is handled in integer cents, never floating-point dollars, so cost breakdowns sum exactly to the total.
- Cost totals are deterministic from the picker combination, so the same pickers always give the same plan and total.
- Keep the code readable for a beginner: short functions, named constants for picker lists, comments where the cost math needs explaining.
- Do not add a framework, a package manager, or a server to "improve" this project. The constraint is the point.
