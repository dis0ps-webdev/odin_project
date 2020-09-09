class Player {
  constructor(name, marker, ishuman = true) {
    this.name = name;
    this.marker = marker;
    this.ishuman = ishuman;
  }

  getMarker() {
    return this.marker;
  }
}

export { Player };
