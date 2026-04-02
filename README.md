# BioBlueprint

A platform for sharing complete bioengineering projects: protocols, code, sequences, CAD files, and data all in one place.

## Local Development

This repo is a React frontend app:

- `web/`: React frontend (Vite)

### 1. Install dependencies

```bash
cd web && npm install
```

### 2. Run locally

```bash
cd web && npm run dev
```

Open the URL printed by Vite in your browser.

## Adding Your Project

Want to share your bioengineering project? Head to the **About** page once you run the app, or see [the About page in the UI](/web/src/pages/AboutPage.jsx) for full instructions.

Quick summary:
1. Fork this repo
2. Create a folder in `web/projects/your-project-name`
3. Add files following the example structure (see `web/projects/ecoli-gfp-expression-demo/`)
4. Register your project in `web/src/data/projects.json`
5. Open a pull request

## License

Each project retains its own license. BioBlueprint itself is open source.