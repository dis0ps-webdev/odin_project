// Inspired by these two articles pointing towards genericizing JSON operations
// http://choly.ca/post/typescript-json/
// https://effectivetypescript.com/2020/04/09/jsonify/

type Jsonify<T> = T extends { toJSON(): infer U }
  ? U
  : T extends object
  ? {
      [k in keyof T]: Jsonify<T[k]>;
    }
  : T;

class Model {
  constructor(strJSON?: string) {
    //If a JSON string is suppled, populate our object members with it's data
    if (strJSON !== undefined) {
      this.fromJSON(strJSON);
    }
  }

  protected toJSON<T>(): Jsonify<T> {
    return <Jsonify<T>>Object.assign({}, this);
  }
  

  protected fromJSON(strJSON: string) {
    let objJSON = JSON.parse(strJSON);
    Object.assign(this, objJSON); //, {
    /*Use second source parameter to fix any typing issues with conversion */
    //});
  }
}

export { Model };
