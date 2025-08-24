# Sudoku Web App

A small React-based Sudoku game/demo. This project was bootstrapped with Create React App and provides a playable 9x9 Sudoku board with an on-screen keypad, a timer, and a small set of sample puzzles.

This README replaces the default CRA copy and documents how to run, develop, and reason about the code in the `src/` folder.

## Quick start

Prerequisites: Node.js (LTS recommended) and npm.

Install dependencies and start the development server:

```powershell
npm install
npm start
```

Open http://localhost:3000 in your browser. The app supports hot-reloading.

Run tests:

```powershell
npm test
```

Build a production bundle:

```powershell
npm run build
```

## What this project contains

High-level features
- Playable 9x9 Sudoku board
- On-screen keypad for number entry, erase and note (pencil) mode
- Cell selection and highlighting of related row/column/box
- Validation against puzzle solutions and visual conflict feedback
- Stopwatch to track solve time

Key source files (in `src/`)
- `App.js` — root application component. Wires global state and UI chrome.
- `Sudoku.js` — board component that renders the 9x9 grid and coordinates interactions.
- `Cell.js` — single cell component (display, selection, highlighting, notes).
- `InputPad.js` — on-screen keypad for entering numbers and commands.
- `Stopwatch.js` — small timer used while solving.
- `SudokuPuzzles.js` — bundled sample puzzles and solutions used to populate the board.
- `utils.js` — helper functions (grid creation, validation, coordinate helpers, etc.).
- `index.js`, `index.css`, `App.css` — app entry and styling.

Other files
- `public/` — static HTML manifest and assets used by CRA.
- `App.test.js`, `setupTests.js` — basic CRA test setup.

## How the code is organized (contract & shapes)

- The app initializes a grid model (array of 81 cell objects) and a separate solution grid for validation.
- Components communicate via props and local state; `App.js` is the central state owner for the current puzzle, selected cell, and mode (note vs normal).
- Inputs: mouse clicks (cell selection) and clicks on `InputPad` buttons produce actions that update cell values or pencil-marks.
- Output: visual cell values, pencil-marks, conflict/highlight styling, and the stopwatch time.

Edge cases considered
- Attempting to edit a given (pre-filled) cell should be ignored or prevented.
- Entering a number that conflicts with row/column/box shows immediate feedback.
- Note mode toggles pencil marks instead of setting a permanent value.

## Development notes & suggestions

- Tests: There are no unit tests for game logic; adding tests for validation utilities in `src/utils.js` is recommended.
- Accessibility: Keyboard entry support would improve usability (currently mainly click/tap driven).
- Persistence: Consider saving the current puzzle state and elapsed time to localStorage so users can continue later.
- Performance: The app is small; no special optimizations are required. If you add large puzzle generation, consider running that off the main thread (Web Worker).

## File map

Top-level files you will likely touch:
- `src/App.js` — app wiring and top-level state
- `src/Sudoku.js` — board rendering and cell mapping
- `src/Cell.js` — individual cell UI and interactions
- `src/InputPad.js` — keypad UI
- `src/utils.js` — validation and helpers
- `src/SudokuPuzzles.js` — sample puzzles

## Running and debugging tips

- Start the dev server with `npm start` and open the browser devtools (React devtools recommended).
- Edit `src/SudokuPuzzles.js` to add or change puzzles for testing.
- Put console.log statements in `src/utils.js` validation functions when tracking a bug with candidate calculation or conflict detection.

## License

This repository currently does not include a license file. If you want to make it open-source, add a `LICENSE` (for example MIT) to the project root.

## Changes made

This README was generated and written into `README.md` to replace the default CRA starter instructions and to provide a concise developer-focused overview of this Sudoku demo app.
