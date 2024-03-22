import throwUnreachable from '../../../js/throwUnreachable';

class RateBtn {
  constructor(rootElement) {
    this._elements = {
      rateButton: rootElement,
      stars: rootElement.querySelectorAll('.js-rate-btn-star'),
    };

    const parsedRate = this._parseCurrentRate();
    this._state = {
      // 'user' | 'average'
      rateType: parsedRate.type,
      rateValue: parsedRate.value,
    };
  }

  initialize() {
    this._initStars();
  }

  _initStars() {
    const starsArray = Array.from(this._elements.stars);

    starsArray.forEach((star, starPosition) => star.addEventListener(
      'click',
      () => this._handleStarClick(starPosition),
    ));
  }

  _handleStarClick(starPosition) {
    const clickedRate = starPosition + 1;

    const clickedOnSetRate = clickedRate === this._state.rateValue;
    const userRateSet = this._state.rateType === 'user';
    const userCancelledHisRate = clickedOnSetRate && userRateSet;

    if (userCancelledHisRate) {
      this._state.rateType = 'average';
      this._state.rateValue = this._parseAverageRate();
    } else {
      this._state.rateType = 'user';
      this._state.rateValue = clickedRate;
    }

    this._render();
  }

  _parseCurrentRate() {
    const rateOptions = this._elements.rateButton.dataset;
    let rateType;
    let rateValue;

    if (rateOptions.user_rate !== undefined) {
      rateType = 'user';
      rateValue = +rateOptions.user_rate;
    } else if (rateOptions.average_rate !== undefined) {
      rateType = 'average';
      rateValue = +rateOptions.average_rate;
    } else {
      throwUnreachable();
    }

    return {
      type: rateType,
      value: rateValue,
    };
  }

  _parseAverageRate() {
    return this._elements.rateButton.dataset.average_rate;
  }

  _render() {
    this._renderRateStatus();
    this._renderRateStars();
    this._renderDataset();
  }

  _renderRateStatus() {
    const isRated = this._state.rateType === 'user';

    if (isRated) {
      this._elements.rateButton.classList.add('rate-btn_rated');
    } else {
      this._elements.rateButton.classList.remove('rate-btn_rated');
    }
  }

  _renderRateStars() {
    const starsArray = Array.from(this._elements.stars);

    const starsToFill = starsArray.slice(0, this._state.rateValue);
    const starsToUnfill = starsArray.slice(this._state.rateValue);

    starsToFill.forEach((s) => {
      s.classList.remove('rate-btn__star_unfilled');
    });

    starsToUnfill.forEach((s) => {
      s.classList.add('rate-btn__star_unfilled');
    });
  }

  _renderDataset() {
    if (this._state.rateType === 'average') {
      delete this._elements.rateButton.dataset.user_rate;
    } else if (this._state.rateType === 'user') {
      this._elements.rateButton.dataset.user_rate = this._state.rateValue;
    } else {
      throwUnreachable();
    }
  }
}

export default RateBtn;
