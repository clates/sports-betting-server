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

### Basic Endpoints

### 1. GET /sports

**Description:** Retrieves a list of all available sports.

**URL:** `http://localhost:3000/sports`

**Returns:** A JSON Array of Sport objects.

**Example Fetch Call:**

```javascript
fetch('http://localhost:3000/sports')
    .then(response => response.json())
    .then(sports => {
        console.log("Available Sports:", sports);
        /*
        Example output:
        [
            { id: 'bask', name: 'Basketball', description: 'Professional basketball league' },
            { id: 'foot', name: 'Football', description: 'American football league' },
            { id: 'socc', name: 'Soccer', description: 'International football/soccer league' }
        ]
        */
    })
    .catch(error => {
        console.error("Error fetching sports:", error);
    });
```

### 2. GET /matches/:sportId

**Description:** Retrieves a list of matches for a specific sport with optional filtering.

**URL:** `http://localhost:3000/matches/YOUR_SPORT_ID`

**Query Parameters:**
- `status` (optional): Filter by match status (`upcoming`, `live`, `completed`)
- `team` (optional): Filter by team name (partial match)
- `date` (optional): Filter by date (YYYY-MM-DD format)

**Examples:**
- `GET /matches/bask` - All basketball matches
- `GET /matches/bask?status=live` - Only live basketball matches
- `GET /matches/bask?team=Lakers` - Matches involving Lakers
- `GET /matches/bask?date=2025-07-20` - Matches on specific date

**Returns:** A JSON Array of Match objects with enhanced data including team IDs, venue, and status.

### Team Information Endpoints

### 3. GET /teams/:sportId

**Description:** Get all teams for a specific sport.

**URL:** `http://localhost:3000/teams/bask`

**Returns:** Array of team objects with detailed information.

### 4. GET /teams/:sportId/:teamId

**Description:** Get detailed information about a specific team.

**URL:** `http://localhost:3000/teams/bask/lakers`

**Returns:** Team object with full details.

### 5. GET /teams/:sportId/:teamId/stats

**Description:** Get team statistics and performance data.

**URL:** `http://localhost:3000/teams/bask/lakers/stats`

**Returns:** Team statistics including wins, losses, rankings, and performance metrics.

### 6. GET /teams/:sportId/:teamId/players

**Description:** Get team roster and player information.

**URL:** `http://localhost:3000/teams/bask/lakers/players`

**Returns:** Array of player objects with position, number, and details.

### Live Match & Results Endpoints

### 7. GET /matches/:matchId/live

**Description:** Get real-time updates for a live match.

**URL:** `http://localhost:3000/matches/bask-match-002/live`

**Returns:** Live match data including current score, time remaining, and recent events.

### 8. GET /standings/:sportId

**Description:** Get league standings and rankings.

**URL:** `http://localhost:3000/standings/bask`

**Returns:** Array of teams ranked by performance with win/loss records.

### User & Betting Endpoints

### 9. GET /users/:userId

**Description:** Get user account information.

**URL:** `http://localhost:3000/users/user1`

**Returns:** User profile with balance and betting statistics.

### 10. GET /users/:userId/balance

**Description:** Get user's current account balance.

**URL:** `http://localhost:3000/users/user1/balance`

**Returns:** Current balance and currency information.

### 11. GET /bets/:userId

**Description:** Get user's betting history.

**URL:** `http://localhost:3000/bets/user1`

**Returns:** Array of all bets placed by the user.

### 12. POST /bets

**Description:** Place a new bet on a match.

**URL:** `http://localhost:3000/bets`

**Method:** POST

**Body:** JSON object with bet details

**Example:**
```javascript
fetch('http://localhost:3000/bets', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        userId: 'user1',
        matchId: 'bask-match-001',
        betType: 'homeWin',
        amount: 50
    })
})
.then(response => response.json())
.then(result => {
    console.log('Bet placed:', result);
})
.catch(error => {
    console.error('Error placing bet:', error);
});
```

### Search & Discovery Endpoints

### 13. GET /search/teams

**Description:** Search for teams by name or city.

**URL:** `http://localhost:3000/search/teams?q=Lakers`

**Query Parameters:**
- `q` (required): Search query string

**Returns:** Array of matching teams across all sports.

## Data Structures

### Sport Object
Represents a single sport with enhanced information.

| Property    | Type   | Description                | Example                          |
|-------------|--------|----------------------------|----------------------------------|
| id          | string | Unique identifier          | 'bask', 'foot', 'socc'          |
| name        | string | Display name of sport      | 'Basketball', 'Football'         |
| description | string | Brief description          | 'Professional basketball league' |

### Team Object
Represents a sports team with detailed information.

| Property   | Type   | Description                    | Example              |
|------------|--------|--------------------------------|----------------------|
| id         | string | Unique team identifier         | 'lakers'             |
| name       | string | Team name                      | 'Lakers'             |
| city       | string | Team's home city               | 'Los Angeles'        |
| founded    | number | Year team was founded          | 1947                 |
| conference | string | League conference/division     | 'Western', 'Eastern' |

### Match Object
Represents a single sports match with enhanced data.

| Property    | Type   | Description                           | Example                      |
|-------------|--------|---------------------------------------|------------------------------|
| id          | string | Unique identifier for the match       | 'bask-match-001'             |
| sportId     | string | ID of the sport                       | 'bask'                       |
| homeTeam    | string | Name of the home team                 | 'Lakers'                     |
| awayTeam    | string | Name of the away team                 | 'Celtics'                    |
| homeTeamId  | string | ID of the home team                   | 'lakers'                     |
| awayTeamId  | string | ID of the away team                   | 'celtics'                    |
| startTime   | string | ISO 8601 formatted match start time  | '2025-07-20T19:00:00Z'       |
| status      | string | Match status                          | 'upcoming', 'live', 'completed' |
| venue       | string | Match venue/stadium                   | 'Crypto.com Arena'           |
| odds        | object | Object containing betting odds        | See Odds Object below        |
| score       | object | Current/final score (if applicable)   | { home: 68, away: 72 }       |

### Team Statistics Object
Contains team performance statistics.

| Property        | Type   | Description                    | Example |
|-----------------|--------|--------------------------------|---------|
| teamId          | string | Team identifier                | 'lakers' |
| wins            | number | Number of wins                 | 15      |
| losses          | number | Number of losses               | 8       |
| pointsPerGame   | number | Average points scored per game | 112.5   |
| pointsAllowed   | number | Average points allowed per game| 108.2   |
| rank            | number | Current league ranking         | 3       |

### Player Object
Represents a team player.

| Property | Type   | Description           | Example     |
|----------|--------|-----------------------|-------------|
| id       | number | Unique player ID      | 1           |
| name     | string | Player's full name    | 'LeBron James' |
| position | string | Playing position      | 'SF'        |
| number   | number | Jersey number         | 6           |
| age      | number | Player's age          | 40          |

### User Object
Represents a betting user account.

| Property  | Type   | Description              | Example      |
|-----------|--------|--------------------------|--------------|
| id        | string | Unique user identifier   | 'user1'      |
| name      | string | User's display name      | 'John Doe'   |
| balance   | number | Account balance          | 1000.00      |
| totalBets | number | Total number of bets     | 5            |
| winRate   | number | Win percentage (0-1)     | 0.60         |

### Bet Object
Represents a placed bet.

| Property  | Type   | Description                    | Example            |
|-----------|--------|--------------------------------|--------------------|
| id        | string | Unique bet identifier          | 'bet-001'          |
| userId    | string | ID of user who placed bet      | 'user1'            |
| matchId   | string | ID of match bet is on          | 'bask-match-001'   |
| betType   | string | Type of bet                    | 'homeWin', 'awayWin' |
| amount    | number | Bet amount                     | 50                 |
| odds      | number | Odds when bet was placed       | 1.85               |
| status    | string | Bet status                     | 'pending', 'won', 'lost' |
| createdAt | string | When bet was placed            | '2025-07-19T...'   |

### Odds Object (nested within Match object)
Contains the simulated odds for a match.

| Property | Type   | Description                               | Example |
|----------|--------|-------------------------------------------|---------|
| homeWin  | number | Odds for the home team to win             | 1.85    |
| awayWin  | number | Odds for the away team to win             | 2.10    |
| draw     | number | Odds for a draw (optional, e.g., for Soccer) | 3.40    |

### Live Match Data Object
Real-time match information for live games.

| Property     | Type   | Description                    | Example                  |
|--------------|--------|--------------------------------|--------------------------|
| matchId      | string | Match identifier               | 'bask-match-002'         |
| status       | string | Current match status           | 'live'                   |
| score        | object | Current score                  | { home: 68, away: 72 }   |
| quarter      | number | Current quarter/period         | 3                        |
| timeRemaining| string | Time left in current period    | '8:45'                   |
| lastUpdate   | string | Timestamp of last update       | '2025-07-19T...'         |
| events       | array  | Recent match events            | [{ time: '15:30', event: '...' }] |

## Educational Learning Paths

For comprehensive learning scenarios and progressive exercises, see [EDUCATIONAL_SCENARIOS.md](./EDUCATIONAL_SCENARIOS.md) which includes:

- **Sequential API Call Workflows**: Chain multiple endpoints for complex data analysis
- **Error Handling Exercises**: Practice with different error scenarios
- **Real-time Data Monitoring**: Implement live updates and polling
- **Betting Simulation System**: Complete user workflow with balance management
- **Advanced Search & Filtering**: Dynamic filtering and search implementation
- **Progressive Complexity Levels**: From beginner to advanced exercises

## Quick Start Examples

### Basic Sports Discovery
```javascript
// 1. Get all sports
const sports = await fetch('http://localhost:3000/sports').then(r => r.json());

// 2. Get teams for basketball
const teams = await fetch('http://localhost:3000/teams/bask').then(r => r.json());

// 3. Get Lakers stats
const stats = await fetch('http://localhost:3000/teams/bask/lakers/stats').then(r => r.json());
```

### Match Analysis Workflow
```javascript
// 1. Get upcoming basketball matches
const matches = await fetch('http://localhost:3000/matches/bask?status=upcoming').then(r => r.json());

// 2. For each match, get team stats for analysis
for (const match of matches) {
    const homeStats = await fetch(`http://localhost:3000/teams/bask/${match.homeTeamId}/stats`).then(r => r.json());
    const awayStats = await fetch(`http://localhost:3000/teams/bask/${match.awayTeamId}/stats`).then(r => r.json());
    // Analyze and compare team performance
}
```

### Betting Simulation
```javascript
// 1. Check user balance
const balance = await fetch('http://localhost:3000/users/user1/balance').then(r => r.json());

// 2. Place a bet
const betResult = await fetch('http://localhost:3000/bets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        userId: 'user1',
        matchId: 'bask-match-001',
        betType: 'homeWin',
        amount: 50
    })
}).then(r => r.json());
```

