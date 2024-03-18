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

    this.dropdownView.onItemButtonClick = ({ itemName, buttonType }) => {
      switch (buttonType) {
        case 'minus':
          this.dropdownModel.changeItemCount(itemName, 'reduce');
          break;

        case 'plus':
          this.dropdownModel.changeItemCount(itemName, 'increase');
          break;

        default:
          throw new Error('Mustn\'t get here');
      }
    };

    this.initialize();
  }

  onModelUpdated() {
    this.renderView();
  }

  initialize() {
    this.renderView();
  }

  renderView() {
    this.dropdownView.render(this.dropdownModel.getState());
  }
}

export default DropdownPresenter;
