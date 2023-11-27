//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let recordContainer = document.querySelector("record-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let signUpButton = document.getElementById("save-button");
let qResult = document.querySelector(".questRes");
var nameInput = document.querySelector("#name");
let questionCount;
let scoreCount = 0;
let seconds = 180;
let countdown;

//Questions, Options and answers array

const quizArray = [
  {

    question: "Who ruined Eren's equipment back in the trainee days?",
    options: ["Keith Shadis", "Darius Zackly", "Jean", "Nile Dok"],
    answer: "Keith Shadis",
  },
  {
    question: "What's the name of Jean's horse?",
    options: ["Pegasus", "Shallot", "Bufpart", "Jeanbo"],
    answer: "Bufpart",
  },
  {
    question: "The Beast Titan is a __ Meter Class.",
    options: ["15", "18", "17", "16"],
    answer: "17",
  },
  {
    question: "Who was the first member of Levi's squad to be killed by Annie, the Female Titan?",
    options: ["Eld", "Petra", "Oluo", "Gunther"],
    answer: "Gunther",
  },
  {
    question: "For how many years did Ymir wander outside of the Walls as a Titan?",
    options: ["For 60 years", "For 50 years", "For 40 years", "For 70 years"],
    answer: "For 60 years",
  },
  {
    question: "Who is in charge of the defense of the southern region?",
    options: ["Nile Dok", "Darius Zackly", "Erwin", "Dot Pixis"],
    answer: "Dot Pixis"
  },
  {
    question: "What is the name of the newspaper headquarters in Stohess district?",
    options: ["Berg Newspaper", "Beaure Newspaper", "Roy Newspaper", "Daily Bugle"],
    answer: "Berg Newspaper"
  },
  {
    question: "What nickname was given to Erwin when he was a child?",
    options: ["Blondie", "Idiot", "Eyebrows", "Smartass"],
    answer: "Eyebrows",
  },
  {
    question: "What did Carla do for living before she met Grisha?",
    options: ["She was a soldier", "She was a waitress", "She was a doctor", "She was a teacher"],
    answer: "She was a waitress"
  },
  {
    question: "Whom did Grisha eat in order to steal the Coordinate?",
    options: ["Uri Reiss", "Ulklin Reiss", "Abel Reiss", "Frieda Reiss"],
    answer: "Frieda Reiss",
  },
];

//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});


//----------function for 1 sec display of answer status-----------------
var quesResDispTime = setInterval(function () {
for (let second = 1; second > 1; second--) {
  textContent = "";
}},1000);


nextBtn.addEventListener(          //--------NOT NEEDED---------
  "click",
  (displayNext = () => {
    //moves to the next question
    questionCount += 1;
    //if last question then the quiz ends
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");   //--------NOT NEEDED---------
      //user score
    }
    else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      //display quiz
      quizDisplay(questionCount);
      // seconds = 180;
      // clearInterval(countdown);
      timerDisplay();
    }
  })
);                                   // --------NOT NEEDED---------


// const displayNext = () => {
//       //moves to the next question
//       questionCount += 1;
//       //if last question then the quiz ends
//       if (questionCount == quizArray.length) {
//         //hide question container and display score
//         displayContainer.classList.add("hide");
//         scoreContainer.classList.remove("hide"); 
//         //user score
//       }
//       else {
//         //display questionCount
//         countOfQuestion.innerHTML =
//           questionCount + 1 + " of " + quizArray.length + " Question";
//         //display quiz
//         quizDisplay(questionCount);
//         seconds = 180;
//         clearInterval(countdown);
//         timerDisplay();
//       }
//     };


//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });

  //display current amount of question answered 
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);

    //Shows the options to be picked as an answer.
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
    <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
    <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
    <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}
//----------------------------------------------------------------------------------
//Checker Function to check if option is the answer or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == answer option stored in object
  if (userSolution === quizArray[questionCount].answer) {

    //For marking the right answer if picked
    userOption.classList.add("answer");
    qResult.innerHTML = "Right Answer. You delayed the Rumbling.";
    scoreCount++;
    seconds = seconds - 30;

    quesResDispTime()//---------------FIX
    displayNext()//---------------FIX
    
  } else {

    //For marking the answer picked but not the right answer
    userOption.classList.add("wrong");
    qResult.innerHTML = "Wrong Answer. Rumbling is about to start.";
    seconds = seconds - 30;

    quesResDispTime()//---------------FIX
    displayNext ()//---------------FIX

    //For marking the right answer
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].answer) {
        element.classList.add("answer");
        
        quesResDispTime()//---------------FIX
        displayNext()
      }
    });
  }

  //clear interval(stop timer)
  clearInterval(countdown);

  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    seconds--;
    timeLeft.innerHTML = `Time before the Rumbling:${seconds}s`;
    if (seconds == 0) {       //--------------------FINISH-------------------------------------------THIS IS WHEN TIMER ENDS------
      //clearInterval(countdown);
      //displayNext();//
    }
  }, 1000);
};

// Records user score and time to local storage---------------------FINISH--------------------------------------------------
signUpButton.addEventListener("click", function (event) {
  event.preventDefault();
  // create user object from submission
  var userData = {
    firstName: nameInput.value.trim(),
    Score: scoreCount,
    Time: timeLeft
  };
  // set new submission to local storage 
  localStorage.setItem("userData", JSON.stringify(userData));
  displayContainer.classList.add("hide");
  scoreContainer.classList.add("hide");
  recordContainer.classList.remove("hide");
});

//Clears the user records ---------------------FINISH--------------------------------------------------
//

// clearButton.addEventListener("click", function(event) {
//   event.preventDefault();
// localStorage.removeItem('userData')
// });

//initial
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  seconds = 180;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}
//listens to user click on save button
// saveButton.addEventListener("click", saveUserRecord);---------------------------------------------------

//listens to user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};