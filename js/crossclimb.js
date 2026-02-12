/*
love -> move -> mope -> more
disco -> discs -> disks -> dusks -> dunks -> punks -> punkt -> punct -> punce -> dunce -> dance

*/

ladders = [
    {
        "love": "I ____ You", 
        "move": "What you do on the dance floor", 
        "mope": "What I do when I'm upset", 
        "more": "I Love You ____! I Love You Most!"
    },
    {
        "disco": "Your main dance style",
        "discs": "What you throw on a frisbee golf course",
        "disks": "What you used to store data on before flash drives",
        "dusks": "The time of day when the sun goes down",
        "dunks": "What you do to a basketball",
        "punks": "A subculture of rebellious youth",
        "punkt": "A Swedish word for 'point'",
        "punct": "A Latin word for 'point'",
        "punce": "A type of red wine",
        "dunce": "A person who is slow to learn (Me ._.)",
        "dance": "What you love more than me"
    }
]

input_ladder = []
ladder_length = 0;
word_length = 0;
active_ladder = 0;
active_word = 0;
active_letter = 0;
keys = [];

function check_ladder() {
    for (let i = 0; i < ladder_length; i++) {
        let word = input_ladder[i].join("");
        if (word !== keys[i]) {
            return false;
        }
    }
    return true;
}

function remove_all_active_classes() {
    for (let i = 0; i < ladder_length; i++) {
        let word_div = document.getElementById("word" + i);
        word_div.classList.remove("active");
        for (let j = 0; j < word_length; j++) {
            let letter_div = document.getElementById("letter" + i + j);
            letter_div.classList.remove("active");
        }
    }
}

function update_ladder() {
    remove_all_active_classes();

    for (let i = 0; i < ladder_length; i++) {
        for (let j = 0; j < word_length; j++) {
            document.getElementById("letter" + i + j).innerText = input_ladder[i][j];
        }
    }

    let active_letter_div = document.getElementById("letter" + active_word + active_letter);
    active_letter_div.classList.add("active");
    let active_word_div = document.getElementById("word" + active_word);
    active_word_div.classList.add("active");

    let clue = ladders[active_ladder][keys[active_word]];
    document.getElementById("clue").innerText = clue;

    if (check_ladder()) {
        alert("You win!\nRefresh the page to play again.");
    }
}

function add_keyboard() {
    let keyboard_div = document.getElementById("keyboard");
    let alph = "qwertyuiopasdfghjklzxcvbnm";
    for (let i = 0; i < 26; i++) {
        let letter_div = document.createElement("div");
        letter_div.classList.add("key");
        letter_div.innerText = alph[i];
        keyboard_div.appendChild(letter_div);
    }
}

document.addEventListener('click', function(event) {
    if (event.target.classList.contains("key")) {
        let key = event.target.innerText;
        let active_letter_div = document.getElementById("letter" + active_word + active_letter);
        active_letter_div.removeClass = "active";
        let active_word_div = document.getElementById("word" + active_word);
        active_word_div.removeClass = "active";
        if (active_letter < word_length) {
            input_ladder[active_word][active_letter] = key.toLowerCase();
            if (active_letter < word_length - 1) active_letter++;
        }
        update_ladder();
    }

    if (event.target.classList.contains("word")) {
        let word_id = event.target.id;
        active_word = parseInt(word_id.replace("word", ""));
        active_letter = 0;
        update_ladder();
    }

    if (event.target.classList.contains("letter")) {
        let letter_id = event.target.id;
        active_word = parseInt(letter_id.replace("letter", "").slice(0, -1));
        active_letter = parseInt(letter_id.replace("letter", "").slice(-1));
        update_ladder();
    }
});

document.addEventListener('keydown', function(event) {
    let active_word_div = document.getElementById("word" + active_word);
    active_word_div.removeClass = "active";
    let active_letter_div = document.getElementById("letter" + active_word + active_letter);
    active_letter_div.removeClass = "active";

    console.log(event.key);
    if ("abcdefghijklmnopqrstuvwxyz".includes(event.key.toLowerCase())) {
        if (active_letter < word_length) {
            input_ladder[active_word][active_letter] = event.key.toLowerCase();
            if (active_letter < word_length - 1) active_letter++;
        }
    } else if (event.key === "Backspace") {
        if (active_letter >= 0) {
            input_ladder[active_word][active_letter] = "_";
            if (active_letter > 0) active_letter--;
        }
    } else if (event.key === "Tab") {
        event.preventDefault();
        if (active_word < ladder_length - 1) {
            active_word++;
            active_letter = 0;
        } else {
            active_word = 0;
            active_letter = 0;
        }
    }

    update_ladder();
});

window.onload = function() {
    add_keyboard();
    active_ladder = Math.floor(Math.random() * ladders.length);
    active_word = 0;
    active_letter = 0;
    keys = Object.keys(ladders[active_ladder]);
    ladder_length = keys.length;
    word_length = keys[0].length;

    let ladder_div = document.getElementById("ladder");

    for (let i = 0; i < ladder_length; i++) {
        word = [];
        let word_div = document.createElement("div");
        word_div.classList.add("word");
        word_div.id = "word" + i;
        ladder_div.appendChild(word_div);
        for (let j = 0; j < word_length; j++) {
            word.push("_");
            let letter_div = document.createElement("div");
            letter_div.classList.add("letter");
            letter_div.id = "letter" + i + j;
            word_div.appendChild(letter_div);
        }
        input_ladder.push(word);
    }

    update_ladder();
}