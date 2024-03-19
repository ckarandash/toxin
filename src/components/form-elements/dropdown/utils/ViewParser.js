class ViewParser {
  constructor(dropdownElement) {
    this.dropdownElement = dropdownElement;
  }

  parseState() {
    return {
      isOpened: this.parseDropdownOpened(),
      items: this.parseItemsNameCountArray(),
      label: this.parseLabel(),
    };
  }

  parseItemsNameCountArray() {
    const dropdownItemsElements = this.dropdownElement
      .querySelectorAll('.dropdown__item');

    const map = Array.from(dropdownItemsElements).map((itemElement) => {
      const itemCount = +itemElement.querySelector('.dropdown__item-count').textContent;
      const itemName = itemElement.dataset.name;
      const itemWord = itemElement.dataset.word;

      return { name: itemName, count: itemCount, word: itemWord };
    });

    return map;
  }

  parseDropdownOpened() {
    return this.dropdownElement.classList.contains('dropdown_opened');
  }

  parseLabel() {
    const labelElement = this.dropdownElement.querySelector('.dropdown__label');
    return labelElement.textContent;
  }
}

export default ViewParser;
