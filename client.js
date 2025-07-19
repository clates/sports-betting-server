// script.js
// This file provides the scaffolding for your brother's client-side JavaScript.
// It includes functions to interact with the HTML elements and now uses
// the Fetch API to get data from the local Node.js server.

// --- HTML Element References (YOUR SCAFFOLDING) ---
// These variables connect your JavaScript to the specific elements in index.html
const appContainer = document.getElementById('app-container'); // Main container for content
const sportsListDiv = document.getElementById('sports-list'); // Where sports buttons will go
const matchesListDiv = document.getElementById('matches-list'); // Where matches will be displayed
const backButton = document.getElementById('back-button'); // Button to go back to sports list

// --- Core Display Functions (YOUR SCAFFOLDING) ---

/**
 * Clears the content of a given HTML element.
 * @param {HTMLElement} element - The HTML element to clear.
 */
function clearElement(element) {
    element.innerHTML = '';
}

/**
 * Shows a specific section of the application and hides others.
 * @param {string} sectionId - The ID of the section to show (e.g., 'sports-view', 'matches-view').
 */
function showSection(sectionId) {
    // Hide all sections first
    document.querySelectorAll('.app-section').forEach(section => {
        section.style.display = 'none';
    });
    // Then show the requested section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
    }
}

/**
 * Displays an error message to the user.
 * @param {string} message - The error message to display.
 */
function displayError(message) {
    // You might want a dedicated error display area in your HTML
    alert('Error: ' + message); // Using alert for simplicity, but a custom modal is better
    console.error('Application Error:', message);
}

// --- API Interaction Functions (YOUR SCAFFOLDING - using Fetch) ---

/**
 * Fetches a list of available sports from the local server.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of sport objects.
 */
async function fetchSports() {
    try {
        // Use fetch to make an HTTP GET request to your local server
        const response = await fetch('http://localhost:3000/sports');

        // Check if the request was successful (status code 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON response body
        const sports = await response.json();
        return sports;
    } catch (error) {
        displayError('Could not fetch sports data: ' + error.message);
        return []; // Return an empty array on error
    }
}

/**
 * Fetches matches for a specific sport from the local server.
 * @param {string} sportId - The ID of the sport (e.g., 'bask', 'foot').
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of match objects.
 */
async function fetchMatchesBySport(sportId) {
    try {
        const response = await fetch(`http://localhost:3000/matches/${sportId}`);

        if (!response.ok) {
            // Check for specific 404 error if no matches are found
            if (response.status === 404) {
                console.warn(`No matches found for sportId: ${sportId}`);
                return []; // Return empty array if no matches
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const matches = await response.json();
        return matches;
    } catch (error) {
        displayError(`Could not fetch matches for ${sportId}: ` + error.message);
        return []; // Return an empty array on error
    }
}

// --- End of scaffolding for the independent project ---


// --- Your brother will write his game logic and sports viewer logic below this line ---

// Example: How your brother might use fetchSports to display sports
// This is just an example. He will implement the actual display logic.
async function initializeSportsViewer() {
    clearElement(sportsListDiv); // Clear previous content
    clearElement(matchesListDiv); // Clear previous content
    showSection('sports-view'); // Show the sports list view

    const sports = await fetchSports();
    if (sports.length > 0) {
        const ul = document.createElement('ul');
        sports.forEach(sport => {
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.textContent = sport.name;
            button.onclick = () => handleSportSelection(sport.id); // Call handler on click
            li.appendChild(button);
            ul.appendChild(li);
        });
        sportsListDiv.appendChild(ul);
    } else {
        sportsListDiv.textContent = 'No sports available.';
    }
}

// Example: Handler for when a sport is selected (he will implement this)
async function handleSportSelection(sportId) {
    showSection('matches-view'); // Show the matches view
    clearElement(matchesListDiv); // Clear previous matches

    const matches = await fetchMatchesBySport(sportId);
    if (matches.length > 0) {
        const ul = document.createElement('ul');
        matches.forEach(match => {
            const li = document.createElement('li');
            // Display match info and odds
            li.innerHTML = `
                <strong>${match.homeTeam} vs ${match.awayTeam}</strong><br>
                Start Time: ${new Date(match.startTime).toLocaleString()}<br>
                Odds: Home Win ${match.odds.homeWin} / Away Win ${match.odds.awayWin}
                ${match.odds.draw ? `/ Draw ${match.odds.draw}` : ''}
            `;
            ul.appendChild(li);
        });
        matchesListDiv.appendChild(ul);
    } else {
        matchesListDiv.textContent = 'No matches found for this sport.';
    }
    backButton.style.display = 'block'; // Show back button
}

// Example: Back button functionality (he will implement this)
backButton.onclick = () => {
    showSection('sports-view');
    backButton.style.display = 'none';
    initializeSportsViewer(); // Re-initialize sports list
};

// Initial call to load sports when the page loads
// document.addEventListener('DOMContentLoaded', initializeSportsViewer);
// Note: You might want to remove this if you want to control when it loads,
// e.g., via a button click or after a specific part of the lesson.
// For the purpose of the independent project, you can have him call this
// from his own main function.
