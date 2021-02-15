import elementClosest from "element-closest";

//Element.closest and Element.matches polyfills
elementClosest(window);

export const debug = true;

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
  "CHANGE_PROJECT",
  "ADD_PROJECT",
  "ADD_TODO",
  "UPDATE_PROJECT",
  "UPDATE_TODO",
  "CHANGE_LIST_FILTER",
  "CHANGE_VIEW_EDIT",
  "CHANGE_VIEW_LIST",
  "CHANGE_VIEW_SETTINGS",
  "SAVE_APP_STATE",
}
