import { songList } from "../data/SongList.js";

export function initTrackCards() {
  const column = document.querySelector('.column')
  
  songList.forEach(song => {
    const cardDiv = document.createElement('div')
    cardDiv.innerHTML = getTrackCardInnerHTML(song)
    column.appendChild(cardDiv.firstElementChild)
    
    document.querySelector(`#lyrics-link-${song.id}`).addEventListener('click', () => {
      openLyricsPage(song.id)
    })
  })
}

function openLyricsPage(id) {
  window.location.href = `./lyrics.html?id=${id}`
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
          <div class="track-link music">Music</div>
          <div class="divider">|</div>
          <div class="track-link">Instrumental</div>
          <div class="divider">|</div>
          <div class="track-link" id="lyrics-link-${song.id}">Lyrics</div>
          <div class="divider">|</div>
        </div>
      </div>
    </div>
  `
}