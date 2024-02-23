let notes = ["a", "aSharp", "b", "c", "cSharp", "d", "dSharp", "e", "f", "fSharp", "g", "gSharp"];
let randomNote = '';
let numButtonClick = 1;
let numPianoClick = 0;

//On button click, it should generate and play a random note
$('.btn').click(function(){
    if (numButtonClick === 1){
        let randomNumber = Math.floor(Math.random()*notes.length);
        randomNote = notes[randomNumber];
        console.log(randomNote);
        let audio = new Audio('./myNotes/'+randomNote+'.mp3');
        audio.play();
        numButtonClick = 2;
        $("#piano").fadeIn();
    } else if (numButtonClick === 2){
        let audio = new Audio('./myNotes/'+randomNote+'.mp3');
        audio.play();
    }
});

//Now, the user has to submit their 3 guesses for what the note is
$('.pianoButton').click(function(){
    numPianoClick++;

    if (numPianoClick <= 3) {
        let userGuess = this.id;
        console.log(userGuess);
        let audio = new Audio('./myNotes/'+userGuess+'.mp3');
        audio.play();
        checkAnswer(userGuess);
    } else {
        console.log("No need for this.");
    }
});

function checkAnswer(guess){
    if (guess === randomNote) {
        console.log('correct!');
        confetti();
        $('#'+guess).addClass('correct');
        setTimeout(function() {
            $('#'+guess).removeClass('correct');
        }, 1000);
        $("#piano").fadeOut();
        numButtonClick = 1;
        numPianoClick = 0;
    }

    else {
        if (numPianoClick === 3){
            $('#'+guess).addClass('incorrect');
            setTimeout(function() {
                $('#'+guess).removeClass('incorrect');
            }, 1000);
            
            $('body').addClass('gameOver');
            setTimeout(function() {
                $('body').removeClass('gameOver');
            }, 3000);
            numButtonClick = 1;
            numPianoClick = 0;
            $("#piano").fadeOut();
        } else {
            console.log("incorrect");
            $('#'+guess).addClass('incorrect');
            setTimeout(function() {
                $('#'+guess).removeClass('incorrect');
            }, 1000);
        }
    };
};
