/**
 * Created by maixing on 2017/5/22.
 */
let CryptoJS = require('crypto-js');
let u_key = 'ultrapower';
let u_iv = 'zhinengwang';
let crypConvert = {
    //加密
    u_encrypt: function (mesage) {
        let keyHex = CryptoJS.enc.Utf8.parse(u_key);
        let ivHex = CryptoJS.enc.Utf8.parse(u_iv);
        let encrypted = CryptoJS.DES.encrypt(mesage, keyHex, {
                iv: ivHex,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }
        );
        return encrypted.ciphertext.toString();
    },
    //解密
    u_decrypt: function (message) {
        var keyHex = CryptoJS.enc.Utf8.parse(u_key);
        var ivHex = CryptoJS.enc.Utf8.parse(u_iv);
        var decrypted = CryptoJS.DES.decrypt({
            ciphertext: CryptoJS.enc.Hex.parse(message)
        }, keyHex, {
            iv: ivHex,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
};
export default crypConvert;