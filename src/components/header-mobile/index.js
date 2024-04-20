const button = document.querySelector('.header-mobile__hamburger-button');
const dropdown = document.querySelector('.header-mobile__dropdown');

button.addEventListener('click', () => {
  button.classList.toggle('header-mobile__hamburger-button_checked');
  dropdown.classList.toggle('header-mobile__dropdown_shown');
});
