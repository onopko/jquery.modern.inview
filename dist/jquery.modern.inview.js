/*
 *  jquery.modern.inview - v1.0.0
 *
 *  Element 'inview' Event Plugin
 *  https://github.com/onopko/jquery.modern.inview/
 *
 *  Author: Takehiko Ono
 *
 *  Forked from: Protonet (https://github.com/protonet/jquery.inview/)
 *  Based on the idea of: Remy Sharp (http://remysharp.com/2009/01/26/element-in-view-event-plugin/)
 *
 *  Under MIT License
 */
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

		var i = 0;

		var elementObjects = $.map(inviewObjects, function(inviewObject) {
			var selector = inviewObject.data.selector;
			var $element = selector ? $element.find(selector) : inviewObject.$element;

			var option = $.extend({
				offsetX : 0,
				offsetY : 0
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

			var $element = $(elementObjects[i].element);
			var option   = elementObjects[i].option;
			var elementSize = { height: $element[0].offsetHeight, width: $element[0].offsetWidth };
			var elementOffset;

			(function () {
				elementOffset = $element.offset();

				elementOffset = {
					top : elementOffset.top,
					left: elementOffset.left
				};

				if (option.offsetX !== 0) {
					if (typeof option.offsetX === 'number') {
						elementOffset.left = elementOffset.left + option.offsetX;
					}
					else if (typeof option.offsetX === 'string' && option.offsetX.indexOf('%') > -1) {
						elementOffset.left = elementOffset.left + (viewportSize.width * parseFloat(option.offsetX) / 100);
					}
				}

				if (option.offsetY !== 0) {
					if (typeof option.offsetY === 'number') {
						elementOffset.top = elementOffset.top + option.offsetY;
					}
					else if (typeof option.offsetY === 'string' && option.offsetY.indexOf('%') > -1) {
						elementOffset.top = elementOffset.top + (viewportSize.height * parseFloat(option.offsetY) / 100);
					}
				}
			})();

			var inView = $element.data('inview');

			if (!viewportOffset || !viewportSize) {
				return;
			}

			if (elementOffset.top + elementSize.height > viewportOffset.top &&
				elementOffset.top < viewportOffset.top + viewportSize.height &&
				elementOffset.left + elementSize.width > viewportOffset.left &&
				elementOffset.left < viewportOffset.left + viewportSize.width) {

				if (!inView) {
					$element.data('inview', true).trigger('inview', [true]);
				}
			}
			else if (inView) {
				$element.data('inview', false).trigger('inview', [false]);
			}
		}

		return true;
	}

	$(window).on('scroll resize scrollstop', function () {
		viewportSize = viewportOffset = null;
	});

	// IE < 9 scrolls to focused elements without firing the "scroll" event
	if (!document.documentElement.addEventListener && document.documentElement.attachEvent) {
		document.documentElement.attachEvent('onfocusin', function () {
			viewportOffset = null;
		});
	}
})(jQuery);
