let url = "https://uselessfacts.jsph.pl/random.json?language=en";
let speaking = speechSynthesis.speaking;

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
  if(speechSynthesis.speaking === true){return;}
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
          msg = data.text;
          document.querySelector('h2').innerText = data.text;
          if(window['speechSynthesis'] === undefined) {
            return; // Bail out
          }
          readOutLoud(msg);
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

document.querySelector('.button').addEventListener('click', getRandomFact)
