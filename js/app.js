(function whirlpool() {

	$('body').append('<div class="whirlpool-cont"><div class="whirlpool"></div></div>');
	var $whirlpoolCont = $('.whirlpool-cont');
	var $whirlpool = $whirlpoolCont.find('.whirlpool');

	$(document).off('click').on('click', function (e) {
		var $target = $(e.target);
		if (!$target.is('button')) {
			return;
		}

		var targetOffset = $target.offset();
		var targetTotalWidth = $target.outerWidth();
		var targetTotalHeight = $target.outerHeight();
		var scale = 2 * (targetTotalWidth >= targetTotalHeight ? targetTotalWidth : targetTotalHeight); 
		var delay = (scale > 400 ? (scale <= 1000 ? scale : 1000) : 400);

		$whirlpoolCont.css({'width': targetTotalWidth, 'height': targetTotalHeight, 'left': targetOffset.left, 'top': targetOffset.top});
		$whirlpool.css({'left': e.pageX - targetOffset.left, 'top': e.pageY - targetOffset.top});
		$whirlpool.show(0);
		$whirlpool.addClass('whirlpool-effect');
		$whirlpool.css({'transform': 'scale(' + scale + ')'});
		setTimeout(function() {
			$whirlpool.hide(0);
			$whirlpool.removeClass('whirlpool-effect');
			$whirlpoolCont.css({'width': 0, 'height': 0, 'left': 0, 'top': 0});
			$whirlpool.css({'transform': 'scale(0)'});
		}, delay);

	});

})();

function autoAdjustHeight($elem) {
	if ($elem) {
		$elem.css({height: '1px'});
		$elem.css({height: ($elem.prop('scrollHeight') + 10) + 'px'});
	}
}

var viralJSONFormatter = (function () {

	// private
	var _$dataCont = $("#text-data");
	var _userInput = '';

	// public
	var saveInput = function () {
		_userInput = _$dataCont.val();
		autoAdjustHeight(_$dataCont);
	};

	var showOriginal = function () {
		_$dataCont.val(_userInput);
		autoAdjustHeight(_$dataCont);
	};

	var formatJSON = function (trimOnly) {

		var jsonStr = _userInput;

		var viralPhPrefix = "__viralPh";
		var viralPhPPrefix = "__viralPhP";
		var viralPhSuffix = "__";
		var viralPhMap = {};

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
		if (trimOnly !== true) {
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

		_$dataCont.val(jsonStr);
		autoAdjustHeight(_$dataCont);
	};

	return {
		'saveInput': saveInput,
		'showOriginal': showOriginal,
		'formatJSON': formatJSON
	};

})();

$(document).ready(function() {
	$('#button-show-original').on('click.vl-json-formatter', viralJSONFormatter.showOriginal);
	$('#button-format').on('click.vl-json-formatter', viralJSONFormatter.formatJSON);
	$('#button-trim').on('click.vl-json-formatter', function() {
		viralJSONFormatter.formatJSON(true);
	});

	$("#text-data").focus();
});
