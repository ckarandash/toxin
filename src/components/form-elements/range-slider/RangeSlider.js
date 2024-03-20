import $ from 'jquery';
import 'jquery-ui-slider/jquery-ui';

class RangeSlider {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.$sliderElement = $('.js-range-slider__slider');

    this.firstValueElement = this.rootElement.querySelector('.js-range-slider__first-value');
    this.secondValueElement = this.rootElement.querySelector('.js-range-slider__second-value');

    const options = this.rootElement.dataset;

    this.$slider = this.$sliderElement.slider({
      range: true,
      min: +options.min,
      max: +options.max,
      step: 1,
      values: [+options.first_value, +options.second_value],
      change: () => {
        this.updateValues();
      },
      slide: () => {
        this.updateValues();
      },
      classes: {
        'ui-slider': 'range-slider',
        'ui-slider-handle': 'range-slider__handle',
        'ui-slider-range': 'range-slider__range',
      },
    });
  }

  updateValues() {
    const [firstValue, secondValue] = this.$slider.slider('values');
    this.firstValueElement.textContent = firstValue;
    this.secondValueElement.textContent = secondValue;
  }
}

export default RangeSlider;
