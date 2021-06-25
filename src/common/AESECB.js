import CryptoJS from "crypto-js";

export default {
    // 加密
    Encrypt(word, keyStr) {
        keyStr = keyStr ? keyStr : "A8AFC887B2AB51A8";
        let key = CryptoJS.enc.Utf8.parse(keyStr);
        let srcs = CryptoJS.enc.Utf8.parse(word);
        let encrypted = CryptoJS.AES.encrypt(srcs, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
    },
    // 解密
    Decrypt(word, keyStr) {
        keyStr = keyStr ? keyStr : "A8AFC887B2AB51A8";
        var key = CryptoJS.enc.Utf8.parse(keyStr);
        var decrypt = CryptoJS.AES.decrypt(word, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    }
};
