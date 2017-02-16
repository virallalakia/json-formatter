var viralJsUtils = viralJsUtils || {};

(function($V) {
	// utils
	$V['type'] = function(obj) {
		if (typeof (obj) === "undefined") {
			return ("undefined");
		}
		return (Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase());
	};
	$V['trim'] = function(str) {
		return (str.trim());
	};
	$V['indexOf'] = function(item, array) {
		return (array.indexOf(item));
	};
	$V['isArray'] = function(item, array) {
		return (Array.isArray(arr));
	};
	$V['map'] = function(array, fn) {
		array.map(fn);
	};
	$V['parseJSON'] = function(str) {
		return (JSON.parse(str));
	};
	$V['stringifyJSON'] = function(obj, replacer, space) {
		return (JSON.stringify(obj, replacer, space));
	};
	$V['extend'] = function(p1, p2) {
		var deepExtend = false;
		var outObj = {};
		var startArgNo = 1;
		if($V.type(p1) === 'boolean') {
			deepExtend = p1;
			outObj = p2 || outObj;
			startArgNo = 2;
		} else {
			deepExtend = false;
			outObj = p1 || outObj;
			startArgNo = 1;
		}
		for (var i = startArgNo; i < arguments.length; i++) {
			var obj = arguments[i];
			if (!obj || $V.type(obj) !== 'object') {
				continue;
			}
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					if (deepExtend && $V.type(obj[key]) === 'object') {
						outObj[key] = $V.extend(true, outObj[key], obj[key]);
					} else {
						outObj[key] = obj[key];
					}
				}
			}
		}
		return outObj;
	};

	// iterators
	$V['forEachElement'] = function(selector, fn) {
		var $elements = document.querySelectorAll(selector);
		for (var i = 0; i < $elements.length; i++) {
			fn($elements[i], i);
		}
	};
	$V['forEach'] = function(array, fn) {
		array.forEach(fn);
	};

	// DOM related
	$V['select'] = function(selector) {
		return (document.querySelectorAll(selector));
	};
	$V['find'] = function($el, selector) {
		return ($el.querySelectorAll(selector));
	};
	$V['parent'] = function($el) {
		return ($el.parentNode);
	};
	$V['children'] = function($el) {
		var $children = [];
		for (var i = $el.children.length; i--;) {
			// Skip comment nodes on IE8
			if ($el.children[i].nodeType != 8) {
				$children.unshift($el.children[i]);
			}
		}
		return $children;
	};
	$V['siblings'] = function($el) {
		return (Array.prototype.filter.call($el.parentNode.children, function($child) {
			return ($child !== $el);
		}));
	};
	$V['contains'] = function($el, $child) {
		return ($el !== $child && $el.contains($child));
	};
	$V['containsSelector'] = function($el, selector) {
		return ($el.querySelector(selector) !== null);
	};
	$V['isElem'] = function($el, $otherEl) {
		return ($el === $otherEl);
	};
	$V['is'] = function($el, selector) {
		return ($el.matches || $el.matchesSelector || $el.msMatchesSelector || $el.mozMatchesSelector || $el.webkitMatchesSelector || $el.oMatchesSelector).call($el, selector);
	};
	$V['next'] = function($el) {
		return ($el.nextElementSibling);
	};
	$V['prev'] = function($el) {
		return ($el.previousElementSibling);
	};
	$V['text'] = function($el, textString) {
		if(textString === undefined) {
			return ($el.textContent);
		} else {
			$el.textContent = textString;
		}
	};
	$V['html'] = function($el, htmlString) {
		if(htmlString === undefined) {
			return ($el.innerHTML);
		} else {
			$el.innerHTML = htmlString;
		}
	};
	$V['outerhtml'] = function($el) {
		return ($el.outerHTML);
	};
	$V['clone'] = function($el) {
		return ($el.cloneNode(true));
	};
	$V['append'] = function($parent, $el) {
		$parent.appendChild($el);
	};
	$V['prepend'] = function($parent, $el) {
		$parent.insertBefore($el, $parent.firstChild);
	};
	$V['after'] = function($el, htmlString) {
		$el.insertAdjacentHTML('afterend', htmlString);
	};
	$V['before'] = function($el, htmlString) {
		$el.insertAdjacentHTML('beforebegin', htmlString);
	};
	$V['empty'] = function($el) {
		while($el.firstChild) {
			$el.removeChild($el.firstChild);
		}
	};
	$V['remove'] = function($el) {
		$el.parentNode.removeChild($el);
	};
	$V['replaceWith'] = function($el, htmlString) {
		$el.outerHTML = htmlString;
	};
	$V['parseHTML'] = function(htmlString) {
		var tmp = document.implementation.createHTMLDocument();
		tmp.body.innerHTML = htmlString;
		return tmp.body.children;
	};

	// attribute related
	$V['attr'] = function($el, attributeName, attributeValue) {
		if(attributeValue === undefined) {
			return ($el.getAttribute(attributeName));
		} else {
			$el.setAttribute(attributeName, attributeValue);
		}
	};

	// styling
	$V['hide'] = function($el) {
		$el.style.display = 'none';
	};
	$V['show'] = function($el) {
		$el.style.display = 'block';
	};
	$V['css'] = function($el, p1, p2) {
		if($V.type(p1) === 'object') {
			var keys = Object.keys(p1);
			for (var i = 0; i < keys.length; i++) {
				$V.css($el, keys[i], p1[keys[i]]);
			};
		} else {
			var ruleName = p1;
			var ruleValue = p2;
			if(ruleValue === undefined) {
				return(getComputedStyle($el)[ruleName]);
			} else {
				$el.style[ruleName] = ruleValue;
			}
		}
	};
	$V['addClass'] = function($el, className) {
		if ($el.classList) {
			$el.classList.add(className);
		} else {
			$el.className += ' ' + className;
		}
	};
	$V['removeClass'] = function($el, className) {
		if ($el.classList) {
			$el.classList.remove(className);
		} else {
			$el.className = $el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}
	};
	$V['hasClass'] = function($el, className) {
		if ($el.classList) {
			return ($el.classList.contains(className));
		} else {
			return (new RegExp('(^| )' + className + '( |$)', 'gi').test($el.className));
		}
	};
	$V['toggleClass'] = function($el, className) {
		if ($el.classList) {
			$el.classList.toggle(className);
		} else {
			var classes = $el.className.split(' ');
			var existingIndex = classes.indexOf(className);
			if (existingIndex >= 0) {
				classes.splice(existingIndex, 1);
			} else {
				classes.push(className);
			}
			$el.className = classes.join(' ');
		}
	};
	$V['outerWidth'] = function($el, withMargin) {
		var width = $el.offsetWidth;
		if(withMargin) {
			var style = getComputedStyle($el);
			width += parseInt(style.marginLeft) + parseInt(style.marginRight);
		}
		return width;
	};
	$V['outerHeight'] = function($el, withMargin) {
		var height = $el.offsetHeight;
		if(withMargin) {
			var style = getComputedStyle($el);
			height += parseInt(style.marginTop) + parseInt(style.marginBottom);
		}
		return height;
	};
	$V['offset'] = function($el) {
		var rect = $el.getBoundingClientRect();
		return {
			top: rect.top + document.body.scrollTop,
			left: rect.left + document.body.scrollLeft
		};
	};
	$V['offsetParent'] = function($el) {
		return ($el.offsetParent || $el);
	};
	$V['position'] = function($el) {
		return {
			left: $el.offsetLeft,
			top: $el.offsetTop
		};
	};
	$V['positionRelToViewport'] = function($el) {
		return ($el.getBoundingClientRect());
	};

	// events
	$V['documentReady'] = function(eventHandler) {
		if(document.readyState !== 'loading') {
			eventHandler();
		} else {
			document.addEventListener('DOMContentLoaded', eventHandler);
		}
	};
	$V['off'] = function($el, eventName, eventHandler) {
		$el.removeEventListener(eventName, eventHandler);
	};
	$V['on'] = function($el, eventName, eventHandler) {
		$el.addEventListener(eventName, eventHandler);
	};
	$V['trigger'] = function($el, eventName) {
		var event = document.createEvent('HTMLEvents');
		event.initEvent(eventName, true, false);
		$el.dispatchEvent(event);
	};
	$V['triggerCustom'] = function($el, eventName, eventData) {
		if(CustomEvent) {
			var event = new CustomEvent(eventName, {
				detail: eventData
			});
		} else {
			var event = document.createEvent('CustomEvent');
			event.initCustomEvent(eventName, true, true, eventData);
		}
		$el.dispatchEvent(event);
	};
})(viralJsUtils);

var viralJSONFormatter = (function ($V) {
	// private
	var _$dataCont = $V.select("#text-data")[0];
	var _$messageCont = $V.select("#message")[0];
	var _$buttonShowOriginal = $V.select('#button-show-original')[0];
	var _$buttonFormat = $V.select('#button-format')[0];
	var _$buttonTrim = $V.select('#button-trim')[0];
	var _$buttonFontSizeIncrease = $V.select("#font-size-increase")[0];
	var _$buttonFontSizeDecrease = $V.select("#font-size-decrease")[0];
	var _userInput = '';

	var textareaAutoAdjustHeight = function () {
		$V.css(_$dataCont, {
			height: ((window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)
					- $V.outerHeight($V.select('.header-container')[0], true)
					- $V.outerHeight($V.select('.button-container')[0], true)
					- $V.outerHeight($V.select('.text-data-controls-container')[0], true)
					- 50) + 'px'
		});
	};

	var attachButtonEvents = function () {
		$V.off(_$buttonShowOriginal, 'click', showOriginal);
		$V.on(_$buttonShowOriginal, 'click', showOriginal);

		$V.off(_$buttonFormat, 'click', formatJSON);
		$V.on(_$buttonFormat, 'click', formatJSON);

		var buttonTrimHandler = function () {
			formatJSON(true);
		};
		$V.off(_$buttonTrim, 'click', buttonTrimHandler);
		$V.on(_$buttonTrim, 'click', buttonTrimHandler);
	};

	var attachTextAreaEvents = function () {
		$V.off(_$dataCont, 'input', saveInput);
		$V.on(_$dataCont, 'input', saveInput);

		var textAreaFontSize = 16;
		var setTextAreaFontSize = function () {
			$V.css(_$dataCont, 'font-size', (textAreaFontSize + 'px'));
			textAreaNumberLine.repaint();
		};

		var textAreaFontSizeIncreaseHandler = function () {
			if(textAreaFontSize < 24) {
				textAreaFontSize+=2;
				setTextAreaFontSize();
			}
		};
		$V.off(_$buttonFontSizeIncrease, 'click', textAreaFontSizeIncreaseHandler);
		$V.on(_$buttonFontSizeIncrease, 'click', textAreaFontSizeIncreaseHandler);

		var textAreaFontSizeDecreaseHandler = function () {
			if(textAreaFontSize > 12) {
				textAreaFontSize-=2;
				setTextAreaFontSize();
			}
		};
		$V.off(_$buttonFontSizeDecrease, 'click', textAreaFontSizeDecreaseHandler);
		$V.on(_$buttonFontSizeDecrease, 'click', textAreaFontSizeDecreaseHandler);
	};

	var textAreaNumberLine = (function () {
		var $numberCont;

		function init() {
			var numberContId = $V.attr(_$dataCont, 'id') + '-line-numbers';
			$numberCont = ($V.select('#' + numberContId)[0]) || ('<pre id="' + numberContId + '"></pre>');
			$V.after(_$dataCont, $numberCont);
			$numberCont = $V.select('#' + numberContId)[0];
			repaint();
			$V.off(_$dataCont, 'scroll', repaint);
			$V.on(_$dataCont, 'scroll', repaint);
			$V.off(window, 'resize', repaint);
			$V.on(window, 'resize', repaint);
		}

		function repaint() {
			var lines = 1 + ((_$dataCont.value || '').match(/\n/g) || []).length;

			$V.css(_$dataCont, {
				'padding-left': ''
			});

			var textAreaOffset = $V.position(_$dataCont);
			var textAreaPaddingTop = parseInt($V.css(_$dataCont, 'padding-top'));
			var textAreaPaddingBottom = parseInt($V.css(_$dataCont, 'padding-bottom'));
			var textAreaPaddingLeft = parseInt($V.css(_$dataCont, 'padding-left'));
			var textAreaHeight = $V.outerHeight(_$dataCont);
			var textAreaFontSize = parseInt($V.css(_$dataCont, 'font-size'));
			$V.css($numberCont, {
				'position': 'absolute',
				'top': textAreaOffset.top,
				'left': textAreaOffset.left,
				'overflow': 'hidden',
				'width': textAreaFontSize * 0.6 * (Math.floor(Math.log(lines) * Math.LOG10E) + 1),
				'height': textAreaHeight - textAreaPaddingTop - textAreaPaddingBottom - 2,
				'padding': textAreaPaddingTop + ' 10px ' + textAreaPaddingBottom + ' 10px',
				'margin': '0',
				'border': '1px solid transparent',
				'border-right-color': '#EEEEEE',
				'background': 'rgba(0,0,0,0.01)',
				'color': '#AAAAAA',
				'font-size': textAreaFontSize + 'px',
				'line-height': $V.css(_$dataCont, 'line-height'),
				'font-family': $V.css(_$dataCont, 'font-family'),
				'text-align': 'right'
			});

			var numberContWidth = $V.outerWidth($numberCont);
			$V.css(_$dataCont, {
				'padding-left': numberContWidth + textAreaPaddingLeft
			});

			var numberContText = '';
			for (var i = 0; i < lines; i++) {
				numberContText += (i+1) + '\n';
			}
			numberContText += '\n';
			$V.text($numberCont, numberContText);

			$numberCont.scrollTop = _$dataCont.scrollTop;
		}

		return {
			init: init,
			repaint: repaint
		};
	})();

	var attachWindowEvents = function () {
		$V.off(window, 'resize', textareaAutoAdjustHeight);
		$V.on(window, 'resize', textareaAutoAdjustHeight);
	};

	$V.documentReady(function() {
		_$dataCont.focus();
		textareaAutoAdjustHeight();
		attachButtonEvents();
		attachTextAreaEvents();
		attachWindowEvents();
		textAreaNumberLine.init();
		try {
			viralRippleClick.options({
				'color':'#252525',
				'transitionType': 'cubic-bezier(0.4, 0, 0.8, 1)'
			});
			viralShortcut.create({
				'alt+1': function () {
					viralRippleClick.disable();
					$V.trigger(_$buttonShowOriginal, 'click');
					viralRippleClick.enable();
				},
				'alt+2': function () {
					viralRippleClick.disable();
					$V.trigger(_$buttonFormat, 'click');
					viralRippleClick.enable();
				},
				'alt+3': function () {
					viralRippleClick.disable();
					$V.trigger(_$buttonTrim, 'click');
					viralRippleClick.enable();
				},
				'alt+dash': function () {
					viralRippleClick.disable();
					$V.trigger(_$buttonFontSizeDecrease, 'click');
					viralRippleClick.enable();
				},
				'alt+=': function () {
					viralRippleClick.disable();
					$V.trigger(_$buttonFontSizeIncrease, 'click');
					viralRippleClick.enable();
				}
			});
		} catch (e) {
		}
	});

	// public
	var saveInput = function () {
		_userInput = _$dataCont.value;
		$V.hide(_$messageCont);
		textAreaNumberLine.repaint();
	};

	var showOriginal = function () {
		_$dataCont.value = _userInput;
		$V.hide(_$messageCont);
		textAreaNumberLine.repaint();
	};

	var formatJSON = function (trimOnly) {

		$V.hide(_$messageCont);

		if (trimOnly !== true) {
			trimOnly = false;
		}

		var jsonStr = _userInput;

		var viralPhPrefix = "__viralPh";
		var viralPhPPrefix = "__viralPhP";
		var viralPhSuffix = "__";
		var viralPhMap = {};

		if (!jsonStr) {
			return;
		}

		var stringRegex = /(?:"(?:\\"|[^"\r\n])*"|'(?:\\'|[^'\r\n])*')/g;
		var strArray = jsonStr.match(stringRegex);
		var viralPhI = 0;
		if (strArray && strArray.length) {
			for (var i = 0; i < strArray.length; i++) {
				var viralPhMapKey = viralPhPrefix + (viralPhI++) + viralPhSuffix;
				while(jsonStr.indexOf(viralPhMapKey) >= 0) {
					viralPhMapKey = viralPhPrefix + (viralPhI++) + viralPhSuffix;
				}
				jsonStr = jsonStr.replace(strArray[i], viralPhMapKey);
				viralPhMap[viralPhMapKey] = strArray[i];
			}
		}

		jsonStr = jsonStr.replace(/\s/g, "");
		if (!trimOnly) {
			var indexFOP = 0;
			parenthesesStartSearch: while ((indexFOP = jsonStr.indexOf("(", indexFOP)) >= 0) {
				var countOP = 1;
				var indexCOP = indexFOP;
				do {
					indexCOP++;
					var indexOP = jsonStr.indexOf("(", indexCOP);
					indexOP = (indexOP >= indexCOP ? indexOP : jsonStr.length);
					var indexCP = jsonStr.indexOf(")", indexCOP);
					indexCP = (indexCP >= indexCOP ? indexCP : jsonStr.length);
					var indexOCB = jsonStr.indexOf("{", indexCOP);
					indexOCB = (indexOCB >= indexCOP ? indexOCB : jsonStr.length);
					var indexCCB = jsonStr.indexOf("}", indexCOP);
					indexCCB = (indexCCB >= indexCOP ? indexCCB : jsonStr.length);
					var indexOSB = jsonStr.indexOf("[", indexCOP);
					indexOSB = (indexOSB >= indexCOP ? indexOSB : jsonStr.length);
					var indexCSB = jsonStr.indexOf("]", indexCOP);
					indexCSB = (indexCSB >= indexCOP ? indexCSB : jsonStr.length);
					var minIndexP = Math.min(indexOP, indexCP, indexOCB, indexCCB, indexOSB, indexCSB);
					if(minIndexP === indexOP) {
						countOP++;
					} else if(minIndexP === indexCP) {
						countOP--;
					} else {
						indexFOP++;
						continue parenthesesStartSearch;
					}
					indexCOP = minIndexP;
				} while (countOP > 0 && indexCOP < jsonStr.length);

				var viralPhMapKey = viralPhPPrefix + (viralPhI++) + viralPhSuffix;
				while(jsonStr.indexOf(viralPhMapKey) >= 0) {
					viralPhMapKey = viralPhPPrefix + (viralPhI++) + viralPhSuffix;
				}
				var expressionInParentheses = jsonStr.substring(indexFOP, indexCOP + 1);
				viralPhMap[viralPhMapKey] = expressionInParentheses;
				jsonStr = jsonStr.substring(0, indexFOP) + viralPhMapKey + jsonStr.substring(indexCOP + 1);
			}

			var i = 0;
			var tab = "";
			while (i < jsonStr.length) {
				var indexOCB = jsonStr.indexOf("{", i);
				indexOCB = (indexOCB >= i ? indexOCB : jsonStr.length);
				var indexCCB = jsonStr.indexOf("}", i);
				indexCCB = (indexCCB >= i ? indexCCB : jsonStr.length);
				var indexOSB = jsonStr.indexOf("[", i);
				indexOSB = (indexOSB >= i ? indexOSB : jsonStr.length);
				var indexCSB = jsonStr.indexOf("]", i);
				indexCSB = (indexCSB >= i ? indexCSB : jsonStr.length);
				var indexC = jsonStr.indexOf(",", i);
				indexC = (indexC >= i ? indexC : jsonStr.length);
				var minIndex = Math.min(indexOCB, indexCCB, indexOSB, indexCSB, indexC);
				if(minIndex === indexOCB || minIndex === indexOSB) {
					tab += "    ";
					jsonStr = jsonStr.substring(0, minIndex) + " " + jsonStr.substring(minIndex, minIndex + 1) + "\r\n" + tab + jsonStr.substring(minIndex + 1);
					minIndex++;
				} else if(minIndex === indexCCB || minIndex === indexCSB) {
					tab = tab.substring(4);
					jsonStr = jsonStr.substring(0, minIndex) + "\r\n" + tab + jsonStr.substring(minIndex);
				} else {
					jsonStr = jsonStr.substring(0, minIndex + 1) + "\r\n" + tab + jsonStr.substring(minIndex + 1);
				}
				i = minIndex + ("\r\n" + tab).length + 1;
			}
			jsonStr = jsonStr.replace(/,/g, ", ").replace(/,[ ]+/g, ", ");
			jsonStr = jsonStr.replace(/:/g, ": ").replace(/:[ ]+/g, ": ");
			jsonStr = jsonStr.replace(/=/g, "= ").replace(/=[ ]+/g, "= ");;
			jsonStr = jsonStr.replace(/\s+\r\n/g, "\r\n").replace(/\s+[\r\n]/g, "\r\n");
			jsonStr = jsonStr.replace(/\r\n\s*\r\n/g, "\r\n").replace(/[\r\n]\s*[\r\n]/g, "\r\n");
			jsonStr = jsonStr.trim();
		}

		var viralPhMapKeyArray = Object.keys(viralPhMap);
		for (var i = viralPhMapKeyArray.length - 1; i >= 0; i--) {
			if (viralPhMapKeyArray[i].indexOf(viralPhPPrefix) >= 0) {
				var tempStr = viralPhMap[viralPhMapKeyArray[i]];
				tempStr = tempStr.replace(/,/g, ", ");
				tempStr = tempStr.replace(/:/g, ": ");
				tempStr = tempStr.replace(/=/g, "= ");
				tempStr = tempStr.replace(/\+/g, " + ");
				tempStr = tempStr.replace(/-/g, " - ");
				tempStr = tempStr.replace(/\*/g, " * ");
				tempStr = tempStr.replace(/\//g, " / ");
				tempStr = tempStr.replace(/\(/g, " ( ");
				tempStr = tempStr.replace(/\)/g, " ) ");
				tempStr = tempStr.replace(/\s+/g, " ");
				tempStr = tempStr.trim();
				viralPhMap[viralPhMapKeyArray[i]] = tempStr;
			}
			jsonStr = jsonStr.replace(viralPhMapKeyArray[i], viralPhMap[viralPhMapKeyArray[i]]);
		}

		if (!trimOnly) {
			try {
				var jsonObj = $V.parseJSON(jsonStr);
				jsonStr = $V.stringifyJSON(jsonObj, null, "    ");
			} catch (e) {
				var msg = e.message;
				msg = msg.replace("JSON.parse: ", "Error: ");
				$V.text(_$messageCont, msg);
				$V.attr(_$messageCont, "title", msg);
				$V.show(_$messageCont);
			}
		}

		_$dataCont.value = jsonStr;
		textAreaNumberLine.repaint();
	};

	return {
		'saveInput': saveInput,
		'showOriginal': showOriginal,
		'formatJSON': formatJSON
	};
})(viralJsUtils);
