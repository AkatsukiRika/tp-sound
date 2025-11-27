import { LiveData } from "../utils/LiveData.js"
import { formatTime } from "../utils/TimeUtil.js"
import { songList } from "../data/SongList.js"
import { BaseViewController } from "../arch/BaseViewController.js"

export class MusicPlayerViewController extends BaseViewController {
  constructor() {
    super(
      document.querySelector("head"),
      document.querySelector("#music-player"),
      "./res/layout/layout_music_player.html"
    )
  }

  async onInit() {
    await super.onInit()

    this._initView()
    this._initLiveData()

    this.playBtn.addEventListener('click', () => {
      if (this.selectedSongId.getValue() !== -1) {
        this.isPlaying.setValue(!this.isPlaying.getValue())
      }
    })

    this.prevBtn.addEventListener('click', () => {
      if (this.selectedSongId.getValue() !== -1) {
        const currentIndex = songList.findIndex(item => item.id === this.selectedSongId.getValue())
        const prevIndex = currentIndex - 1
        if (prevIndex >= 0) {
          this.selectedSongId.setValue(songList[prevIndex].id)
          this.isPlaying.setValue(true)
        }
      }
    })

    this.nextBtn.addEventListener('click', () => {
      if (this.selectedSongId.getValue() !== -1) {
        const currentIndex = songList.findIndex(item => item.id === this.selectedSongId.getValue())
        const nextIndex = currentIndex + 1
        if (nextIndex < songList.length) {
          this.selectedSongId.setValue(songList[nextIndex].id)
          this.isPlaying.setValue(true)
        }
      }
    })

    this.audioPlayer.addEventListener('canplaythrough', () => {
      this.totalTime.innerHTML = formatTime(this.audioPlayer.duration)
    })

    this.audioPlayer.addEventListener('timeupdate', () => {
      this.currentTime.innerHTML = formatTime(this.audioPlayer.currentTime)

      // 添加进度条更新
      const progress = (this.audioPlayer.currentTime / this.audioPlayer.duration) * 100
      this.progressFill.style.width = `${progress}%`
    })

    this.selectedSongId.observe(value => {
      if (value === -1) {
        this.trackTitle.innerHTML = 'Not Playing'
        this.trackDesc.innerHTML = 'Please select a song'
      } else {
        const song = songList.find(item => item.id === value)
        if (!song) {
          this.trackTitle.innerHTML = 'Not Playing'
          this.trackDesc.innerHTML = 'Please select a song'
          this.audioPlayer.removeAttribute('src')
          return
        }
        this.trackTitle.innerHTML = song.title
        this.trackDesc.innerHTML = song.desc.replace(/<br\s*\/?>/g, ' ')
        this.audioPlayer.src = song.track
      }
    })

    this.isPlaying.observe(value => {
      if (value) {
        this.playBtn.style.backgroundImage = 'url(./res/drawable/icon_pause.svg)'
        this.audioPlayer.play()
      } else {
        this.playBtn.style.backgroundImage = 'url(./res/drawable/icon_play.svg)'
        this.audioPlayer.pause()
      }
    })
  }

  playSong(id) {
    this.selectedSongId.setValue(id)
    this.isPlaying.setValue(true)
  }

  _initView() {
    this.playBtn = document.querySelector('#play-btn')
    this.prevBtn = document.querySelector('#prev-btn')
    this.nextBtn = document.querySelector('#next-btn')
    this.audioPlayer = document.querySelector('#audio-player')
    this.totalTime = document.querySelector('#total-time')
    this.currentTime = document.querySelector('#current-time')
    this.progressFill = document.querySelector('#progress-fill')
    this.trackTitle = document.querySelector('#track-title')
    this.trackDesc = document.querySelector('#track-desc')
  }

  _initLiveData() {
    this.selectedSongId = new LiveData(-1)
    this.isPlaying = new LiveData(false)
  }
}
