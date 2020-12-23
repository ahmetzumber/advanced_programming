window.onload = sendApiRequest;

let data;
let points = 0
let answers = []

const option_a = document.querySelector("#option-a")
const option_b = document.querySelector("#option-b")
const option_c = document.querySelector("#option-c")
const option_d = document.querySelector("#option-d")
const score = document.getElementById('result')

async function sendApiRequest(){
    let response = await fetch("https://opentdb.com/api.php?amount=50&category=18&type=multiple");
    data = await response.json()
    useApiData(data)
}

function shuffle(array){
    return array.sort(() => Math.random() - 0.3)
}

function if_answer_correct(id) {
    points += 10
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
        for(let j = 0; j < 4; j++){
            if (document.querySelectorAll(".options")[j].innerHTML == data.results[1].correct_answer){
                document.querySelectorAll(".options")[j].style.backgroundColor = "#70af85"
                document.querySelectorAll(".options")[j].style.borderColor = "#70af85"
            }
        }
    },1000);
    
}

function setDefaultAll(){
    answers = []
    document.querySelector("#question").innerHTML = ''
    option_a.style.backgroundColor = "#eeeeee";
    option_b.style.backgroundColor = "#eeeeee";
    option_c.style.backgroundColor = "#eeeeee";
    option_d.style.backgroundColor = "#eeeeee";

    option_a.style.borderColor = "#eeeeee";
    option_b.style.borderColor = "#eeeeee";
    option_c.style.borderColor = "#eeeeee";
    option_d.style.borderColor = "#eeeeee";

    option_a.innerHTML = ''
    option_b.innerHTML = ''
    option_c.innerHTML = ''
    option_d.innerHTML = ''
}


function useApiData(){
    setDefaultAll();
    document.querySelector("#question").innerHTML = data.results[1].question
    answers.push(data.results[1].correct_answer)
    answers.push(data.results[1].incorrect_answers[0])
    answers.push(data.results[1].incorrect_answers[1])
    answers.push(data.results[1].incorrect_answers[2])
    console.log("Correct answer: "+data.results[1].correct_answer)
    shuffle(answers)
    option_a.innerHTML = answers[0]
    option_b.innerHTML = answers[1]
    option_c.innerHTML = answers[2]
    option_d.innerHTML = answers[3]
}

option_a.addEventListener("click", () => {
    if (option_a.innerHTML == data.results[1].correct_answer){
        if_answer_correct("option-a")
    }else{
        if_answer_incorrect("option-a")
    }
    setTimeout(() => sendApiRequest(),1000)
    
})

option_b.addEventListener("click", () => {
    if (option_b.innerHTML == data.results[1].correct_answer){
        if_answer_correct("option-b")
    }else{
        if_answer_incorrect("option-b")
    }
    setTimeout(() => sendApiRequest(),1000)
})

option_c.addEventListener("click", () => {
    if (option_c.innerHTML == data.results[1].correct_answer){
        if_answer_correct("option-c")
    }else{
        if_answer_incorrect("option-c")
    }
    setTimeout(() => sendApiRequest(),1000)
})

option_d.addEventListener("click", () => {
    if (option_d.innerHTML == data.results[1].correct_answer){
        if_answer_correct("option-d")
    }else{
        if_answer_incorrect("option-d")
    }
    setTimeout(() => sendApiRequest(),1000)
})

