class ViewRenderer {
  constructor(dropdownElement, dropdownItems) {
    this.dropdownElement = dropdownElement;
    this.dropdownItems = dropdownItems;
  }

  render(options) {
    this.renderOpening(options.isOpened);
    this.renderCounts(options.items);
    this.renderButtons(options.items);
    this.renderLabel(options.label);
  }

  renderOpening(isOpened) {
    if (isOpened) {
      this.dropdownElement.classList.add('dropdown_opened');
    } else {
      this.dropdownElement.classList.remove('dropdown_opened');
    }
  }

  renderCounts(items) {
    items.forEach((i) => {
      const relatedElement = this.dropdownItems.find(({ name }) => name === i.name);
      relatedElement.elements.countElement.textContent = i.count;
    });
  }

  renderButtons(items) {
    items.forEach((i) => {
      const relatedElement = this.dropdownItems.find(({ name }) => name === i.name);
      const { minusButton } = relatedElement.elements;

      const buttonDisabledClass = 'dropdown__control-btn_disabled';
      if (i.isCountAtMinimum) {
        minusButton.classList.add(buttonDisabledClass);
      } else {
        minusButton.classList.remove(buttonDisabledClass);
      }
    });
  }

  renderLabel(label) {
    const labelElement = this.dropdownElement.querySelector('.dropdown__label');
    labelElement.textContent = label;
  }
}

export default ViewRenderer;
