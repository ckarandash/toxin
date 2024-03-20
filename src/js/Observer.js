class Observer {
  constructor(events = {}, subscribers = {}) {
    this._events = events;
    this._subscribers = subscribers;
  }

  getEvents() {
    return this._events;
  }

  getSubscribers() {
    return this._subscribers;
  }

  addSubscriber(subscriber, onEvent) {
    if (this._subscribers[onEvent] === undefined) {
      this._subscribers[onEvent] = [subscriber];
    } else {
      this._subscribers[onEvent].push(subscriber);
    }
  }

  removeSubscriber(subscriber, onEvent) {
    return this._subscribers[onEvent].filter((s) => subscriber !== s);
  }

  notify(onEvent) {
    const eventSubscribers = this._subscribers[onEvent];

    eventSubscribers.forEach((s) => {
      s();
    });
  }
}

export default Observer;
