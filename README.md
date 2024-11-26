[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/ATV5e7Id)
Link of the Geo Game: https://gmt-458-web-gis.github.io/geogame-Berkaynal/
# Find the Country GeoGame

## Objective
The goal of "Find the Country" is to test players' geographic knowledge by having them locate specific countries on a map within a time limit. Players score points based on accuracy and speed.

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

## Libraries Used
- **Leaflet.js**: For map rendering and interactive click detection.

## Enhancements
- **Random Country Selection**: The game now selects 10 random countries from the chosen category instead of asking about all countries in that category.
- **No Labels on Map**: The map uses a "no labels" tile layer to ensure country names are not visible.
- **Instructions Modal**: A "Instructions" button provides a detailed explanation of how to play the game, which can be toggled on or off.

## Layout Diagram
![Layout Diagram](layout-diagram.png)
