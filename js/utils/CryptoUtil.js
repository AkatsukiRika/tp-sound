export class CryptoUtil {
  static async deriveKey(password, salt) {
    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );
    return window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 100000,
        hash: "SHA-256"
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
  }

  static async encrypt(text, password) {
    const salt = window.crypto.getRandomValues(new Uint8Array(16));
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const key = await this.deriveKey(password, salt);
    const enc = new TextEncoder();

    const encrypted = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv
      },
      key,
      enc.encode(text)
    );

    return {
      salt: Array.from(salt),
      iv: Array.from(iv),
      ciphertext: Array.from(new Uint8Array(encrypted))
    };
  }

  static async decrypt(encryptedData, password) {
    const salt = new Uint8Array(encryptedData.salt);
    const iv = new Uint8Array(encryptedData.iv);
    const ciphertext = new Uint8Array(encryptedData.ciphertext);

    const key = await this.deriveKey(password, salt);

    try {
      const decrypted = await window.crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv: iv
        },
        key,
        ciphertext
      );

      const dec = new TextDecoder();
      return dec.decode(decrypted);
    } catch (e) {
      throw new Error("Decryption failed");
    }
  }
}
