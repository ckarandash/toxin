import AirDatepicker from 'air-datepicker';

class Calendar {
  constructor(rootElement, options) {
    this._$datepicker = new AirDatepicker(rootElement, {
      ...options,
      navTitles: {
        days: 'MMMM yyyy',
      },
      buttons: [
        this._buildClearButton(),
        this._buildApplyButton(),
      ],
    });

    // this._$datepicker.setViewDate(new Date(2019, 7, 8));
    // this._$datepicker.setCurrentView(new Date(2019, 7, 8));
  }

  getDatepicker() {
    return this._$datepicker;
  }

  _buildApplyButton() {
    const applyButton = {
      content: 'применить',
      className: 'calendar__apply-btn',
      onClick: (dp) => {
        this._onApply();
      },
    };

    return applyButton;
  }

  _buildClearButton() {
    const clearButton = {
      content: 'очистить',
      className: 'calendar__clear-btn',
      onClick: (dp) => {
        this._onClear();
      },
    };

    return clearButton;
  }

  _onApply() {
    console.log('applied');
  }

  _onClear() {
    this._$datepicker.clear();

    // todo: remove -range-to-
    const rangeCells = this._$datepicker.$el.querySelectorAll('.-in-range-');
    Array.from(rangeCells).forEach((cell) => cell.classList.remove('-in-range-'));
  }
}

export default Calendar;
