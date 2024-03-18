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
}

export default DropdownModel;
