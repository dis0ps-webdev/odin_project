type callbackMap = {
  [topic: string]: Array<(data: any) => void>;
};

class PubSub {
  private subscriptions: callbackMap;

  constructor() {
    this.subscriptions = {};
  }

  public publish(topic: string, data: any) {
    if (this.subscriptions[topic] !== undefined) {
      this.subscriptions[topic].forEach((callback) => callback(data));
    }
  }

  public subscribe(topic: string, callback: (data: any) => void) {
    if (this.subscriptions[topic] === undefined) {
      this.subscriptions[topic] = new Array();
    }
    this.subscriptions[topic].push(callback);
  }
}

export { PubSub };
