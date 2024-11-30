import { LiveData } from "../utils/LiveData.js";
import { formatTime } from "../utils/TimeUtil.js";
import { songList } from "../data/SongList.js";

// LiveData
const selectedSongId = new LiveData(-1)
const isPlaying = new LiveData(false)

// 全局DOM
const head = document.querySelector('head')
const musicPlayer = document.querySelector('#music-player')

// 局部DOM
let playBtn
let prevBtn
let nextBtn
let audioPlayer
let totalTime
let currentTime
let progressFill
let trackTitle
let trackDesc

export function initMusicPlayer() {
  musicPlayer.innerHTML = getMusicPlayerHTML()
  head.innerHTML += getMusicPlayerStyle()

  initView()

  playBtn.addEventListener('click', () => {
    if (selectedSongId.getValue() !== -1) {
      isPlaying.setValue(!isPlaying.getValue())
    }
  })
  prevBtn.addEventListener('click', () => {
    if (selectedSongId.getValue() !== -1) {
      const prevSongId = selectedSongId.getValue() - 1
      if (prevSongId >= 0) {
        selectedSongId.setValue(prevSongId)
        isPlaying.setValue(true)
      }
    }
  })
  nextBtn.addEventListener('click', () => {
    if (selectedSongId.getValue() !== -1) {
      const nextSongId = selectedSongId.getValue() + 1
      if (nextSongId < songList.length) {
        selectedSongId.setValue(nextSongId)
        isPlaying.setValue(true)
      }
    }
  })
  audioPlayer.addEventListener('canplaythrough', () => {
    totalTime.innerHTML = formatTime(audioPlayer.duration)
  })
  audioPlayer.addEventListener('timeupdate', () => {
    currentTime.innerHTML = formatTime(audioPlayer.currentTime)

    // 添加进度条更新
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100
    progressFill.style.width = `${progress}%`
  })

  selectedSongId.observe(value => {
    if (value === -1) {
      trackTitle.innerHTML = 'Not Playing'
      trackDesc.innerHTML = 'Please select a song'
    } else {
      trackTitle.innerHTML = songList[value].title
      trackDesc.innerHTML = songList[value].desc.replace(/<br\s*\/?>/g, ' ')
      audioPlayer.src = songList[value].track
    }
  })

  isPlaying.observe(value => {
    if (value) {
      playBtn.style.backgroundImage = 'url(./assets/drawable/icon_pause.svg)'
      audioPlayer.play()
    } else {
      playBtn.style.backgroundImage = 'url(./assets/drawable/icon_play.svg)'
      audioPlayer.pause()
    }
  })
}

export function playSong(id) {
  selectedSongId.setValue(id)
  isPlaying.setValue(true)
}

function initView() {
  playBtn = document.querySelector('#play-btn')
  prevBtn = document.querySelector('#prev-btn')
  nextBtn = document.querySelector('#next-btn')
  audioPlayer = document.querySelector('#audio-player')
  totalTime = document.querySelector('#total-time')
  currentTime = document.querySelector('#current-time')
  progressFill = document.querySelector('#progress-fill')
  trackTitle = document.querySelector('#track-title')
  trackDesc = document.querySelector('#track-desc')
}

function getMusicPlayerHTML() {
  return `
    <div id="track-title">Track Title</div>
    <div id="track-desc">Track Description</div>

    <div class="progress">
      <div id="current-time">02:16</div>
      <div id="progress-bar">
        <div id="progress-fill"></div>
      </div>
      <div id="total-time">04:33</div>
    </div>

    <div class="controls">
      <div id="repeat-btn"></div>
      <div id="prev-btn"></div>
      <div id="play-btn"></div>
      <div id="next-btn"></div>
      <div id="volumn-btn"></div>
    </div>

    <audio id="audio-player">
      <source src="./assets/raw/track_0.ogg" type="audio/ogg">
    </audio>
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
        position: relative;
      }

      #progress-fill {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 0%;
        background-color: #fff;
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
        margin-right: 32px;
        display: none;
      }

      #prev-btn {
        width: 24px;
        height: 24px;
        background-image: url(./assets/drawable/icon_previous.svg);
        margin-right: 32px;
        cursor: pointer;
      }

      #play-btn {
        width: 24px;
        height: 24px;
        background-image: url(./assets/drawable/icon_pause.svg);
        margin-right: 32px;
        cursor: pointer;
      }

      #next-btn {
        width: 24px;
        height: 24px;
        background-image: url(./assets/drawable/icon_next.svg);
        cursor: pointer;
      }

      #volumn-btn {
        width: 24px;
        height: 24px;
        background-image: url(./assets/drawable/icon_volume.svg);
        display: none;
      }
    </style>
  `.trim()
}