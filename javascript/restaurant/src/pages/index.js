import layout from "../css/layout.global.css";
import typography from "../css/typography.global.css";
import { StickyMenu } from "../components/StickyMenu/StickyMenu.js";
import { Slideshow } from "../components/Slideshow/Slideshow.js";
import { FoodMenu } from "../components/FoodMenu/FoodMenu.js";
import { ImageElement } from "../components/ImageElement/ImageElement.js";

const navDiv = document.querySelector("#nav");
const containerDiv = document.querySelector("#container");

function addNavigation() {
  let navContent = {
    logo: "images/cask_n_grill.png",
    links: { menu: "#menu", about: "#about", location: "#location" },
  };

  new StickyMenu(navDiv, navContent).render();
}

function addImage() {
  let imageSettings = {
    url: "images/cask_n_grill.png",
    alt: "Cask 'n Grill Logo",
    size: "50%",
  };
  new ImageElement(containerDiv, imageSettings).render();
}

function addSlideshow() {
  let slideshowSettings = {
    delay: 3,
    imageList: [
      "images/appetizer-bread.jpg",
      "images/appetizer-fries.jpg",
      "images/appetizer-goat-satay.jpg",
      "images/appetizer-charcuterie.jpg",
      "images/appetizer-salad.jpg",
      "images/bar-blantons.jpg",
      "images/bar-glenfiddich.jpg",
      "images/bar-glenrothes.jpg",
      "images/dessert-chocolates.jpg",
      "images/dessert-pannacotta.jpg",
      "images/dessert-tiramisu.jpg",
      "images/entree-beef-wellington.jpg",
      "images/entree-ribs.jpg",
      "images/entree-sausage.jpg",
      "images/entree-steak.jpg",
    ],
  };
  new Slideshow(containerDiv, slideshowSettings).render();
}

function addFoodMenu() {
  let menuSettings = {
    sandwiches: [
      {
        name: "turkey club",
        price: "8.99",
        description:
          "Boar's Head smoked turkey, swiss cheese, microgreens, and house made aoli",
      },
      {
        name: "Roast beef",
        price: "12.99",
        description: "Slow smoked roast beef, horseradish sauce, brioche bun",
      },
    ],
  };
  new FoodMenu(containerDiv, menuSettings).render();
}

addNavigation();
addImage();
addSlideshow();
addFoodMenu();
