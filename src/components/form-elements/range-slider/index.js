import RangeSlider from './RangeSlider';

document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('.js-range-slider');

  sliders.forEach((sliderElement) => new RangeSlider(sliderElement));
});
