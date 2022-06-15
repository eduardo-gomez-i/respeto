const questions = [
    {
        question: "El respeto es:",
        choices: ["Bueno", "Malo"],
        answer: "Bueno"
    },
    {
        question: "¿Existen diferencias de tus compañeros que no te agraden?",
        choices: ["Si", "No"],
        answer: "No"
    },
    {
        question: "¿Cuales y porque?",
        choices: ["Siguente"],
        answer: "Siguente"
    },
];

// grab references to elements
var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var timesUp = document.getElementById("timesUp");

var startDiv = document.getElementById("start");
var startQuizBtn = document.getElementById("start-quiz-button");

var questionDiv = document.getElementById("questionDiv");
var questionTitle = document.getElementById("questionTitle");
var choiceA = document.getElementById("btn0");
var choiceB = document.getElementById("btn1");
var choiceC = document.getElementById("btn2");
var choiceD = document.getElementById("btn3");
var answerCheck = document.getElementById("answerCheck");

var summary = document.getElementById("summary");
var submitInitialBtn = document.getElementById("submitInitialBtn");
//var initialInput = document.getElementById("initialInput");
var everything = document.getElementById("everything");

var highScoreSection = document.getElementById("highScoreSection");
//var finalScore = document.getElementById("finalScore");

var goBackBtn = document.getElementById("goBackBtn");
var clearHighScoreBtn = document.getElementById("clearHighScoreBtn"); 
var viewHighScore = document.getElementById("viewHighScore");
var listOfHighScores = document.getElementById("listOfHighScores");

// define other variables
var correctAns = 0;
var questionNum = 0;
var scoreResult;
var questionIndex = 0;

/**
 * FUNCTIONS
 */

// WHEN I click the start button, timer starts
var totalTime = 60;
function newQuiz() {
    questionIndex = 0;
    totalTime = 60;
    timeLeft.textContent = totalTime;
    //initialInput.textContent = "";

    startDiv.style.display = "none";
    questionDiv.style.display = "block";
    timer.style.display = "block";
    timesUp.style.display = "none";

    var startTimer = setInterval(function() {
        totalTime--;
        timeLeft.textContent = totalTime;
        if(totalTime <= 0) {
            clearInterval(startTimer);
            if (questionIndex < questions.length - 1) {
                gameOver();
            }
        }
    },1000);

    showQuiz();
};

// console.log(questions[questionIndex].question);
// console.log(questions[questionIndex].choices);

// then presented with questions and choices
function showQuiz() {
    nextQuestion();
}

function nextQuestion() {
    questionTitle.textContent = questions[questionIndex].question;
    choiceA.textContent = questions[questionIndex].choices[0];
    choiceB.textContent = questions[questionIndex].choices[1];
}

// after question is answered, show if correct or wrong
function checkAnswer(answer) {

    var lineBreak = document.getElementById("lineBreak");
    lineBreak.style.display = "block";
    answerCheck.style.display = "block";

    console.log(questions[questionIndex].choices[answer]);

    if (questions[questionIndex].choices[answer] === 'Bueno') {
        correctAns++;
        var img = document.createElement("img"); 
        img.src = "https://cdn2.hubspot.net/hubfs/5313163/Multiculturalidad%20ni%C3%B1os.jpg";
        img.height = 400;
        var src = answerCheck;

        src.appendChild(img); 
        //answerCheck.textContent = "¡Correcto!";
    } else if (questions[questionIndex].choices[answer] === 'Malo'){
        correctAns++;
        var img = document.createElement("img");
        img.src = "https://upload.wikimedia.org/wikipedia/commons/5/5f/Red_X.svg";
        img.height = 400;
        var src = answerCheck;

        src.appendChild(img); 
    } else if (questions[questionIndex].choices[answer] === 'Si') {
        correctAns++;
        var textarea = document.createElement("textarea");
        textarea.rows = 4;
        textarea.cols = 50;

        textarea.type = "text";
        var src = document.getElementById("Input");

        src.appendChild(textarea); 

        choiceB.style.display = 'none';

    } else if (questions[questionIndex].choices[answer] === 'No') {
        correctAns++;
        questionIndex = 3;
        console.log(questionIndex);
        console.log(questions.length);

        var img = document.createElement("img");
        img.src = "https://upload.wikimedia.org/wikipedia/commons/5/5f/Red_X.svg";
        img.height = 400;
        var src = answerCheck;

        src.appendChild(img);
    } 

    questionIndex++;
    // repeat with the rest of questions 
    if (questionIndex < questions.length) {
        nextQuestion();
    } else {
        // if no more question, run game over function
        gameOver();
    }
}

function chooseA() { checkAnswer(0); }

function chooseB() { checkAnswer(1); }

function chooseC() { checkAnswer(2); }

function chooseD() { checkAnswer(3); }

// when all questions are answered or timer reaches 0, game over
function gameOver() {
    summary.style.display = "block";

    var img = document.createElement("img");

    img.src = "https://learnenglishkids.britishcouncil.org/sites/kids/files/image/RS7834_ThinkstockPhotos-123905412-hig.jpg";
    img.height = 400;
    var src = summary;

    src.appendChild(img); 

    questionDiv.style.display = "none";
    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "block";

    // show final score
    //finalScore.textContent = correctAns;
}

// enter initial and store highscore in local storage
function storeHighScores(event) {
    event.preventDefault();

    // stop function is initial is blank
    /* if (initialInput.value === "") {
        alert("Please enter your initials!");
        return;
    } */

    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";   

    // store scores into local storage
    var savedHighScores = localStorage.getItem("high scores");
    var scoresArray;

    if (savedHighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHighScores)
    }

    var userScore = {
        //initials: initialInput.value,
        //score: finalScore.textContent
    };

    console.log(userScore);
    scoresArray.push(userScore);

    // stringify array in order to store in local
    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);
    
    // show current highscores
    showHighScores();
}

// function to show high scores
var i = 0;
function showHighScores() {

    startDiv.style.display = "none";
    timer.style.display = "none";
    questionDiv.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";

    var savedHighScores = localStorage.getItem("high scores");

    // check if there is any in local storage
    if (savedHighScores === null) {
        return;
    }
    console.log(savedHighScores);

    var storedHighScores = JSON.parse(savedHighScores);

    for (; i < storedHighScores.length; i++) {
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
        listOfHighScores.appendChild(eachNewHighScore);
    }
}

/**
 * ADD EVENT LISTENERS
 */

startQuizBtn.addEventListener("click", newQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);

submitInitialBtn.addEventListener("click", function(event){ 
    storeHighScores(event);
});

viewHighScore.addEventListener("click", function(event) { 
    showHighScores(event);
});

goBackBtn.addEventListener("click", function() {
    startDiv.style.display = "block";
    highScoreSection.style.display = "none";
});

clearHighScoreBtn.addEventListener("click", function(){
    window.localStorage.removeItem("high scores");
    listOfHighScores.innerHTML = "High Scores Cleared!";
    listOfHighScores.setAttribute("style", "font-family: 'Archivo', sans-serif; font-style: italic;")
});