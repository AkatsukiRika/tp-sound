import { BasePageController } from "../arch/BasePageController.js";
import { MusicPlayerViewController } from "../view/MusicPlayerViewController.js";
import { TrackCardAdapter } from "../view/TrackCardAdapter.js";
import { TYPE_ALL, TYPE_ORIGINAL, TYPE_REMIX, TYPE_COVER, TYPE_SECRET, songList, ADAPTER_TYPE_YEAR_DIVIDER } from "../data/SongList.js";
import { secretList } from "../data/SecretList.js";

class IndexPageController extends BasePageController {
  async onLoad() {
    this.activeTab = document.querySelector('.tab.active')
    this.tabIndicator = document.querySelector('.tab-indicator')
    this.allTracksTab = document.querySelector('#tab-all-tracks')
    this.originalTab = document.querySelector('#tab-original')
    this.remixTab = document.querySelector('#tab-remix')
    this.coverTab = document.querySelector('#tab-cover')
    this.secretTab = document.querySelector('#tab-secret')
    this.allTabs = document.querySelectorAll('.tab')
    this.musicPlayer = new MusicPlayerViewController()
    this.trackCardAdapter = new TrackCardAdapter((item) => {
      this.musicPlayer.playSong(item.id)
    })

    await this._setActiveTab(TYPE_ALL)
    await this.musicPlayer.onInit()

    this.allTracksTab.addEventListener('click', async () => {
      await this._setActiveTab(TYPE_ALL)
    })
    this.originalTab.addEventListener('click', async () => {
      await this._setActiveTab(TYPE_ORIGINAL)
    })
    this.remixTab.addEventListener('click', async () => {
      await this._setActiveTab(TYPE_REMIX)
    })
    this.coverTab.addEventListener('click', async () => {
      await this._setActiveTab(TYPE_COVER)
    })
    this.secretTab.addEventListener('click', async () => {
      await this._setActiveTab(TYPE_SECRET)
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
    const translateX = index * 100
    this.tabIndicator.style.transform = `translateX(${translateX}%)`
  }

  async _setActiveTab(index) {
    // 移除所有active类
    this.allTabs.forEach(tab => {
      tab.classList.remove('active')
    })

    // 添加active类到选中的tab
    this._getTabWithIndex(index).classList.add('active')

    this._updateIndicatorPosition(index)

    if (index === TYPE_ALL) {
      await this.trackCardAdapter.onCreateItems(songList)
    } else if (index === TYPE_SECRET) {
      await this.trackCardAdapter.onCreateItems(secretList)
    } else {
      await this.trackCardAdapter.onCreateItems(songList.filter(item => item.adapterType === ADAPTER_TYPE_YEAR_DIVIDER || item.type === index))
    }
  }

  _getTabWithIndex(index) {
    return document.querySelector(`.tab:nth-child(${index + 1})`)
  }
}

new IndexPageController()
