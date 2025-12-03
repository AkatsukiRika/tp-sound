import { BaseMultiAdapter } from "../arch/BaseMultiAdapter.js"
import { ADAPTER_TYPE_YEAR_DIVIDER, ADAPTER_TYPE_TRACK_CARD } from "../data/SongList.js"

export class TrackCardAdapter extends BaseMultiAdapter {
  /**
   * @param {Function} onItemClick 
   */
  constructor(onItemClick) {
    super(
      [ADAPTER_TYPE_YEAR_DIVIDER, ADAPTER_TYPE_TRACK_CARD],
      document.querySelector('head'),
      document.querySelector('#track-cards'),
      ['./res/layout/item_year_divider.html', './res/layout/item_track_card.html']
    )
    this.onItemClick = onItemClick
  }

  async onCreateItems(items) {
    await super.onCreateItems(items)
    items.forEach(item => {
      if (item.adapterType == ADAPTER_TYPE_TRACK_CARD) {
        const musicLink = document.querySelector(`#music-link-${item.id}`)
        musicLink.addEventListener('click', () => this.onItemClick(item))
      }
    })
  }

  async onBindItem(item) {
    await super.onBindItem(item)

    const newBody = this.body.cloneNode(true)
    if (item.adapterType == ADAPTER_TYPE_TRACK_CARD) {
      const trackCover = newBody.querySelector('.track-cover')
      const trackTitle = newBody.querySelector('.track-title')
      const trackDesc = newBody.querySelector('.track-desc')
      const musicLink = newBody.querySelector('.track-link.music')
      const downloadLink = newBody.querySelector('.track-link.download')
      const trackLink = newBody.querySelector('.track-link.lyrics')
    
      trackCover.src = item.cover
      trackTitle.textContent = item.title
      trackDesc.innerHTML = item.desc
      musicLink.id = `music-link-${item.id}`
      downloadLink.href = item.track
      trackLink.href = `./lyrics.html?id=${item.id}`
    } else if (item.adapterType == ADAPTER_TYPE_YEAR_DIVIDER) {
      const yearText = newBody.querySelector('.year-text')
      yearText.innerHTML = item.year
    }

    return newBody.innerHTML
  }
}
