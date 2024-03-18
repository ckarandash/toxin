import DropdownModel from './DropdownModel';
import DropdownPresenter from './DropdownPresenter';
import DropdownView from './DropdownView';

class Dropdown {
  constructor(dropdownElement, onApply) {
    this.view = new DropdownView(dropdownElement);

    const modelInitialState = this.buildModelInitialState();
    this.model = new DropdownModel(modelInitialState);

    this.presenter = new DropdownPresenter(this.model, this.view, onApply);
  }

  buildModelInitialState() {
    const viewInitialState = this.view.getParser().parseState();
    const modelItems = viewInitialState.items.map((item) => ({
      ...item,
      isCountAtMinimum: item.count === DropdownModel.MIN_COUNT,
    }));

    return {
      items: modelItems,
      isOpened: viewInitialState.isOpened,
    };
  }
}

export default Dropdown;
