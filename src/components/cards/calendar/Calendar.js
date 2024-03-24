import AirDatepicker from 'air-datepicker';
import localeRu from 'air-datepicker/locale/ru';

class Calendar {
  constructor(rootElement) {
    this._$datepicker = new AirDatepicker(rootElement, {
      visible: true,
      inline: true,
      dateFormat: 'd MMM',
      multipleDatesSeparator: '-',
      locale: localeRu,
      range: true,
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
