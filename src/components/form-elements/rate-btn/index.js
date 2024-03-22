import RateBtn from './RateBtn';

document.addEventListener('DOMContentLoaded', () => {
  const rateButtons = document.querySelectorAll('.rate-btn');

  Array.from(rateButtons).forEach((rateButtonElement) => {
    const rateBtn = new RateBtn(rateButtonElement);
    rateBtn.initialize();
  });
});
