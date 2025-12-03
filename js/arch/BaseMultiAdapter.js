import { fetchBodyFromFile, fetchStyleFromFile } from "../utils/FetchUtil.js"

export class BaseMultiAdapter {
  constructor(adapterTypeList, head, container, layoutList) {
    if (new.target === BaseMultiAdapter) {
      throw new Error("Cannot instantiate BaseMultiAdapter")
    }

    this.adapterTypeList = adapterTypeList
    this.head = head
    this.container = container
    this.layoutList = layoutList
  }

  /**
   * @param {Object} item 必须要有adapterType字段
   * @returns {string} 单个数据项的html
   */
  async onBindItem(item) {
    const adapterType = item.adapterType
    if (!adapterType) {
      throw new Error("Item must have an adapterType field")
    }

    const typeIndex = this.adapterTypeList.indexOf(adapterType)
    if (typeIndex === -1) {
      throw new Error(`Adapter type ${adapterType} not found in adapterTypeList`)
    }

    const layoutFile = this.layoutList[typeIndex]
    if (!layoutFile) {
      throw new Error(`Layout file not found for adapter type ${adapterType} at index ${typeIndex}`)
    }

    this.body = await fetchBodyFromFile(layoutFile)
  }

  async onCreateItems(items) {
    this.container.innerHTML = ''

    for (const item of items) {
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = await this.onBindItem(item)
      this.container.appendChild(tempDiv.firstElementChild)
    }

    for (let i = 0; i < this.layoutList.length; i++) {
      this.head.innerHTML += await fetchStyleFromFile(this.layoutList[i])
    }
  }
}