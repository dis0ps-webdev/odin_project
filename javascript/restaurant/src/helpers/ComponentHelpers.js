import { StickyMenu } from "../components/StickyMenu/StickyMenu.js";
import { Slideshow } from "../components/Slideshow/Slideshow.js";
import { FoodMenu } from "../components/FoodMenu/FoodMenu.js";
import { ImageElement } from "../components/ImageElement/ImageElement.js";
import { Title } from "../components/Title/Title.js";
import { TextBlock } from "../components/TextBlock/TextBlock.js";

export const navDiv = document.querySelector("#nav");
export const containerDiv = document.querySelector("#container");

export function addNavigation(logoUrl, linkList) {
  let navContent = {};
  navContent.logo = logoUrl;
  navContent.links = linkList;
  /*   let navContent = {
    logo: "images/cask_n_grill.png",
    links: { menu: "#menu", about: "#about", location: "#location" },
  };
 */
  new StickyMenu(navDiv, navContent).render();
}

export function addTitle(textValue, colorValue) {
  let titleSettings = {};
  titleSettings.text = textValue;
  titleSettings.color = colorValue;

  new Title(containerDiv, titleSettings).render();
}

export function addTextBlock(textValue, colorValue) {
  let textSettings = {};
  textSettings.text = textValue;
  textSettings.color = colorValue;

  new TextBlock(containerDiv, textSettings).render();
}

export function addImage(imageUrl, imageAlt, imageSize) {
  let imageSettings = {};

  imageSettings.url = imageUrl;
  imageSettings.alt = imageAlt;
  imageSettings.size = imageSize;

  new ImageElement(containerDiv, imageSettings).render();
}

export function addSlideshow(slideDelay, slideImages) {
  let slideshowSettings = {};
  slideshowSettings.delay = slideDelay;
  slideshowSettings.imageList = slideImages;

  new Slideshow(containerDiv, slideshowSettings).render();
}

export function addFoodMenu(menuSettings) {
  new FoodMenu(containerDiv, menuSettings).render();
}
