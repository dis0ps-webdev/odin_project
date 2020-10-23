import styles from "./Slideshow.local.css";

class Slideshow {
  constructor(container, props) {
    this.targetContainer = container;
    this.domReference = null;

    this.props = props;
    this.currentSlide = 0;

    this.outputElement = document.createElement("div");
    this._bindClick();
    this._setTimer(this.props.delay);
  }

  _updateOutputElement() {
    this.outputElement.className = styles["slideshow"];
    let outputImages = "";

    for (let index = 0; index < this.props.imageList.length; index++) {
      let targetStyle = styles["hidden-slide"];
      if (this.currentSlide == index) {
        targetStyle = styles["current-slide"];
      }
      if (this.currentSlide - 1 == index) {
        targetStyle = styles["prev-slide"];
      }
      outputImages += `<img class=${targetStyle} src=${this.props.imageList[index]} /> `;
    }

    this.outputElement.innerHTML = outputImages;
    /*  this.outputElement.innerHTML = `<img class=${styles["current-slide"]} src=${this.imageList[this.currentSlide]} /> `;*/
  }

  _bindClick() {
    this.outputElement.addEventListener(
      "click",
      this._advanceSlides.bind(this)
    );
  }

  _setTimer(delay) {
    let msDelay = delay * 1000;
    setInterval(this._advanceSlides.bind(this), msDelay);
  }

  _advanceSlides() {
    this.currentSlide++;
    if (this.currentSlide >= this.props.imageList.length) {
      this.currentSlide = 0;
    }
    this.render();
  }

  render() {
    this._updateOutputElement();
    if (this.domReference != null) {
      this.domReference.innerHTML = this.outputElement.innerHTML;
    } else {
      this.targetContainer.append(this.outputElement);
      this.domReference = this.targetContainer.lastChild;
    }
  }
}

export { Slideshow };
