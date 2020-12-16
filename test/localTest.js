const {
	randomBytes
} = require('crypto')
const { secp256k1 } = require('@nlv8/signun')

// generate message to sign
const msg = randomBytes(32)

// generate privKey
let privKey
do {
	privKey = randomBytes(32)
} while (!secp256k1.privateKeyVerifySync(privKey))

// get the public key in a compressed format
const pubKey = secp256k1.publicKeyCreateSync(privKey)

// sign the message
const sigObj = secp256k1.signSync(msg, privKey)

// verify the signature
console.log(secp256k1.verifySync(msg, sigObj.signature, pubKey))
// => true
