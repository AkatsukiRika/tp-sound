export async function fetchBodyFromFile(filePath) {
  const response = await fetch(filePath)
  const text = await response.text()
  
  // 创建一个临时的 DOM 元素来解析 HTML
  const temp = document.createElement('div')
  temp.innerHTML = text.trim()
  
  // 获取 body 内容
  const bodyContent = temp.querySelector('body')?.innerHTML || text.trim()
  return bodyContent
}

export async function fetchStyleFromFile(filePath) {
  const response = await fetch(filePath)
  const text = await response.text()
  
  // 创建一个临时的 DOM 元素来解析 HTML
  const temp = document.createElement('div')
  temp.innerHTML = text.trim()
  
  // 获取 style 内容
  const styleContent = temp.querySelector('style')?.innerHTML || text.trim()
  return styleContent
}