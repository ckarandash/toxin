class DropdownPresenter {
  constructor(model, view) {
    this.dropdownModel = model;
    this.dropdownView = view;

    this.dropdownView.onHeaderClick = () => {
      this.dropdownModel.toggleOpened();
    };
  }
}

export default DropdownPresenter;
