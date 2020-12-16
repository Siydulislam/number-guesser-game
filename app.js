let min = 1;
let max = 10;

const randomNum = Math.floor(Math.random() * 10) + 1;
console.log(randomNum);
let guessesLeft = 3;

// DOM Selection
const game = document.querySelector('#game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessBtn = document.querySelector('#guess-btn');
const guessInput = document.querySelector('#guess-input');
const message = document.querySelector('.message');
const progress = document.querySelector('.progress-bar');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e) {
    if(e.target.classList.contains('play-again')) {
        window.location.reload();
    }
});

// Listen for guess
guessBtn.addEventListener('click', function(e){
    let guess = parseInt(guessInput.value);
    loading.style.display = 'block';
    guessBtn.disabled = true;

    setTimeout(function(){
        
        loading.style.display = 'none';
        guessBtn.disabled = false;

        if(isNaN(guess) || guess < min || guess > max){
            setMessage(`Please enter a number between ${min} and ${max}`, 'red');
        } else {
            if(guess === randomNum) {
                gameOver(true, `${randomNum} is Correct, YOU WIN`);
                Showprogress('100%','25px','bg-success',"Congratulations!");
            } else {
                guessesLeft -= 1;

                if(guessesLeft === 0) {
                    gameOver(false, `Game over, you lost! The correct number was ${randomNum}`);
                    Showprogress('100%','25px','bg-danger',"Best of luck for the next time!");

                } else {
                    guessInput.style.borderColor = 'red';
                    message.style.color = 'red';
                    guessInput.value = '';

                    guess > randomNum ? setMessage(`Given number (${guess}) is greater than correct answer!`, 'red') : setMessage(`Given number (${guess}) is smaller than correct answer!`, 'red');

                    switch(guessesLeft) {
                        case 2:
                            Showprogress('33%','25px','bg-info',"Wrong!!! 2 Guesses Left ");
                            break;
                        case 1:
                            Showprogress('66%','25px','bg-warning',"Wrong!!! 1 Guess Left ");
                            break;
                    }
                }
            }
        }
    }, 1000);

    e.preventDefault();
});

// Game Over
function gameOver(won, msg) {

    let color;

    won === true ? color = 'green' : color = 'red' ;

    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    message.style.color = color;
    setMessage(msg, color);

    guessBtn.innerHTML = 'Play Again';
    guessBtn.className += ' play-again';
}

// Set message
function setMessage(msg, color){
    message.innerHTML = msg;
    message.style.color = color;
}

// Progress
function Showprogress(width, parentHeight, addClass, text) {
    progress.className = 'progress-bar';
    progress.style.width = width;
    progress.parentElement.style.height = parentHeight;
    progress.classList.add(addClass);
    progress.innerHTML = text;
}