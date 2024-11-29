import { LiveData } from "./utils/LiveData.js";

const trackTitle = new LiveData('Not Playing')

const trackDesc = new LiveData('Please select a song')

export function initMusicPlayerObservers() {
  trackTitle.observe(value => {
    document.querySelector('#track-title').innerHTML = value
  })

  trackDesc.observe(value => {
    document.querySelector('#track-desc').innerHTML = value
  })
}

export function getMusicPlayerHTML() {
  return `
    <div id="track-title">Track Title</div>
    <div id="track-desc">Track Description</div>

    <div class="progress">
      <div id="current-time">02:16</div>
      <div id="progress-bar"></div>
      <div id="total-time">04:33</div>
    </div>

    <div class="controls">
      <div id="repeat-btn"></div>
      <div id="prev-btn"></div>
      <div id="play-btn"></div>
      <div id="next-btn"></div>
      <div id="volumn-btn"></div>
    </div>
  `.trim()
}