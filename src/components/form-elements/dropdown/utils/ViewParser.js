class ViewParser {
  constructor(dropdownElement) {
    this._dropdownElement = dropdownElement;
  }

  parseState() {
    return {
      isOpened: this._parseDropdownOpened(),
      items: this._parseItemsNameCountArray(),
      label: this._parseLabel(),
    };
  }

  _parseItemsNameCountArray() {
    const dropdownItemsElements = this._dropdownElement
      .querySelectorAll('.js-dropdown__item');

    const map = Array.from(dropdownItemsElements).map((itemElement) => {
      const itemCount = +itemElement.querySelector('.js-dropdown__item-count').textContent;
      const itemName = itemElement.dataset.name;
      const itemWord = itemElement.dataset.word;

      return { name: itemName, count: itemCount, word: itemWord };
    });

    return map;
  }

  _parseDropdownOpened() {
    return this._dropdownElement.classList.contains('dropdown_opened');
  }

  _parseLabel() {
    const labelElement = this._dropdownElement.querySelector('.js-dropdown__label');
    return labelElement.textContent;
  }
}

export default ViewParser;
