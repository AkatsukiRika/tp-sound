import { songList } from "../data/SongList.js";
import { playSong } from "./MusicPlayer.js";

export function initTrackCards(type) {
  const column = document.querySelector('#track-cards')
  column.innerHTML = ''

  let songs = songList
  if (type !== 0) {
    songs = songs.filter(song => song.type === type)
  }

  songs.forEach(song => {
    const cardDiv = document.createElement('div')
    cardDiv.innerHTML = getTrackCardInnerHTML(song)
    column.appendChild(cardDiv.firstElementChild)

    document.querySelector(`#music-link-${song.id}`).addEventListener('click', () => {
      playSong(song.id)
    })

    document.querySelector(`#track-cover-${song.id}`).style.backgroundImage = `url(${song.cover})`
  })

  document.head.innerHTML += getTrackCardStyle()
}

function getTrackCardInnerHTML(song) {
  return `
    <div class="track-card">
      <div class="track-cover" id="track-cover-${song.id}"></div>
      <div class="track-info">
        <div class="track-title">${song.title}</div>
        <div class="track-desc">
          ${song.desc}
        </div>
        <div class="row">
          <div class="divider">|</div>
          <div class="track-link music" id="music-link-${song.id}">Music</div>
          <div class="divider">|</div>
          <div class="track-link">Instrumental</div>
          <div class="divider">|</div>
          <a class="track-link" href="./lyrics.html?id=${song.id}" target="_blank">Lyrics</a>
          <div class="divider">|</div>
        </div>
      </div>
    </div>
  `
}

function getTrackCardStyle() {
  return `
    <style id="track-card-style">
      .track-card {
        background-color: #010101;
        width: 100%;
        height: 120px;
        margin-bottom: 18px;
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      .track-cover {
        width: 90px;
        height: 90px;
        background-image: url(./res/drawable/img_cover.webp);
        background-size: cover;
        margin-left: 12px;
      }

      .track-info {
        display: flex;
        flex-direction: column;
        margin-left: 12px;
        max-width: calc(100% - 114px);
        overflow: hidden;
      }

      .track-info .track-title {
        color: #fff;
        font-size: 15px;
      }

      .track-info .track-desc {
        color: #fff;
        font-size: 13px;
        opacity: 0.5;
        margin-top: 4px;
        margin-right: 12px;
      }

      .track-link {
        color: #fff;
        font-size: 13px;
        text-decoration: underline;
        cursor: pointer;
      }

      .track-link.music {
        font-weight: bold;
      }
    </style>
  `
}