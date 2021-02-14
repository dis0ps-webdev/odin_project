import elementClosest from "element-closest";
import { compareAsc, format } from "date-fns";
import { Project } from "../model/Project";

//Element.closest and Element.matches polyfills
elementClosest(window);

export const containerDiv: Element = <Element>(
  document.querySelector("#container")
);

export enum enumPriorities {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3
}

export enum enumEventMessages {
  UPDATED_PROJECT = 1

}
