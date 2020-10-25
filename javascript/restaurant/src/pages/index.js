import layout from "../css/layout.global.css";
import typography from "../css/typography.global.css";
import * as config from "../config/ComponentConfig.js";
import { PageAbout } from "./PageAbout.js";
import { PageMenu } from "./PageMenu.js";
import { PageLocation } from "./PageLocation.js";

export const navDiv = document.querySelector("#nav");
export const containerDiv = document.querySelector("#container");

const routeMapping = {
  "#about": PageAbout,
  "#menu": PageMenu,
  "#location": PageLocation,
};

function changePage() {
  let currentHash = document.location.hash;
  let currentPage = new routeMapping[currentHash](containerDiv);
  navDiv.innerHTML = "";
  currentPage.render();
}

window.addEventListener("hashchange", changePage);
window.addEventListener("DOMContentLoaded", changePage);

document.location.hash = "#about";
