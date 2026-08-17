# ATBU Campus SOS Alert and Response System

This is the working prototype exactly as described in Chapter 3, Chapter 4,
and Appendix A of the project report. It uses Node.js's built-in `http`
module only — no npm packages required.

## Requirements
- Node.js (any recent version — no installation of dependencies needed)

## How to run

1. Open a terminal in this folder.
2. Start the server:
   ```
   node server.js
   ```
3. You should see: `Server running at http://localhost:4173`

## How to use it

- **Student SOS page:** open http://localhost:4173/ in a browser.
  Fill in a name/matric number, pick a location, click "SEND SOS ALERT".
- **Security dashboard:** open http://localhost:4173/dashboard in another
  browser tab. It polls for new alerts every 5 seconds and lets you click
  "Mark Resolved" to clear an alert.

Open both pages side by side (e.g. two browser windows) to demonstrate the
full alert → dashboard → resolve flow live, which is the core demo for your
defense.

## API endpoints (match Appendix Table 3.2b)

| Method | Path            | Purpose                          |
|--------|-----------------|-----------------------------------|
| POST   | /sos            | Raise a new alert                |
| GET    | /alerts         | Get all active alerts (JSON)     |
| POST   | /resolve/:id    | Mark an alert as resolved        |

## Notes on the current storage

Alerts are stored **in memory** (a JavaScript array), exactly as documented
in Section 3.5.2 of the report — this was a deliberate, documented deviation
from the original MySQL/SQLite plan due to local environment setup
constraints. This means:
- Alerts reset every time you restart the server.
- This is fine for a live demo/defense but is explicitly flagged in the
  report as a limitation with a recommended upgrade path (Section 5.4/5.6).

## File structure

```
server.js              Backend — Node.js http server, 3 REST endpoints
alertLogic.js           Alert-handling logic extracted for unit testing
public/
  index.html           Student-facing SOS page
  script.js            Sends the SOS POST request
  dashboard.html       Security dashboard page
  dashboard.js         Polls /alerts every 5s, renders table, resolve button
  style.css            Shared stylesheet for both pages
```

All files were extracted directly from Appendix A of the project report and
verified to run without modification.
