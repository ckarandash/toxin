import ViewRenderer from './utils/ViewRenderer';
import ViewParser from './utils/ViewParser';

class DropdownView {
  constructor(rootElement) {
    this.onHeaderClick = null;
    this.onItemButtonClick = null;
    this.onClearButtonClick = null;
    this.onApplyButtonClick = null;

    this.dropdownElement = rootElement;
    this.dropdownItems = this.buildDropdownItems();

    this.renderer = new ViewRenderer(this.dropdownElement, this.dropdownItems);
    this.parser = new ViewParser(this.dropdownElement);

    this.handleDropdownHeader();
    this.handleClearApplyButtons();
  }

  buildDropdownItems() {
    const dropdownItemsElements = this.dropdownElement
      .querySelectorAll('.dropdown__item');

    const dropdownItems = Array.from(dropdownItemsElements).map((itemElement) => {
      const itemCountElement = itemElement.querySelector('.dropdown__item-count');
      const minusButton = itemElement.querySelector('.dropdown__item-minus');
      const plusButton = itemElement.querySelector('.dropdown__item-plus');

      const itemName = itemElement.dataset.name;

      minusButton.addEventListener('click', () => this.onItemButtonClick({
        itemName, buttonType: 'minus',
      }));

      plusButton.addEventListener('click', () => this.onItemButtonClick({
        itemName, buttonType: 'plus',
      }));

      const newItem = {
        name: itemName,
        elements: {
          minusButton,
          plusButton,
          countElement: itemCountElement,
        },
      };

      return newItem;
    });

    return dropdownItems;
  }

  handleDropdownHeader() {
    const dropdownHeader = this.dropdownElement
      .querySelector('.dropdown__header');

    dropdownHeader.addEventListener('click', () => {
      this.onHeaderClick();
    });
  }

  handleClearApplyButtons() {
    const clearBtn = this.dropdownElement.querySelector('.dropdown__clear-btn');
    const applyBtn = this.dropdownElement.querySelector('.dropdown__apply-btn');

    clearBtn.addEventListener('click', () => {
      this.onClearButtonClick();
    });

    applyBtn.addEventListener('click', () => {
      this.onApplyButtonClick();
    });
  }

  getParser() {
    return this.parser;
  }

  getRenderer() {
    return this.renderer;
  }
}

export default DropdownView;
