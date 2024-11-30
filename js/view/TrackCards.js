import { songList } from "../data/SongList.js";
import { playSong } from "./MusicPlayer.js";

export function initTrackCards() {
  const column = document.querySelector('.column')
  
  songList.forEach(song => {
    const cardDiv = document.createElement('div')
    cardDiv.innerHTML = getTrackCardInnerHTML(song)
    column.appendChild(cardDiv.firstElementChild)

    document.querySelector(`#music-link-${song.id}`).addEventListener('click', () => {
      playSong(song.id)
    })
  })
}

function getTrackCardInnerHTML(song) {
  return `
    <div class="track-card">
      <div class="track-cover"></div>
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