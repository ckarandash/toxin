import DateDropdown from '@components/form-elements/date-dropdown/DateDropdown';
import Calendar from '@components/cards/calendar/Calendar';
import localeRu from 'air-datepicker/locale/ru';

class PeriodDropdowns {
  constructor(rootElement) {
    this._rootElement = rootElement;
    this._calendarContainer = this._rootElement.querySelector('.js-period-dropdowns__calendar');
    this._calendarElement = this._calendarContainer.querySelector('.js-calendar');

    this._initDropdowns();
    this._initCalendar();
  }

  static buildDateStringInProperFormat(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const dateStringInProperFormat = `${day}.${month}.${year}`;

    return dateStringInProperFormat;
  }

  _initDropdowns() {
    const startDateDropdownElement = this._rootElement
      .querySelector('.js-period-dropdowns__start-date .js-date-dropdown');
    const endDateDropdownElement = this._rootElement
      .querySelector('.js-period-dropdowns__end-date .js-date-dropdown');

    this._startDateDropdown = new DateDropdown(
      startDateDropdownElement,
      this._onDateComplete.bind(this),
    );
    this._endDateDropdown = new DateDropdown(
      endDateDropdownElement,
      this._onDateComplete.bind(this),
    );

    this._startDateInput = this._startDateDropdown.getInputElement();
    this._endDateInput = this._endDateDropdown.getInputElement();

    this._startDateDropdown.getOpenButtonElement().addEventListener('click', () => {
      this._calendarContainer.classList.toggle('period-dropdowns__calendar_shown');
    });

    this._endDateDropdown.getOpenButtonElement().addEventListener('click', () => {
      this._calendarContainer.classList.toggle('period-dropdowns__calendar_shown');
    });
  }

  _initCalendar() {
    const datepickerOptions = {
      inline: true,
      locale: localeRu,
      range: true,
      onSelect: this._onSelectDate.bind(this),
    };

    this._calendar = new Calendar(this._calendarElement, datepickerOptions);
  }

  _onSelectDate({ date }) {
    const [startDate, endDate] = date;

    if (startDate === undefined) {
      this._startDateInput.value = '';
    } else {
      this._startDateInput.value = PeriodDropdowns.buildDateStringInProperFormat(startDate);
    }

    if (endDate === undefined) {
      this._endDateInput.value = '';
    } else {
      this._endDateInput.value = PeriodDropdowns.buildDateStringInProperFormat(endDate);
    }
  }

  _onDateComplete(date) {
    this._calendar.getDatepicker().selectDate(date);
  }
}

export default PeriodDropdowns;
