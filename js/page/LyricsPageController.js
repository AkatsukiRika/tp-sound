import { BasePageController } from "../arch/BasePageController.js"
import { songList } from "../data/SongList.js"

class LyricsPageController extends BasePageController {
  onLoad() {
    const titleDiv = document.querySelector("#title")
    const contentDiv = document.querySelector("#content")
    const cancelImg = document.querySelector("#img-cancel")

    const song = songList.find(song => song.id === parseInt(window.location.search.split('=')[1]))
    titleDiv.textContent = song.title

    fetch(song.lyrics)
      .then(response => response.text())
      .then(html => {
        contentDiv.innerHTML = html
      })

    cancelImg.addEventListener('click', () => {
      window.close()
    })
  }
}

new LyricsPageController()
