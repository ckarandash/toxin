import Observer from '../../../js/Observer';
import throwUnreachable from '../../../js/throwUnreachable';

class DropdownModel extends Observer {
  constructor({ items = [], isOpened = false } = {}) {
    super(DropdownModel.EVENTS);

    this.state = {
      items,
      isOpened: true,
      // isOpened,
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
}

DropdownModel.MIN_COUNT = 0;
DropdownModel.EVENTS = {
  MODEL_UPDATED: 'MODEL_UPDATED',
};

export default DropdownModel;
