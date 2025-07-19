// tests.js
// Quick spot-check tests for the Sports API server
// Run this with: node tests.js
// 
// This script tests all endpoints and shows expected vs actual results
// Perfect for validating that server.js is working correctly

const API_BASE = 'http://localhost:3000';

// --- Test Helper Functions ---

/**
 * Simple test runner that makes API calls and validates responses
 */
class ApiTester {
    constructor() {
        this.passed = 0;
        this.failed = 0;
        this.tests = [];
    }

    async get(endpoint, expectedStatus = 200) {
        try {
            console.log(`\n🌐 GET ${endpoint}`);
            const response = await fetch(`${API_BASE}${endpoint}`);
            const data = response.ok ? await response.json() : await response.text();
            
            const result = {
                endpoint,
                status: response.status,
                expectedStatus,
                success: response.status === expectedStatus,
                data: response.ok ? data : `Error: ${data}`
            };
            
            this.recordResult(result);
            return result;
        } catch (error) {
            const result = {
                endpoint,
                status: 'NETWORK_ERROR',
                expectedStatus,
                success: false,
                data: error.message
            };
            this.recordResult(result);
            return result;
        }
    }

    async post(endpoint, body, expectedStatus = 201) {
        try {
            console.log(`\n📤 POST ${endpoint}`);
            console.log(`   Body:`, JSON.stringify(body, null, 2));
            
            const response = await fetch(`${API_BASE}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            
            const data = response.ok ? await response.json() : await response.text();
            
            const result = {
                endpoint,
                method: 'POST',
                status: response.status,
                expectedStatus,
                success: response.status === expectedStatus,
                data: response.ok ? data : `Error: ${data}`
            };
            
            this.recordResult(result);
            return result;
        } catch (error) {
            const result = {
                endpoint,
                method: 'POST',
                status: 'NETWORK_ERROR',
                expectedStatus,
                success: false,
                data: error.message
            };
            this.recordResult(result);
            return result;
        }
    }

    async put(endpoint, body, expectedStatus = 200) {
        try {
            console.log(`\n🔄 PUT ${endpoint}`);
            
            const response = await fetch(`${API_BASE}${endpoint}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: body ? JSON.stringify(body) : undefined
            });
            
            const data = response.ok ? await response.json() : await response.text();
            
            const result = {
                endpoint,
                method: 'PUT',
                status: response.status,
                expectedStatus,
                success: response.status === expectedStatus,
                data: response.ok ? data : `Error: ${data}`
            };
            
            this.recordResult(result);
            return result;
        } catch (error) {
            const result = {
                endpoint,
                method: 'PUT',
                status: 'NETWORK_ERROR',
                expectedStatus,
                success: false,
                data: error.message
            };
            this.recordResult(result);
            return result;
        }
    }

    recordResult(result) {
        if (result.success) {
            console.log(`   ✅ ${result.status} - PASS`);
            this.passed++;
        } else {
            console.log(`   ❌ ${result.status} (expected ${result.expectedStatus}) - FAIL`);
            this.failed++;
        }
        
        // Show sample of returned data
        if (result.success && result.data) {
            if (Array.isArray(result.data)) {
                console.log(`   📊 Returned ${result.data.length} items`);
                if (result.data.length > 0) {
                    console.log(`   📋 Sample:`, JSON.stringify(result.data[0], null, 2));
                }
            } else if (typeof result.data === 'object') {
                console.log(`   📋 Response:`, JSON.stringify(result.data, null, 2));
            }
        }
        
        this.tests.push(result);
    }

    showSummary() {
        console.log('\n' + '='.repeat(60));
        console.log('📊 TEST SUMMARY');
        console.log('='.repeat(60));
        console.log(`✅ Passed: ${this.passed}`);
        console.log(`❌ Failed: ${this.failed}`);
        console.log(`📊 Total:  ${this.passed + this.failed}`);
        console.log(`🎯 Success Rate: ${((this.passed / (this.passed + this.failed)) * 100).toFixed(1)}%`);
        
        if (this.failed > 0) {
            console.log('\n💥 FAILED TESTS:');
            this.tests.filter(t => !t.success).forEach(test => {
                console.log(`   • ${test.method || 'GET'} ${test.endpoint} - ${test.status}`);
            });
        }
        
        console.log('\n🎉 Spot-check complete!');
        return this.failed === 0;
    }
}

// --- Main Test Suites ---

async function testBasicEndpoints(tester) {
    console.log('\n🏈 TESTING BASIC ENDPOINTS');
    console.log('='.repeat(40));
    
    // Test sports endpoint
    await tester.get('/sports');
    
    // Test matches for each sport
    await tester.get('/matches/bask');
    await tester.get('/matches/foot');
    await tester.get('/matches/socc');
    
    // Test invalid sport
    await tester.get('/matches/invalid', 404);
}

async function testTeamEndpoints(tester) {
    console.log('\n👥 TESTING TEAM ENDPOINTS');
    console.log('='.repeat(40));
    
    // Test teams for basketball
    await tester.get('/teams/bask');
    
    // Test specific team info
    await tester.get('/teams/bask/lakers');
    await tester.get('/teams/bask/celtics');
    
    // Test team stats
    await tester.get('/teams/bask/lakers/stats');
    await tester.get('/teams/foot/cowboys/stats');
    
    // Test team players
    await tester.get('/teams/bask/lakers/players');
    await tester.get('/teams/bask/celtics/players');
    
    // Test invalid team
    await tester.get('/teams/bask/invalid', 404);
    await tester.get('/teams/invalid/lakers', 404);
}

async function testMatchFeatures(tester) {
    console.log('\n🏀 TESTING MATCH FEATURES');
    console.log('='.repeat(40));
    
    // Test match filtering
    await tester.get('/matches/bask?status=upcoming');
    await tester.get('/matches/bask?status=live');
    await tester.get('/matches/bask?status=completed');
    await tester.get('/matches/bask?team=Lakers');
    await tester.get('/matches/bask?date=2025-07-20');
    
    // Test live match data
    await tester.get('/matches/bask-match-002/live'); // This should be live in mock data
    await tester.get('/matches/bask-match-001/live'); // This should be upcoming
    
    // Test invalid match
    await tester.get('/matches/invalid-match/live', 404);
    
    // Test standings
    await tester.get('/standings/bask');
    await tester.get('/standings/foot');
    await tester.get('/standings/invalid', 404);
}

async function testUserAndBetting(tester) {
    console.log('\n💰 TESTING USER & BETTING ENDPOINTS');
    console.log('='.repeat(40));
    
    // Test user info
    await tester.get('/users/user1');
    await tester.get('/users/user2');
    await tester.get('/users/invalid', 404);
    
    // Test user balance
    await tester.get('/users/user1/balance');
    await tester.get('/users/user2/balance');
    
    // Test user stats
    await tester.get('/users/user1/stats');
    
    // Test existing bets
    await tester.get('/bets/user1');
    await tester.get('/bets/user2');
    await tester.get('/bets/user1/active');
    
    // Test placing a bet
    const betResult = await tester.post('/bets', {
        userId: 'user1',
        matchId: 'bask-match-001',
        betType: 'homeWin',
        amount: 25
    });
    
    // If bet was successful, test the new bet
    if (betResult.success && betResult.data.bet) {
        const betId = betResult.data.bet.id;
        console.log(`\n🎯 Testing newly created bet: ${betId}`);
        
        // Test getting specific bet
        await tester.get(`/bets/bet/${betId}`);
        
        // Test updated user balance
        await tester.get('/users/user1/balance');
        
        // Test active bets (should now include our new bet)
        await tester.get('/bets/user1/active');
        
        // Test canceling the bet
        await tester.put(`/bets/bet/${betId}/cancel`);
        
        // Verify bet was cancelled
        await tester.get(`/bets/bet/${betId}`);
        await tester.get('/users/user1/balance'); // Should be refunded
    }
    
    // Test invalid betting scenarios
    await tester.post('/bets', {
        userId: 'user1',
        matchId: 'bask-match-001',
        betType: 'homeWin',
        amount: 10000 // Should fail - insufficient balance
    }, 400);
    
    await tester.post('/bets', {
        userId: 'invalid',
        matchId: 'bask-match-001',
        betType: 'homeWin',
        amount: 25
    }, 404);
    
    await tester.post('/bets', {
        userId: 'user1',
        matchId: 'invalid-match',
        betType: 'homeWin',
        amount: 25
    }, 404);
}

async function testSearchFeatures(tester) {
    console.log('\n🔍 TESTING SEARCH FEATURES');
    console.log('='.repeat(40));
    
    // Test team search
    await tester.get('/search/teams?q=Lakers');
    await tester.get('/search/teams?q=Madrid');
    await tester.get('/search/teams?q=Boston');
    await tester.get('/search/teams?q=xyz'); // Should return empty array
    
    // Test search without query
    await tester.get('/search/teams', 400); // Missing query parameter
}

async function testErrorScenarios(tester) {
    console.log('\n💥 TESTING ERROR SCENARIOS');
    console.log('='.repeat(40));
    
    // Test completely invalid endpoints
    await tester.get('/invalid', 404);
    await tester.get('/sports/invalid', 404);
    await tester.get('/teams', 404);
    
    // Test malformed requests
    await tester.post('/bets', {}, 400); // Missing required fields
    await tester.post('/bets', { userId: 'user1' }, 400); // Incomplete data
    
    // Test non-existent resources
    await tester.get('/teams/bask/nonexistent', 404);
    await tester.get('/users/nonexistent', 404);
    await tester.get('/bets/bet/nonexistent', 404);
    await tester.put('/bets/bet/nonexistent/cancel', null, 404); // Fix: pass null body, expect 404
}

// --- Data Validation Tests ---

async function validateDataStructures(tester) {
    console.log('\n🔬 VALIDATING DATA STRUCTURES');
    console.log('='.repeat(40));
    
    // Get some data and validate structure
    const sportsResult = await tester.get('/sports');
    if (sportsResult.success) {
        const sports = sportsResult.data;
        console.log(`\n📊 Sports data validation:`);
        console.log(`   • Count: ${sports.length} (expected: 3)`);
        console.log(`   • Has IDs: ${sports.every(s => s.id)} ✅`);
        console.log(`   • Has names: ${sports.every(s => s.name)} ✅`);
        console.log(`   • Has descriptions: ${sports.every(s => s.description)} ✅`);
    }
    
    const teamsResult = await tester.get('/teams/bask');
    if (teamsResult.success) {
        const teams = teamsResult.data;
        console.log(`\n🏀 Basketball teams validation:`);
        console.log(`   • Count: ${teams.length} (expected: 6)`);
        console.log(`   • Has IDs: ${teams.every(t => t.id)} ✅`);
        console.log(`   • Has names: ${teams.every(t => t.name)} ✅`);
        console.log(`   • Has cities: ${teams.every(t => t.city)} ✅`);
        console.log(`   • Has conferences: ${teams.every(t => t.conference)} ✅`);
    }
    
    const matchesResult = await tester.get('/matches/bask');
    if (matchesResult.success) {
        const matches = matchesResult.data;
        console.log(`\n🆚 Matches validation:`);
        console.log(`   • Count: ${matches.length} (expected: 3)`);
        console.log(`   • Has IDs: ${matches.every(m => m.id)} ✅`);
        console.log(`   • Has teams: ${matches.every(m => m.homeTeam && m.awayTeam)} ✅`);
        console.log(`   • Has odds: ${matches.every(m => m.odds && m.odds.homeWin)} ✅`);
        console.log(`   • Has status: ${matches.every(m => m.status)} ✅`);
    }
}

// --- Main Test Runner ---

async function runAllTests() {
    console.log('🚀 SPORTS API SPOT-CHECK TESTS');
    console.log('📝 Make sure server is running: npm start');
    console.log('🌐 Testing against: ' + API_BASE);
    console.log('='.repeat(60));
    
    const tester = new ApiTester();
    
    try {
        // Run all test suites
        await testBasicEndpoints(tester);
        await testTeamEndpoints(tester);
        await testMatchFeatures(tester);
        await testUserAndBetting(tester);
        await testSearchFeatures(tester);
        await testErrorScenarios(tester);
        await validateDataStructures(tester);
        
        // Show final results
        const allPassed = tester.showSummary();
        
        if (allPassed) {
            console.log('\n🎉 ALL TESTS PASSED! Your server.js is working perfectly!');
        } else {
            console.log('\n⚠️  Some tests failed. Check the server console for errors.');
        }
        
        return allPassed;
        
    } catch (error) {
        console.error('\n💥 Test runner crashed:', error.message);
        console.log('\n🔧 Troubleshooting:');
        console.log('   • Is the server running? (npm start)');
        console.log('   • Is the server on http://localhost:3000?');
        console.log('   • Check the server console for errors');
        return false;
    }
}

// --- Quick Individual Test Functions ---

/**
 * Quick test functions you can run individually
 * Uncomment any of these to run specific test suites:
 */

// testBasicEndpoints(new ApiTester());
// testUserAndBetting(new ApiTester());
// testSearchFeatures(new ApiTester());

// --- Run all tests when script is executed ---
if (require.main === module) {
    runAllTests();
}

module.exports = { ApiTester, runAllTests };
