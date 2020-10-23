import layout from "../css/layout.global.css";
import typography from "../css/typography.global.css";
import * as components from "../components/Counter/Counter.js";
import * as navigation from "../components/StickyMenu/StickyMenu.js";
import * as image from "../components/Slideshow/Slideshow.js";

const navDiv = document.querySelector("#nav");
const containerDiv = document.querySelector("#container");

function addNavigation() {
  let navContent = {
    logo: "images/cask_n_grill.png",
    links: { menu: "#menu", about: "#about", location: "#location" },
  };

  new navigation.StickyMenu(navDiv, navContent).render();
}

function createCounters() {
  let counters = [];

  for (let i = 0; i <= 2; i++) {
    counters.push(new components.Counter(containerDiv));
  }

  counters.forEach((counter) => counter.render());
}

function addSlideshow() {
  let slideshowSettings = {
    delay: 8,
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
      "images/entree-steak.jpg"
    ],
  };
  new image.Slideshow(containerDiv, slideshowSettings).render();
}

addNavigation();
createCounters();
addSlideshow();
