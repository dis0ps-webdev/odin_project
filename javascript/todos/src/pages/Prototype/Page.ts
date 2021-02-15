export class Page {
  private outputElement: any;
  private componentList: any[];

  constructor(container: any) {
    this.outputElement = container;
    this.componentList = [];
  }

  private clearContainer() {
    while (this.outputElement.firstChild) {
      this.outputElement.removeChild(this.outputElement.firstChild);
    }
  }

  public addComponent(componentObject: any) {
    this.componentList.push(componentObject);
  }

  public render() {
    this.clearContainer();
    this.componentList.forEach((component) => component.render());
  }
}
