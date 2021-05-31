import * as app from "../App";

type callbackMap = {
  [topic: number]: Array<(data: any) => void>;
};

class PubSub {
  private subscriptions: callbackMap;

  constructor() {
    this.subscriptions = {};
  }

  public publish(topic: number, data: any) {
    if (app.debug) {
      console.log(app.enumEventMessages[topic]);
    }
    if (this.subscriptions[topic] !== undefined) {
      this.subscriptions[topic].forEach((callback) =>
        setTimeout(() => {
          callback(data);
        }, 0)
      );
    }
  }

  public subscribe(topic: number, callback: (data: any) => void) {
    if (this.subscriptions[topic] === undefined) {
      this.subscriptions[topic] = new Array();
    }
    this.subscriptions[topic].push(callback);
  }
}

export { PubSub };
