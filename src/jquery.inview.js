;(function($) {
 	'use strict';

	var inviewObjects = [];
	var viewportSize;
	var viewportOffset;
	var timer;

	$.event.special.inview = {
		add: function (data, namespace) {
			inviewObjects.push({
				data: data,
				$element: $(this),
				element: this
			});

			if (!timer && inviewObjects.length) {
				var loop = function () {
					timer = $.setAnimationFrameTimeout(function () {
						var remains = checkInView();

						if (remains) {
							loop();
						}
					}, 150);
				};

				loop();
			}
		},

		remove: function (data, namespace) {
			for (var i = 0; i < inviewObjects.length; i++) {
				var inviewObject = inviewObjects[i];

				if (inviewObject.element === this && inviewObject.data.guid === data.guid) {
					inviewObjects.splice(i, 1);
					break;
				}
			}

			if (!inviewObjects.length) {
				$.clearAnimationFrameTimeout(timer);
				timer = null;
			}
		}
	};

	function getViewportSize () {
		var mode, domObject, size = {
			height: window.innerHeight,
			width : window.innerWidth
		};

		if (!size.height) {
			mode = document.compatMode;

			// IE, Gecko
			if (mode || !$.support.boxModel) {
				domObject = document.documentElement;  // Standards
				if (mode !== 'CSS1Compat') { domObject = document.body; }  // Quirks

				size = {
					height: domObject.clientHeight,
					width: domObject.clientWidth
				};
			}
		}

		return size;
	}

	function getViewportOffset () {
		return {
			top : window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
			left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft
		};
	}

	function checkInView () {
		if (!inviewObjects.length) {
			return false;
		}

		var elementObjects = $.map(inviewObjects, function(inviewObject) {
			var selector = inviewObject.data.selector;
			var $element = selector ? $element.find(selector) : inviewObject.$element;

			var option = $.extend({
				offsetStartX : 0,
				offsetEndX   : 0,
				offsetStartY : 0,
				offsetEndY   : 0,
		    }, inviewObject.data.data);

			var obj = {
				element: $element,
				option : option
			};

			selector = $element = option = void 0;

			return obj;
		});

		viewportSize   = viewportSize || getViewportSize();
		viewportOffset = viewportOffset || getViewportOffset();

		for (var i = 0, count_i = inviewObjects.length; i < count_i; i++) {
			if (!$.contains(document.documentElement, elementObjects[i].element[0])) {
				continue;
			}

			var $element      = $(elementObjects[i].element);
			var inView        = $element.data('inview');
			var option        = elementObjects[i].option;
			var elementSize   = { height: $element[0].offsetHeight, width: $element[0].offsetWidth };
			var elementOffset = $element.offset();

            var startX        = 0;
            var endX          = 0;
            var startY        = 0;
            var endY          = 0;

            var offsetStartX  = 0;
            var offsetEndX    = 0;
            var offsetStartY  = 0;
            var offsetEndY    = 0;

			if (option.offsetStartX !== 0) {
				if (typeof option.offsetStartX === 'number') {
					offsetStartX = option.offsetStartX;
				}
				else if (typeof option.offsetStartX === 'string' && option.offsetStartX.indexOf('%') > -1) {
					offsetStartX = viewportSize.width * parseFloat(option.offsetStartX) / 100;
				}
			}

			if (option.offsetEndX !== 0) {
				if (typeof option.offsetEndX === 'number') {
					offsetEndX = option.offsetEndX;
				}
				else if (typeof option.offsetEndX === 'string' && option.offsetEndX.indexOf('%') > -1) {
					offsetEndX = viewportSize.width * parseFloat(option.offsetEndX) / 100;
				}
			}

			if (option.offsetStartY !== 0) {
				if (typeof option.offsetStartY === 'number') {
					offsetStartY = option.offsetStartY;
				}
				else if (typeof option.offsetStartY === 'string' && option.offsetStartY.indexOf('%') > -1) {
					offsetStartY = viewportSize.height * parseFloat(option.offsetStartY) / 100;
				}
			}

			if (option.offsetEndY !== 0) {
				if (typeof option.offsetEndY === 'number') {
					offsetEndY = option.offsetEndY;
				}
				else if (typeof option.offsetEndY === 'string' && option.offsetEndY.indexOf('%') > -1) {
					offsetEndY = viewportSize.height * parseFloat(option.offsetEndY) / 100;
				}
			}

			if (!viewportOffset || !viewportSize) {
				return;
			}

			startX = elementOffset.left + offsetStartX;
			endX   = elementOffset.left + elementSize.width + offsetEndX;
			startY = elementOffset.top + offsetStartY;
			endY   = elementOffset.top + elementSize.height + offsetEndY;

			startX = (startX < 0) ? 0 : startX;
			endX   = (endX < 0)   ? 0 : endX;
			startY = (startY < 0) ? 0 : startY;
			endY   = (endY < 0)   ? 0 : endY;

			if (endY >= viewportOffset.top &&
				startY <= viewportOffset.top + viewportSize.height &&
				endX >= viewportOffset.left &&
				startX <= viewportOffset.left + viewportSize.width) {

				if (!inView) {
					$element.data('inview', true).trigger('inview', [true]);
				}
			}
			else if (inView) {
				$element.data('inview', false).trigger('inview', [false]);
			}

			$element = option = elementSize = elementOffset = startX = endX = startY = endY = offsetStartX = offsetEndX = offsetStartY = offsetEndY = void 0;
		}

		return true;
	}

	$(window).on('scroll.inview resize.inview scrollstop.inview', function () {
		viewportSize = viewportOffset = void 0;
	});
})(jQuery);
