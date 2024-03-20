import ViewRenderer from './utils/ViewRenderer';
import ViewParser from './utils/ViewParser';

class DropdownView {
  constructor(rootElement) {
    this._onHeaderClick = null;
    this._onItemButtonClick = null;
    this._onClearButtonClick = null;
    this._onApplyButtonClick = null;

    this._dropdownElement = rootElement;
    this._dropdownItems = this._buildDropdownItems();

    this._renderer = new ViewRenderer(this._dropdownElement, this._dropdownItems);
    this._parser = new ViewParser(this._dropdownElement);

    this._handleDropdownHeader();
    this._handleClearApplyButtons();
  }

  setHandlers(handlers) {
    this._onHeaderClick = handlers.headerClick;
    this._onItemButtonClick = handlers.itemButtonClick;
    this._onClearButtonClick = handlers.clearButtonClick;
    this._onApplyButtonClick = handlers.applyButtonClick;
  }

  getParser() {
    return this._parser;
  }

  getRenderer() {
    return this._renderer;
  }

  _buildDropdownItems() {
    const dropdownItemsElements = this._dropdownElement
      .querySelectorAll('.js-dropdown__item');

    const dropdownItems = Array.from(dropdownItemsElements).map((itemElement) => {
      const itemCountElement = itemElement.querySelector('.js-dropdown__item-count');
      const minusButton = itemElement.querySelector('.js-dropdown__item-minus');
      const plusButton = itemElement.querySelector('.js-dropdown__item-plus');

      const itemName = itemElement.dataset.name;

      minusButton.addEventListener('click', () => this._onItemButtonClick({
        itemName, buttonType: 'minus',
      }));

      plusButton.addEventListener('click', () => this._onItemButtonClick({
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

  _handleDropdownHeader() {
    const dropdownHeader = this._dropdownElement
      .querySelector('.js-dropdown__header');

    dropdownHeader.addEventListener('click', () => {
      this._onHeaderClick();
    });
  }

  _handleClearApplyButtons() {
    const clearBtn = this._dropdownElement.querySelector('.js-dropdown__clear-btn');
    const applyBtn = this._dropdownElement.querySelector('.js-dropdown__apply-btn');

    clearBtn.addEventListener('click', () => {
      this._onClearButtonClick();
    });

    applyBtn.addEventListener('click', () => {
      this._onApplyButtonClick();
    });
  }
}

export default DropdownView;
