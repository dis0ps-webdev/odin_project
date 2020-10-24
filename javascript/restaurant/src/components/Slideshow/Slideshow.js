import styles from "./Slideshow.local.css";
import { Component } from "../Prototype/Component.js";

/*
Special thanks to @mjadav for the idea on slideshows using flexbox
https://medium.com/@mjadav/simple-slider-for-your-web-page-50115fbebc61
*/

class Slideshow extends Component {
  constructor(container, props) {
    super(container);

    this.props = props;
    this.currentSlide = 0;
    this.imagePosition = 0;
    this.totalSlides = this.props.imageList.length;
    this._bindHandler("click", this._nextSlide.bind(this));
    this._checkRotationState();
  }

  _updateOutputElement() {
    this.outputElement.innerHTML = "";
    this.outputElement.className = styles["image-container"];

    this.imageSlider = document.createElement("div");
    this.imageSlider.className = styles["image-slider"];

    let outputImages = "";

    for (let index = 0; index < this.props.imageList.length; index++) {
      outputImages += `<img class=${styles["image-slider-item"]} src=${this.props.imageList[index]} /> `;
    }

    this.imageSlider.innerHTML = outputImages;

    this.outputElement.append(this.imageSlider);
  }

  _setImageSliderTransform() {
    let sliderItems = this.imageSlider.childNodes;
    let itemWidth = sliderItems[0].offsetWidth;
    let imageOffset = -this.imagePosition * itemWidth - this.imagePosition * 3;
    this.imageSlider.style["transform"] = `translate3d(${imageOffset}px,0,0)`;
  }

  _prevSlide() {
    this.currentSlide--;
    this.imagePosition = Math.max(this.imagePosition - 1, 0);
    this._checkRotationState();
    this._setImageSliderTransform();
  }

  _nextSlide() {
    this.currentSlide++;
    this.imagePosition = Math.min(this.imagePosition + 1, this.totalSlides - 1);
    this._checkRotationState();
    this._setImageSliderTransform();
  }

  _checkRotationState() {
    if (this.currentSlide == this.totalSlides) {
      this._setSlideRotation(this.props.delay, this._prevSlide.bind(this));
    } else if (this.currentSlide == 0) {
      this._setSlideRotation(this.props.delay, this._nextSlide.bind(this));
    }
  }

  _setSlideRotation(delay, slideHandler) {
    clearInterval(this.slideRotater);
    this.slideRotater = setInterval(slideHandler, delay * 1000);
  }
}

export { Slideshow };
