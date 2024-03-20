import DropdownModel from './DropdownModel';
import DropdownPresenter from './DropdownPresenter';
import DropdownView from './DropdownView';

class Dropdown {
  constructor(dropdownElement, onApply) {
    this._view = new DropdownView(dropdownElement);

    const modelInitialState = this._buildModelInitialState();
    this._model = new DropdownModel(modelInitialState);

    this._presenter = new DropdownPresenter(this._model, this._view, onApply);
  }

  _buildModelInitialState() {
    const viewInitialState = this._view.getParser().parseState();
    const modelItems = viewInitialState.items.map((item) => ({
      ...item,
      isCountAtMinimum: item.count === DropdownModel.MIN_COUNT,
    }));

    return {
      items: modelItems,
      isOpened: viewInitialState.isOpened,
      label: viewInitialState.label,
    };
  }
}

export default Dropdown;
