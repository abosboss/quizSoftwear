const options=document.querySelector(".options").children;
const answerTrackerContainer=document.querySelector(".answers-tracker");

const percentage=document.querySelector(".percentage");
const questionNumberSpan=document.querySelector(".question-num-value");
let totalQuestionSpan=document.querySelector(".total-question");
let correctAnswerSpan=document.querySelector(".correct-answers");
let totalQuestionSpan2=document.querySelector(".total-question2");
let questionIndex;
let index=0;
let myArray=[];
let myArr=[];
let score=0; 
const question=document.querySelector(".question");

//questions and options and answers

const questions=[
    {
        question:'Which is not a type of Loop in JavaScript', 
        options: ["for", "while/for", "for/in", "while"], 
        answer: 1
    },
    {
        question:"Which language is used for styling web pages?", 
        options: ["HTML", "JQuery", "CSS", "XML"],
        answer: 2
    },
    {
        question: "Hyper Text Markup Language Stand For?", 
        options: [".html", "XHTML","CSS", "HTML"],
        answer: 3 
    },
    {
        question:"Which function return true if the argument is not a number?" , 
        options: ["isNaN", "infinity","does", "babb"],
        answer: 0 
    },
    {
        question:"Which of this is a JavaScript type", 
        options: ["Function", "Boolean", "Number", "All"],
        answer: 3 
    }
] 
let option1=document.querySelector(".option1");
let option2=document.querySelector(".option2");
let option3=document.querySelector(".option3");
let option4=document.querySelector(".option4");
//set question and question number
totalQuestionSpan.innerHTML=questions.length;
function load(){
         questionNumberSpan.innerHTML=index+1;
         question.innerHTML=questions[questionIndex].question;
         option1.innerHTML=questions[questionIndex].options[0];
         option2.innerHTML=questions[questionIndex].options[1];
         option3.innerHTML=questions[questionIndex].options[2];
         option4.innerHTML=questions[questionIndex].options[3];
         index++;
}
//checking correct option 
function check(element){

   if(element.id==questions[questionIndex].answer){
      element.classList.add("correct");
      updateAnswerTracker("correct");
      score++;
      console.log("score:"+score);
   }
   else{
       element.classList.add("wrong");
       updateAnswerTracker("wrong");
   }
   disabledOptions()
}
function disabledOptions(){
    for(let i=0; i<options.length; i++) {
        options[i].classList.add("disabled");
        
        //shows correct answer if wrong option is clicked
        if(options[i].id==questions[questionIndex].answer) {
            options[i].classList.add("correct");   
        }
    }
}
function enableOptions(){
    for(let i=0; i<options.length; i++) {
        options[i].classList.remove("disabled","correct","wrong");
    }
}
   // give alert if no option is selected 
   function ValidityState(){
       if(!options[0].classList.contains("disabled")) {
       
       alert("Please Select one option")
       }
       else{
        enableOptions();
        randomQuestion();
       }
   }
        // to make sure question is not repeated
   function next(){
       ValidityState(); 
   }

function randomQuestion(){
    let randomNumber=Math.floor(Math.random()*questions.length);
    let hitDuplicate=0;  
    if(index==questions.length) {
            //display at the end of the 5th question("quiz Qver")
            quizOver();
        }
        else {
            if(myArray.length>0){
            for(let i=0; i<myArray.length; i++) {
            if(myArray[i]==randomNumber){
                hitDuplicate=1;
                break;
            }
        }
        if(hitDuplicate==1){
            randomQuestion();
        }
        else{
            questionIndex=randomNumber;
            load();
            myArr.push(questionIndex);
        }
    }
            if(myArray.length==0){
            questionIndex=randomNumber;
            load();
            myArr.push(questionIndex);
            }
        
        myArray.push(randomNumber);       
        }
}
function answerTracker() {
    for(let i=0; i<questions.length; i++) {
        const div=document.createElement("div");
        answerTrackerContainer.appendChild(div);
    }
}
function updateAnswerTracker(classNam) {
  answerTrackerContainer.children[index-1].classList.add(classNam);
}
function quizOver(){
  document.querySelector(".quiz-over").classList.add("show");
  correctAnswerSpan.innerHTML=score;
  totalQuestionSpan2.innerHTML=questions.length;
  percentage.innerHTML=(score/questions.length)*100 + "%";
}
function tryAgain(){
    window.location.reload();
}
 window.onload=function(){
     randomQuestion();
     this.answerTracker();
}
