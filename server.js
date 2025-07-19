// server.js
// This file sets up a simple Node.js Express server to serve mock sports data
// over HTTP endpoints.

// 1. Import necessary modules
const express = require('express'); // Express.js for building the web server
const cors = require('cors');     // CORS middleware to allow requests from different origins

// 2. Initialize the Express application
const app = express();
const PORT = 3000; // The port your server will listen on

// 3. Enable CORS for all routes
// This is crucial! It allows your client-side HTML (which might be served from
// a different origin, like 'file://' or a different localhost port) to make
// requests to this server without being blocked by browser security policies.
app.use(cors());

// 4. Define your mock data (moved from the original mockApi.js)
const mockSportsData = {
    sports: [
        { id: 'bask', name: 'Basketball' },
        { id: 'foot', name: 'Football' },
        { id: 'socc', name: 'Soccer' }
    ],
    matches: [
        // Basketball Matches
        {
            id: 'bask-match-001',
            sportId: 'bask',
            homeTeam: 'Lakers',
            awayTeam: 'Celtics',
            startTime: '2025-07-20T19:00:00Z',
            odds: {
                homeWin: 1.85,
                awayWin: 2.10
            }
        },
        {
            id: 'bask-match-002',
            sportId: 'bask',
            homeTeam: 'Warriors',
            awayTeam: 'Nuggets',
            startTime: '2025-07-20T21:30:00Z',
            odds: {
                homeWin: 1.60,
                awayWin: 2.50
            }
        },
        {
            id: 'bask-match-003',
            sportId: 'bask',
            homeTeam: 'Bulls',
            awayTeam: 'Knicks',
            startTime: '2025-07-21T18:00:00Z',
            odds: {
                homeWin: 2.00,
                awayWin: 1.90
            }
        },
        // Football Matches
        {
            id: 'foot-match-001',
            sportId: 'foot',
            homeTeam: 'Cowboys',
            awayTeam: 'Eagles',
            startTime: '2025-07-21T13:00:00Z',
            odds: {
                homeWin: 1.70,
                awayWin: 2.25
            }
        },
        {
            id: 'foot-match-002',
            sportId: 'foot',
            homeTeam: 'Chiefs',
            awayTeam: 'Broncos',
            startTime: '2025-07-21T16:25:00Z',
            odds: {
                homeWin: 1.30,
                awayWin: 3.50
            }
        },
        // Soccer Matches
        {
            id: 'socc-match-001',
            sportId: 'socc',
            homeTeam: 'Real Madrid',
            awayTeam: 'Barcelona',
            startTime: '2025-07-22T15:00:00Z',
            odds: {
                homeWin: 2.20,
                draw: 3.40,
                awayWin: 3.10
            }
        },
        {
            id: 'socc-match-002',
            sportId: 'socc',
            homeTeam: 'Man Utd',
            awayTeam: 'Liverpool',
            startTime: '2025-07-22T19:45:00Z',
            odds: {
                homeWin: 2.50,
                draw: 3.20,
                awayWin: 2.80
            }
        }
    ]
};

// 5. Define API Endpoints

// GET /sports - Returns a list of all available sports
app.get('/sports', (req, res) => {
    // Simulate a slight delay for a more realistic API feel
    setTimeout(() => {
        res.json(mockSportsData.sports);
    }, 100);
});

// GET /matches/:sportId - Returns matches for a specific sport
app.get('/matches/:sportId', (req, res) => {
    const sportId = req.params.sportId; // Get the sportId from the URL parameter
    // Filter matches based on the provided sportId
    const matches = mockSportsData.matches.filter(match => match.sportId === sportId);

    // Simulate a slight delay
    setTimeout(() => {
        if (matches.length > 0) {
            res.json(matches);
        } else {
            // If no matches found, send a 404 Not Found response
            res.status(404).json({ message: `No matches found for sportId: ${sportId}` });
        }
    }, 150);
});

// 6. Start the server
app.listen(PORT, () => {
    console.log(`Mock Sports Data API server running at http://localhost:${PORT}`);
    console.log(`Access /sports at: http://localhost:${PORT}/sports`);
    console.log(`Access /matches/bask at: http://localhost:${PORT}/matches/bask`);
});
