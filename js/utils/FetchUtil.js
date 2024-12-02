export async function fetchBodyContentFromFile(filePath) {
  const response = await fetch(filePath)
  const text = await response.text()
  
  // 使用 DOMParser 来正确解析完整的 HTML 文档
  const parser = new DOMParser()
  const doc = parser.parseFromString(text, 'text/html')
  
  // 现在可以正确获取 body 内容
  const bodyContent = doc.body.innerHTML
  return bodyContent
}

export async function fetchBodyFromFile(filePath) {
  const response = await fetch(filePath)
  const text = await response.text()
  
  // 使用 DOMParser 来正确解析完整的 HTML 文档
  const parser = new DOMParser()
  const doc = parser.parseFromString(text, 'text/html')
  
  return doc.body
}

export async function fetchStyleFromFile(filePath) {
  const response = await fetch(filePath)
  const text = await response.text()
  
  // 使用 DOMParser 来正确解析完整的 HTML 文档
  const parser = new DOMParser()
  const doc = parser.parseFromString(text, 'text/html')
  
  // 获取 style 内容
  const styleContent = doc.querySelector('style')?.innerHTML || text.trim()
  return `<style>${styleContent}</style>`
}