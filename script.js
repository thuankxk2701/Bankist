'use strict';

///////////////////////////////////////
// Modal window
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');
///////////////////////////
// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
///////////////////
// Button scrolling
btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());
  console.log('Curent scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'Height/Width',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // OR
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});
//page navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();

//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });
//1, ad enven listener to common parent element
//2
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  //matching straategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
// tabbed component

tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');

  // active Tab
  if (!clicked) return;
  //remove active tab and content
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  tabContent.forEach(c => c.classList.remove('operations__content--active'));
  //Active content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
// Menu feda animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
//passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.4));
nav.addEventListener('mouseout', handleHover.bind(1));
// Sticky navigation
// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', () => {
//   if ((window, scrollY > initialCoords.top)) nav.classList.add('sticky');
//   else {
//     nav.classList.remove('sticky');
//   }
// });
// Sticky navigation :intersecton Observer API
// const obsCallback = (entries, observer) => {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);
///////////////////////////
/////------*---------//////
///////////////////////////
/*

///////////////////////////
///////////////////////////
// Selecting elements
console.log(document.documentElement);
const header = document.querySelector('.header');
const allSection = document.querySelectorAll('.section');
console.log(allSection);
document.getElementById('section--1');
const allButton = document.getElementsByTagName('button');
console.log(allButton);
console.log(document.getElementsByClassName('btn'));
// creating and inserting elements
//.insert
const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent = 'We use cookied for imporved functionlity and analytic.';
message.innerHTML =
  'We use cookied for imporved functionlity and analytic.<button class="btn btn--close-cookie">Go it!</button>';
// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));
// header.before(message);
// header.after(message);
// Delete element
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.remove();
    message.parentElement.removeChild(message);
  });
message.style.backgroundColor = '#37382d';
message.style.width = '120%';
console.log(message.style.color);
console.log(message.style.backgroundColor);
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

console.log(getComputedStyle(message).height);

document.documentElement.style.setProperty('--color-primary', 'yellow');
//Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);
logo.alt = 'beautiful minialist logo';
//Not standard
console.log(logo.designer);
console.log(logo.getAttribute('src'));
logo.setAttribute('company', 'Bankist');
console.log(logo.getAttribute('company'));
const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));
//Data attributes
console.log(logo.dataset.versionNumber);
//Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 's');
logo.classList.toggle('c');
logo.classList.contains('c'); //not includes
//Don't use
logo.className = 'Kxk';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());
  console.log('Curent scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'Height/Width',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // OR
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});

const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventListener:Great ! You are reading the heading :D');
  h1.removeEventListener('mouseenter', alertH1);
};
// h1.onmouseenter = function (e) {
//   alert('addEventListener:Great ! You are reading the heading :D');

// };
h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.addEventListener('mouseenter', alertH1), 3000);


//rgb(255,255,255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(randomColor());
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Link', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  //stop propagation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Container', e.target, e.currentTarget);
});
document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Nav', e.target, e.currentTarget);
});
///////////////////////////
const h1 = document.querySelector('h1');
//Going downwards:Child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
//Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);
h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';
//Going sieways:siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
 */
