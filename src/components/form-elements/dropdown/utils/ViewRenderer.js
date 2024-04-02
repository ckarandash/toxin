class ViewRenderer {
  constructor(dropdownElement, dropdownItems) {
    this._dropdownElement = dropdownElement;
    this._dropdownItems = dropdownItems;
  }

  render(options) {
    this._renderOpening(options.isOpened);
    this._renderCounts(options.items);
    this._renderButtons(options.items);
    this._renderText(options.text);
  }

  _renderOpening(isOpened) {
    if (isOpened) {
      this._dropdownElement.classList.add('dropdown_opened');
    } else {
      this._dropdownElement.classList.remove('dropdown_opened');
    }
  }

  _renderCounts(items) {
    items.forEach((i) => {
      const relatedElement = this._dropdownItems.find(({ name }) => name === i.name);
      relatedElement.elements.countElement.textContent = i.count;
    });
  }

  _renderButtons(items) {
    items.forEach((i) => {
      const relatedElement = this._dropdownItems.find(({ name }) => name === i.name);
      const { minusButton } = relatedElement.elements;

      const buttonDisabledClass = 'dropdown__control-btn_disabled';
      if (i.isCountAtMinimum) {
        minusButton.classList.add(buttonDisabledClass);
      } else {
        minusButton.classList.remove(buttonDisabledClass);
      }
    });
  }

  _renderText(text) {
    const textElement = this._dropdownElement.querySelector('.js-dropdown__text');
    textElement.textContent = text;
  }
}

export default ViewRenderer;
