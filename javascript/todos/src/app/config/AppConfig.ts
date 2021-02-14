import elementClosest from "element-closest";

//Element.closest and Element.matches polyfills
elementClosest(window);

export const containerDiv: Element = <Element>(
  document.querySelector("#container")
);

export enum enumPriorities {
  "Low",
  "Medium",
  "High",
}

export enum enumStatus {
  "Todo",
  "In-Progress",
  "Done",
}

export enum enumEventMessages {
  "UPDATED_PROJECT",
  "ADDED_TODO",
}
