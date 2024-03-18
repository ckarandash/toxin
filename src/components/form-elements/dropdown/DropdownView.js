class DropdownView {
  constructor(rootElement) {
    this.dropdownElement = rootElement;
    const dropdownHeader = this.dropdownElement
      .querySelector('.dropdown__header');

    dropdownHeader.addEventListener('click', () => {
      this.onHeaderClick();
    });

    this.dropdownItems = this.buildDropdownItems();
    this.onHeaderClick = null;
  }

  buildDropdownItems() {
    const dropdownItemsElements = this.dropdownElement
      .querySelectorAll('.dropdown__item');

    const dropdownItems = Array.from(dropdownItemsElements).map((item) => {
      const itemCountElement = item.querySelector('.dropdown__item-count');
      const minusButton = item.querySelector('.dropdown__item-minus');
      const plusButton = item.querySelector('.dropdown__item-plus');

      return {
        minusButton,
        plusButton,
        countElement: itemCountElement,
      };
    });

    return dropdownItems;
  }

  render(options) {
    this.renderOpening(options.isOpened);
  }

  renderOpening(isOpened) {
    if (isOpened) {
      this.dropdownElement.classList.add('dropdown_opened');
    } else {
      this.dropdownElement.classList.remove('dropdown_opened');
    }
  }
}

export default DropdownView;
