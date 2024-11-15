document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("startGame");
    const playerNameInput = document.getElementById("playerName");
    const mapElement = document.getElementById("map");
    const scoreboard = document.getElementById("scoreboard");
    const playerScoreElement = document.getElementById("playerScore");
    const countryQuestion = document.getElementById("countryQuestion");
    const questionContainer = document.getElementById("questionContainer");
    const timerElement = document.getElementById("timer");
    const endMessage = document.getElementById("endMessage");
    const finalName = document.getElementById("finalName");
    const finalScore = document.getElementById("finalScore");

    let score = 0;
    let map;
    let questionIndex = 0;
    let countdown;
    let timeLeft = 10;
    let playerName = "";

    const countries = [
        { name: "France", coords: [46.603354, 1.888334] },
        { name: "Germany", coords: [51.165691, 10.451526] },
        { name: "Italy", coords: [41.87194, 12.56738] },
        { name: "Spain", coords: [40.463667, -3.74922] },
        { name: "United Kingdom", coords: [55.378051, -3.435973] },
        { name: "Turkey", coords: [38.963745, 35.243322] },
        { name: "Russia", coords: [61.52401, 105.318756] },
        { name: "Brazil", coords: [-14.235004, -51.92528] },
        { name: "Canada", coords: [56.130366, -106.346771] },
        { name: "Australia", coords: [-25.274398, 133.775136] }
    ];

    function startGame() {
        playerName = playerNameInput.value.trim();
        if (playerName === "") {
            alert("Please enter your name to start the game!");
            return;
        }

        mapElement.style.display = "block";
        scoreboard.style.display = "block";
        questionContainer.style.display = "block";
        endMessage.style.display = "none";

        map = L.map("map").setView([20, 0], 2);
        L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png", {
            maxZoom: 18,
            attribution: "© OpenStreetMap contributors, © CartoDB"
        }).addTo(map);

        // Display popup instructions
        const instructions = `
            <b>Welcome to GeoGame!</b><br>
            Your task is to locate the country shown at the top within 10 seconds.<br>
            The faster you answer, the higher your score!<br>
            Close this popup to start the game.
        `;
        const popup = L.popup({ closeOnClick: true, autoClose: true })
            .setLatLng([20, 0])
            .setContent(instructions)
            .openOn(map);

        map.once("popupclose", () => {
            score = 0;
            questionIndex = 0;
            nextQuestion(); // Start the game after closing popup
        });
    }

    function nextQuestion() {
        if (questionIndex >= 10) {
            showEndMessage();
            return;
        }

        const country = countries[questionIndex];
        countryQuestion.textContent = "Locate: " + country.name;
        timeLeft = 10;
        timerElement.textContent = `Time left: ${timeLeft} seconds`;

        map.off("click");
        map.on("click", function(e) {
            checkAnswer(e.latlng, country.coords);
        });

        startTimer(); // Start timer after the popup is closed
    }

    function startTimer() {
        clearInterval(countdown);
        countdown = setInterval(updateTimer, 1000);
    }

    function updateTimer() {
        timeLeft--;
        timerElement.textContent = `Time left: ${timeLeft} seconds`;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            questionIndex++;
            nextQuestion();
        }
    }

    function checkAnswer(clickedCoords, correctCoords) {
        const distance = map.distance(clickedCoords, correctCoords);

        if (distance < 500000) {
            clearInterval(countdown);
            score += timeLeft;
            playerScoreElement.textContent = `Score: ${score}`;
            alert("Correct! You earned " + timeLeft + " points.");
        } else {
            alert("Incorrect! Moving to the next question.");
        }

        questionIndex++;
        nextQuestion();
    }

    function showEndMessage() {
        mapElement.style.display = "none";
        scoreboard.style.display = "none";
        questionContainer.style.display = "none";

        finalName.textContent = playerName;
        finalScore.textContent = score;
        endMessage.style.display = "block";
    }

    startButton.addEventListener("click", startGame);
});
