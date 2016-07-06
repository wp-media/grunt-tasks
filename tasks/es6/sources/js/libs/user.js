import Voice from './voice'

export default class User extends Voice {

	constructor (name) {
		super()
		this.name = name
	}

	sayHello () {
		this.speak( `Hello ${this.name}!` )
	}

}