export default class Voice {

	constructor () {
		if ( 'speechSynthesis' in window ) {
			
			this.synthesis      = new SpeechSynthesisUtterance()
			this.synthesis.lang = 'en-US'

		} else {

			this.synthesis = null

		}
	}
	
	speak (msg = '') {
		if ( this.synthesis !== null ) {

			this.synthesis.text = msg
			speechSynthesis.speak( this.synthesis )

		} else {

			alert( msg )

		}
	}

}