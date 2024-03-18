class DropdownPresenter {
  constructor(model, view, onApply) {
    this.dropdownModel = model;
    this.dropdownView = view;
    this.onApply = onApply;

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

    this.dropdownView.onClearButtonClick = this.handleViewClearButtonClick.bind(this);
    this.dropdownView.onApplyButtonClick = this.handleViewApplyButtonClick.bind(this);

    this.initialize();
  }

  handleViewClearButtonClick() {
    this.dropdownModel.setMinimumCounts();
  }

  handleViewApplyButtonClick() {
    const modelItems = this.dropdownModel.getState().items;
    const applyItems = modelItems.map(({ name, count }) => ({ name, count }));
    this.onApply(applyItems);
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
