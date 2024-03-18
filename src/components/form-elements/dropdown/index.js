import Dropdown from './Dropdown';

document.addEventListener('DOMContentLoaded', () => {
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach((el) => {
    const applyFunction = console.log;
    const dropdown = new Dropdown(el, applyFunction);
  });
});
