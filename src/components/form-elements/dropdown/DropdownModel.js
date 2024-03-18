import Observer from './Observer';

class DropdownModel extends Observer {
  constructor({ items = [], isOpened = false } = {}) {
    super({
      MODEL_UPDATED: 'MODEL_UPDATED',
    });

    this.state = {
      items,
      isOpened,
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
        newItem.count -= 1;
        break;

      case 'increase':
        newItem.count += 1;
        break;

      default:
        throw new Error('Mustn\'t get here');
    }

    this.state.items[itemIdx] = newItem;
    this.notify(this.events.MODEL_UPDATED);
  }
}

export default DropdownModel;
