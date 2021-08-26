// variables
const dropdownElement = document.querySelector('.dropdown');
const dropdownContentElement = document.querySelector('.dropdown-content');
const postersBtn = document.querySelector('#posters');

const clicked = () => {
  if (location.href.includes('contactus')) {
    document.querySelector('.contactus').classList.add('clicked');
  } else if (location.href.includes('aboutus')) {
    document.querySelector('.aboutus').classList.add('clicked');
  }
};

// functions
const dropdown = () => {
  dropdownContentElement.style.display = 'inline';
  dropdownElement.classList.add('dropdown-content');
  postersBtn.style.color = 'White';
};
const dropdownLeave = () => {
  dropdownElement.classList.remove('dropdown-content');
  dropdownContentElement.style.display = 'none';
  if (
    location.href.includes('aboutus') ||
    location.href.includes('contactus')
  ) {
    postersBtn.style.color = 'White';
  } else if (
    postersBtn.className !== 'clicked' &&
    location.href.includes('pages')
  ) {
    postersBtn.style.color = 'black';
  }
};

// Events
dropdownElement.addEventListener('mouseover', dropdown);
dropdownElement.addEventListener('mouseleave', dropdownLeave);
document.addEventListener('DOMContentLoaded', clicked);
