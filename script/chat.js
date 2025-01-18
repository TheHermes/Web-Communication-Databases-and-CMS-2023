async function getAnswer(question) {
    const apiama = localStorage.getItem("api-ama");
    const resp = await fetch(`https://openai-ama-api-fw-teaching.rahtiapp.fi/?api_key=${apiama}`, {
        method: 'POST',
        header: { 'Content-Type': 'application/json' },
        body: JSON.stringify(question)
    })
    const respJSON = await resp.json();
    console.log(respJSON);
    document.querySelector('#answer').innerHTML = respJSON.answer;
}

function getQuestion() {
    let question = document.querySelector('#question').value;
    if (!question) {
        document.querySelector('#questionOld').style.display = "block";
        document.querySelector('#qText').innerHTML = "Please, write a question?";
        return;
    }
    document.querySelector('#questionOld').style.display = "block";
    document.querySelector('#answer').innerHTML = `<div class="lds-ripple"><div></div><div></div></div>`;
    document.querySelector('#answer').style.display = "block";
    document.querySelector('#qText').innerHTML = question;
    document.querySelector('#question').value = "";
    console.log(question);
    getAnswer(question);
}

document.querySelector('#btn').addEventListener('click', getQuestion);

function getOldQuestion() {
    document.querySelector('#question').value = document.querySelector('#qText').innerHTML;
}

document.querySelector('#questionOld').addEventListener('click', getOldQuestion);