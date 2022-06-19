
let url = "https://uselessfacts.jsph.pl/random.json?language=en";
let isSpeaking = false;
document.querySelector('.button').addEventListener('click', checkForSpeaking)

let checkForSpeaking = function() {
  if (isSpeaking === false) {
      getRandomFact();
  } else {
    alert("Ya gotta wait for the fact to finish :0");
  }
}



function readOutLoud(msg) {
  var speech = new SpeechSynthesisUtterance();

  // Set the text and voice attributes.
  speech.text = msg;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
}

function getRandomFact(){
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
          msg = data.text;
          document.querySelector('h2').innerText = data.text;
          if(window['speechSynthesis'] === undefined) {
            return; // Bail out
          }
          readOutLoud(msg);
          while (speech.speaking) {
            isSpeaking = true;
          } 
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}