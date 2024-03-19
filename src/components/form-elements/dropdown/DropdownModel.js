import Observer from '../../../js/Observer';
import throwUnreachable from '../../../js/throwUnreachable';
import getCountOfWordString from './utils/getCountOfWordString';

class DropdownModel extends Observer {
  constructor({ items = [], isOpened = false, label } = {}) {
    super(DropdownModel.EVENTS);

    this.defaultLabel = label;
    this.state = {
      items,
      isOpened: true,
      label,
    };
  }

  getState() {
    return this.state;
  }

  toggleOpened() {
    this.state.isOpened = !this.state.isOpened;
    this.notify(this.events.MODEL_UPDATED);
  }

  changeItemCount(itemName, changeType) {
    const itemIdx = this.state.items.findIndex(({ name }) => name === itemName);
    const newItem = { ...this.state.items[itemIdx] };

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

    this.state.items[itemIdx] = newItem;
    this.notify(this.events.MODEL_UPDATED);
  }

  setMinimumCounts() {
    this.state.items = this.state.items.map((i) => (
      { ...i, count: DropdownModel.MIN_COUNT, isCountAtMinimum: true }
    ));
    this.notify(this.events.MODEL_UPDATED);
  }

  buildFullLabel() {
    const areAllItemsAtMinimum = !this.state.items.find(
      ({ count }) => count !== DropdownModel.MIN_COUNT,
    );

    if (areAllItemsAtMinimum) {
      return this.defaultLabel;
    }

    const wordWithCountStrings = this.state.items
      .filter(({ count }) => count !== 0)
      .map((item) => getCountOfWordString(item.count, item.word));

    const label = wordWithCountStrings.join(', ');
    return label;
  }

  buildLabel() {
    const fullLabel = this.buildFullLabel();
    const cutLabel = `${fullLabel.slice(0, DropdownModel.LABEL_MAX_LENGTH)}...`;

    const isLabelTooLong = fullLabel.length >= DropdownModel.LABEL_MAX_LENGTH;
    const potentiallyCutLabel = isLabelTooLong ? cutLabel : fullLabel;

    return potentiallyCutLabel;
  }

  updateLabel() {
    this.state.label = this.buildLabel();
    this.notify(DropdownModel.EVENTS.MODEL_UPDATED);
  }
}

DropdownModel.MIN_COUNT = 0;
DropdownModel.EVENTS = {
  MODEL_UPDATED: 'MODEL_UPDATED',
};
DropdownModel.LABEL_MAX_LENGTH = 20;

export default DropdownModel;
