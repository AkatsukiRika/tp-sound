import { BasePageController } from "../arch/BasePageController.js";
import { CryptoUtil } from "../utils/CryptoUtil.js";
import { secretList } from "../data/SecretList.js";

class SecretLyricsPageController extends BasePageController {
  async onLoad() {
    this.container = document.querySelector('.container')
    this.decryptSection = document.getElementById('decrypt-section')
    this.lyricsSection = document.getElementById('lyrics-section')
    this.lyricsContent = document.getElementById('lyrics-content')
    this.passwordInput = document.getElementById('password-input')
    this.decryptBtn = document.getElementById('decrypt-btn')
    this.errorMsg = document.getElementById('error-msg')

    // Parse URL param
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));

    const item = secretList.find(i => i.id === id);
    if (!item) {
      document.querySelector('.title').textContent = "Not Found";
      this.decryptSection.style.display = 'none';
      return;
    }

    document.querySelector('.title').textContent = item.title;
    document.querySelector('.subtitle').textContent = item.desc;

    this.encryptedData = null;

    // Load encrypted file
    try {
      const response = await fetch(item.lyrics);
      this.encryptedData = await response.json();
    } catch (e) {
      console.error(e);
      this.errorMsg.textContent = "Failed to load encrypted data.";
    }

    this.decryptBtn.addEventListener('click', () => this.onDecrypt());
    this.passwordInput.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        this.onDecrypt();
      }
    });
  }

  async onDecrypt() {
    if (!this.encryptedData) return;

    const password = this.passwordInput.value;
    this.errorMsg.textContent = "";

    try {
      const plainText = await CryptoUtil.decrypt(this.encryptedData, password);
      this.showLyrics(plainText);
    } catch (e) {
      this.errorMsg.textContent = "Incorrect password or decryption failed";
      this.passwordInput.classList.add('shake');
      setTimeout(() => this.passwordInput.classList.remove('shake'), 500);
    }
  }

  showLyrics(html) {
    this.decryptSection.style.display = 'none';
    this.lyricsSection.style.display = 'block';
    this.lyricsContent.innerHTML = html;
  }
}

new SecretLyricsPageController();
