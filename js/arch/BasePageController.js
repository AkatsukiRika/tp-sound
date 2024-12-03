export class BasePageController {
  constructor() {
    if (new.target === BasePageController) {
      throw new Error("Cannot instantiate BasePageController");
    }

    window.onload = this.onLoad()
    window.onresize = this.onResize()
  }

  onLoad() {}

  onResize() {}
}
