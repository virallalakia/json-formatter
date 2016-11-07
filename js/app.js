var viralDataFormatter = (function () {

	// private
	var _$dataCont = document.getElementById("text-data");
	var _userInput = '';

	// public
	var saveInput = function () {
		_userInput = _$dataCont.value;
	};

	var showOriginal = function () {
		_$dataCont.value = _userInput;
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
		for (var i = 0; i < viralPhMapKeyArray.length; i++) {
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

		_$dataCont.value = jsonStr;
	};

	return {
		'saveInput': saveInput,
		'showOriginal': showOriginal,
		'formatJSON': formatJSON
	};

})();
