class DropdownView {
  constructor(rootElement) {
    this.dropdownElement = rootElement;
    const dropdownHeader = this.dropdownElement
      .querySelector('.dropdown__header');

    dropdownHeader.addEventListener('click', () => {
      this.onHeaderClick();
    });

    this.dropdownItems = this.buildDropdownItems();
    this.handleClearApplyButtons();

    this.onHeaderClick = null;
    this.onItemButtonClick = null;
    this.onClearButtonClick = null;
    this.onApplyButtonClick = null;
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

  render(options) {
    this.renderOpening(options.isOpened);
    this.renderCounts(options.items);
    this.renderButtons(options.items);
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

  parseState() {
    return {
      isOpened: this.parseDropdownOpened(),
      items: this.parseItemsNameCountArray(),
    };
  }

  parseItemsNameCountArray() {
    const dropdownItemsElements = this.dropdownElement
      .querySelectorAll('.dropdown__item');

    const map = Array.from(dropdownItemsElements).map((itemElement) => {
      const itemCount = +itemElement.querySelector('.dropdown__item-count').textContent;
      const itemName = itemElement.dataset.name;

      return { name: itemName, count: itemCount };
    });

    return map;
  }

  parseDropdownOpened() {
    return this.dropdownElement.classList.contains('dropdown_opened');
  }
}

export default DropdownView;
