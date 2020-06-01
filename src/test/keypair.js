
var cryptoUtil = require('@polkadot/util-crypto');

/**
 * check address
 * @param {string} address - crab address
 * @param {number} ss58 - ss58 number, crab = 42
 * @return {*} [boolean, string | null]
 */
var checkResult = cryptoUtil.checkAddress('5Gn9u2C1AkMfWEPp7QH8qDBHwHVtgfLM4SQ3RVx3TTFVMrVH', 41);

console.log('-----check crab address----- \n', checkResult);

// buffer is an ArrayBuffer
function buf2hex(buffer) { 
  return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}

cryptoUtil.cryptoWaitReady().then(() => {
  /**
   * generate mnemonic
   * @param {number} numWords - word count ,default = 12
   * @return {*} string
   */
  var mnemonic = cryptoUtil.mnemonicGenerate();
  var seed = cryptoUtil.mnemonicToMiniSecret(mnemonic);
  console.log(seed.buffer);
  console.log('-----seed hex----- \n', buf2hex(seed.buffer))

  /**
   * Creates a new public/secret keypair from a seed
   * @param {Uint8Array} seed - seed
   * @return {*} a object containing a `publicKey` & `secretKey` generated from the supplied seed.
   * { secretKey: [...], publicKey: [...] }
   */
  var keyPair = cryptoUtil.schnorrkelKeypairFromSeed(seed);
  
  // https://github.com/paritytech/substrate/blob/master/primitives/core/src/crypto.rs#L437
  // crab = 42, darwinia = 18
  var ss58Format = 42;
  var address = cryptoUtil.encodeAddress(keyPair.publicKey, ss58Format);
  console.log('-----mnemonic----- \n', mnemonic, seed, keyPair, address)
})
