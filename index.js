/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    games.forEach(game => {
        // Create a new div element, which will become the game card
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");
        
        // Set the inner HTML using a template literal to display some info about each game
        gameCard.innerHTML = `
            <img src="${game.img}" class="game-img" alt="${game.name}">
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p>Pledged: $${game.pledged.toLocaleString()}</p>
            <p>Backers: ${game.backers.toLocaleString()}</p>
        `;

        // Append the game to the games-container
        gamesContainer.appendChild(gameCard);
    });
}

// Call the function with the GAMES_JSON data
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// Calculate total contributions (number of backers)
const totalContributions = GAMES_JSON.reduce((total, game) => total + game.backers, 0);
contributionsCard.innerHTML = totalContributions.toLocaleString();

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.length;
gamesCard.innerHTML = totalGames.toLocaleString();

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer); // Remove existing game cards
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal); // Filter unfunded games
    addGamesToPage(unfundedGames); // Add unfunded games to the page
    return unfundedGames; // Return the array for logging
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer); // Remove existing game cards
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal); // Filter funded games
    addGamesToPage(fundedGames); // Add funded games to the page
    return fundedGames; // Return the array for logging
}
// Call the function and store the result
const fundedGames = filterFundedOnly(); // Call the function and store the result
console.log(`Number of funded games: ${fundedGames.length}`); // Log the number of funded games


// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


const unfundedGames = filterUnfundedOnly(); // Call the function and store the result
console.log(`Number of unfunded games: ${unfundedGames.length}`); // Log the number of unfunded games


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter to count the number of unfunded games
const numUnfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// create a string that explains the number of unfunded games using the ternary operator
const descriptionText = `We currently have ${numUnfundedGames} game${numUnfundedGames === 1 ? '' : 's'} that have not yet met their funding goal.`;

// create a new DOM element containing the template string and append it to the description container
const descriptionElement = document.createElement("p");
descriptionElement.innerHTML = descriptionText;
descriptionContainer.appendChild(descriptionElement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

// Check if GAMES_JSON contains at least 2 games
if (GAMES_JSON.length >= 2) {
    // Sort games by pledged amount in descending order
    const sortedGames = GAMES_JSON.sort((a, b) => b.pledged - a.pledged);

    // Use destructuring to grab the first and second games
    const [topGame, runnerUp] = sortedGames;

    // Display the top pledge game
    firstGameContainer.innerHTML = `
        <h3>${topGame.name}</h3>
        <p>Pledged: $${topGame.pledged.toLocaleString()}</p>
    `;

    // Display the runner-up game
    secondGameContainer.innerHTML = `
        <h3>${runnerUp.name}</h3>
        <p>Pledged: $${runnerUp.pledged.toLocaleString()}</p>
    `;

    // Extract and log the first word of the top game and the runner-up game
    const firstWordTopGame = topGame.name.split(' ')[0];
    const firstWordSecondGame = runnerUp.name.split(' ')[0];
    
    console.log("First word of the top game:", firstWordTopGame);
    console.log("First word of the second game:", firstWordSecondGame);
} else {
    console.error("Not enough games in GAMES_JSON array.");
}