# Find the Country GeoGame

## Objective

The goal of "Find the Country" is to test players' geographic knowledge by having them locate specific countries on a map within a time limit. Players score points based on accuracy and speed.

## Link to the GeoGame

[Play the GeoGame](https://gmt-458-web-gis.github.io/geogame-Berkaynal/)

## Description

GeoGame is an interactive web-based game where players locate countries on a world map. The project uses **Leaflet.js**, a powerful JavaScript library, to create a dynamic and engaging mapping experience.

## Advanced JavaScript Library

### Leaflet.js

- **Purpose**: Used for creating interactive maps with smooth user interactions.
- **Features**:
  - Displaying map tiles.
  - Handling user clicks to identify countries.
  - Calculating distances and providing feedback.

## Requirements

- **Player Setup**: Enter a name to begin the game.
- **Interactive Map**: A map where players click on locations to answer questions. Country names are not displayed on the map.
- **Randomized Questions**: 10 random countries are selected from the chosen category.
- **Question Timer**: Each question has a 10-second timer.
- **Score Calculation**: Points are awarded based on the remaining time when a correct answer is given.
- **End Message**: Displays the final score after 10 questions.

## Game Flow

1. The player enters their name and clicks "Start Game."
2. The player selects a category (e.g., Africa, Europe, Asia, etc.).
3. The game randomly selects 10 countries from the chosen category.
4. For each question:
   - A random country name is presented, and a timer starts.
   - The player clicks on the map to select the location of the country.
   - If the player's click is within 500 km of the correct location, they earn points equal to the remaining time.
5. After 10 questions, a final message displays the player's name and total score.

## Key Features

- **Interactive Map**: Built using Leaflet.js for a seamless mapping experience.
- **Countdown Timer**: Adds urgency and excitement to the game.
- **Scoring System**: Rewards accuracy and speed.
- **Instructions Modal**: Provides a detailed explanation of how to play the game, which can be toggled on or off.
- **No Labels on Map**: The map uses a "no labels" tile layer to ensure country names are not visible.

## Event Handlers

1. **Start Game Event**:
   - Initializes the game and sets up the map.
   ```javascript
   startButton.addEventListener("click", function startGame() {
       playerName = playerNameInput.value.trim();
       if (playerName === "") {
           alert("Please enter your name to start the game!");
           return;
       }

       const selectedCategory = categorySelect.value;
       let countries = categories[selectedCategory];
       countries = shuffleArray(countries).slice(0, 10);
       mapElement.style.display = "block";
       nextQuestion(countries);
   });
   ```

2. **Show Instructions Event**:
   - Displays game instructions.
   ```javascript
   showInstructionsButton.addEventListener("click", function () {
       instructionsContainer.style.display = "block";
   });
   ```

3. **Map Click Event**:
   - Checks if the player's guess is correct.
   ```javascript
   map.on("click", function (e) {
       const distance = map.distance(e.latlng, correctCoords);
       if (distance < 500000) {
           alert("Correct! You earned points.");
       } else {
           alert("Incorrect! Try again.");
       }
   });
   ```

## Closures

- Used in the `startGame` function to manage game state (e.g., `score`, `questionIndex`).

## Learning from AI

- AI tools like [ChatGPT](https://chat.openai.com/) helped with debugging, optimizing code, and integrating Leaflet.js.

## DOM Interaction

- Example: Updating the question text dynamically.
  ```javascript
  countryQuestion.textContent = "Locate: France";
  ```

## Deployment

The project is hosted on GitHub Pages. [View the Live Demo](https://gmt-458-web-gis.github.io/geogame-Berkaynal/).

## Layout Diagram

![Layout Diagram](layout-diagram.png)
