import DropdownModel from './DropdownModel';
import DropdownPresenter from './DropdownPresenter';
import DropdownView from './DropdownView';

class Dropdown {
  constructor(dropdownElement) {
    this.view = new DropdownView(dropdownElement);

    const viewInitialState = this.view.parseState();
    this.model = new DropdownModel({
      items: viewInitialState.items,
      isOpened: viewInitialState.isOpened,
    });

    this.presenter = new DropdownPresenter(this.model, this.view);
  }
}

export default Dropdown;
