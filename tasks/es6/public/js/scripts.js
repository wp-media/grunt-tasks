(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _voice = require('./voice');

var _voice2 = _interopRequireDefault(_voice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var User = function (_Voice) {
	_inherits(User, _Voice);

	function User(name) {
		_classCallCheck(this, User);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(User).call(this));

		_this.name = name;
		return _this;
	}

	_createClass(User, [{
		key: 'sayHello',
		value: function sayHello() {
			this.speak('Hello ' + this.name + '!');
		}
	}]);

	return User;
}(_voice2.default);

exports.default = User;

},{"./voice":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Voice = function () {
	function Voice() {
		_classCallCheck(this, Voice);

		if ('speechSynthesis' in window) {

			this.synthesis = new SpeechSynthesisUtterance();
			this.synthesis.lang = 'en-US';
		} else {

			this.synthesis = null;
		}
	}

	_createClass(Voice, [{
		key: 'speak',
		value: function speak() {
			var msg = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

			if (this.synthesis !== null) {

				this.synthesis.text = msg;
				speechSynthesis.speak(this.synthesis);
			} else {

				alert(msg);
			}
		}
	}]);

	return Voice;
}();

exports.default = Voice;

},{}],3:[function(require,module,exports){
'use strict';

var _user = require('./libs/user');

var _user2 = _interopRequireDefault(_user);

var _voice = require('./libs/voice');

var _voice2 = _interopRequireDefault(_voice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var me = new _user2.default('Sebastien');

me.sayHello();

},{"./libs/user":1,"./libs/voice":2}]},{},[3]);
