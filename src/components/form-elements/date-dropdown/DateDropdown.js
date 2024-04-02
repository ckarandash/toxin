import Inputmask from 'inputmask';

class DateDropdown {
  constructor(rootElement, onDateComplete) {
    this._onDateComplete = onDateComplete;
    this._rootElement = rootElement;
    this._openButtonElement = this._rootElement.querySelector('.js-date-dropdown__open-button');
    this._inputElement = this._rootElement.querySelector('.js-date-dropdown__input');

    this._maskInputElement();
  }

  getInputElement() {
    return this._inputElement;
  }

  getOpenButtonElement() {
    return this._openButtonElement;
  }

  _maskInputElement() {
    const im = new Inputmask({
      alias: 'datetime',
      inputFormat: 'dd.mm.yyyy',
      placeholder: 'ДД.ММ.ГГГГ',
      oncomplete: this._handleDateComplete.bind(this),
    });

    im.mask(this._inputElement);
  }

  _handleDateComplete() {
    const [dayString, monthString, yearString] = this._inputElement.value.split('.');
    const enteredDate = new Date(+yearString, +monthString - 1, +dayString);

    this._onDateComplete(enteredDate);
  }
}

export default DateDropdown;
