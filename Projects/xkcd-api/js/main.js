let comicNumber = "";
let url = `https://xkcd.now.sh/?comic=latest`;
let jsonData = {};
const collapse = document.querySelector('.collapsible');

function getComic(url){
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        jsonData = data;
        console.log(jsonData)
        pushComic();
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

function randomComic() {
  comicNumber = Math.floor(Math.random() * 2634);
  console.log(comicNumber)
  if (comicNumber === 0) {
    url = "https://xkcd.now.sh/?comic=latest";
    getComic(url);
  } else {
    url = `https://xkcd.now.sh/?comic=${comicNumber}`;
    getComic(url);
  }
}

function pushComic() {
  document.querySelector('h1').innerText = jsonData.safe_title;
  document.querySelector('img').src = jsonData.img;
  document.querySelector('img').alt = jsonData.alt;
  if (comicNumber === 0) {
    document.querySelector('a').href = `https://xkcd.com/`;
  } else {
    document.querySelector('a').href = `https://xkcd.com/${comicNumber}`;
  }
  document.querySelector('p').innerText = jsonData.transcript;
}

function collapseTranscript() {
  collapse.classList.toggle('active');
  let content = this.nextElementSibling;
  if (content.style.display === "block") {
    content.style.display = "none";
  } else {
    content.style.display = "block";
  }
}

document.querySelector('#randomComic').addEventListener('click', randomComic)
collapse.addEventListener('click', collapseTranscript)
