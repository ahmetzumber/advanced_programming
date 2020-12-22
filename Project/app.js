var currentQuestion = []
let currentQuestionIndex = 0; // questions index
let points = 0

// html elements 
const question = document.getElementById('question')
const option_a = document.getElementById('option-a')
const option_b = document.getElementById('option-b')
const option_c = document.getElementById('option-c')
const option_d = document.getElementById('option-d')
const answer_buttons = document.querySelectorAll('.answer')
const next_button = document.getElementById('next')
const score = document.getElementById('result')

loadDatas();       

function if_answer_correct(id) {
    let points = 0
    points += 10
    setTimeout(()=>{
        document.getElementById(id).style.backgroundColor = "#70af85";
        document.getElementById(id).style.borderColor = "#70af85";
        score.innerText = points
    },5000);
    
    
}
function if_answer_incorrect(id) {
    setTimeout(()=>{
        document.getElementById(id).style.backgroundColor = "red";
    },5000);
}

async function loadDatas(){

    await fetch('https://opentdb.com/api.php?amount=50&category=18&type=multiple')
            .then(res => res.json())
            .then(data => {
                data['results'].forEach(item => currentQuestion.push(item));
            })
    
    let correct = Math.floor(Math.random() * 4) + 1;
    // test to correct answer
    console.log("Correct answer: "+currentQuestion[currentQuestionIndex].correct_answer)

    // question text 
    question.innerHTML = currentQuestion[currentQuestionIndex].question
    
    // every options has id i.e. 1,2,3,4
    if (correct == 1)
        option_a.innerHTML = currentQuestion[currentQuestionIndex].correct_answer
    else if (correct == 2)
        option_b.innerHTML = currentQuestion[currentQuestionIndex].correct_answer
    else if (correct == 3)
        option_c.innerHTML = currentQuestion[currentQuestionIndex].correct_answer
    else if (correct == 4)
        option_d.innerHTML = currentQuestion[currentQuestionIndex].correct_answer
    
    // if options has correct answer then its incorrect answer 
    for (let incorrect of currentQuestion[currentQuestionIndex].incorrect_answers){
        if (option_a.innerHTML == '')
            option_a.innerHTML = incorrect
        else if (option_b.innerHTML == '')
            option_b.innerHTML = incorrect
        else if (option_c.innerHTML == '')
            option_c.innerHTML = incorrect
        else if (option_d.innerHTML == '')
            option_d.innerHTML = incorrect
    }
}
function disableAllButtons(){
    option_a.disabled = true;
    option_b.disabled = true;
    option_c.disabled = true;
    option_d.disabled = true;
}
option_a.addEventListener("click",() => {
    disableAllButtons();
    if (option_a.innerText == currentQuestion[currentQuestionIndex].correct_answer)
        return if_answer_correct("option-a")
    else
        return if_answer_incorrect("option-a")
})
option_b.addEventListener("click",() => {
    disableAllButtons();
    if (option_b.innerText == currentQuestion[currentQuestionIndex].correct_answer)
        return if_answer_correct("option-b")
    else
        return if_answer_incorrect("option-b")
})
option_c.addEventListener("click",() => {
    disableAllButtons();
    if (option_c.innerText == currentQuestion[currentQuestionIndex].correct_answer)
        return if_answer_correct("option-c")
    else
        return if_answer_incorrect("option-c")
})
option_d.addEventListener("click",() => {
    disableAllButtons();
    if (option_d.innerText == currentQuestion[currentQuestionIndex].correct_answer)
        return if_answer_correct("option-d")
    else
        return if_answer_incorrect("option-d")
})
next_button.addEventListener("click",() => {
    currentQuestionIndex++;
})


