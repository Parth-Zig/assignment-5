import CryptoJS from "crypto-js"

const secretKey = process.env.REACT_APP_SECRET_KEY ? process.env.REACT_APP_SECRET_KEY : '12345'

export const encrypt = ( plainText ) => {
    const cipherText = CryptoJS.AES.encrypt(plainText, secretKey).toString()
    return cipherText
}

export const decrypt = ( cipherText ) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey )
    const plainText = bytes.toString(CryptoJS.enc.Utf8)
    return plainText
}