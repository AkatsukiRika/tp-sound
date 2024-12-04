import { BaseAdapter } from "../arch/BaseAdapter.js"

export class TrackCardAdapter extends BaseAdapter {
  constructor() {
    super(
      document.querySelector('head'),
      document.querySelector('#track-cards'),
      './res/layout/item_track_card.html'
    )
  }

  async onBindItem(item) {
    super.onBindItem(item)

    const trackCover = this.body.querySelector('.track-cover')
    const trackTitle = this.body.querySelector('.track-title')
    const trackDesc = this.body.querySelector('.track-desc')
    const musicLink = this.body.querySelector('.track-link.music')
    const trackLink = this.body.querySelector('.track-link.lyrics')
  
    trackCover.id = `track-cover-${item.id}`
    trackTitle.textContent = item.title
    trackDesc.innerHTML = item.desc
    musicLink.id = `music-link-${item.id}`
    trackLink.href = `./lyrics.html?id=${item.id}`
  }
}
