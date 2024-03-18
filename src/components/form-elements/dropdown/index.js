import Dropdown from './Dropdown';

document.addEventListener('DOMContentLoaded', () => {
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach((el) => {
    const dropdown = new Dropdown(el);
  });
});
