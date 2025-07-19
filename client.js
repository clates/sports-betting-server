// client.js
// This is a simple Node.js script that demonstrates how to interact with the Sports API
// Run this with: node client.js
// 
// This script shows basic API interaction patterns and provides examples
// for students to build upon and explore the API capabilities.

// --- API Configuration ---
const API_BASE_URL = 'http://localhost:3000';

// --- Basic API Helper Functions ---

/**
 * Simple fetch wrapper with error handling
 * @param {string} endpoint - API endpoint (e.g., '/sports')
 * @returns {Promise<Object|null>} - Parsed JSON response or null on error
 */
async function apiCall(endpoint) {
    try {
        console.log(`🌐 Making API call to: ${API_BASE_URL}${endpoint}`);
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log(`✅ Success! Received ${Array.isArray(data) ? data.length : 1} item(s)`);
        return data;
    } catch (error) {
        console.error(`❌ Error calling ${endpoint}:`, error.message);
        return null;
    }
}

/**
 * POST request helper for placing bets
 * @param {Object} betData - Bet information
 * @returns {Promise<Object|null>} - Response data or null on error
 */
async function placeBet(betData) {
    try {
        console.log(`💰 Placing bet:`, betData);
        const response = await fetch(`${API_BASE_URL}/bets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(betData)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP ${response.status}`);
        }
        
        const result = await response.json();
        console.log(`✅ Bet placed successfully! New balance: $${result.newBalance}`);
        return result;
    } catch (error) {
        console.error(`❌ Error placing bet:`, error.message);
        return null;
    }
}

// --- Example Functions - Learn by running these! ---

/**
 * Example 1: Basic API Discovery
 * Shows how to explore what sports and teams are available
 */
async function exploreBasicData() {
    console.log('\n=== 🏈 EXAMPLE 1: BASIC DATA EXPLORATION ===');
    
    // Step 1: Get all available sports
    const sports = await apiCall('/sports');
    if (sports) {
        console.log('📋 Available sports:');
        sports.forEach(sport => {
            console.log(`   • ${sport.name} (${sport.id}): ${sport.description}`);
        });
    }
    
    // Step 2: Get teams for basketball
    console.log('\n🏀 Basketball teams:');
    const teams = await apiCall('/teams/bask');
    if (teams) {
        teams.forEach(team => {
            console.log(`   • ${team.name} (${team.city}) - Founded: ${team.founded}`);
        });
    }
    
    // Step 3: Get detailed info for one team
    console.log('\n⭐ Lakers detailed info:');
    const lakersInfo = await apiCall('/teams/bask/lakers');
    const lakersStats = await apiCall('/teams/bask/lakers/stats');
    
    if (lakersInfo && lakersStats) {
        console.log(`   Team: ${lakersInfo.name} (${lakersInfo.city})`);
        console.log(`   Record: ${lakersStats.wins}-${lakersStats.losses}`);
        console.log(`   Rank: #${lakersStats.rank}`);
        console.log(`   PPG: ${lakersStats.pointsPerGame}`);
    }
}

/**
 * Example 2: Match Analysis
 * Shows how to analyze upcoming games and odds
 */
async function analyzeUpcomingMatches() {
    console.log('\n=== 📊 EXAMPLE 2: MATCH ANALYSIS ===');
    
    // Get upcoming basketball matches
    const matches = await apiCall('/matches/bask?status=upcoming');
    
    if (matches && matches.length > 0) {
        console.log(`🏀 Found ${matches.length} upcoming basketball matches:`);
        
        for (const match of matches) {
            console.log(`\n🆚 ${match.homeTeam} vs ${match.awayTeam}`);
            console.log(`   📅 ${new Date(match.startTime).toLocaleString()}`);
            console.log(`   🏟️  ${match.venue}`);
            console.log(`   💰 Odds - Home: ${match.odds.homeWin}, Away: ${match.odds.awayWin}`);
            
            // Get team stats for analysis
            const homeStats = await apiCall(`/teams/bask/${match.homeTeamId}/stats`);
            const awayStats = await apiCall(`/teams/bask/${match.awayTeamId}/stats`);
            
            if (homeStats && awayStats) {
                console.log(`   📈 ${match.homeTeam}: ${homeStats.wins}-${homeStats.losses} (Rank #${homeStats.rank})`);
                console.log(`   📈 ${match.awayTeam}: ${awayStats.wins}-${awayStats.losses} (Rank #${awayStats.rank})`);
                
                // Simple prediction based on rankings
                const favored = homeStats.rank < awayStats.rank ? match.homeTeam : match.awayTeam;
                console.log(`   🎯 Prediction: ${favored} favored by rankings`);
            }
        }
    }
}

/**
 * Example 3: Betting Simulation
 * Shows how to check balance, place bets, and track them
 */
async function demonstrateBetting() {
    console.log('\n=== 💸 EXAMPLE 3: BETTING SIMULATION ===');
    
    const userId = 'user1';
    
    // Check user's current balance
    const balance = await apiCall(`/users/${userId}/balance`);
    if (balance) {
        console.log(`💰 Current balance: $${balance.balance}`);
    }
    
    // Get user's existing bets
    const existingBets = await apiCall(`/bets/${userId}`);
    if (existingBets) {
        console.log(`📊 Existing bets: ${existingBets.length}`);
    }
    
    // Find an upcoming match to bet on
    const matches = await apiCall('/matches/bask?status=upcoming');
    if (matches && matches.length > 0) {
        const match = matches[0]; // Take the first match
        console.log(`\n🎯 Placing a small bet on: ${match.homeTeam} vs ${match.awayTeam}`);
        
        // Place a bet
        const betResult = await placeBet({
            userId: userId,
            matchId: match.id,
            betType: 'homeWin',
            amount: 25 // Small bet for demonstration
        });
        
        if (betResult) {
            // Check updated balance
            const newBalance = await apiCall(`/users/${userId}/balance`);
            console.log(`💰 Updated balance: $${newBalance.balance}`);
            
            // Get the specific bet details
            const betDetails = await apiCall(`/bets/bet/${betResult.bet.id}`);
            if (betDetails) {
                console.log(`📋 Bet details: $${betDetails.amount} on ${betDetails.betType}`);
                console.log(`💵 Potential winnings: $${betDetails.potentialWinnings}`);
            }
        }
    }
}

/**
 * Example 4: Search and Filter Exploration
 * Shows advanced API features like search and filtering
 */
async function exploreSearchFeatures() {
    console.log('\n=== 🔍 EXAMPLE 4: SEARCH & FILTERING ===');
    
    // Search for teams with "Lakers" in the name
    console.log('🔍 Searching for teams containing "Lakers":');
    const searchResults = await apiCall('/search/teams?q=Lakers');
    if (searchResults) {
        searchResults.forEach(team => {
            console.log(`   • ${team.name} (${team.sportId} - ${team.city})`);
        });
    }
    
    // Filter matches by date
    console.log('\n📅 Matches on 2025-07-20:');
    const dateFiltered = await apiCall('/matches/bask?date=2025-07-20');
    if (dateFiltered) {
        dateFiltered.forEach(match => {
            console.log(`   • ${match.homeTeam} vs ${match.awayTeam} at ${match.venue}`);
        });
    }
    
    // Get live matches (if any)
    console.log('\n🔴 Live matches:');
    const liveMatches = await apiCall('/matches/bask?status=live');
    if (liveMatches && liveMatches.length > 0) {
        for (const match of liveMatches) {
            const liveData = await apiCall(`/matches/${match.id}/live`);
            if (liveData) {
                console.log(`   🏀 ${match.homeTeam} ${liveData.score?.home || 0} - ${liveData.score?.away || 0} ${match.awayTeam}`);
                console.log(`      Quarter ${liveData.quarter}, ${liveData.timeRemaining} remaining`);
            }
        }
    } else {
        console.log('   No live matches currently');
    }
}

// --- Main Execution Function ---

/**
 * Main function that runs all examples
 * This is what gets executed when you run: node client.js
 */
async function main() {
    console.log('🚀 Sports API Client Demo Starting...');
    console.log('📝 Make sure your server is running: npm start');
    console.log('=' .repeat(60));
    
    try {
        // Run all examples in sequence
        await exploreBasicData();
        await analyzeUpcomingMatches();
        await demonstrateBetting();
        await exploreSearchFeatures();
        
        console.log('\n' + '='.repeat(60));
        console.log('✅ Demo completed successfully!');
        console.log('\n💡 Next steps for exploration:');
        console.log('   • Modify the examples above to try different API calls');
        console.log('   • Check out /teams/foot and /teams/socc for other sports');
        console.log('   • Try different search queries and filters');
        console.log('   • Build your own functions using these patterns');
        console.log('   • See EDUCATIONAL_SCENARIOS.md for collaborative activities');
        
    } catch (error) {
        console.error('💥 Demo failed:', error.message);
        console.log('\n🔧 Troubleshooting:');
        console.log('   • Is the server running? (npm start)');
        console.log('   • Is the server on http://localhost:3000?');
        console.log('   • Check the server console for errors');
    }
}

// --- Breadcrumb Functions for Student Exploration ---

/**
 * 🍞 BREADCRUMB: Try these functions individually!
 * 
 * Uncomment any of these lines to run specific examples:
 */

// exploreBasicData();           // Just run the basic data exploration
// analyzeUpcomingMatches();     // Just analyze matches
// demonstrateBetting();         // Just try the betting simulation
// exploreSearchFeatures();      // Just explore search features

/**
 * 🍞 BREADCRUMB: Build your own functions!
 * 
 * Here are some starter ideas. Try implementing these:
 */

// async function findBestTeam() {
//     // Get all teams and find the one with the best win percentage
//     // Hint: Use /teams/bask and /teams/bask/{teamId}/stats
// }

// async function compareTeams(team1Id, team2Id) {
//     // Compare two teams side by side
//     // Show their stats, recent matches, odds, etc.
// }

// async function trackMyBets() {
//     // Get all bets for user1 and calculate total money at risk
//     // Show potential winnings and current balance
// }

// async function findValueBets() {
//     // Look for matches where team rankings don't match betting odds
//     // This could indicate good betting opportunities
// }

// async function buildStandings() {
//     // Get standings and present them in a nice format
//     // Maybe add some analysis about conference strength
// }

/**
 * 🍞 BREADCRUMB: Advanced Challenges
 * 
 * Ready for more? Try these advanced patterns:
 */

// async function monitorLiveGame() {
//     // Set up a polling system to watch a live game
//     // Update every 10 seconds and show score changes
// }

// async function portfolioManager() {
//     // Build a complete betting portfolio management system
//     // Track risk, diversification, ROI, etc.
// }

// async function dataAnalyst() {
//     // Analyze patterns across all teams and sports
//     // Find interesting statistical insights
// }

// --- Run the main demo ---
if (require.main === module) {
    main();
}
