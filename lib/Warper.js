const { randomBytes } = require('crypto')
const { secp256k1 } = require('@nlv8/signun')

let SEPARATOR = '.'

function Warper ( division, connectedDivisions, options ) {
	this.division = division
	this.connectedDivisions = connectedDivisions || []

	this.message = Buffer.from( options.message, 'hex' )
}

let warper = Warper.prototype

warper.init = async function () {
	let privKey
	do {
		privKey = randomBytes(32)
	} while ( !(await secp256k1.privateKeyVerify(privKey)) )

	this.privKey = privKey
	this.pubKey = await secp256k1.publicKeyCreate(privKey)
	this.pubKeyHex = this.pubKey.toString('hex')
	this.sigObj = await secp256k1.sign( this.message, this.privKey )
	this.signatureHex = this.sigObj.signature.toString('hex')
}


warper.inpose = function ( exposed ) {
	return Buffer.from( exposed, 'hex' )
}

warper.expose = function ( ) {
	return this.pubKeyHex
}

warper.conform = function ( comm ) {
	comm.signature = this.signatureHex
}

warper.referenceMatrix = function ( matrix ) {
	this.matrix = matrix
}

warper.allow = async function ( comm ) {
	if ( this.barrel.isSystemEvent( comm.event ) )
		return true

	let entityName = comm.event.substring(0, comm.event.lastIndexOf( SEPARATOR ) )
	try {
		let nodeID = comm.responderNodeID || comm.sourceNodeID
		let matrix = this.matrix[ comm.division ][ entityName ] ? this.matrix[ comm.division ][ entityName ][ nodeID ] : this.matrix[ comm.division ][ '*' ]
		return secp256k1.verify( this.message, Buffer.from(comm.signature, 'hex'), matrix.warper )
	} catch (err) {
		console.error( err, comm )
		return false
	}
}

module.exports = Warper
