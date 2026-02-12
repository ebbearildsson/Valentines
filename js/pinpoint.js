correct_answer = "";

guesses = 0;

quizzes = {
    "Bugg": ["Tindra", "Ebbe", "Helsingkrona", "Irving"],
    "Bäver": ["Gnagare", "Dam", "Disk", "Stig"],
}

ids = ["one", "two", "three", "four", "five", "correct"];

function submitGuess() {
    let inputArea = document.getElementById("inputarea");
    let guess = inputArea.value;
    inputArea.value = "";
    guesses += 1;
    
    let newclue = document.getElementById(ids[guesses]);
    newclue.classList.add("active");
    
    let guessDiv = document.getElementById("guesses");
    let correct = guess.toLowerCase() === correct_answer;
    if (correct) {
        guessDiv.innerHTML += " " + guess;
        alert("Correct! You found the answer in " + guesses + " guesses.");
        for (let i = guesses + 1; i < ids.length; i++) {
            let extraClue = document.getElementById(ids[i]);
            extraClue.classList.add("active");
        }
    } else {
        guessDiv.innerHTML += `<s> ${guess} </s>`;
    }
}

window.onload = function() {
    let quizs = Object.keys(quizzes);
    let quiz_nbr = quizs.length;
    let quiz_correct = quizs[Math.floor(Math.random() * quiz_nbr)];
    let quiz_clues = quizzes[quiz_correct];

    quiz_clues.forEach((clue, index) => {
        let clueElement = document.getElementById(ids[index]);
        clueElement.innerHTML = clue;
    });

    let correctElement = document.getElementById(ids[ids.length - 1]);
    correctElement.innerHTML = quiz_correct;

    correct_answer = quiz_correct.toLowerCase();
}