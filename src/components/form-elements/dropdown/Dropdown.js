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

// Сначала в скрипте ищем каждый дропдаун с помощью селектора.
// Получаем элементы и на них на каждого делаем класс дропдаун.

// Это все понятно. Как будет проходить поток данных? Сначала на вью происходит
// событие. Потом это событие передается в presenter. Он делает что-то с моделью
// и модель обновляется. Когда модель обновляется, он получает с нее обновленные
// данные и отправляет во вью

export default Dropdown;
