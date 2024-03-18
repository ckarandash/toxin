class DropdownPresenter {
  constructor(model, view) {
    this.dropdownModel = model;
    this.dropdownView = view;

    const modelEvents = this.dropdownModel.getEvents();
    this.dropdownModel.addSubscriber(
      this.onModelUpdated.bind(this),
      modelEvents.MODEL_UPDATED,
    );

    this.dropdownView.onHeaderClick = () => {
      this.dropdownModel.toggleOpened();
    };
  }

  onModelUpdated() {
    this.dropdownView.render(
      this.dropdownModel.getState(),
    );
  }
}

export default DropdownPresenter;
