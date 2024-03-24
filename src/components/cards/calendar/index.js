import Calendar from './Calendar';

document.addEventListener('DOMContentLoaded', () => {
  const calendarElements = document.querySelectorAll('.calendar');

  Array.from(calendarElements).forEach((el) => {
    const calendar = new Calendar(el);
  });
});
