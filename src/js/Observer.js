class Observer {
  constructor(events = {}, subscribers = {}) {
    this.events = events;
    this.subscribers = subscribers;
  }

  getEvents() {
    return this.events;
  }

  getSubscribers() {
    return this.subscribers;
  }

  addSubscriber(subscriber, onEvent) {
    if (this.subscribers[onEvent] === undefined) {
      this.subscribers[onEvent] = [subscriber];
    } else {
      this.subscribers[onEvent].push(subscriber);
    }
  }

  removeSubscriber(subscriber, onEvent) {
    return this.subscribers[onEvent].filter((s) => subscriber !== s);
  }

  notify(onEvent) {
    const eventSubscribers = this.subscribers[onEvent];

    eventSubscribers.forEach((s) => {
      s();
    });
  }
}

export default Observer;
