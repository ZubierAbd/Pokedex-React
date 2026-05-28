# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # Install dependencies
npm start            # Start dev server (http://localhost:3000)
npm run build        # Production build
npm test             # Run tests in watch mode
```

Both `start` and `build` use `--openssl-legacy-provider` due to Node.js/OpenSSL compatibility requirements — do not remove this flag.

## Architecture

Single-page Create React App with no router. The component tree is:

```
App
└── Pokedex          # Container: generation selection, pokemon ID array state
    ├── Title        # Displays region name ("Kanto Pokedex", etc.)
    └── Entry[]      # One card per Pokemon — fetches its own data from PokeAPI
```

**State lives in `Pokedex.js`:** holds per-generation arrays of Pokémon IDs (1–809) and the currently active generation. On mount, `chooseGen()` picks a random generation; clicking a gen button calls `handleClick(gen)` to switch.

**Data fetching is in `Entry.js`:** each card independently calls two PokeAPI endpoints in `componentDidMount`:
- `https://pokeapi.co/api/v2/pokemon/{id}/` — sprite, types, stats, height, weight
- `https://pokeapi.co/api/v2/pokemon-species/{id}/` — English flavor text

Type-to-hex-color mapping is handled by `getTypecolor()` in `Entry.js`.

**Styling:** Bootstrap 4.3.1 loaded via CDN in `public/index.html`. Google Fonts ("Hepta Slab", "Saira Stencil One") also loaded via CDN. Generation-specific colors are applied through CSS class names that match generation names (e.g., `.Gen1`, `.Gen2`).

## Leftover dead code

- **`NavBar.js`** — Exists but is commented out and unused.
- **`src/Components/PokemonData.js`** — Exports a 809-entry names array that is not imported anywhere.
- **`src/Server/Pokemon.js`** and **`src/Server/Gen1.json`** — Unused server-side remnants.

## Key Details

- All components are **class-based** (no hooks) — maintain this pattern when editing existing components unless doing a deliberate migration.
- The app targets Pokémon generations 1–7 (IDs 1–809); Gen7 range in code is 722–809 (Alola starters begin at 722).
- Cards link out to `pokemondb.net` for extended info.
- `src/serviceWorker.js` is present but **not registered** — PWA offline support is intentionally disabled.
