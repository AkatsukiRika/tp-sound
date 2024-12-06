import { fetchBodyFromFile, fetchStyleFromFile } from "../utils/FetchUtil.js"

export class BaseAdapter {
  /**
   * @param {HTMLHeadElement} head 用于放置该组件的CSS
   * @param {Element} container 用于放置该组件的HTML
   * @param {string} layout 该组件的layout文件
   */
  constructor(head, container, layout) {
    if (new.target === BaseAdapter) {
      throw new Error("Cannot instantiate BaseAdapter")
    }

    this.head = head
    this.container = container
    this.layout = layout
  }

  async onInit() {
    this.body = await fetchBodyFromFile(this.layout)
  }

  /**
   * 外部实现
   * @param {Object} item 列表中的单个数据项
   * @returns {string} 返回单个数据项的HTML
   */
  async onBindItem(item) {
    if (!this.body) {
      throw new Error("Please invoke onInit() first")
    }
  }

  /**
   * @param {Array<Object>} items 列表中的所有数据项
   * @returns {Promise<void>}
   */
  async onCreateItems(items) {
    if (!this.body) {
      throw new Error("Please invoke onInit() first")
    }

    this.container.innerHTML = ''

    for (const item of items) {
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = await this.onBindItem(item)
      this.container.appendChild(tempDiv.firstElementChild)
    }

    this.head.innerHTML += await fetchStyleFromFile(this.layout)
  }
}