const songs = [
  {
    id: 0,
    title: '迷星叫',
    desc: '迷い星のうた'
  },
  {
    id: 1,
    title: '影色舞',
    desc: 'もうなにもかも 忘れて\n今宵は シルエットダンス'
  },
  {
    id: 2,
    title: '壱雫空',
    desc: '最初のひとしずくに 顔上げた今日の僕を'
  },
  {
    id: 3,
    title: '栞',
    desc: '“普通”とか“あたりまえ”ってなんだろう'
  },
  {
    id: 4,
    title: '春日影',
    desc: 'ねぇお願い どうかこのまま 離さないでいて'
  }
]

function generateTrackCards() {
  songs.forEach(song => {
    const card = getTrackCardInnerHTML(song)
    document.querySelector('.column').innerHTML += card
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
          <div class="track-link music">Music</div>
          <div class="divider">|</div>
          <div class="track-link">Instrumental</div>
          <div class="divider">|</div>
          <div class="track-link">Lyrics</div>
          <div class="divider">|</div>
        </div>
      </div>
    </div>
  `
}