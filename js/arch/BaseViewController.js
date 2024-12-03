import {fetchBodyContentFromFile, fetchBodyFromFile, fetchStyleFromFile} from "../utils/FetchUtil.js"

export class BaseViewController {
  /**
   * @param {HTMLHeadElement} head 用于放置该组件的CSS
   * @param {Element} container 用于放置该组件的HTML
   * @param {string} layout 该组件的layout文件
   */
  constructor(head, container, layout) {
    if (new.target === BaseViewController) {
      throw new Error("Cannot instantiate BaseViewController")
    }

    this.head = head
    this.container = container
    this.layout = layout
  }

  async onInit() {
    this.container.innerHTML = await fetchBodyContentFromFile(this.layout);
    this.head.innerHTML += await fetchStyleFromFile(this.layout);
  }
}
