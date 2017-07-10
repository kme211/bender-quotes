const box = document.querySelector('.box');
const mouth = document.querySelector('.mouth');
const quote = {
  el: document.querySelector('.quote')
};
const antennaBall = document.querySelector('.antenna__ball');
const antennaMoveable = document.querySelector('.antenna__moveable');
const hRatio = 360 / 230;
const wRatio = 230 / 360;
const eyelids = document.querySelectorAll('.eyelids');


// http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(a) {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
}

let quotes = [
  "{angry}This is the worst kind of discrimination there is: the kind against me!",
  "Hahahahaha. Oh wait you’re serious. Let me laugh even harder.",
  "There. Now no one can say I don’t own John Larroquette’s spine.",
  "{angry}The game’s over. I have all the money. Compare your lives to mine and then kill yourselves!",
  "{sad}That’s closest thing to 'Bender is great' that anyone other me has ever said.",
  "I’m Bender, baby! Oh god, please insert liquor!",
  "{interested}Hey sexy mama, wanna kill all humans?",
  "You know what cheers me up? Other people’s misfortune.",
  "Anything less than immortality is a complete waste of time.",
  "Blackmail is such an ugly word. I prefer extortion. The ‘x’ makes it sound cool.",
  "Oh, your God!",
  "{angry}You’re a pimple on society’s ass and you’ll never amount to anything!",
  "{sad}I’m so embarrassed. I wish everyone else was dead!",
  "I got ants in my butt, and I needs to strut!",
  "{angry}Afterlife? If I thought I had to live another life, I’d kill myself right now!"
];

shuffle(quotes);

const MAX_DESIRABLE_WIDTH = 600;

function resizeDrawing() {
  const MAX_WIDTH = window.innerWidth - 40;

  const MAX_HEIGHT = window.innerHeight * .87;
  let width = MAX_WIDTH < MAX_DESIRABLE_WIDTH ? MAX_WIDTH : MAX_DESIRABLE_WIDTH;
  let height = width * hRatio;
  if (height > MAX_HEIGHT) {
    height = MAX_HEIGHT;
    width = wRatio * height;
  }

  box.style.width = `${width}px`;
  box.style.height = `${height}px`;
  let currentWidth = box.offsetWidth;
  let fontSize = Math.round(currentWidth / 18);
  document.body.style.fontSize = `${fontSize}px`;
}

window.addEventListener('resize', resizeDrawing);
antennaBall.addEventListener('click', loadQuote);

resizeDrawing();

function getDefaultParams(quoteEl, mouthEl) {
  return {
    endTop: quoteEl.offsetTop,
    top: mouthEl.offsetParent.offsetTop + mouthEl.offsetTop,
    scale: 0,
    opacity: 0.5
  };
}

function loadQuote() {
  let start = null;
  const duration = 500;
  let text = quotes.length ? quotes.shift() : '...';
  if (!quotes.length) document.querySelector('.antenna__hint').classList.remove('animated');
  quote.el.style.opacity = 0;
  quote.el.removeAttribute('style');
  quote.params = getDefaultParams(quote.el, mouth);
  document.body.style.fontSize = `${Math.round(box.offsetWidth / 18)}px`;
  const regEx = new RegExp('{\\w+}', 'g');
  let emotion = text.match(regEx);
  emotion = emotion ? emotion[0].replace(/{|}/g, '') : null;
  eyelids.forEach((lid) => {
    const emotions = lid.classList.value.match(/emotion-(\w)+/g);
    if (emotions) {
      emotions.forEach(emo => {
        lid.classList.remove(emo);
      });
    }
    if (emotion) {
      lid.classList.add(`emotion-${emotion}`);
    }
  });


  text = text.replace(regEx, '');
  quote.el.textContent = text;

  function animateQuote(timestamp) {
    if (!start) start = timestamp;
    var progress = timestamp - start;
    if (progress >= duration) return;
    const topLeft = quote.params.top - quote.params.endTop;
    const scaleLeft = 1 - quote.params.scale;
    const opacityLeft = 1 - quote.params.opacity;
    const magicNum = ((duration - progress) * 0.06);
    quote.params.top = quote.params.top - (topLeft / magicNum);
    const scale = quote.params.scale + scaleLeft / magicNum;
    const opacity = quote.params.opacity + opacityLeft / magicNum;
    quote.params.scale = scale < 1 ? scale : 1;
    quote.params.opacity = opacity < 1 ? opacity : 1;
    quote.el.style.top = `${quote.params.top}px`;
    quote.el.style.opacity = quote.params.opacity;
    quote.el.style.transform = `scale(${ quote.params.scale})`;
    window.requestAnimationFrame(animateQuote);
  }

  function startQuoteAnimation() {
    antennaMoveable.classList.remove('animate');
    window.requestAnimationFrame(animateQuote);
    window.removeEventListener('animationend', startQuoteAnimation);
  }

  antennaMoveable.classList.add('animate');
  window.addEventListener('animationend', startQuoteAnimation);

}
