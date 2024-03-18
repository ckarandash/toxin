class DropdownModel {
  constructor({ items = [], isOpened = false } = {}) {
    this.state = {
      items,
      isOpened,
    };
  }

  toggleOpened() {
    this.isOpened = !this.isOpened;
    // updatePresenter();
  }
}

export default DropdownModel;
