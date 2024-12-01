

// Labels and coordinates

const labels = [
    { name: "Coupler", coords: [58, 425, 191, 463] },
    { name: "Snow Plow, Front", coords: [108, 473, 176, 516] },
    { name: "Snow Plow, Rear", coords: [1812, 468, 1876, 523] },
    { name: "Sand Box, F-End", coords: [218, 212, 265, 333] },
    { name: "Sand Box, R-End", coords: [1730, 214, 1775, 330] },
    { name: "Sand Box, F-End (Alt)", coords: [230, 167, 267, 209] },
    { name: "Sand Box, R-End (Alt)", coords: [1764, 57, 1803, 102] },
    { name: "Hand Brake Area", coords: [284, 209, 335, 309] },
    { name: "Battery Box", coords: [296, 317, 359, 371] },
    { name: "Horn", coords: [325, 75, 428, 102] },
    { name: "Headlight-Front", coords: [318, 111, 376, 153] },
    { name: "Sanding Nozzle - Front", coords: [223, 499, 316, 541] },
    { name: "Air Conditioner", coords: [444, 53, 546, 103] },
    { name: "GP Truck, Front", coords: [345, 433, 646, 526] },
    { name: "GP Truck, Rear", coords: [1344, 430, 1649, 535] },
    { name: "Air Brake Equipment", coords: [404, 309, 584, 381] },
    { name: "HV Electrical Cabinet", coords: [590, 108, 666, 242] },
    { name: "HV Air Filter", coords: [593, 257, 670, 331] },
    { name: "Generator/TM Blower", coords: [686, 178, 766, 348] },
    { name: "Inertial Filter Blower", coords: [739, 80, 814, 157] },
    { name: "Turbocharger", coords: [829, 185, 882, 243] },
    { name: "Auxiliary Generator - 18KW AC", coords: [776, 181, 826, 267] },
    { name: "AR10 Main Alternator", coords: [817, 278, 851, 369] },
    { name: "Engine Silencer", coords: [828, 80, 911, 156] },
    { name: "Dynamic Brake Assembly Fan", coords: [1013, 87, 1175, 142] },
    { name: "Engine", coords: [942, 198, 1269, 308] },
    { name: "Turbo Lube Pump", coords: [990, 343, 1045, 373] },
    { name: "Starting Motors", coords: [901, 310, 937, 377] },
    { name: "Main Air Reservoir", coords: [865, 385, 1212, 423] },
    { name: "Governor", coords: [1285, 198, 1331, 255] },
    { name: "Lube Oil Strainer Assembly", coords: [1285, 309, 1342, 374] },
    { name: "Air Dryer", coords: [1227, 417, 1260, 499] },
    { name: "Engine Water Tank", coords: [1347, 189, 1400, 240] },
    { name: "Fuel Pump", coords: [1354, 285, 1417, 332] },
    { name: "Lube Oil Cooler Assembly", coords: [1408, 206, 1452, 248] },
    { name: "Lube Oil Filter Assembly", coords: [1415, 255, 1475, 309] },
    { name: "Air Compressor", coords: [1500, 240, 1573, 376] },
    { name: "Layover Control Panel", coords: [1601, 208, 1677, 285] },
    { name: "Kim Hot Start", coords: [1603, 296, 1674, 345] },
    { name: "Battery Charger", coords: [1682, 252, 1720, 337] },
    { name: "Radiators", coords: [1306, 105, 1740, 183] },
    { name: "Cooling Fans", coords: [1315, 48, 1744, 99] },
    { name: "Headlight Rear", coords: [1793, 131, 1849, 184] },
    { name: "Fuel Tank", coords: [807, 439, 1173, 515] },
];




let currentIndex = 0;
const missedLabels = []; // Track missed labels
let correctCount = 0;
let incorrectCount = 0;

// Shuffle the labels array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Shuffle labels before starting the quiz
shuffle(labels);

// Set the initial question
function setQuestion() {
    if (currentIndex < labels.length) {
        document.getElementById("question").textContent = `Click on: ${labels[currentIndex].name}`;
    } else {
        endQuiz();
    }
}

// Add a highlight for correct or incorrect answers
function addHighlight(coords, container, color, label = null) {
    const diagram = document.getElementById("diagram");
    const scaleX = diagram.clientWidth / diagram.naturalWidth;
    const scaleY = diagram.clientHeight / diagram.naturalHeight;

    const x1 = coords[0] * scaleX;
    const y1 = coords[1] * scaleY;
    const x2 = coords[2] * scaleX;
    const y2 = coords[3] * scaleY;

    const highlight = document.createElement("div");
    highlight.classList.add("highlight");
    highlight.style.left = `${x1}px`;
    highlight.style.top = `${y1}px`;
    highlight.style.width = `${x2 - x1}px`;
    highlight.style.height = `${y2 - y1}px`;
    highlight.style.borderColor = color;
    highlight.style.backgroundColor = color === "green" ? "rgba(0, 255, 0, 0.2)" : "rgba(255, 0, 0, 0.2)";

    if (label) {
        highlight.addEventListener("mouseover", () => {
            label.style.display = "block";
            label.style.left = `${x2 + 5}px`; // Position label to the right of the highlight
            label.style.top = `${y1}px`; // Align vertically
        });
        highlight.addEventListener("mouseout", () => {
            label.style.display = "none";
        });
    }

    container.appendChild(highlight);
    return highlight; // Return the highlight for additional controls
}

// End the quiz and display the summary
function endQuiz() {
    const questionElement = document.getElementById("question");
    const feedbackElement = document.getElementById("feedback");
    const diagramContainer = document.getElementById("diagram-container");

    const score = ((correctCount / labels.length) * 100).toFixed(2); // Calculate score percentage

    questionElement.textContent = "Quiz Completed!";
    feedbackElement.innerHTML = `
        <p>Score: ${score}%</p>
        <p>Correct: ${correctCount}</p>
        <p>Incorrect: ${incorrectCount}</p>
        <p>Missed Labels:</p>
        <ul>
            ${missedLabels
                .map(
                    (label) =>
                        `<li class="missed-label" data-label="${label.name}">${label.name}</li>`
                )
                .join("")}
        </ul>
    `;

    // Highlight missed areas in red when hovered and show labels
    const missedLabelElements = document.querySelectorAll(".missed-label");
    missedLabelElements.forEach((element) => {
        const label = labels.find((l) => l.name === element.dataset.label);
        let tempHighlight = null; // Track the temporary highlight
        let tempLabel = null; // Track the temporary label
        element.addEventListener("mouseover", () => {
            tempHighlight = addHighlight(label.coords, diagramContainer, "red");
            tempLabel = document.createElement("div");
            tempLabel.classList.add("label");
            tempLabel.textContent = label.name;
            tempLabel.style.left = `${tempHighlight.style.left}`;
            tempLabel.style.top = `${parseInt(tempHighlight.style.top) + 20}px`; // Below the highlight
            diagramContainer.appendChild(tempLabel);
        });
        element.addEventListener("mouseout", () => {
            if (tempHighlight) tempHighlight.remove(); // Remove the highlight
            if (tempLabel) tempLabel.remove(); // Remove the label
        });
    });
}

// Start the quiz
setQuestion();

function checkAnswer(isCorrect) {
    const feedback = document.getElementById("feedback");
    const diagramContainer = document.getElementById("diagram-container");
    const currentLabel = labels[currentIndex];

    if (isCorrect) {
        feedback.textContent = "Correct!";
        feedback.style.color = "green";
        correctCount++;

        const label = document.createElement("div");
        label.classList.add("label");
        label.textContent = currentLabel.name;
        label.style.display = "none";

        addHighlight(currentLabel.coords, diagramContainer, "green", label);
        diagramContainer.appendChild(label);
    } else {
        feedback.textContent = "Incorrect! Moving to the next label.";
        feedback.style.color = "red";
        incorrectCount++;
        missedLabels.push(currentLabel);
    }

    currentIndex++;
    setQuestion();
}

const diagram = document.getElementById("diagram");
diagram.addEventListener("click", (event) => {
    const scaleX = diagram.naturalWidth / diagram.clientWidth;
    const scaleY = diagram.naturalHeight / diagram.clientHeight;

    const x = Math.round(event.offsetX * scaleX);
    const y = Math.round(event.offsetY * scaleY);

    const coords = labels[currentIndex].coords;

    // Check if the click is within the bounds
    const isCorrect =
        x >= coords[0] && x <= coords[2] && y >= coords[1] && y <= coords[3];

    checkAnswer(isCorrect);
});
