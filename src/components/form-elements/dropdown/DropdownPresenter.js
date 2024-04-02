import throwUnreachable from '../../../js/throwUnreachable';

class DropdownPresenter {
  constructor(model, view, onApply) {
    this._dropdownModel = model;
    this._dropdownView = view;
    this._onApply = onApply;

    const modelEvents = this._dropdownModel.getEvents();
    this._dropdownModel.addSubscriber(
      this._onModelUpdated.bind(this),
      modelEvents.MODEL_UPDATED,
    );

    this._dropdownView.setHandlers({
      headerClick: this._handleViewHeaderClick.bind(this),
      itemButtonClick: this._handleViewItemButtonClick.bind(this),
      clearButtonClick: this._handleViewClearButtonClick.bind(this),
      applyButtonClick: this._handleViewApplyButtonClick.bind(this),
    });

    this._renderView();
  }

  _handleViewHeaderClick() {
    this._dropdownModel.toggleOpened();
  }

  _handleViewItemButtonClick({ itemName, buttonType }) {
    switch (buttonType) {
      case 'minus':
        this._dropdownModel.changeItemCount(itemName, 'reduce');
        this._dropdownModel.updateText();
        break;

      case 'plus':
        this._dropdownModel.changeItemCount(itemName, 'increase');
        this._dropdownModel.updateText();
        break;

      default:
        throwUnreachable();
    }
  }

  _handleViewClearButtonClick() {
    this._dropdownModel.setMinimumCounts();
    this._dropdownModel.updateText();
  }

  _handleViewApplyButtonClick() {
    const modelItems = this._dropdownModel.getState().items;
    const applyItems = modelItems.map(({ name, count }) => ({ name, count }));
    this._onApply(applyItems);
  }

  _onModelUpdated() {
    this._renderView();
  }

  _renderView() {
    this._dropdownView.getRenderer().render(this._dropdownModel.getState());
  }
}

export default DropdownPresenter;
