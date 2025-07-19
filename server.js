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

// 4. Define your mock data (expanded for educational purposes)
const mockSportsData = {
    sports: [
        { id: 'bask', name: 'Basketball', description: 'Professional basketball league' },
        { id: 'foot', name: 'Football', description: 'American football league' },
        { id: 'socc', name: 'Soccer', description: 'International football/soccer league' }
    ],

    teams: {
        bask: [
            { id: 'lakers', name: 'Lakers', city: 'Los Angeles', founded: 1947, conference: 'Western' },
            { id: 'celtics', name: 'Celtics', city: 'Boston', founded: 1946, conference: 'Eastern' },
            { id: 'warriors', name: 'Warriors', city: 'Golden State', founded: 1946, conference: 'Western' },
            { id: 'nuggets', name: 'Nuggets', city: 'Denver', founded: 1967, conference: 'Western' },
            { id: 'bulls', name: 'Bulls', city: 'Chicago', founded: 1966, conference: 'Eastern' },
            { id: 'knicks', name: 'Knicks', city: 'New York', founded: 1946, conference: 'Eastern' }
        ],
        foot: [
            { id: 'cowboys', name: 'Cowboys', city: 'Dallas', founded: 1960, conference: 'NFC' },
            { id: 'eagles', name: 'Eagles', city: 'Philadelphia', founded: 1933, conference: 'NFC' },
            { id: 'chiefs', name: 'Chiefs', city: 'Kansas City', founded: 1960, conference: 'AFC' },
            { id: 'broncos', name: 'Broncos', city: 'Denver', founded: 1960, conference: 'AFC' }
        ],
        socc: [
            { id: 'realmadrid', name: 'Real Madrid', city: 'Madrid', founded: 1902, league: 'La Liga' },
            { id: 'barcelona', name: 'Barcelona', city: 'Barcelona', founded: 1899, league: 'La Liga' },
            { id: 'manutd', name: 'Man Utd', city: 'Manchester', founded: 1878, league: 'Premier League' },
            { id: 'liverpool', name: 'Liverpool', city: 'Liverpool', founded: 1892, league: 'Premier League' }
        ]
    },

    teamStats: {
        lakers: { wins: 15, losses: 8, pointsPerGame: 112.5, pointsAllowed: 108.2, rank: 3 },
        celtics: { wins: 18, losses: 5, pointsPerGame: 118.7, pointsAllowed: 105.1, rank: 1 },
        warriors: { wins: 16, losses: 7, pointsPerGame: 115.3, pointsAllowed: 110.8, rank: 2 },
        nuggets: { wins: 14, losses: 9, pointsPerGame: 111.2, pointsAllowed: 109.5, rank: 4 },
        bulls: { wins: 10, losses: 13, pointsPerGame: 105.8, pointsAllowed: 112.3, rank: 8 },
        knicks: { wins: 12, losses: 11, pointsPerGame: 108.9, pointsAllowed: 107.6, rank: 6 },
        cowboys: { wins: 12, losses: 4, pointsPerGame: 28.5, pointsAllowed: 19.2, rank: 2 },
        eagles: { wins: 11, losses: 5, pointsPerGame: 25.8, pointsAllowed: 21.1, rank: 3 },
        chiefs: { wins: 14, losses: 2, pointsPerGame: 31.2, pointsAllowed: 17.8, rank: 1 },
        broncos: { wins: 8, losses: 8, pointsPerGame: 22.3, pointsAllowed: 24.7, rank: 7 }
    },

    players: {
        lakers: [
            { id: 1, name: 'LeBron James', position: 'SF', number: 6, age: 40 },
            { id: 2, name: 'Anthony Davis', position: 'PF/C', number: 3, age: 31 },
            { id: 3, name: 'Austin Reaves', position: 'SG', number: 15, age: 26 }
        ],
        celtics: [
            { id: 4, name: 'Jayson Tatum', position: 'SF', number: 0, age: 26 },
            { id: 5, name: 'Jaylen Brown', position: 'SG', number: 7, age: 28 },
            { id: 6, name: 'Kristaps Porzingis', position: 'C', number: 8, age: 29 }
        ]
    },

    users: {
        user1: { id: 'user1', name: 'John Doe', balance: 1000.00, totalBets: 5, winRate: 0.60 },
        user2: { id: 'user2', name: 'Jane Smith', balance: 750.50, totalBets: 8, winRate: 0.75 }
    },

    bets: [
        { id: 'bet-001', userId: 'user1', matchId: 'bask-match-001', betType: 'homeWin', amount: 50, odds: 1.85, status: 'pending' },
        { id: 'bet-002', userId: 'user2', matchId: 'foot-match-001', betType: 'awayWin', amount: 25, odds: 2.25, status: 'pending' }
    ],
    matches: [
        // Basketball Matches
        {
            id: 'bask-match-001',
            sportId: 'bask',
            homeTeam: 'Lakers',
            awayTeam: 'Celtics',
            homeTeamId: 'lakers',
            awayTeamId: 'celtics',
            startTime: '2025-07-20T19:00:00Z',
            status: 'upcoming',
            venue: 'Crypto.com Arena',
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
            homeTeamId: 'warriors',
            awayTeamId: 'nuggets',
            startTime: '2025-07-20T21:30:00Z',
            status: 'live',
            venue: 'Chase Center',
            score: { home: 68, away: 72 },
            quarter: 3,
            timeRemaining: '8:45',
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
            homeTeamId: 'bulls',
            awayTeamId: 'knicks',
            startTime: '2025-07-18T18:00:00Z',
            status: 'completed',
            venue: 'United Center',
            finalScore: { home: 105, away: 112 },
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
            homeTeamId: 'cowboys',
            awayTeamId: 'eagles',
            startTime: '2025-07-21T13:00:00Z',
            status: 'upcoming',
            venue: 'AT&T Stadium',
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
            homeTeamId: 'chiefs',
            awayTeamId: 'broncos',
            startTime: '2025-07-21T16:25:00Z',
            status: 'upcoming',
            venue: 'Arrowhead Stadium',
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
            homeTeamId: 'realmadrid',
            awayTeamId: 'barcelona',
            startTime: '2025-07-22T15:00:00Z',
            status: 'upcoming',
            venue: 'Santiago Bernabeu',
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
            homeTeamId: 'manutd',
            awayTeamId: 'liverpool',
            startTime: '2025-07-22T19:45:00Z',
            status: 'upcoming',
            venue: 'Old Trafford',
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

// GET /matches/:sportId - Returns matches for a specific sport (enhanced with filters)
app.get('/matches/:sportId', (req, res) => {
    const sportId = req.params.sportId;
    const { status, team, date } = req.query;

    let matches = mockSportsData.matches.filter(match => match.sportId === sportId);

    // Apply filters
    if (status) {
        matches = matches.filter(match => match.status === status);
    }

    if (team) {
        matches = matches.filter(match =>
            match.homeTeam.toLowerCase().includes(team.toLowerCase()) ||
            match.awayTeam.toLowerCase().includes(team.toLowerCase())
        );
    }

    if (date) {
        matches = matches.filter(match =>
            match.startTime.startsWith(date)
        );
    }

    setTimeout(() => {
        if (matches.length > 0) {
            res.json(matches);
        } else {
            res.status(404).json({ message: `No matches found for sportId: ${sportId} with applied filters` });
        }
    }, 150);
});

// === NEW ENHANCED ENDPOINTS FOR EDUCATIONAL PURPOSES ===

// GET /teams/:sportId - Get all teams for a specific sport
app.get('/teams/:sportId', (req, res) => {
    const sportId = req.params.sportId;
    const teams = mockSportsData.teams[sportId];

    setTimeout(() => {
        if (teams) {
            res.json(teams);
        } else {
            res.status(404).json({ message: `No teams found for sportId: ${sportId}` });
        }
    }, 100);
});

// GET /teams/:sportId/:teamId - Get detailed team information
app.get('/teams/:sportId/:teamId', (req, res) => {
    const { sportId, teamId } = req.params;
    const teams = mockSportsData.teams[sportId];

    setTimeout(() => {
        if (teams) {
            const team = teams.find(t => t.id === teamId);
            if (team) {
                res.json(team);
            } else {
                res.status(404).json({ message: `Team ${teamId} not found in ${sportId}` });
            }
        } else {
            res.status(404).json({ message: `Sport ${sportId} not found` });
        }
    }, 120);
});

// GET /teams/:sportId/:teamId/stats - Get team statistics
app.get('/teams/:sportId/:teamId/stats', (req, res) => {
    const { teamId } = req.params;
    const stats = mockSportsData.teamStats[teamId];

    setTimeout(() => {
        if (stats) {
            res.json({ teamId, ...stats });
        } else {
            res.status(404).json({ message: `No stats found for team: ${teamId}` });
        }
    }, 150);
});

// GET /teams/:sportId/:teamId/players - Get team roster
app.get('/teams/:sportId/:teamId/players', (req, res) => {
    const { teamId } = req.params;
    const players = mockSportsData.players[teamId];

    setTimeout(() => {
        if (players) {
            res.json(players);
        } else {
            res.status(404).json({ message: `No players found for team: ${teamId}` });
        }
    }, 130);
});

// GET /matches/:matchId/live - Get live match updates
app.get('/matches/:matchId/live', (req, res) => {
    const matchId = req.params.matchId;
    const match = mockSportsData.matches.find(m => m.id === matchId);

    setTimeout(() => {
        if (match) {
            if (match.status === 'live') {
                // Simulate live updates
                const liveData = {
                    matchId: match.id,
                    status: match.status,
                    score: match.score,
                    quarter: match.quarter,
                    timeRemaining: match.timeRemaining,
                    lastUpdate: new Date().toISOString(),
                    events: [
                        { time: '15:30', event: 'Goal scored by ' + match.homeTeam },
                        { time: '12:45', event: 'Yellow card for ' + match.awayTeam }
                    ]
                };
                res.json(liveData);
            } else {
                res.json({
                    matchId: match.id,
                    status: match.status,
                    message: 'Match is not currently live'
                });
            }
        } else {
            res.status(404).json({ message: `Match ${matchId} not found` });
        }
    }, 200);
});

// GET /standings/:sportId - Get league standings
app.get('/standings/:sportId', (req, res) => {
    const sportId = req.params.sportId;
    const teams = mockSportsData.teams[sportId];

    setTimeout(() => {
        if (teams) {
            // Create standings from team stats
            const standings = teams.map(team => {
                const stats = mockSportsData.teamStats[team.id];
                return {
                    rank: stats?.rank || 0,
                    team: team.name,
                    teamId: team.id,
                    wins: stats?.wins || 0,
                    losses: stats?.losses || 0,
                    winPercentage: stats ? (stats.wins / (stats.wins + stats.losses)).toFixed(3) : '0.000'
                };
            }).sort((a, b) => a.rank - b.rank);

            res.json(standings);
        } else {
            res.status(404).json({ message: `No standings found for sportId: ${sportId}` });
        }
    }, 180);
});

// GET /users/:userId - Get user information
app.get('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    const user = mockSportsData.users[userId];

    setTimeout(() => {
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: `User ${userId} not found` });
        }
    }, 100);
});

// GET /users/:userId/balance - Get user's account balance
app.get('/users/:userId/balance', (req, res) => {
    const userId = req.params.userId;
    const user = mockSportsData.users[userId];

    setTimeout(() => {
        if (user) {
            res.json({
                userId: user.id,
                balance: user.balance,
                currency: 'USD'
            });
        } else {
            res.status(404).json({ message: `User ${userId} not found` });
        }
    }, 90);
});

// GET /bets/:userId - Get user's betting history
app.get('/bets/:userId', (req, res) => {
    const userId = req.params.userId;
    const userBets = mockSportsData.bets.filter(bet => bet.userId === userId);

    setTimeout(() => {
        res.json(userBets);
    }, 120);
});

// POST /bets - Place a new bet (simplified for educational purposes)
app.use(express.json()); // Enable JSON body parsing for POST requests
app.post('/bets', (req, res) => {
    const { userId, matchId, betType, amount } = req.body;

    // Basic validation
    if (!userId || !matchId || !betType || !amount) {
        return res.status(400).json({
            message: 'Missing required fields: userId, matchId, betType, amount'
        });
    }

    // Check if user exists and has sufficient balance
    const user = mockSportsData.users[userId];
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (user.balance < amount) {
        return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Find the match to get odds
    const match = mockSportsData.matches.find(m => m.id === matchId);
    if (!match) {
        return res.status(404).json({ message: 'Match not found' });
    }

    // Create new bet
    const newBet = {
        id: `bet-${Date.now()}`,
        userId,
        matchId,
        betType,
        amount,
        odds: match.odds[betType] || 1.0,
        status: 'pending',
        createdAt: new Date().toISOString()
    };

    // Add bet to mock data and update user balance
    mockSportsData.bets.push(newBet);
    user.balance -= amount;

    setTimeout(() => {
        res.status(201).json({
            message: 'Bet placed successfully',
            bet: newBet,
            newBalance: user.balance
        });
    }, 200);
});

// GET /search/teams - Search teams by name
app.get('/search/teams', (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ message: 'Query parameter "q" is required' });
    }

    const allTeams = [];
    Object.keys(mockSportsData.teams).forEach(sportId => {
        mockSportsData.teams[sportId].forEach(team => {
            allTeams.push({ ...team, sportId });
        });
    });

    const results = allTeams.filter(team =>
        team.name.toLowerCase().includes(query.toLowerCase()) ||
        team.city.toLowerCase().includes(query.toLowerCase())
    );

    setTimeout(() => {
        res.json(results);
    }, 150);
});

// GET /bets/:userId/active - Get user's active (pending) bets
app.get('/bets/:userId/active', (req, res) => {
    const userId = req.params.userId;
    const activeBets = mockSportsData.bets.filter(bet =>
        bet.userId === userId && bet.status === 'pending'
    );

    setTimeout(() => {
        res.json({
            userId,
            activeBetsCount: activeBets.length,
            totalPotentialWinnings: activeBets.reduce((sum, bet) =>
                sum + (bet.amount * bet.odds), 0
            ).toFixed(2),
            activeBets
        });
    }, 110);
});

// GET /bets/bet/:betId - Get specific bet details
app.get('/bets/bet/:betId', (req, res) => {
    const betId = req.params.betId;
    const bet = mockSportsData.bets.find(b => b.id === betId);

    setTimeout(() => {
        if (bet) {
            // Include match details for context
            const match = mockSportsData.matches.find(m => m.id === bet.matchId);
            res.json({
                ...bet,
                matchDetails: match,
                potentialWinnings: (bet.amount * bet.odds).toFixed(2)
            });
        } else {
            res.status(404).json({ message: `Bet ${betId} not found` });
        }
    }, 120);
});

// PUT /bets/bet/:betId/cancel - Cancel a pending bet (educational feature)
app.put('/bets/bet/:betId/cancel', (req, res) => {
    const betId = req.params.betId;
    const bet = mockSportsData.bets.find(b => b.id === betId);

    if (!bet) {
        return res.status(404).json({ message: `Bet ${betId} not found` });
    }

    if (bet.status !== 'pending') {
        return res.status(400).json({
            message: `Cannot cancel bet with status: ${bet.status}`
        });
    }

    // Update bet status and refund user
    bet.status = 'cancelled';
    bet.cancelledAt = new Date().toISOString();

    const user = mockSportsData.users[bet.userId];
    if (user) {
        user.balance += bet.amount; // Refund the bet amount
    }

    setTimeout(() => {
        res.json({
            message: 'Bet cancelled successfully',
            bet,
            refundAmount: bet.amount,
            newBalance: user ? user.balance : null
        });
    }, 150);
});

// GET /users/:userId/stats - Get comprehensive user betting statistics
app.get('/users/:userId/stats', (req, res) => {
    const userId = req.params.userId;
    const user = mockSportsData.users[userId];

    if (!user) {
        return res.status(404).json({ message: `User ${userId} not found` });
    }

    const userBets = mockSportsData.bets.filter(bet => bet.userId === userId);
    const activeBets = userBets.filter(bet => bet.status === 'pending');
    const completedBets = userBets.filter(bet => bet.status !== 'pending');
    const totalWagered = userBets.reduce((sum, bet) => sum + bet.amount, 0);
    const totalPotentialWinnings = activeBets.reduce((sum, bet) =>
        sum + (bet.amount * bet.odds), 0
    );

    setTimeout(() => {
        res.json({
            userId: user.id,
            name: user.name,
            currentBalance: user.balance,
            totalBets: userBets.length,
            activeBets: activeBets.length,
            completedBets: completedBets.length,
            totalWagered: totalWagered.toFixed(2),
            totalPotentialWinnings: totalPotentialWinnings.toFixed(2),
            winRate: user.winRate,
            accountStatus: user.balance > 0 ? 'active' : 'low_balance'
        });
    }, 140);
});

// === DEMONSTRATION FUNCTIONS FOR EDUCATIONAL PURPOSES ===

// Helper function to demonstrate memory persistence (logs to console)
function demonstratePersistence() {
    console.log('\n🎯 Memory Persistence Demonstration:');
    console.log('   Initial bets in memory:', mockSportsData.bets.length);
    console.log('   User1 balance:', mockSportsData.users.user1.balance);
    console.log('   User2 balance:', mockSportsData.users.user2.balance);
    console.log('\n💡 Students can:');
    console.log('   1. POST /bets - Place a bet (balance decreases, bet added to memory)');
    console.log('   2. GET /bets/:userId - Query their bets (see newly placed bet)');
    console.log('   3. GET /users/:userId/balance - Check updated balance');
    console.log('   4. GET /bets/:userId/active - See pending bets');
    console.log('   5. PUT /bets/bet/:betId/cancel - Cancel bet (balance restored)');
    console.log('   ✨ All changes persist in memory until server restart!');
}

// Call demonstration function on startup
setTimeout(demonstratePersistence, 1000);

// 6. Start the server
app.listen(PORT, () => {
    console.log(`🚀 Enhanced Sports Data API server running at http://localhost:${PORT}`);
    console.log('\n📋 Available Endpoints:');
    console.log('   Basic:');
    console.log(`   GET  /sports                     - All available sports`);
    console.log(`   GET  /matches/:sportId           - Matches for a sport (with filters)`);
    console.log('\n   Teams:');
    console.log(`   GET  /teams/:sportId             - All teams for a sport`);
    console.log(`   GET  /teams/:sportId/:teamId     - Team details`);
    console.log(`   GET  /teams/:sportId/:teamId/stats - Team statistics`);
    console.log(`   GET  /teams/:sportId/:teamId/players - Team roster`);
    console.log('\n   Live & Results:');
    console.log(`   GET  /matches/:matchId/live      - Live match updates`);
    console.log(`   GET  /standings/:sportId         - League standings`);
    console.log('\n   Users & Betting:');
    console.log(`   GET  /users/:userId              - User information`);
    console.log(`   GET  /users/:userId/balance      - User balance`);
    console.log(`   GET  /users/:userId/stats        - User betting statistics`);
    console.log(`   GET  /bets/:userId               - User's betting history`);
    console.log(`   GET  /bets/:userId/active        - User's active bets`);
    console.log(`   GET  /bets/bet/:betId            - Specific bet details`);
    console.log(`   POST /bets                       - Place a new bet`);
    console.log(`   PUT  /bets/bet/:betId/cancel     - Cancel a pending bet`);
    console.log(`   GET  /bets/:userId/active       - Get user's active bets`);
    console.log(`   GET  /bets/bet/:betId           - Get specific bet details`);
    console.log(`   PUT  /bets/bet/:betId/cancel    - Cancel a pending bet`);
    console.log(`   GET  /users/:userId/stats       - Get user betting statistics`);
    console.log('\n   Search:');
    console.log(`   GET  /search/teams?q=query      - Search teams`);
    console.log('\n💡 Example URLs:');
    console.log(`   http://localhost:${PORT}/sports`);
    console.log(`   http://localhost:${PORT}/teams/bask`);
    console.log(`   http://localhost:${PORT}/teams/bask/lakers/stats`);
    console.log(`   http://localhost:${PORT}/matches/bask?status=live`);
    console.log(`   http://localhost:${PORT}/standings/bask`);
    console.log('\n📚 See EDUCATIONAL_SCENARIOS.md for learning exercises!');
});
