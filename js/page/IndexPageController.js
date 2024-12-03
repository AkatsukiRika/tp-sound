import { BasePageController } from "../arch/BasePageController.js";
import { initMusicPlayer } from "../view/MusicPlayer.js";
import { initTrackCards } from "../view/TrackCards.js";
import { TYPE_ALL, TYPE_ORIGINAL, TYPE_COVER } from "../data/SongList.js";

class IndexPageController extends BasePageController {
  async onLoad() {
    this.activeTab = document.querySelector('.tab.active')
    this.tabIndicator = document.querySelector('.tab-indicator')
    this.allTracksTab = document.querySelector('#tab-all-tracks')
    this.originalTab = document.querySelector('#tab-original')
    this.coverTab = document.querySelector('#tab-cover')
    this.allTabs = document.querySelectorAll('.tab')

    await this._setActiveTab(TYPE_ALL)
    await initMusicPlayer()

    this.allTracksTab.addEventListener('click', async () => {
      await this._setActiveTab(TYPE_ALL)
    })
    this.originalTab.addEventListener('click', async () => {
      await this._setActiveTab(TYPE_ORIGINAL)
    })
    this.coverTab.addEventListener('click', async () => {
      await this._setActiveTab(TYPE_COVER)
    })
  }

  onResize() {
    const activeTabIndex = Array.from(this.allTabs).findIndex(tab => tab.classList.contains('active'))
    if (activeTabIndex !== -1) {
      this._updateIndicatorPosition(activeTabIndex)
    }
  }

  _updateIndicatorPosition(index) {
    if (!this.activeTab) {
      return
    }
    const tabWidth = this.activeTab.offsetWidth
    const translateX = (index - 1) * tabWidth
    this.tabIndicator.style.transform = `translateX(${translateX}px)`
  }

  async _setActiveTab(index) {
    // 移除所有active类
    this.allTabs.forEach(tab => {
      tab.classList.remove('active')
    })

    // 添加active类到选中的tab
    this._getTabWithIndex(index).classList.add('active')

    this._updateIndicatorPosition(index)

    await initTrackCards(index)
  }

  _getTabWithIndex(index) {
    return document.querySelector(`.tab:nth-child(${index + 1})`)
  }
}

new IndexPageController()
