import { StickyMenu } from "../StickyMenu/StickyMenu.js";
import { Slideshow } from "../Slideshow/Slideshow.js";
import { FoodMenu } from "../FoodMenu/FoodMenu.js";
import { ImageElement } from "../ImageElement/ImageElement.js";
import { Title } from "../Title/Title.js";
import { TextBlock } from "../TextBlock/TextBlock.js";
import { IFrame } from "../IFrame/IFrame.js";

class ComponentFactory {
  constructor(container) {
    this.targetElement = document.querySelector("#container");
  }

  createNavigation(logoUrl, linkList) {
    let navContent = {};
    navContent.logo = logoUrl;
    navContent.links = linkList;
    return new StickyMenu(this.targetElement, navContent);
  }

  createTitle(textValue, colorValue) {
    let titleSettings = {};
    titleSettings.text = textValue;
    titleSettings.color = colorValue;

    return new Title(this.targetElement, titleSettings);
  }

  createTextBlock(textValue, colorValue) {
    let textSettings = {};
    textSettings.text = textValue;
    textSettings.color = colorValue;

    return new TextBlock(this.targetElement, textSettings);
  }

  createImage(imageUrl, imageAlt, imageSize) {
    let imageSettings = {};

    imageSettings.url = imageUrl;
    imageSettings.alt = imageAlt;
    imageSettings.size = imageSize;

    return new ImageElement(this.targetElement, imageSettings);
  }

  createSlideshow(slideDelay, slideImages) {
    let slideshowSettings = {};
    slideshowSettings.delay = slideDelay;
    slideshowSettings.imageList = slideImages;

    return new Slideshow(this.targetElement, slideshowSettings);
  }

  createFoodMenu(menuSettings) {
    return new FoodMenu(this.targetElement, menuSettings);
  }
  createIFrame(location, width, height) {
    let iframeSettings = {};
    iframeSettings.src = location;
    iframeSettings.width = width;
    iframeSettings.height = height;

    return new IFrame(this.targetElement, iframeSettings);
  }
}

export { ComponentFactory };
