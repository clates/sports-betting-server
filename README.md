# Mock Sports Data API Documentation

This document describes how to use the Node.js Express server to retrieve simulated sports data over HTTP. This "API" is designed to mimic how a real-world API would provide data, allowing you to practice making fetch requests and parsing data.

## How to Use This API Server

### Install Node.js
If you don't have Node.js installed on your machine, download it from [nodejs.org](https://nodejs.org).

### Set up the Server

1. Create a new folder for the server (e.g., `sports-api-server`).
2. Save the `server.js` code (provided separately) inside this folder.
3. Open your terminal or command prompt, navigate to this folder.
4. Run `npm init -y` to create a `package.json` file.

### Install Express and CORS
```bash
npm install express cors
```

### Run the Server

In your terminal, from the `sports-api-server` folder, run:
```bash
node server.js
```

You should see a message like: `Mock Sports Data API server running at http://localhost:3000`

### Client-Side Integration
Your client-side JavaScript (`script.js` in your sports-odds-viewer project) will now use the `fetch()` function to send requests to `http://localhost:3000`. You no longer need to include `mockApi.js` directly in your `index.html` file.

## Available Endpoints (HTTP Routes)

### 1. GET /sports

**Description:** Retrieves a list of all available sports.

**URL:** `http://localhost:3000/sports`

**Returns:** A JSON Array of Sport objects.

**Example Fetch Call (in your script.js):**

```javascript

fetch('http://localhost:3000/sports')
    .then(response => response.json()) // Parse the JSON response
    .then(sports => {
        console.log("Available Sports:", sports);
        /*
        Example output:
        [
            { id: 'bask', name: 'Basketball' },
            { id: 'foot', name: 'Football' },
            { id: 'socc', name: 'Soccer' }
        ]
        */
    })
    .catch(error => {
        console.error("Error fetching sports:", error);
    });
```

### 2. GET /matches/:sportId

**Description:** Retrieves a list of upcoming matches for a specific sport.

**URL:** `http://localhost:3000/matches/YOUR_SPORT_ID` (replace `YOUR_SPORT_ID` with an actual sport ID like `bask`, `foot`, or `socc`).

**Parameters:**
- `sportId` (string, required): The unique ID of the sport (e.g., 'bask', 'foot'). This is passed as part of the URL path.

**Returns:** A JSON Array of Match objects. If no matches are found for the sportId, a 404 Not Found status with a JSON message is returned.

**Example Fetch Call (in your script.js):**

```javascript

const selectedSportId = 'bask'; // Example sport ID
fetch(`http://localhost:3000/matches/${selectedSportId}`)
    .then(response => {
        if (!response.ok) { // Check for HTTP errors (e.g., 404)
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse the JSON response
    })
    .then(matches => {
        console.log(`Matches for ${selectedSportId}:`, matches);
        /*
        Example output (truncated):
        [
            {
                id: 'bask-match-001',
                sportId: 'bask',
                homeTeam: 'Lakers',
                awayTeam: 'Celtics',
                startTime: '2025-07-20T19:00:00Z',
                odds: { homeWin: 1.85, awayWin: 2.10 }
            },
            // ... more basketball matches
        ]
        */
    })
    .catch(error => {
        console.error("Error fetching matches:", error);
    });
```

## Data Structures

### Sport Object
Represents a single sport.

| Property | Type   | Description        | Example                     |
|----------|--------|--------------------|-----------------------------|
| id       | string | Unique identifier  | 'bask', 'foot', 'socc'     |
| name     | string | Display name of sport | 'Basketball', 'Football', 'Soccer' |

### Match Object
Represents a single sports match.

| Property  | Type   | Description                           | Example                      |
|-----------|--------|---------------------------------------|------------------------------|
| id        | string | Unique identifier for the match       | 'bask-match-001'             |
| sportId   | string | ID of the sport this match belongs to | 'bask'                       |
| homeTeam  | string | Name of the home team                 | 'Lakers'                     |
| awayTeam  | string | Name of the away team                 | 'Celtics'                    |
| startTime | string | ISO 8601 formatted match start time (UTC) | '2025-07-20T19:00:00Z'  |
| odds      | object | Object containing betting odds        | See Odds Object below        |

### Odds Object (nested within Match object)
Contains the simulated odds for a match.

| Property | Type   | Description                               | Example |
|----------|--------|-------------------------------------------|---------|
| homeWin  | number | Odds for the home team to win             | 1.85    |
| awayWin  | number | Odds for the away team to win             | 2.10    |
| draw     | number | Odds for a draw (optional, e.g., for Soccer) | 3.40    |

