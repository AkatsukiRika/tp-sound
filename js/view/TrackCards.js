import { songList } from "../data/SongList.js";
import { playSong } from "./MusicPlayer.js";
import { fetchBodyFromFile, fetchStyleFromFile } from "../utils/FetchUtil.js";

export async function initTrackCards(type) {
  const column = document.querySelector('#track-cards')
  column.innerHTML = ''

  let songs = songList
  if (type !== 0) {
    songs = songs.filter(song => song.type === type)
  }

  songs.forEach(async song => {
    const cardDiv = document.createElement('div')
    cardDiv.innerHTML = await getTrackCardInnerHTML(song)
    column.appendChild(cardDiv.firstElementChild)

    document.querySelector(`#music-link-${song.id}`).addEventListener('click', () => {
      playSong(song.id)
    })

    document.querySelector(`#track-cover-${song.id}`).src = song.cover
  })

  document.head.innerHTML += await fetchStyleFromFile('./res/layout/item_track_card.html')
}

async function getTrackCardInnerHTML(song) {
  const body = await fetchBodyFromFile('./res/layout/item_track_card.html')

  const trackCover = body.querySelector('.track-cover')
  const trackTitle = body.querySelector('.track-title')
  const trackDesc = body.querySelector('.track-desc')
  const musicLink = body.querySelector('.track-link.music')
  const trackLink = body.querySelector('.track-link.lyrics')

  trackCover.id = `track-cover-${song.id}`
  trackTitle.textContent = song.title
  trackDesc.innerHTML = song.desc
  musicLink.id = `music-link-${song.id}`
  trackLink.href = `./lyrics.html?id=${song.id}`

  return body.innerHTML
}