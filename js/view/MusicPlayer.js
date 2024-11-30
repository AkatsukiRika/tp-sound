import { LiveData } from "../utils/LiveData.js";
import { songList } from "../data/SongList.js";

const selectedSongId = new LiveData(-1)

const isPlaying = new LiveData(false)

export function initMusicPlayer() {
  document.querySelector('#music-player').innerHTML = getMusicPlayerHTML()
  document.querySelector('head').innerHTML += getMusicPlayerStyle()
  document.querySelector('#play-btn').addEventListener('click', () => {
    if (selectedSongId.getValue() !== -1) {
      isPlaying.setValue(!isPlaying.getValue())
    }
  })
  document.querySelector('#prev-btn').addEventListener('click', () => {
    if (selectedSongId.getValue() !== -1) {
      const prevSongId = selectedSongId.getValue() - 1
      if (prevSongId >= 0) {
        selectedSongId.setValue(prevSongId)
        isPlaying.setValue(true)
      }
    }
  })
  document.querySelector('#next-btn').addEventListener('click', () => {
    if (selectedSongId.getValue() !== -1) {
      const nextSongId = selectedSongId.getValue() + 1
      if (nextSongId < songList.length) {
        selectedSongId.setValue(nextSongId)
        isPlaying.setValue(true)
      }
    }
  })

  selectedSongId.observe(value => {
    if (value === -1) {
      document.querySelector('#track-title').innerHTML = 'Not Playing'
      document.querySelector('#track-desc').innerHTML = 'Please select a song'
    } else {
      document.querySelector('#track-title').innerHTML = songList[value].title
      document.querySelector('#track-desc').innerHTML = songList[value].desc.replace(/<br\s*\/?>/g, ' ')
    }
  })

  isPlaying.observe(value => {
    if (value) {
      document.querySelector('#play-btn').style.backgroundImage = 'url(./assets/drawable/icon_pause.svg)'
    } else {
      document.querySelector('#play-btn').style.backgroundImage = 'url(./assets/drawable/icon_play.svg)'
    }
  })
}

export function playSong(id) {
  selectedSongId.setValue(id)
  isPlaying.setValue(true)
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
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 300px;
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
        cursor: pointer;
      }

      #play-btn {
        width: 24px;
        height: 24px;
        background-image: url(./assets/drawable/icon_pause.svg);
        margin-right: 16px;
        cursor: pointer;
      }

      #next-btn {
        width: 24px;
        height: 24px;
        background-image: url(./assets/drawable/icon_next.svg);
        margin-right: 16px;
        cursor: pointer;
      }

      #volumn-btn {
        width: 24px;
        height: 24px;
        background-image: url(./assets/drawable/icon_volume.svg);
      }
    </style>
  `.trim()
}