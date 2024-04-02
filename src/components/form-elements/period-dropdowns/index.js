import PeriodDropdowns from './PeriodDropdowns';

document.addEventListener('DOMContentLoaded', () => {
  const periodDropdownsElements = document.querySelectorAll('.js-period-dropdowns');
  Array.from(periodDropdownsElements).forEach((el) => {
    const periodDropdowns = new PeriodDropdowns(el);
  });
});
