import elementClosest from "element-closest";

//Element.closest and Element.matches polyfills
elementClosest(window);

export const debug = false;

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
  "UPDATE_VIEWS",
  "CHANGE_PROJECT",
  "ADD_PROJECT",
  "ADD_TODO",
  "LOAD_TODO",
  "UPDATE_PROJECT",
  "UPDATE_TODO",
  "CHANGE_LIST_FILTER",
  "CHANGE_VIEW_EDIT",
  "CHANGE_VIEW_LIST",
  "CHANGE_VIEW_SETTINGS",
  "PAGE_LOADED",
  "SAVE_APP_STATE",
  "LOAD_APP_STATE",
}
