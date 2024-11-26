function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
}

document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("startGame");
    const playerNameInput = document.getElementById("playerName");
    const categorySelect = document.getElementById("categorySelect");
    const mapElement = document.getElementById("map");
    const scoreboard = document.getElementById("scoreboard");
    const playerScoreElement = document.getElementById("playerScore");
    const countryQuestion = document.getElementById("countryQuestion");
    const questionContainer = document.getElementById("questionContainer");
    const timerElement = document.getElementById("timer");
    const endMessage = document.getElementById("endMessage");
    const finalName = document.getElementById("finalName");
    const finalScore = document.getElementById("finalScore");

    const showInstructionsButton = document.getElementById("showInstructions");
    const closeInstructionsButton = document.getElementById("closeInstructions");
    const instructionsContainer = document.getElementById("instructionsContainer");

    // Show the Instructions
    showInstructionsButton.addEventListener("click", function () {
        instructionsContainer.style.display = "block";
    });

    // Hide the Instructions
    closeInstructionsButton.addEventListener("click", function () {
        instructionsContainer.style.display = "none";
    });

    let score = 0;
    let map = null;
    let questionIndex = 0;
    let countdown;
    let timeLeft = 10;
    let playerName = "";

    const categories = {

        africa : [
            { name: "South Africa", coords: [-30.559482, 22.937506] },
            { name: "Egypt", coords: [26.820553, 30.802498] },
            { name: "Kenya", coords: [-1.286389, 36.817223] },
            { name: "Nigeria", coords: [9.081999, 8.675277] },
            { name: "Ethiopia", coords: [9.145, 40.489673] },
            { name: "Morocco", coords: [31.791702, -7.09262] },
            { name: "Algeria", coords: [28.033886, 1.659626] },
            { name: "Ghana", coords: [7.946527, -1.023194] },
            { name: "Tunisia", coords: [33.886917, 9.537499] },
            { name: "Uganda", coords: [1.373333, 32.290275] },
            { name: "Angola", coords: [-11.202692, 17.873887] },
            { name: "Mozambique", coords: [-18.665695, 35.529562] },
            { name: "Zimbabwe", coords: [-19.015438, 29.154857] },
            { name: "Sudan", coords: [12.862807, 30.217636] },
            { name: "Libya", coords: [26.3351, 17.228331] },
            { name: "Senegal", coords: [14.497401, -14.452362] },
            { name: "Ivory Coast", coords: [7.539989, -5.54708] },
            { name: "Cameroon", coords: [7.369722, 12.354722] },
            { name: "Tanzania", coords: [-6.369028, 34.888822] },
            { name: "Rwanda", coords: [-1.940278, 29.873888] }
        ],

        asia : [
            { name: "China", coords: [35.86166, 104.195397] },
            { name: "India", coords: [20.593684, 78.96288] },
            { name: "Japan", coords: [36.204824, 138.252924] },
            { name: "South Korea", coords: [35.907757, 127.766922] },
            { name: "Indonesia", coords: [-0.789275, 113.921327] },
            { name: "Vietnam", coords: [14.058324, 108.277199] },
            { name: "Pakistan", coords: [30.375321, 69.345116] },
            { name: "Bangladesh", coords: [23.684994, 90.356331] },
            { name: "Thailand", coords: [15.870032, 100.992541] },
            { name: "Malaysia", coords: [4.210484, 101.975766] },
            { name: "Philippines", coords: [12.879721, 121.774017] },
            { name: "Kazakhstan", coords: [48.019573, 66.923684] },
            { name: "Uzbekistan", coords: [41.377491, 64.585262] },
            { name: "Afghanistan", coords: [33.93911, 67.709953] },
            { name: "Iran", coords: [32.427908, 53.688046] },
            { name: "Iraq", coords: [33.223191, 43.679291] },
            { name: "Saudi Arabia", coords: [23.885942, 45.079162] },
            { name: "Turkey", coords: [38.963745, 35.243322] },
            { name: "Israel", coords: [31.046051, 34.851612] },
            { name: "Nepal", coords: [28.394857, 84.124008] }
        ],

        europe : [
            { name: "France", coords: [46.603354, 1.888334] },
            { name: "Germany", coords: [51.165691, 10.451526] },
            { name: "Italy", coords: [41.87194, 12.56738] },
            { name: "Spain", coords: [40.463667, -3.74922] },
            { name: "United Kingdom", coords: [55.378051, -3.435973] },
            { name: "Poland", coords: [51.919438, 19.145136] },
            { name: "Netherlands", coords: [52.132633, 5.291266] },
            { name: "Sweden", coords: [60.128161, 18.643501] },
            { name: "Norway", coords: [60.472024, 8.468946] },
            { name: "Ukraine", coords: [48.379433, 31.16558] },
            { name: "Belgium", coords: [50.503887, 4.469936] },
            { name: "Austria", coords: [47.516231, 14.550072] },
            { name: "Czech Republic", coords: [49.817492, 15.472962] },
            { name: "Hungary", coords: [47.162494, 19.503304] },
            { name: "Switzerland", coords: [46.818188, 8.227512] },
            { name: "Denmark", coords: [56.26392, 9.501785] },
            { name: "Finland", coords: [61.92411, 25.748151] },
            { name: "Greece", coords: [39.074208, 21.824312] },
            { name: "Portugal", coords: [39.399872, -8.224454] },
            { name: "Ireland", coords: [53.142367, -7.692054] }
        ],

        americas : [
            { name: "United States", coords: [37.09024, -95.712891] },
            { name: "Canada", coords: [56.130366, -106.346771] },
            { name: "Mexico", coords: [23.634501, -102.552784] },
            { name: "Brazil", coords: [-14.235004, -51.92528] },
            { name: "Argentina", coords: [-38.416097, -63.616672] },
            { name: "Colombia", coords: [4.570868, -74.297333] },
            { name: "Chile", coords: [-35.675147, -71.542969] },
            { name: "Peru", coords: [-9.189967, -75.015152] },
            { name: "Venezuela", coords: [6.42375, -66.58973] },
            { name: "Cuba", coords: [21.521757, -77.781167] },
            { name: "Panama", coords: [8.537981, -80.782127] },
            { name: "Ecuador", coords: [-1.831239, -78.183406] },
            { name: "Uruguay", coords: [-32.522779, -55.765835] },
            { name: "Paraguay", coords: [-23.442503, -58.443832] },
            { name: "Bolivia", coords: [-16.290154, -63.588653] },
            { name: "Honduras", coords: [15.199999, -86.241905] },
            { name: "Guatemala", coords: [15.783471, -90.230759] },
            { name: "Nicaragua", coords: [12.865416, -85.207229] },
            { name: "El Salvador", coords: [13.794185, -88.89653] },
            { name: "Haiti", coords: [18.971187, -72.285215] },
            { name: "Jamaica", coords: [18.109581, -77.297508] },
            { name: "Dominican Republic", coords: [18.735693, -70.162651] },
            { name: "Belize", coords: [17.189877, -88.49765] },
            { name: "Barbados", coords: [13.193887, -59.543198] },
            { name: "Bahamas", coords: [25.03428, -77.39628] },
            { name: "Saint Lucia", coords: [13.909444, -60.978893] },
            { name: "Trinidad and Tobago", coords: [10.691803, -61.222503] },
            { name: "Grenada", coords: [12.262776, -61.604171] }
        ],

        oceania : [
            { name: "Australia", coords: [-25.274398, 133.775136] },
            { name: "New Zealand", coords: [-40.900557, 174.885971] },
            { name: "Papua New Guinea", coords: [-6.314993, 143.95555] },
            { name: "Fiji", coords: [-17.713371, 178.065032] },
            { name: "Samoa", coords: [-13.759029, -172.104629] },
            { name: "Tonga", coords: [-21.178986, -175.198242] },
            { name: "Vanuatu", coords: [-15.376706, 166.959158] },
            { name: "Kiribati", coords: [1.870883, -157.362527] },
            { name: "Micronesia", coords: [7.425554, 150.550812] },
            { name: "Solomon Islands", coords: [-9.64571, 160.156194] }
        ],

        world: [],
    };

    // Combine all countries into the 'world' category
    categories.world = Object.values(categories).flat();

    
    function startGame() {
        playerName = playerNameInput.value.trim();
        if (playerName === "") {
            alert("Please enter your name to start the game!");
            return;
        }

        const selectedCategory = categorySelect.value;
        let countries = categories[selectedCategory];

        if (!countries || countries.length === 0) {
            alert("No countries available for the selected category.");
            return;
        }

        // Shuffle and select 10 random countries
        countries = shuffleArray(countries).slice(0, 10);

        mapElement.style.display = "block";
        scoreboard.style.display = "block";
        questionContainer.style.display = "block";
        endMessage.style.display = "none";

        // Initialize the map only if not already initialized
        if (!map) {
            map = L.map("map").setView([20, 0], 2);
            L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png", {
                maxZoom: 18,
                attribution: "© OpenStreetMap contributors, © CartoDB"
            }).addTo(map);
        } else {
            map.eachLayer(function (layer) {
                map.removeLayer(layer);
            });
            L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png", {
                maxZoom: 18,
                attribution: "© OpenStreetMap contributors, © CartoDB"
            }).addTo(map);
        }

        map.off("click"); // Ensure no previous click listeners interfere

        // Show game instructions via popup
        const instructions = `
            <b>Welcome to GeoGame!</b><br>
            Your task is to locate the country shown at the top.<br>
            Close this popup to start the game.
        `;
        const popup = L.popup({ closeOnClick: true, autoClose: true })
            .setLatLng([20, 0])
            .setContent(instructions)
            .openOn(map);

        map.once("popupclose", () => {
            score = 0;
            questionIndex = 0;
            nextQuestion(countries); // Start the game
        });
    }

    function nextQuestion(countries) {
        if (questionIndex >= countries.length) {
            showEndMessage();
            return;
        }

        const country = countries[questionIndex];
        countryQuestion.textContent = `Locate: ${country.name}`;
        timeLeft = 20;
        timerElement.textContent = `Time left: ${timeLeft} seconds`;

        map.off("click");
        map.on("click", function (e) {
            checkAnswer(e.latlng, country.coords, countries);
        });

        startTimer(countries); // Start the timer
    }

    function startTimer(countries) {
        clearInterval(countdown);
        countdown = setInterval(() => updateTimer(countries), 1000);
    }

    function updateTimer(countries) {
        timeLeft--;
        timerElement.textContent = `Time left: ${timeLeft} seconds`;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            questionIndex++;
            nextQuestion(countries);
        }
    }

    function checkAnswer(clickedCoords, correctCoords, countries) {
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
        nextQuestion(countries);
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
 

