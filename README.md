[Harcon-ecdsa-warper](https://github.com/imrefazekas/harcon-ecdsa-warper) is a Warper entity for [harcon](https://github.com/imrefazekas/harcon)-based microservices architectures allowing one to provide a strong inter-service security layer.


## Quick setup

```javascript
$ npm install harcon-ecdsa-warper
```

add add it to your harcon configuration:

```javascript
let message = '' // a 32 char length word, maybe by clerobee or crypto.randomBytes
let harcon = new Harcon( {
	...
	barrel: { Warper: Warper, warper: { message: Buffer.from( message, 'utf8' ).toString('hex') } },
	...
} )
```

That will inject the [Harcon-ecdsa-warper](https://github.com/imrefazekas/harcon-ecdsa-warper) entity into the [harcon](https://github.com/imrefazekas/harcon) to sign all outgoing messages and validate all incoming ones using the strong [ECDSA](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm) algorithm.

Such security measurement is desired in a distributed environment facilitated by a proper transport layer ("Barrel") solution, like [harcon-amqp](https://github.com/imrefazekas/harcon-amqp).
