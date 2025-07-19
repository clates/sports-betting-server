# Educational API Learning Scenarios

This document provides structured learning scenarios for new developers to practice sequential API calls and data interpretation using the Sports Betting API.

## Learning Objectives

Students will learn to:
1. Make sequential API calls that depend on previous responses
2. Handle different HTTP methods (GET, POST)
3. Parse and interpret JSON data structures
4. Handle API errors and edge cases
5. Implement filtering and search functionality
6. Work with nested data relationships

## Scenario 1: Sports Discovery & Team Analysis
**Duration**: 45-60 minutes | **Team Size**: 2-3 students | **Difficulty**: Beginner

### **Collaborative Objective**
Work together to build a **Team Scouting Dashboard** where you discover sports, analyze team performance, and make data-driven recommendations about which teams are strongest.

### **Team Roles**
- **Data Collector**: Responsible for making API calls and gathering raw data
- **Analyst**: Interprets the data and calculates comparisons
- **Presenter**: Creates visual displays and explains findings to class

### **Step-by-Step Activity**

#### **Phase 1: Sports Discovery (10 minutes)**
```javascript
// 1. Start by discovering what sports are available
const response = await fetch('http://localhost:3000/sports');
const sports = await response.json();
console.log('Available sports:', sports);
```

**Collaborative Task**: As a team, choose ONE sport to focus on. Discuss why you chose it and what you expect to find.

#### **Phase 2: Team Exploration (15 minutes)**
```javascript
// 2. Get all teams for your chosen sport
const teamsResponse = await fetch('http://localhost:3000/teams/bask'); // Replace 'bask' with your sport
const teams = await teamsResponse.json();
console.log('Teams in this sport:', teams);
```

**Team Activity**: 
- **Data Collector**: Fetch team data
- **Analyst**: Count teams, identify conferences/leagues
- **Presenter**: Create a simple list to display to class

#### **Phase 3: Deep Dive Analysis (20 minutes)**
```javascript
// 3. Pick 2-3 teams and get detailed information
const team1Info = await fetch('http://localhost:3000/teams/bask/lakers').then(r => r.json());
const team1Stats = await fetch('http://localhost:3000/teams/bask/lakers/stats').then(r => r.json());
const team1Players = await fetch('http://localhost:3000/teams/bask/lakers/players').then(r => r.json());

// Repeat for team2 and team3...
```

**Collaborative Analysis**:
- **Data Collector**: Gather stats for 3 different teams
- **Analyst**: Calculate win percentages, compare offensive/defensive stats
- **Presenter**: Prepare a "scouting report" comparing the teams

#### **Phase 4: Team Comparison Challenge**
Create a function together that determines the "best" team:

```javascript
function rankTeams(teamStats) {
    // Your team decides: What makes a team "best"?
    // Win percentage? Offensive power? Defensive strength?
    // Work together to create the ranking algorithm
}
```

### **Collaborative Challenges**
1. **Team Debate**: What stat is most important - wins, points per game, or defense?
2. **Data Detective**: Which team has the most surprising win/loss record compared to their stats?
3. **Scout Report**: Present your top team recommendation to another group
4. **Coach's Decision**: If you could trade any player between teams, who and why?

### **Deliverable**
Create a 3-minute presentation answering: "Which team should we bet on and why?" Include data to support your recommendation.

## Scenario 2: Match Analysis & Prediction Engine
**Duration**: 60-75 minutes | **Team Size**: 3-4 students | **Difficulty**: Intermediate

### **Collaborative Objective**
Build a **Match Prediction Engine** that analyzes upcoming games and predicts winners using data science principles. Your team will become "sports analysts" making predictions based on real data.

### **Team Roles**
- **Data Engineer**: Fetches and organizes match and team data
- **Statistical Analyst**: Calculates team performance metrics and comparisons
- **Odds Analyst**: Compares your predictions with betting odds to find value
- **Presenter**: Communicates findings and predictions to the class

### **Step-by-Step Activity**

#### **Phase 1: Match Discovery (15 minutes)**
```javascript
// 1. Find all upcoming matches for your sport
const upcomingMatches = await fetch('http://localhost:3000/matches/bask?status=upcoming')
    .then(r => r.json());
console.log('Upcoming matches:', upcomingMatches);
```

**Team Discussion**: Pick 2-3 upcoming matches that look most interesting. What makes a match exciting to analyze?

#### **Phase 2: Team Intelligence Gathering (25 minutes)**
For each match, gather comprehensive team data:

```javascript
// 2. For each match, get detailed team analysis
async function analyzeMatch(match) {
    const homeStats = await fetch(`http://localhost:3000/teams/bask/${match.homeTeamId}/stats`)
        .then(r => r.json());
    const awayStats = await fetch(`http://localhost:3000/teams/bask/${match.awayTeamId}/stats`)
        .then(r => r.json());
    
    // Get league standings for context
    const standings = await fetch('http://localhost:3000/standings/bask')
        .then(r => r.json());
    
    return { match, homeStats, awayStats, standings };
}
```

**Collaborative Task**: 
- **Data Engineer**: Collect all the raw data
- **Statistical Analyst**: Calculate key metrics (win %, offensive rating, defensive rating)
- **Odds Analyst**: Record the current betting odds for comparison

#### **Phase 3: Prediction Algorithm Development (20 minutes)**
Work together to create your prediction model:

```javascript
function predictWinner(homeStats, awayStats, standings) {
    // Collaborate to decide: What factors matter most?
    
    // Example factors to consider:
    const homeAdvantage = 0.6; // Home teams have slight advantage
    const winPercentageWeight = 0.4;
    const offensiveWeight = 0.3;
    const defensiveWeight = 0.3;
    
    // Your team's algorithm goes here!
    // Debate and decide together how to weight these factors
    
    return {
        predictedWinner: 'home' | 'away',
        confidence: 0.75, // How confident is your prediction?
        reasoning: 'Your team\'s explanation'
    };
}
```

**Team Challenge**: Each team member proposes a different factor that should influence the prediction. Debate and vote on the final algorithm.

#### **Phase 4: Market Analysis (15 minutes)**
Compare your predictions with the betting market:

```javascript
// 3. Analyze if your predictions disagree with the odds
function findValueBets(predictions, odds) {
    // If you predict Team A will win, but odds favor Team B,
    // you might have found a "value bet"
    
    // Discuss: When do your predictions disagree with the market?
}
```

**Collaborative Analysis**:
- Do your predictions match the betting odds?
- Where do you disagree with the market, and why?
- Which prediction are you most confident about?

### **Collaborative Challenges**
1. **Algorithm Battle**: Compare your prediction method with another team's approach
2. **Devil's Advocate**: Have one team member argue against your predictions
3. **Confidence Calibration**: Rank your predictions from most to least confident
4. **Market Efficiency**: Discuss why betting odds might be different from your analysis

### **Final Team Presentation (5 minutes)**
Present your **top prediction** with:
- Which team will win and why
- What data supports your prediction
- How confident you are (1-10 scale)
- Whether you disagree with the betting odds

### **Extension Activity**
**Track Your Predictions**: Come back tomorrow and see how your predictions performed!

## Scenario 3: Live Sports Command Center
**Duration**: 45-60 minutes | **Team Size**: 2-4 students | **Difficulty**: Intermediate

### **Collaborative Objective**
Create a **Live Sports Command Center** that monitors games in real-time. Your team will act as a "broadcast crew" providing live updates and commentary on ongoing matches.

### **Team Roles**
- **Technical Director**: Manages the live data feeds and polling
- **Play-by-Play Announcer**: Interprets live events and score changes
- **Color Commentator**: Provides context about team performance and strategy
- **Graphics Coordinator**: Creates visual displays of live data

### **Step-by-Step Activity**

#### **Phase 1: Find the Action (10 minutes)**
```javascript
// 1. Discover what games are happening RIGHT NOW
const liveMatches = await fetch('http://localhost:3000/matches/bask?status=live')
    .then(r => r.json());
console.log('Live matches currently:', liveMatches);

// If no live matches, find the most recent upcoming match
const upcomingMatches = await fetch('http://localhost:3000/matches/bask?status=upcoming')
    .then(r => r.json());
```

**Team Discussion**: Choose one live match to monitor. If no live matches exist, pick an upcoming match and "pretend" it's live for the exercise.

#### **Phase 2: Establish Your Command Center (15 minutes)**
Set up your live monitoring system:

```javascript
// 2. Get initial match state
let currentMatch = null;
let lastUpdate = null;

async function getCurrentMatchState(matchId) {
    try {
        const liveData = await fetch(`http://localhost:3000/matches/${matchId}/live`)
            .then(r => r.json());
        return liveData;
    } catch (error) {
        console.log('Match might not be live yet');
        return null;
    }
}

// 3. Set up automatic updates
async function startLiveMonitoring(matchId) {
    console.log('📺 LIVE BROADCAST STARTING...');
    
    setInterval(async () => {
        const newData = await getCurrentMatchState(matchId);
        if (newData && JSON.stringify(newData) !== JSON.stringify(currentMatch)) {
            // Something changed! Announce it!
            announceUpdate(currentMatch, newData);
            currentMatch = newData;
        }
    }, 15000); // Check every 15 seconds
}
```

**Collaborative Setup**:
- **Technical Director**: Implement the polling system
- **Play-by-Play**: Design the announcement function
- **Color Commentator**: Prepare background info about both teams
- **Graphics Coordinator**: Plan how to display score changes

#### **Phase 3: Live Commentary System (20 minutes)**
Create your broadcast commentary system:

```javascript
// 4. Develop your commentary system
function announceUpdate(oldData, newData) {
    // Play-by-Play Announcer leads this function
    
    if (!oldData) {
        console.log(`🏀 Welcome to ${newData.homeTeam} vs ${newData.awayTeam}!`);
        console.log(`📊 Current score: ${newData.score?.home || 0} - ${newData.score?.away || 0}`);
        return;
    }
    
    // Check for score changes
    if (newData.score?.home !== oldData.score?.home) {
        console.log(`🔥 SCORE! ${newData.homeTeam} scores! New score: ${newData.score.home} - ${newData.score.away}`);
    }
    
    if (newData.score?.away !== oldData.score?.away) {
        console.log(`⚡ SCORE! ${newData.awayTeam} scores! New score: ${newData.score.home} - ${newData.score.away}`);
    }
    
    // Check for time changes
    if (newData.quarter !== oldData.quarter) {
        console.log(`📢 End of Quarter ${oldData.quarter}! Starting Quarter ${newData.quarter}`);
    }
    
    // Add your team's custom commentary here!
}

// 5. Add color commentary
async function addColorCommentary(matchData) {
    // Color Commentator leads this
    const homeStats = await fetch(`http://localhost:3000/teams/bask/${matchData.homeTeamId}/stats`)
        .then(r => r.json());
    const awayStats = await fetch(`http://localhost:3000/teams/bask/${matchData.awayTeamId}/stats`)
        .then(r => r.json());
    
    // Provide insights based on team stats
    console.log(`📊 ${matchData.homeTeam} averages ${homeStats.pointsPerGame} points per game`);
    console.log(`📊 ${matchData.awayTeam} averages ${awayStats.pointsPerGame} points per game`);
}
```

### **Collaborative Challenges**

#### **Challenge 1: Broadcast Roles**
- **Play-by-Play**: Focus on what's happening now (scores, time, immediate events)
- **Color Commentator**: Provide background context (team history, player stats, strategy)
- **Technical Director**: Ensure data is flowing and handle any technical issues
- **Graphics Coordinator**: Keep score displays updated and create "stat graphics"

#### **Challenge 2: Emergency Broadcasting**
What happens if:
- The API goes down? (Plan a backup strategy)
- No matches are live? (Create engaging content anyway)
- Data is delayed? (How do you handle stale information?)

#### **Challenge 3: Audience Engagement**
- Create "instant replays" by looking up recent events
- Provide "stat of the game" insights
- Make predictions about what will happen next

### **Phase 4: Post-Game Analysis (10 minutes)**
After monitoring for 15-20 minutes:

```javascript
// 6. Provide post-game wrap-up
async function postGameAnalysis(finalMatchData) {
    console.log('🏁 FINAL ANALYSIS:');
    // Summarize what happened during your broadcast
    // Compare final score to pre-game predictions
    // Highlight the most exciting moments
}
```

### **Team Presentation Challenge**
**Live Demo**: Each team demonstrates their "command center" to the class:
- Show your live monitoring system in action
- Demonstrate your commentary system
- Explain how you handled any technical challenges
- Share the most interesting insight you discovered

### **Extension Activities**
1. **Multi-Match Monitoring**: Track multiple games simultaneously
2. **Social Media Integration**: Create "tweets" for major game events
3. **Performance Tracking**: Compare your predictions to actual outcomes
4. **Historical Analysis**: Look back at completed games and provide "highlights"

## Scenario 4: Sports Betting Investment Firm
**Duration**: 60-90 minutes | **Team Size**: 3-4 students | **Difficulty**: Advanced

### **Collaborative Objective**
Your team runs a **Sports Investment Firm** where you manage a portfolio of bets using data analysis and risk management. You'll learn about financial concepts while practicing API interactions and collaborative decision-making.

### **Team Roles**
- **Portfolio Manager**: Oversees overall strategy and balance management
- **Research Analyst**: Analyzes matches and identifies betting opportunities
- **Risk Manager**: Ensures responsible betting and tracks performance
- **Compliance Officer**: Handles all API transactions and validates data

### **Step-by-Step Activity**

#### **Phase 1: Firm Setup & Initial Assessment (15 minutes)**
```javascript
// 1. Assess your firm's starting position
const user = 'user1'; // Your firm's account
const initialBalance = await fetch(`http://localhost:3000/users/${user}/balance`)
    .then(r => r.json());
console.log('💰 Firm starting capital:', initialBalance);

// 2. Review existing portfolio
const existingBets = await fetch(`http://localhost:3000/bets/${user}`)
    .then(r => r.json());
console.log('📊 Current portfolio:', existingBets);

// 3. Get comprehensive firm statistics
const firmStats = await fetch(`http://localhost:3000/users/${user}/stats`)
    .then(r => r.json());
console.log('📈 Firm performance:', firmStats);
```

**Team Meeting**: Discuss your firm's current position. What's your investment philosophy? Conservative or aggressive? What's your target ROI?

#### **Phase 2: Market Research & Opportunity Analysis (25 minutes)**
```javascript
// 4. Research the market
const availableMatches = await fetch('http://localhost:3000/matches/bask?status=upcoming')
    .then(r => r.json());

// 5. Conduct detailed analysis on promising matches
async function conductMatchResearch(match) {
    const homeStats = await fetch(`http://localhost:3000/teams/bask/${match.homeTeamId}/stats`)
        .then(r => r.json());
    const awayStats = await fetch(`http://localhost:3000/teams/bask/${match.awayTeamId}/stats`)
        .then(r => r.json());
    const standings = await fetch(`http://localhost:3000/standings/bask`)
        .then(r => r.json());
    
    return {
        match,
        homeStats,
        awayStats,
        standings,
        analysis: analyzeInvestmentOpportunity(match, homeStats, awayStats)
    };
}

// 6. Your firm's proprietary analysis function
function analyzeInvestmentOpportunity(match, homeStats, awayStats) {
    // Collaborative decision: What makes a good bet?
    
    const homeWinProb = calculateWinProbability(homeStats, awayStats, true);
    const awayWinProb = calculateWinProbability(awayStats, homeStats, false);
    
    const homeValue = homeWinProb / (1 / match.odds.homeWin); // Probability vs Odds
    const awayValue = awayWinProb / (1 / match.odds.awayWin);
    
    return {
        recommendation: homeValue > 1.1 ? 'BET_HOME' : awayValue > 1.1 ? 'BET_AWAY' : 'AVOID',
        confidence: Math.max(homeValue, awayValue),
        expectedValue: homeValue > awayValue ? homeValue : awayValue,
        reasoning: 'Team analysis based on stats and market inefficiency'
    };
}
```

**Collaborative Research Phase**:
- **Research Analyst**: Leads the match analysis and presents findings
- **Portfolio Manager**: Evaluates which opportunities fit the firm's strategy
- **Risk Manager**: Assesses the risk level of each potential bet
- **Compliance Officer**: Verifies all data and calculations

#### **Phase 3: Investment Committee Meeting (20 minutes)**
Hold a formal meeting to decide on investments:

```javascript
// 7. Portfolio construction meeting
const investmentCommitteeDecision = {
    approvedBets: [],
    rejectedOpportunities: [],
    totalAllocation: 0,
    riskLevel: 'conservative' | 'moderate' | 'aggressive'
};

// 8. Risk management rules (decide together)
const riskManagementRules = {
    maxBetPerMatch: initialBalance.balance * 0.1, // Never risk more than 10%
    maxTotalExposure: initialBalance.balance * 0.3, // Never have more than 30% at risk
    minimumConfidence: 1.2, // Only bet when expected value > 1.2
    diversificationRule: 'No more than 2 bets on same sport'
};
```

**Committee Discussion Points**:
1. **Portfolio Manager**: "Based on our research, I recommend..."
2. **Risk Manager**: "The risk assessment shows..."
3. **Research Analyst**: "The data indicates..."
4. **Compliance Officer**: "Our current balance allows for..."

**Vote on each potential bet**: Each team member gets one vote. Majority rules.

#### **Phase 4: Execute Investment Strategy (15 minutes)**
```javascript
// 9. Place approved bets
async function executeBet(betDetails) {
    try {
        const result = await fetch('http://localhost:3000/bets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: user,
                matchId: betDetails.matchId,
                betType: betDetails.betType,
                amount: betDetails.amount
            })
        }).then(r => r.json());
        
        console.log('✅ Bet executed:', result);
        return result;
    } catch (error) {
        console.error('❌ Bet failed:', error);
        return null;
    }
}

// 10. Portfolio tracking
async function updatePortfolioTracking() {
    const currentBalance = await fetch(`http://localhost:3000/users/${user}/balance`)
        .then(r => r.json());
    const activeBets = await fetch(`http://localhost:3000/bets/${user}/active`)
        .then(r => r.json());
    
    console.log('📊 PORTFOLIO UPDATE:');
    console.log('💰 Current Balance:', currentBalance.balance);
    console.log('🎯 Active Bets:', activeBets.activeBetsCount);
    console.log('💵 Potential Winnings:', activeBets.totalPotentialWinnings);
}
```

**Execution Phase**:
- **Compliance Officer**: Places all approved bets
- **Portfolio Manager**: Monitors balance and exposure
- **Risk Manager**: Ensures all bets comply with risk rules
- **Research Analyst**: Documents the reasoning for each bet

#### **Phase 5: Performance Review (10 minutes)**
```javascript
// 11. Immediate performance assessment
async function generatePerformanceReport() {
    const finalStats = await fetch(`http://localhost:3000/users/${user}/stats`)
        .then(r => r.json());
    
    const report = {
        totalCapitalDeployed: 'Calculate from bets placed',
        riskExposure: 'Percentage of balance at risk',
        expectedROI: 'Based on odds and confidence',
        diversification: 'Number of different matches bet on',
        firmRating: 'A-F based on strategy execution'
    };
    
    return report;
}
```

### **Collaborative Challenges**

#### **Challenge 1: Disagreement Resolution**
What happens when team members disagree on a bet? Establish a process:
- **Data-driven debate**: Use numbers to support arguments
- **Democratic voting**: Majority vote decides
- **Compromise solutions**: Smaller bet amounts on disputed picks

#### **Challenge 2: Risk Management Scenarios**
- What if you lose your first two bets? Do you become more conservative?
- What if you're on a winning streak? Do you increase bet sizes?
- How do you handle "sure thing" opportunities?

#### **Challenge 3: Performance Pressure**
- Other teams are competing for best returns
- How do you balance risk and reward?
- When do you cut losses vs. double down?

### **Firm Competition**
**Inter-Firm Challenge**: Compare your team's performance with other "investment firms":

1. **Best ROI**: Which team has the highest expected return?
2. **Best Risk Management**: Who has the most balanced portfolio?
3. **Most Creative Strategy**: Which team found unique opportunities?
4. **Best Teamwork**: Which firm had the best collaborative process?

### **Final Presentation (5 minutes)**
Present your **Investment Thesis**:
- Your firm's investment philosophy
- Key bets you made and why
- How you managed risk
- Lessons learned about collaboration and decision-making

### **Extension Activities**
1. **Bet Tracking**: Monitor your bets over time and calculate actual ROI
2. **Strategy Refinement**: Adjust your approach based on results
3. **Market Analysis**: Study how your predictions compared to actual outcomes
4. **Firm Expansion**: What would you do differently with a larger portfolio?

## Scenario 5: Sports Data Detective Agency
**Duration**: 45-60 minutes | **Team Size**: 3-4 students | **Difficulty**: Intermediate

### **Collaborative Objective**
Your team operates a **Sports Data Detective Agency** that solves mysteries using advanced search techniques and data analysis. You'll help "clients" find hidden insights in sports data through collaborative investigation.

### **Team Roles**
- **Lead Detective**: Coordinates the investigation and manages client requests
- **Search Specialist**: Expert at finding data using various search and filter techniques
- **Pattern Analyst**: Identifies trends, anomalies, and hidden connections in data
- **Report Writer**: Documents findings and presents solutions to clients

### **Step-by-Step Activity**

#### **Phase 1: Case Assignment & Initial Investigation (15 minutes)**

**🔍 Client Case Files** (Choose one or work through multiple):

**Case #1: "The Missing Superstar"**
*Client Request*: "Help! I'm looking for a basketball team with a player wearing jersey #6, but I can't remember the team name or player name. I only know they're really tall and play forward."

**Case #2: "The Upset Alert"**
*Client Request*: "I need to find upcoming matches where the betting odds don't match the team's actual performance. Someone's getting a raw deal!"

**Case #3: "The Conference Conspiracy"**
*Client Request*: "I suspect one conference in basketball is much stronger than the other. Can you prove it with data?"

**Case #4: "The Home Field Advantage Mystery"**
*Client Request*: "Do teams really perform better at home? I need evidence for all sports!"

```javascript
// 1. Start your investigation toolkit
const investigationTools = {
    generalSearch: (query) => fetch(`http://localhost:3000/search/teams?q=${query}`),
    teamFilter: (sport, team) => fetch(`http://localhost:3000/matches/${sport}?team=${team}`),
    statusFilter: (sport, status) => fetch(`http://localhost:3000/matches/${sport}?status=${status}`),
    dateFilter: (sport, date) => fetch(`http://localhost:3000/matches/${sport}?date=${date}`),
    crossReference: async (teamId, sport) => {
        const stats = await fetch(`http://localhost:3000/teams/${sport}/${teamId}/stats`);
        const players = await fetch(`http://localhost:3000/teams/${sport}/${teamId}/players`);
        return { stats: await stats.json(), players: await players.json() };
    }
};
```

**Team Strategy Session**: Choose your case and assign investigation roles.

#### **Phase 2: Evidence Gathering (20 minutes)**

**For Case #1 - The Missing Superstar:**
```javascript
// 2. Search for clues about the mystery player
async function findMysteryPlayer() {
    // Search Specialist leads this investigation
    
    // First, get all basketball teams
    const teams = await fetch('http://localhost:3000/teams/bask').then(r => r.json());
    
    // Check each team's roster for jersey #6
    for (const team of teams) {
        const players = await fetch(`http://localhost:3000/teams/bask/${team.id}/players`)
            .then(r => r.json());
        
        const mysteryPlayer = players.find(player => player.number === 6);
        if (mysteryPlayer) {
            console.log(`🕵️ CLUE FOUND: ${mysteryPlayer.name} wears #6 for ${team.name}`);
            console.log(`📋 Details: ${mysteryPlayer.position}, Age ${mysteryPlayer.age}`);
        }
    }
}
```

**For Case #2 - The Upset Alert:**
```javascript
// 3. Find mismatched odds and performance
async function findUpsetOpportunities() {
    // Pattern Analyst leads this investigation
    
    const matches = await fetch('http://localhost:3000/matches/bask?status=upcoming')
        .then(r => r.json());
    
    for (const match of matches) {
        const homeStats = await fetch(`http://localhost:3000/teams/bask/${match.homeTeamId}/stats`)
            .then(r => r.json());
        const awayStats = await fetch(`http://localhost:3000/teams/bask/${match.awayTeamId}/stats`)
            .then(r => r.json());
        
        // Compare team rankings vs odds
        const oddsLeanHome = match.odds.homeWin < match.odds.awayWin;
        const statsLeanHome = homeStats.rank < awayStats.rank;
        
        if (oddsLeanHome !== statsLeanHome) {
            console.log(`🚨 UPSET ALERT: ${match.homeTeam} vs ${match.awayTeam}`);
            console.log(`📊 Odds favor: ${oddsLeanHome ? 'Home' : 'Away'}`);
            console.log(`📈 Stats favor: ${statsLeanHome ? 'Home' : 'Away'}`);
        }
    }
}
```

**For Case #3 - The Conference Conspiracy:**
```javascript
// 4. Investigate conference strength
async function investigateConferences() {
    // Pattern Analyst leads this investigation
    
    const teams = await fetch('http://localhost:3000/teams/bask').then(r => r.json());
    const standings = await fetch('http://localhost:3000/standings/bask').then(r => r.json());
    
    const conferenceStats = {};
    
    for (const team of teams) {
        const conference = team.conference;
        if (!conferenceStats[conference]) {
            conferenceStats[conference] = { teams: [], totalWins: 0, totalLosses: 0 };
        }
        
        const teamStanding = standings.find(s => s.teamId === team.id);
        if (teamStanding) {
            conferenceStats[conference].teams.push(team.name);
            conferenceStats[conference].totalWins += teamStanding.wins;
            conferenceStats[conference].totalLosses += teamStanding.losses;
        }
    }
    
    console.log('🔍 CONFERENCE INVESTIGATION RESULTS:');
    Object.entries(conferenceStats).forEach(([conf, stats]) => {
        const winPct = stats.totalWins / (stats.totalWins + stats.totalLosses);
        console.log(`${conf}: ${stats.teams.length} teams, ${winPct.toFixed(3)} win%`);
    });
}
```

#### **Phase 3: Advanced Detective Work (15 minutes)**

**Cross-Reference Investigation:**
```javascript
// 5. Advanced pattern detection
async function advancedInvestigation() {
    // Lead Detective coordinates this phase
    
    // Look for unusual patterns across multiple data points
    const unusualFindings = [];
    
    // Example: Teams with high offensive stats but poor records
    const teams = await fetch('http://localhost:3000/teams/bask').then(r => r.json());
    
    for (const team of teams) {
        const stats = await fetch(`http://localhost:3000/teams/bask/${team.id}/stats`)
            .then(r => r.json());
        
        const winPct = stats.wins / (stats.wins + stats.losses);
        
        // High scoring but low wins = defensive problems?
        if (stats.pointsPerGame > 110 && winPct < 0.5) {
            unusualFindings.push({
                team: team.name,
                issue: 'High offense, poor record - defensive issues?',
                data: { ppg: stats.pointsPerGame, winPct: winPct.toFixed(3) }
            });
        }
        
        // Low scoring but high wins = great defense?
        if (stats.pointsPerGame < 105 && winPct > 0.7) {
            unusualFindings.push({
                team: team.name,
                issue: 'Low offense, great record - defensive excellence?',
                data: { ppg: stats.pointsPerGame, winPct: winPct.toFixed(3) }
            });
        }
    }
    
    return unusualFindings;
}
```

**Team Collaboration Challenge:**
Each detective contributes a different search technique:
- **Search Specialist**: Creative use of search parameters
- **Pattern Analyst**: Statistical anomaly detection
- **Lead Detective**: Connection between different data sources
- **Report Writer**: Clear documentation of all findings

### **Phase 4: Case Resolution & Client Report (10 minutes)**

```javascript
// 6. Compile final case report
function generateCaseReport(caseNumber, findings) {
    const report = {
        caseNumber: caseNumber,
        clientRequest: 'Original client question',
        investigationSummary: 'What your team did to solve it',
        keyFindings: findings,
        evidenceUsed: ['List of API endpoints used', 'Search techniques employed'],
        conclusion: 'Answer to client\'s question',
        recommendedActions: 'What the client should do with this information'
    };
    
    return report;
}
```

### **Collaborative Detective Challenges**

#### **Challenge 1: The Cold Case**
Give your team a complex, multi-step mystery:
*"A team that was ranked #1 early in the season is now struggling. Find out which team this might be and what happened to them."*

#### **Challenge 2: The Data Heist**
*"Someone claims a certain player doesn't exist in our database. Prove them wrong by finding any player with a specific characteristic (like playing position 'SF')."*

#### **Challenge 3: The Insider Trading Scandal**
*"Find evidence of any matches where one team appears to have a major advantage that the betting odds don't reflect."*

### **Detective Agency Competition**

**Case Solving Contest**: Each detective agency (team) presents their solved case:

1. **Most Creative Investigation**: Which team used the most innovative search techniques?
2. **Most Thorough Evidence**: Which team gathered the most comprehensive data?
3. **Best Client Service**: Which team provided the clearest, most useful report?
4. **Fastest Resolution**: Which team solved their case most efficiently?

### **Final Case Presentation (5 minutes)**
Present your **Case File** to the class:
- Client's original request
- Your investigation methodology
- Key evidence discovered
- Final conclusions and recommendations
- What search techniques worked best

### **Advanced Detective Extensions**
1. **Multi-Case Investigation**: Solve multiple related cases
2. **Real-Time Surveillance**: Monitor live games for unusual patterns
3. **Predictive Investigation**: Use historical data to predict future anomalies
4. **Cross-Sport Analysis**: Find patterns that exist across different sports

## Error Handling Exercises

### Common Scenarios to Handle:
1. **404 Errors**: Team or match not found
2. **400 Errors**: Invalid bet parameters
3. **Network Errors**: Server unavailable
4. **Insufficient Data**: Empty result sets

### Example Error Handling:
```javascript
async function fetchWithErrorHandling(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Data not found');
      } else if (response.status === 400) {
        throw new Error('Invalid request parameters');
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error.message);
    // Show user-friendly error message
    return null;
  }
}
```

## Progressive Complexity Levels

### Beginner Level:
- Make single API calls
- Display simple data lists
- Handle basic errors

### Intermediate Level:
- Chain multiple API calls
- Combine data from different endpoints
- Implement basic filtering

### Advanced Level:
- Build complete workflows
- Implement real-time updates
- Create complex data analysis
- Handle all edge cases

## Assessment Ideas

1. **Build a Team Comparison Tool**: Compare stats between any two teams
2. **Create a Live Dashboard**: Show live scores and standings
3. **Implement a Betting Calculator**: Calculate potential winnings and track performance
4. **Build a Search Interface**: Advanced filtering and search functionality
5. **Create a Mobile-First Design**: Responsive interface for all scenarios

## Best Practices to Teach

1. **Always Handle Errors**: Every fetch should have error handling
2. **Show Loading States**: Indicate when data is being fetched
3. **Cache Data**: Avoid redundant API calls
4. **Validate User Input**: Check data before sending to API
5. **Use Async/Await**: Modern JavaScript async patterns
6. **Structure Code**: Separate API logic from UI logic
7. **User Experience**: Provide feedback for all user actions

## Memory Persistence Demo

The betting simulator has **full memory persistence** during the server session. Here's a complete workflow students can follow:

### Step-by-Step Persistence Demonstration:

1. **Check Initial State**
   ```javascript
   // Check user's starting balance
   const initialBalance = await fetch('http://localhost:3000/users/user1/balance')
       .then(r => r.json());
   console.log('Starting balance:', initialBalance); // $1000.00
   
   // Check existing bets
   const initialBets = await fetch('http://localhost:3000/bets/user1')
       .then(r => r.json());
   console.log('Initial bets:', initialBets.length); // 1 existing bet
   ```

2. **Place a New Bet**
   ```javascript
   const newBet = await fetch('http://localhost:3000/bets', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
           userId: 'user1',
           matchId: 'bask-match-001',
           betType: 'homeWin',
           amount: 100
       })
   }).then(r => r.json());
   
   console.log('Bet placed:', newBet.bet.id);
   console.log('New balance:', newBet.newBalance); // $900.00
   ```

3. **Verify Persistence - Query the New Bet**
   ```javascript
   // Get specific bet details
   const betDetails = await fetch(`http://localhost:3000/bets/bet/${newBet.bet.id}`)
       .then(r => r.json());
   console.log('Bet exists in memory:', betDetails);
   
   // Get all user bets (should now show 2 bets)
   const allBets = await fetch('http://localhost:3000/bets/user1')
       .then(r => r.json());
   console.log('Total bets now:', allBets.length); // 2 bets
   ```

4. **Check Updated Balance**
   ```javascript
   const updatedBalance = await fetch('http://localhost:3000/users/user1/balance')
       .then(r => r.json());
   console.log('Balance after bet:', updatedBalance.balance); // $900.00
   ```

5. **Get Active Bets Summary**
   ```javascript
   const activeBets = await fetch('http://localhost:3000/bets/user1/active')
       .then(r => r.json());
   console.log('Active bets:', activeBets.activeBetsCount);
   console.log('Potential winnings:', activeBets.totalPotentialWinnings);
   ```

6. **Cancel a Bet (Optional)**
   ```javascript
   const cancelResult = await fetch(`http://localhost:3000/bets/bet/${newBet.bet.id}/cancel`, {
       method: 'PUT'
   }).then(r => r.json());
   
   console.log('Bet cancelled:', cancelResult.message);
   console.log('Refunded balance:', cancelResult.newBalance); // Back to $1000.00
   ```

### What Students Learn:

- **State Management**: How APIs maintain state between requests
- **Data Relationships**: User → Balance → Bets → Matches
- **Transaction Integrity**: Balance updates when placing/cancelling bets
- **CRUD Operations**: Create (POST), Read (GET), Update (PUT)
- **Data Validation**: Insufficient balance, invalid bets
- **Real-world Patterns**: How betting/financial APIs work

### Memory Persistence Features:

✅ **Bets persist** - New bets are stored and queryable
✅ **Balances update** - User balances change with bets/cancellations  
✅ **Relationships maintained** - Bets link to users and matches
✅ **State consistency** - All related data stays synchronized
✅ **Session-based** - Data persists until server restart (perfect for learning)

### Advanced Exercise Ideas:

1. **Build a Betting Dashboard**: Show user stats, active bets, balance
2. **Implement Bet Validation**: Check sufficient funds before placing
3. **Create Bet History**: Show chronological betting activity
4. **Add Bet Tracking**: Monitor potential winnings vs current balance
5. **Build Portfolio Analysis**: Calculate risk, diversification, ROI
