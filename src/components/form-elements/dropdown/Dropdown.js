import DropdownModel from './DropdownModel';
import DropdownPresenter from './DropdownPresenter';
import DropdownView from './DropdownView';

class Dropdown {
  constructor(dropdownElement) {
    this.model = new DropdownModel();
    this.view = new DropdownView(dropdownElement);
    this.presenter = new DropdownPresenter(this.model, this.view);
  }
}

export default Dropdown;
