var currentQuestion = []
let currentQuestionIndex = 0; // questions index
let points = 0

// html elements 
const question = document.getElementById('question')
const option_a = document.getElementById('option-a')
const option_b = document.getElementById('option-b')
const option_c = document.getElementById('option-c')
const option_d = document.getElementById('option-d')
const next_button = document.getElementById('next')
const score = document.getElementById('result')

loadDatas();       

function if_answer_correct(id) {
    let points = 0
    points += 10
    currentQuestionIndex++;
    setTimeout(()=>{
        document.getElementById(id).style.backgroundColor = "#70af85";
        document.getElementById(id).style.borderColor = "#70af85";
        score.innerText = points
        
    },1000);   
}
function if_answer_incorrect(id) {
    setTimeout(()=>{
        document.getElementById(id).style.backgroundColor = "#ff4646";
        document.getElementById(id).style.borderColor = "#ff4646" 
    },1000);
}


async function loadDatas(){
    next_button.addEventListener("click",() => {
        currentQuestionIndex++;
    })

    await fetch('https://opentdb.com/api.php?amount=50&category=18&type=multiple')
            .then(res => res.json())
            .then(data => {
                data['results'].forEach(item => currentQuestion.push(item));
            })
    console.log(currentQuestion[currentQuestionIndex]);

    // test to correct answer
    console.log("Correct answer: "+currentQuestion[currentQuestionIndex].correct_answer)

    // question text 
    question.innerHTML = currentQuestion[currentQuestionIndex].question

    // random selection to correct answer
    let correct = Math.floor(Math.random() * 4) + 1;

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
option_a.addEventListener("click",() => {
    option_b.disabled = true
    option_c.disabled = true
    option_d.disabled = true
    if (option_a.innerText == currentQuestion[currentQuestionIndex].correct_answer)
        return if_answer_correct("option-a")
    else
        return if_answer_incorrect("option-a")
})
option_b.addEventListener("click",() => {
    option_a.disabled = true
    option_c.disabled = true
    option_d.disabled = true
    if (option_b.innerText == currentQuestion[currentQuestionIndex].correct_answer)
        return if_answer_correct("option-b")
    else
        return if_answer_incorrect("option-b")
})
option_c.addEventListener("click",() => {
    option_a.disabled = true
    option_b.disabled = true
    option_d.disabled = true
    if (option_c.innerText == currentQuestion[currentQuestionIndex].correct_answer)
        return if_answer_correct("option-c")
    else
        return if_answer_incorrect("option-c")
})
option_d.addEventListener("click",() => {
    option_a.disabled = true
    option_b.disabled = true
    option_c.disabled = true
    if (option_d.innerText == currentQuestion[currentQuestionIndex].correct_answer)
        return if_answer_correct("option-d")
    else
        return if_answer_incorrect("option-d")
})



