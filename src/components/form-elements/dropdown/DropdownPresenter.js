import throwUnreachable from '../../../js/throwUnreachable';

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

    this.dropdownView.onHeaderClick = this.handleViewHeaderClick.bind(this);
    this.dropdownView.onItemButtonClick = this.handleViewItemButtonClick.bind(this);
    this.dropdownView.onClearButtonClick = this.handleViewClearButtonClick.bind(this);
    this.dropdownView.onApplyButtonClick = this.handleViewApplyButtonClick.bind(this);

    this.renderView();
  }

  handleViewHeaderClick() {
    this.dropdownModel.toggleOpened();
  }

  handleViewItemButtonClick({ itemName, buttonType }) {
    switch (buttonType) {
      case 'minus':
        this.dropdownModel.changeItemCount(itemName, 'reduce');
        break;

      case 'plus':
        this.dropdownModel.changeItemCount(itemName, 'increase');
        break;

      default:
        throwUnreachable();
    }
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

  renderView() {
    this.dropdownView.getRenderer().render(this.dropdownModel.getState());
  }
}

export default DropdownPresenter;
