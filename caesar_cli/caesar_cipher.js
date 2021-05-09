class CaesarCipher {
  abLength = 26;
  #encodeMap = {};
  #decodeMap = {};

  constructor(shift) {
    this.alphabet = Array.from({length: this.abLength}, (_, i) => String.fromCharCode('a'.charCodeAt() + i));
    this.setShift(shift);
  }

  #getShifterChar(idx) {
    return this.alphabet[(idx + this._shift) % this.abLength];
  }

  #makeEncodeMaps() {
    this.alphabet.forEach((char, i) => {
      let shifted = this.#getShifterChar(i);

      this.#encodeMap[char] = shifted;
      this.#encodeMap[char.toUpperCase()] = shifted.toUpperCase();

      this.#decodeMap[shifted] = char;
      this.#decodeMap[shifted.toUpperCase()] = char.toUpperCase();
    });
  }

  setShift(val = 0) {
    this._shift = (+val < 0) ? this.abLength + +val : +val;
    this.#makeEncodeMaps();

    return this;
  }

  encode(str) {
    return str.split('').map((char) => {
      return this.#encodeMap[char] ? this.#encodeMap[char] : char;
    }).join('');
  }

  decode(str) {
    return str.split('').map((char) => {
      return this.#decodeMap[char] ? this.#decodeMap[char] : char;
    }).join('');
  }
}

module.exports = new CaesarCipher();