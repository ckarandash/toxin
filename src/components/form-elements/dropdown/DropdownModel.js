import Observer from '../../../js/Observer';
import throwUnreachable from '../../../js/throwUnreachable';
import getCountOfWordString from './utils/getCountOfWordString';

class DropdownModel extends Observer {
  constructor({ items = [], isOpened = false, label } = {}) {
    super(DropdownModel.EVENTS);

    this._defaultLabel = label;
    this._state = {
      items,
      isOpened: true,
      label,
    };
  }

  getState() {
    return this._state;
  }

  toggleOpened() {
    this._state.isOpened = !this._state.isOpened;
    this.notify(this._events.MODEL_UPDATED);
  }

  changeItemCount(itemName, changeType) {
    const itemIdx = this._state.items.findIndex(({ name }) => name === itemName);
    const newItem = { ...this._state.items[itemIdx] };

    switch (changeType) {
      case 'reduce':
        if (newItem.count > DropdownModel.MIN_COUNT) {
          newItem.count -= 1;

          if (newItem.count === DropdownModel.MIN_COUNT) {
            newItem.isCountAtMinimum = true;
          }
        }

        break;

      case 'increase':
        newItem.count += 1;

        if (newItem.count > DropdownModel.MIN_COUNT) {
          newItem.isCountAtMinimum = false;
        }

        break;

      default:
        throwUnreachable();
    }

    this._state.items[itemIdx] = newItem;
    this.notify(this._events.MODEL_UPDATED);
  }

  setMinimumCounts() {
    this._state.items = this._state.items.map((i) => (
      { ...i, count: DropdownModel.MIN_COUNT, isCountAtMinimum: true }
    ));
    this.notify(this._events.MODEL_UPDATED);
  }

  updateLabel() {
    this._state.label = this._buildLabel();
    this.notify(DropdownModel.EVENTS.MODEL_UPDATED);
  }

  _buildFullLabel() {
    const areAllItemsAtMinimum = !this._state.items.find(
      ({ count }) => count !== DropdownModel.MIN_COUNT,
    );

    if (areAllItemsAtMinimum) {
      return this._defaultLabel;
    }

    const wordWithCountStrings = this._state.items
      .filter(({ count }) => count !== 0)
      .map((item) => getCountOfWordString(item.count, item.word));

    const label = wordWithCountStrings.join(', ');
    return label;
  }

  _buildLabel() {
    const fullLabel = this._buildFullLabel();
    const cutLabel = `${fullLabel.slice(0, DropdownModel.LABEL_MAX_LENGTH)}...`;

    const isLabelTooLong = fullLabel.length >= DropdownModel.LABEL_MAX_LENGTH;
    const potentiallyCutLabel = isLabelTooLong ? cutLabel : fullLabel;

    return potentiallyCutLabel;
  }
}

DropdownModel.MIN_COUNT = 0;
DropdownModel.EVENTS = {
  MODEL_UPDATED: 'MODEL_UPDATED',
};
DropdownModel.LABEL_MAX_LENGTH = 20;

export default DropdownModel;
