import { BaseAdapter } from "../arch/BaseAdapter.js"

export class TrackCardAdapter extends BaseAdapter {
  /**
   * @param {Function} onItemClick 
   */
  constructor(onItemClick) {
    super(
      document.querySelector('head'),
      document.querySelector('#track-cards'),
      './res/layout/item_track_card.html'
    )
    this.onItemClick = onItemClick
  }

  async onCreateItems(items) {
    await super.onCreateItems(items)
    items.forEach(item => {
      const musicLink = document.querySelector(`#music-link-${item.id}`)
      musicLink.addEventListener('click', () => this.onItemClick(item))
    })
  }

  async onBindItem(item) {
    super.onBindItem(item)

    const newBody = this.body.cloneNode(true)
    const trackCover = newBody.querySelector('.track-cover')
    const trackTitle = newBody.querySelector('.track-title')
    const trackDesc = newBody.querySelector('.track-desc')
    const musicLink = newBody.querySelector('.track-link.music')
    const trackLink = newBody.querySelector('.track-link.lyrics')
  
    trackCover.src = item.cover
    trackTitle.textContent = item.title
    trackDesc.innerHTML = item.desc
    musicLink.id = `music-link-${item.id}`
    trackLink.href = `./lyrics.html?id=${item.id}`

    return newBody.innerHTML
  }
}
