class Router {
  constructor(container, mapping) {
    this.targetElement = container;
    this.routeMapping = mapping;
    this._bindPageEvents();
  }

  _loadPage() {
    let currentHash = document.location.hash;
    let currentPage = new this.routeMapping[currentHash](this.targetElement);
    currentPage.render();
  }

  _bindPageEvents() {
    window.addEventListener("hashchange", this._loadPage.bind(this));
    window.addEventListener("DOMContentLoaded", this._loadPage.bind(this));
  }
}

export { Router };
