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
				offsetLeft  : 0,
				offsetRight : 0,
				offsetTop   : 0,
				offsetBottom: 0
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

			var _left         = 0;
			var _right        = 0;
			var _top          = 0;
			var _bottom       = 0;

			var offsetLeft    = 0;
			var offsetRight   = 0;
			var offsetTop     = 0;
			var offsetBottom  = 0;

			if (option.offsetLeft !== 0) {
				if (typeof option.offsetLeft === 'number') {
					offsetLeft = option.offsetLeft;
				}
				else if (typeof option.offsetLeft === 'string' && option.offsetLeft.indexOf('%') > -1) {
					offsetLeft = viewportSize.width * parseFloat(option.offsetLeft) / 100;
				}
				else if (typeof option.offsetLeft === 'string' && option.offsetLeft.indexOf('vw') > -1) {
					offsetLeft = viewportSize.width * parseFloat(option.offsetLeft) / 100;
				}
				else if (typeof option.offsetLeft === 'string' && option.offsetLeft.indexOf('vh') > -1) {
					offsetLeft = viewportSize.height * parseFloat(option.offsetLeft) / 100;
				}
			}

			if (option.offsetRight !== 0) {
				if (typeof option.offsetRight === 'number') {
					offsetRight = option.offsetRight;
				}
				else if (typeof option.offsetRight === 'string' && option.offsetRight.indexOf('%') > -1) {
					offsetRight = viewportSize.width * parseFloat(option.offsetRight) / 100;
				}
				else if (typeof option.offsetRight === 'string' && option.offsetRight.indexOf('vw') > -1) {
					offsetRight = viewportSize.width * parseFloat(option.offsetRight) / 100;
				}
				else if (typeof option.offsetRight === 'string' && option.offsetRight.indexOf('vh') > -1) {
					offsetRight = viewportSize.height * parseFloat(option.offsetRight) / 100;
				}
			}

			if (option.offsetTop !== 0) {
				if (typeof option.offsetTop === 'number') {
					offsetTop = option.offsetTop;
				}
				else if (typeof option.offsetTop === 'string' && option.offsetTop.indexOf('%') > -1) {
					offsetTop = viewportSize.height * parseFloat(option.offsetTop) / 100;
				}
				else if (typeof option.offsetTop === 'string' && option.offsetTop.indexOf('vw') > -1) {
					offsetTop = viewportSize.width * parseFloat(option.offsetTop) / 100;
				}
				else if (typeof option.offsetTop === 'string' && option.offsetTop.indexOf('vh') > -1) {
					offsetTop = viewportSize.height * parseFloat(option.offsetTop) / 100;
				}
			}

			if (option.offsetBottom !== 0) {
				if (typeof option.offsetBottom === 'number') {
					offsetBottom = option.offsetBottom;
				}
				else if (typeof option.offsetBottom === 'string' && option.offsetBottom.indexOf('%') > -1) {
					offsetBottom = viewportSize.height * parseFloat(option.offsetBottom) / 100;
				}
				else if (typeof option.offsetBottom === 'string' && option.offsetBottom.indexOf('vw') > -1) {
					offsetBottom = viewportSize.width * parseFloat(option.offsetBottom) / 100;
				}
				else if (typeof option.offsetBottom === 'string' && option.offsetBottom.indexOf('vh') > -1) {
					offsetBottom = viewportSize.height * parseFloat(option.offsetBottom) / 100;
				}
			}

			if (!viewportOffset || !viewportSize) {
				return;
			}

			_left   = elementOffset.left + offsetLeft;
			_right  = elementOffset.left + elementSize.width + offsetRight;
			_top    = elementOffset.top + offsetTop;
			_bottom = elementOffset.top + elementSize.height + offsetBottom;

			_left   = (_left < 0)   ? 0 : _left;
			_right  = (_right < 0)  ? 0 : _right;
			_top    = (_top < 0)    ? 0 : _top;
			_bottom = (_bottom < 0) ? 0 : _bottom;

			if (_bottom >= viewportOffset.top &&
				_top <= viewportOffset.top + viewportSize.height &&
				_right >= viewportOffset.left &&
				_left <= viewportOffset.left + viewportSize.width) {

				if (!inView) {
					$element.data('inview', true).trigger('inview', [true]);
				}
			}
			else if (inView) {
				$element.data('inview', false).trigger('inview', [false]);
			}

			$element = option = elementSize = elementOffset = _left = _right = _top = _bottom = offsetLeft = offsetRight = offsetTop = offsetBottom = void 0;
		}

		return true;
	}

	$(window).on('scroll.jquerymoderninview resize.jquerymoderninview scrollstop.jquerymoderninview', function () {
		viewportSize = viewportOffset = void 0;
	});
})(jQuery);
