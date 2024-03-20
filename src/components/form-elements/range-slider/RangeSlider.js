import $ from 'jquery';
import 'jquery-ui-slider/jquery-ui';

class RangeSlider {
  constructor(rootElement) {
    this._rootElement = rootElement;
    this._$sliderElement = $('.js-range-slider__slider');

    this._firstValueElement = this._rootElement.querySelector('.js-range-slider__first-value');
    this._secondValueElement = this._rootElement.querySelector('.js-range-slider__second-value');

    const options = this._rootElement.dataset;

    this._$slider = this._$sliderElement.slider({
      range: true,
      min: +options.min,
      max: +options.max,
      step: 1,
      values: [+options.first_value, +options.second_value],
      change: () => {
        this._updateValues();
      },
      slide: () => {
        this._updateValues();
      },
      classes: {
        'ui-slider': 'range-slider',
        'ui-slider-handle': 'range-slider__handle',
        'ui-slider-range': 'range-slider__range',
      },
    });
  }

  _updateValues() {
    const [firstValue, secondValue] = this._$slider.slider('values');
    this._firstValueElement.textContent = firstValue;
    this._secondValueElement.textContent = secondValue;
  }
}

export default RangeSlider;
