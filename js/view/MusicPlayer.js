import { LiveData } from "../utils/LiveData.js";
import { formatTime } from "../utils/TimeUtil.js";
import { songList } from "../data/SongList.js";
import { fetchBodyFromFile, fetchStyleFromFile } from "../utils/FetchUtil.js";

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

export async function initMusicPlayer() {
  musicPlayer.innerHTML = await fetchBodyFromFile('./res/layout/layout_music_player.html')
  head.innerHTML += await fetchStyleFromFile('./res/layout/layout_music_player.html')

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
      playBtn.style.backgroundImage = 'url(./res/drawable/icon_pause.svg)'
      audioPlayer.play()
    } else {
      playBtn.style.backgroundImage = 'url(./res/drawable/icon_play.svg)'
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