class ViewParser {
  constructor(dropdownElement) {
    this.dropdownElement = dropdownElement;
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

export default ViewParser;
