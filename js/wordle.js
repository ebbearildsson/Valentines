let words = [
    "tindra",
    "disco",
    "discgolf",
    "love",
    "dance",
    "arkad",
    "akrad",
    "queen",
]

const ladder_length = 6;
let chosen_word = 0;
let word_length = 0;
let current_word = 0;
let current_letter = 0;

function add_keyboard() {
    let keyboard_div = document.getElementById("keyboard");
    let alph = "qwertyuiopasdfghjklzxcvbnm";
    for (let i = 0; i < 26; i++) {
        let letter_div = document.createElement("div");
        letter_div.classList.add("key");
        letter_div.id = "key" + alph[i];
        letter_div.innerText = alph[i];
        keyboard_div.appendChild(letter_div);
    }
    let enter_div = document.createElement("div");
    enter_div.classList.add("key");
    enter_div.innerText = "Enter";
    keyboard_div.appendChild(enter_div);

    let backspace_div = document.createElement("div");
    backspace_div.classList.add("key");
    backspace_div.innerText = "Backspace";
    keyboard_div.appendChild(backspace_div);
}

function add_ladder() {
    let ladder_div = document.getElementById("ladder");
    for (let i = 0; i < ladder_length; i++) {
        let word_div = document.createElement("div");
        word_div.classList.add("word");
        word_div.id = "word" + i;
        ladder_div.appendChild(word_div);
        for (let j = 0; j < word_length; j++) {
            let letter_div = document.createElement("div");
            letter_div.classList.add("letter");
            letter_div.id = "letter" + i + j;
            word_div.appendChild(letter_div);
        }
    }
}

function add_letter(letter) {
    let letter_div = document.getElementById("letter" + current_word + current_letter);
    letter_div.innerText = letter;
    if (current_letter < word_length - 1) {
        current_letter++;
    }
}

function check_answer() {
    let correct = true;
    for (let i = 0; i < word_length; i++) {
        let letter_div = document.getElementById("letter" + current_word + i);
        if (letter_div.innerText === words[chosen_word][i]) {
            letter_div.classList.add("correct");
            let key_div = document.getElementById("key" + letter_div.innerText);
            key_div.classList.add("correct");
        } else if (words[chosen_word].includes(letter_div.innerText)) {
            letter_div.classList.add("present");
            correct = false;
            let key_div = document.getElementById("key" + letter_div.innerText);
            if (!key_div.classList.contains("correct")) {
                key_div.classList.add("present");
            }
        } else {
            letter_div.classList.add("absent");
            correct = false;
            let key_div = document.getElementById("key" + letter_div.innerText);
            if (!key_div.classList.contains("correct") && !key_div.classList.contains("present")) {
                key_div.classList.add("absent");
            }
        }
    }
    if (correct) {
        alert("You win!\nRefresh the page to play again.");
    } else {
        if (current_word < ladder_length - 1) {
            current_word++;
            current_letter = 0;
        } else {
            alert("You lose!\nRefresh the page to play again.");
        }
    }
}

document.addEventListener('click', function(event) {
    let key_div = event.target;
    if (key_div.classList.contains("key")) {
        let key = key_div.innerText;
        if (key === "Enter") {
            check_answer();
        } else if (key === "Backspace") {
            let letter_div = document.getElementById("letter" + current_word + current_letter);
            letter_div.innerText = "";
            if (current_letter > 0) {
                current_letter--;
            }
        } else {
            add_letter(key.toLowerCase());
        }
    }
});

document.addEventListener('keydown', function(event) {
    let key = event.key.toLowerCase();
    if (key.length === 1 && key >= 'a' && key <= 'z') {
        add_letter(key);
    }

    if (key === "backspace") {
        let letter_div = document.getElementById("letter" + current_word + current_letter);
        letter_div.innerText = "";
        if (current_letter > 0) {
            current_letter--;
        }
    }
    if (key === "enter") {
        check_answer();
    }
});

window.onload = function() {
    add_keyboard();
    
    chosen_word = Math.floor(Math.random() * words.length);
    word_length = words[chosen_word].length;
    
    add_ladder();
}