const words = [
    "javascript",
    "computer",
    "developer",
    "keyboard",
    "programming",
    "website",
    "function",
    "variable",
    "technology",
    "application"
];

let timeLeft = 60;
let initialTimer = timeLeft;
let correctWords=0;
let isRunning = false;
let correctChars=0;
let totalChars=0;
let wordsElement = document.getElementById("words");
let wpmElement = document.getElementById("wpm");
let randomIndex = Math.floor(Math.random()*words.length);
let accuracyElement = document.getElementById("accuracy");
let targetWord = "";
let countdown;
const restartBtn = document.getElementById("restart");
const input = document.getElementById("input");

wordsElement.textContent=words[randomIndex];

function updateTimer(){
	let timer = document.getElementById("timer");
	timer.textContent = timeLeft;
}
function generateWord(){
	randomIndex = Math.floor(Math.random()*words.length);
	targetWord = words[randomIndex];
	
	wordsElement.innerHTML = targetWord
	.split("")
	.map(letter => `<span class="pending">${letter}</span>`)
	.join("");
}
generateWord();
function calculateWPM(correctWords){
	let elapsedTime = initialTimer - timeLeft;
	if(elapsedTime<=0){
		wpmElement.textContent = 0;
	}
	else{
	let wpm =  correctWords * (60/elapsedTime);
	wpmElement.textContent = Math.round(wpm);
	}
}
function calculateAccuracy(correctChars, totalChars){
	if(totalChars === 0){
		accuracyElement.textContent = 0;
	}
	else{
	accuracyElement.textContent = ((correctChars/totalChars)*100).toFixed(2);
	}
}

input.addEventListener("input", function (){
	let typed = input.value;
	let letters = wordsElement.querySelectorAll("span");
	letters.forEach(function(span,index) {
		if(index<typed.length){
			if(typed[index] === targetWord[index]){
				span.style.color = "green";
			}
			else{
				span.style.color = "red";
			}
		}
		else{
			span.style.color = "black";
		}

	});
	if(typed===targetWord){
		correctWords++;
		correctChars+=input.value.length;

		generateWord();
		input.value="";
	}
	else{
	}
	totalChars++;
	if(!isRunning){	
	isRunning=true;
	countdown = setInterval(function() {
		timeLeft--;
		updateTimer();
		if(timeLeft<=0){
			clearInterval(countdown);
			input.disabled=true;
			calculateWPM(correctWords);
			calculateAccuracy(correctChars, totalChars);
		}
	},1000);
	}
});

restartBtn.addEventListener("click", function() {

    clearInterval(countdown);

    timeLeft = 60;
    initialTimer = 60;

    correctWords = 0;
    correctChars = 0;
    totalChars = 0;

    isRunning = false;

    input.value = "";
    input.disabled = false;

    wpmElement.textContent = 0;
    accuracyElement.textContent = 0;

    updateTimer();
    generateWord();

});

