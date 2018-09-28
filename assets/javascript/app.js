var myQuestions = [
    {
      question: "What is 1 + 1?",
      answers: {
        a: "2",
        b: "22",
        c: "10"
      },
      correctAnswer: "a"
    },
    {
      question: "what is the capital city of United States?",
      answers: {
        a: "Los Angeles",
        b: "Washington D.C.",
        c: "New York"
      },
      correctAnswer: "b"
    },
    {
      question: "When was Iron Man released?",
      answers: {
        a: "July 24, 2006",
        b: "August 18, 2018",
        c: "April 1, 2008",
        d: "May 2, 2008"
      },
      correctAnswer: "d"
    }
  ];
  


var quizContainer = document.getElementById("quiz");
var resultsContainer = document.getElementById("results");
var submitButton = document.getElementById("submit");
var seconds_left = 30;
//when start button is clicked,
$(".start-button").on("click", function() {
    //hide start button
    $(this).hide();  
    // display quiz 
    buildQuiz();

    


function buildQuiz(){
        // initialize variable in order to store the HTML output
        var output = [];
        //put submit button at the end
        $("#submit").append("<button>" +"Submit"+"</button>");
        // for each question...
        myQuestions.forEach(
          (currentQuestion, questionNumber) => {
      
            // Store the list of answer choices
            var answers = [];
      
            // For each available answers
            for(letter in currentQuestion.answers){
      
              // add radio button
              answers.push(
                `<label>
                  <input type="radio" name="question${questionNumber}" value="${letter}">
                  ${letter} :
                  ${currentQuestion.answers[letter]}
                </label>`
              );
            }
      
            // add this question and its answers to the output
            output.push(
              `<div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join('')} </div>`
            );
            
          }
        );
      
        // put it onto HTML
        quizContainer.innerHTML = output.join("");

}

var interval = setInterval(function() {
    document.getElementById("timer_div").innerHTML = "Time Remaining: " +--seconds_left+" Seconds";


    if (seconds_left <= 0)
    {
        clearInterval(interval);
        showResults();
    }
    else {
        // on submit, show results
    submitButton.addEventListener('click', showResults);
    }
}, 1000);

function showResults(){


        // gather answer containers from our quiz
        var answerContainers = quizContainer.querySelectorAll('.answers');
      
        // initialize variable to track number of right and wrong answers.
        var numCorrect = 0;
        var numInCorrect = 0;
      
        // for each question...
        myQuestions.forEach( (currentQuestion, questionNumber) => {
      
          // find selected answer
          var answerContainer = answerContainers[questionNumber];
          var selector = 'input[name=question'+questionNumber+']:checked';
          var userAnswer = (answerContainer.querySelector(selector) || {}).value;
      
          // if answer is correct
          if(userAnswer===currentQuestion.correctAnswer){
            // add to the number of correct answers
            numCorrect++;
      
          }
          // if answer is wrong or blank
          else{
            numInCorrect++;
          }
        });
        
        // show number of correct answers out of total
        $("#quiz").hide();
        $("#submit").hide();  
        $("#timer_div").hide();
        clearInterval(interval);
        $("#results").append("<h1>"+"All Done!"+"</h1>");

        $("#results").append("<div>"+ "Correct Answers: " + numCorrect +"</div>");
        $("#results").append("<div>"+"Incorrect Answers: " + numInCorrect+"<div>");
      


}

});

