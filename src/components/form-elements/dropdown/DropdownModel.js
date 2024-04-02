import Observer from '../../../js/Observer';
import throwUnreachable from '../../../js/throwUnreachable';
import getCountOfWordString from './utils/getCountOfWordString';

class DropdownModel extends Observer {
  constructor({ items = [], isOpened = false, text } = {}) {
    super(DropdownModel.EVENTS);

    this._defaultText = text;
    this._state = {
      items,
      isOpened,
      text,
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

  updateText() {
    this._state.text = this._buildText();
    this.notify(DropdownModel.EVENTS.MODEL_UPDATED);
  }

  _buildFullText() {
    const areAllItemsAtMinimum = !this._state.items.find(
      ({ count }) => count !== DropdownModel.MIN_COUNT,
    );

    if (areAllItemsAtMinimum) {
      return this._defaultText;
    }

    const wordWithCountStrings = this._state.items
      .filter(({ count }) => count !== 0)
      .map((item) => getCountOfWordString(item.count, item.word));

    const text = wordWithCountStrings.join(', ');
    return text;
  }

  _buildText() {
    const fullText = this._buildFullText();
    const cutText = `${fullText.slice(0, DropdownModel.TEXT_MAX_LENGTH)}...`;

    const isTextTooLong = fullText.length >= DropdownModel.TEXT_MAX_LENGTH;
    const potentiallyCutText = isTextTooLong ? cutText : fullText;

    return potentiallyCutText;
  }
}

DropdownModel.MIN_COUNT = 0;
DropdownModel.EVENTS = {
  MODEL_UPDATED: 'MODEL_UPDATED',
};
DropdownModel.TEXT_MAX_LENGTH = 20;

export default DropdownModel;
