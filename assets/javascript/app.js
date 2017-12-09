var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["The capital city of Italy is?", "can you name the two countries that are found whithin italys border?", "the sea surrounding much of italy is ?", "Which Italian car manufacturer sponsors a Formula One team?", "What was the name of the town destroyed by mount Vesuvius in 79AD?", "What is the name of the church in the Vatican?", "Which is the largest of the Italian lakes?", "Who painted the ceiling of the Sistine Chapel?"];
var answerArray = [["Rome", "Venice", "naples", "Milan"], ["Monaco and Andora","vatican city and san marino","Nauru and Tuvarau","Marshall and Luxumburg"], ["Dead sea", "caspian sea", "Mediterranian sea", "Persian sea"], ["fiat","Lamborghini","Ferrari","Masirati"], ["Agropoli", "Paestum", "Sorrento", "Pompei"], ["St peters","St pauls","st Marks","St johns"], ["Como", "Garda", "Maggiore", "Lugano"], ["Titian","Donatello","Raphael","Michaelangelo"]];
var imageArray = ["<img class='center-block img-right' src='assets/images/Rome.jpg'>", "<img class='center-block img-right' src='assets/images/vatican.jpg'>", "<img class='center-block img-right' src='assets/images/mediteranian.jpg'>", "<img class='center-block img-right' src='assets/images/Ferrari.jpg'>", "<img class='center-block img-right' src='assets/images/Pompei.jpg'>", "<img class='center-block img-right' src='assets/images/basilica.jpg'>", "<img class='center-block img-right' src='assets/images/maggiore.jpg'>", "<img class='center-block img-right' src='assets/images/angelo.jpg'>"];
var correctAnswers = ["A. Rome", "B. vatican city and san marino", "C. Mediterranian sea", "C. Ferrari", "D. Pompei", "A. St peters", "B. Garda", "D. Michaelangelo"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("assets/images/italy.mp3");

$(document).ready(function() {
    
    
    function initialScreen() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
        $(".mainArea").html(startScreen);
    }
    
    initialScreen();
    
    
    
    $("body").on("click", ".start-button", function(event){
        event.preventDefault();  
        clickSound.play();
        generateHTML();
    
        timerWrapper();
    
    }); 
    
    $("body").on("click", ".answer", function(event){
        answeredQuestion = true;
        clickSound.play();
        selectedAnswer = $(this).text();
        if(selectedAnswer === correctAnswers[questionCounter]) {
            
    
            clearInterval(theClock);
            generateWin();
        }
        else {
            
            clearInterval(theClock);
            generateLoss();
        }
    }); 
    
    $("body").on("click", ".reset-button", function(event){
        
        resetGame();
    }); 
    
    });  
    
    function generateLossDueToTimeOut() {
        unansweredTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 4000);  
    }
    
    function generateWin() {
        correctTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 4000);  
    }
    
    function generateLoss() {
        incorrectTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 4000); 
    }
    
    function generateHTML() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
        $(".mainArea").html(gameHTML);
    }
    
    function wait() {
        if (questionCounter < 7) {
        questionCounter++;
        generateHTML();
        counter = 30;
        timerWrapper();
        }
        else {
            finalScreen();
        }
    }
    
    function timerWrapper() {
        theClock = setInterval(thirtySeconds, 1000);
        function thirtySeconds() {
            if (counter === 0) {
                clearInterval(theClock);
                generateLossDueToTimeOut();
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer").html(counter);
        }
    }
    
    function finalScreen() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
        $(".mainArea").html(gameHTML);
    }
    
    function resetGame() {
        questionCounter = 0;
        correctTally = 0;
        incorrectTally = 0;
        unansweredTally = 0;
        counter = 30;
        generateHTML();
        timerWrapper();
    }
    
    