class MakeQuote {
  constructor(url) {
    this.url = url;
    this.data = {};
    this.isArray = false;
    this.arrPosition = 0;
    this.anime = document.querySelector(".anime");
    this.character = document.querySelector(".character")
    this.quote = document.querySelector(".quote")
  }
  getQuote() {
    fetch(this.url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        this.data = data;
        if (Array.isArray(this.data)) {
          this.isArray = true;
        } else {
          this.isArray = false;          
        }
        this.pushQuote();        
      })
      .catch(err => {
        this.anime.innerText = "Do not understand the input!";
        this.character.innerText = "";
        this.quote.innerText = "";
    });
  }
  pushQuote() {
  if (this.isArray === false) {
    this.anime.innerText = this.data.anime;
    this.character.innerText = this.data.character;
    this.quote.innerText = this.data.quote;
  } else {
    if (this.data.length > 1) {
      this.anime.innerText = this.data[this.arrPosition].anime;
      this.character.innerText = this.data[this.arrPosition].character;
      this.quote.innerText = this.data[this.arrPosition].quote;
      } else {
        this.anime.innerText = this.data[0].anime;
        this.character.innerText = this.data[0].character;
        this.quote.innerText = this.data[0].quote;
      } 
    }
  }
}

class CheckingInputs {
  constructor(radioVar, inputVar) {
    this.inputVar = inputVar;
    this.radioVar = radioVar;
    this.url = "https://animechan.vercel.app/api/";
    this.anime = document.querySelector(".anime");
    this.character = document.querySelector(".character")
    this.quote = document.querySelector(".quote")
  }
  checkInputs() {
    if (this.radioVar === 'random') {
      this.url = `${this.url}random`;
    } else if (this.radioVar === 'anime' && this.inputVar !== "") {
      this.url = `${this.url}quotes/anime?title=${encodeURI(this.inputVar)}`;
    } else if (this.radioVar === 'character' && this.inputVar !== "") {
      this.url = `${this.url}quotes/character?name=${encodeURI(this.inputVar)}`;
    } else {
      this.anime.innerText = "Do not understand the input!";
      this.character.innerText = "";
      this.quote.innerText = "";
    }
    const newQuote = new MakeQuote(this.url)
    newQuote.getQuote()
  }
  cycleQuotes() {
    if(this.arrPosition < this.data.length - 1) {
      this.arrPosition++;
      this.checkInputs();
    } else {
      this.arrPosition = 0;
      this.checkInputs();
    }
  }
}

//Variables
let radioVariable = "";
let inputVariable = "";
let arrPosition = 0;
let jsonData = {};
let url = "https://animechan.vercel.app/api/"
element = document.getElementsByName('quote-type');



function showAllAnime() {
  fetch('https://animechan.vercel.app/api/available/anime')
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      console.log(data.length)
      anime.innerText = 'All Available Anime';
      character.innerText = "List Below";
      quote.innerText = "";
      for (let i = 0; i < data.length; i++) {
        quote.innerText += `${data[i]}, `
      }
  })
  .catch(err => {
    anime.innerText = "Do not understand the input!";
    character.innerText = "";
    quote.innerText = "";
  });
}

function displayRadioValue() {
  let radioVar = 0;
  let inputVar = document.querySelector('#text').value.toLowerCase();

  for (let i = 0; i < element.length; i++) {
    if(element[i].checked) {
      radioVar = element[i].value;
    }
  }  
  
  const checkInputs = new CheckingInputs(radioVar, inputVar);
  checkInputs.checkInputs();
}


document.querySelector('#getQuote').addEventListener('click', () => {displayRadioValue});
document.querySelector('#cycleQuote').addEventListener('click', () => {checkInputs.cycleQuotes});
document.querySelector('#showAll').addEventListener('click', showAllAnime);