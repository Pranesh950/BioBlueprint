# OSbioinformatics

A discovery catalog for open bioengineering resources, with license-aware listings and attribution-first metadata.

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

## Adding A Resource

Want to add a listing? Use the **About** page in the app for the latest submission guidance.

Quick summary:
1. Fork this repo.
2. Add a resource entry in `web/src/data/projects.json`.
3. Include canonical source URL, attribution, license name, SPDX identifier, and tags.
4. Confirm metadata matches the original source repository.
5. Open a pull request.

## License

Each listed resource retains its own license. OSbioinformatics metadata and presentation remain open source.