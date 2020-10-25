import { StickyMenu } from "../components/StickyMenu/StickyMenu.js";
import { Slideshow } from "../components/Slideshow/Slideshow.js";
import { FoodMenu } from "../components/FoodMenu/FoodMenu.js";
import { ImageElement } from "../components/ImageElement/ImageElement.js";
import { Title } from "../components/Title/Title.js";
import { TextBlock } from "../components/TextBlock/TextBlock.js";

export const navDiv = document.querySelector("#nav");
export const containerDiv = document.querySelector("#container");

export function clearContainer() {
  containerDiv.innerHTML = "";
}

export function addNavigation(logoUrl, linkList) {
  let navContent = {};
  navContent.logo = logoUrl;
  navContent.links = linkList;
  return new StickyMenu(navDiv, navContent);
}

export function addTitle(textValue, colorValue) {
  let titleSettings = {};
  titleSettings.text = textValue;
  titleSettings.color = colorValue;

  return new Title(containerDiv, titleSettings);
}

export function addTextBlock(textValue, colorValue) {
  let textSettings = {};
  textSettings.text = textValue;
  textSettings.color = colorValue;

  return new TextBlock(containerDiv, textSettings);
}

export function addImage(imageUrl, imageAlt, imageSize) {
  let imageSettings = {};

  imageSettings.url = imageUrl;
  imageSettings.alt = imageAlt;
  imageSettings.size = imageSize;

  return new ImageElement(containerDiv, imageSettings);
}

export function addSlideshow(slideDelay, slideImages) {
  let slideshowSettings = {};
  slideshowSettings.delay = slideDelay;
  slideshowSettings.imageList = slideImages;

  return new Slideshow(containerDiv, slideshowSettings);
}

export function addFoodMenu(menuSettings) {
  return new FoodMenu(containerDiv, menuSettings);
}
