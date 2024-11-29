import { LiveData } from "../utils/LiveData.js";

const trackTitle = new LiveData('Not Playing')

const trackDesc = new LiveData('Please select a song')

export function initMusicPlayer() {
  document.querySelector('#music-player').innerHTML = getMusicPlayerHTML()
  document.querySelector('head').innerHTML += getMusicPlayerStyle()

  trackTitle.observe(value => {
    document.querySelector('#track-title').innerHTML = value
  })

  trackDesc.observe(value => {
    document.querySelector('#track-desc').innerHTML = value
  })
}

function getMusicPlayerHTML() {
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

function getMusicPlayerStyle() {
  return `
    <style id="music-player-style">
      .music-player {
        width: 340px;
        background-color: #292259;
        border-radius: 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 32px;
      }

      #track-title {
        color: #fff;
        font-size: 20px;
        margin-top: 12px;
      }

      #track-desc {
        color: #fff;
        font-size: 16px;
        margin-top: 4px;
        opacity: 0.5;
      }

      .progress {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 12px;
      }

      #progress-bar {
        width: 210px;
        height: 7px;
        background-color: rgba(255, 255, 255, 0.5);
      }

      #current-time {
        color: #fff;
        font-size: 16px;
        margin-right: 4px;
      }

      #total-time {
        color: #fff;
        font-size: 16px;
        margin-left: 4px;
      }

      .controls {
        display: flex;
        flex-direction: row;
        margin-top: 12px;
        margin-bottom: 16px;
      }

      #repeat-btn {
        width: 24px;
        height: 24px;
        background-image: url(./assets/drawable/icon_repeat.svg);
        margin-right: 16px;
      }

      #prev-btn {
        width: 24px;
        height: 24px;
        background-image: url(./assets/drawable/icon_previous.svg);
        margin-right: 16px;
      }

      #play-btn {
        width: 24px;
        height: 24px;
        background-image: url(./assets/drawable/icon_pause.svg);
        margin-right: 16px;
      }

      #next-btn {
        width: 24px;
        height: 24px;
        background-image: url(./assets/drawable/icon_next.svg);
        margin-right: 16px;
      }

      #volumn-btn {
        width: 24px;
        height: 24px;
        background-image: url(./assets/drawable/icon_volume.svg);
      }
    </style>
  `.trim()
}