class NewComic {
  constructor(comicNumber, url, data){
    this.comicNumber = comicNumber;
    this.url = url;
    this.data = data;
    this.img = document.querySelector('img');
    this.h1 = document.querySelector('h1');
    this.a = document.querySelector('a');
    this.p = document.querySelector('p');
  }
  get() {
    fetch(this.url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
          this.data = data;
          this.push();
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
  }
  random() {
    this.comicNumber = Math.floor(Math.random() * 2634);
    if (this.comicNumber === 0) {
      this.url = "https://xkcd.now.sh/?comic=latest";
    } else {
      this.url = `https://xkcd.now.sh/?comic=${this.comicNumber}`;
    }
      this.get();
  }
  push() {
    this.h1.innerText = this.data.safe_title;
    this.img.src = this.data.img;
    this.img.alt = this.data.alt;
    if (this.comicNumber === 0) {
      this.a.href = `https://xkcd.com/`;
    } else {
      this.a.href = `https://xkcd.com/${this.comicNumber}`;
    }
    this.p.innerText = this.data.transcript;
  }
}

function collapse() {
  document.querySelector('.collapsible').classList.toggle('active');
  let content = this.nextElementSibling;
  if (content.style.display === "block") {
    content.style.display = "none";
  } else {
    content.style.display = "block";
  }
}

const newComic = new NewComic(0, `https://xkcd.now.sh/?comic=latest`, {})

document.querySelector('#randomComic').addEventListener('click', () => newComic.random())
document.querySelector('.collapsible').addEventListener('click', collapse)
