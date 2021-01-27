import elementClosest from "element-closest";

//Element.closest and Element.matches polyfills
elementClosest(window);

export const containerDiv: Element = <Element>(
  document.querySelector("#container")
);
