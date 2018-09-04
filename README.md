# jquery.modern.inview [![Build Status](https://secure.travis-ci.org/onopko/jquery.modern.inview.svg?branch=master)](https://travis-ci.org/onopko/jquery.modern.inview) ![Bower Version](https://badge.fury.io/bo/jquery.modern.inview.svg)

Event that is fired as soon as an element appears in the user's viewport.

* **Author:** [Takehiko Ono](http://onotakehiko.com/)

* **Forked from:** Protonet ([https://github.com/protonet/jquery.inview/](https://github.com/protonet/jquery.inview/))
* **Based on the idea of:** Remy Sharp ([http://remysharp.com/2009/01/26/element-in-view-event-plugin/](http://remysharp.com/2009/01/26/element-in-view-event-plugin/))

## Requires
* **jQuery** 1.8+ ([https://github.com/jquery/jquery](https://github.com/jquery/jquery))
* **setAnimationFrameTimeout** ([https://github.com/onopko/setAnimationFrameTimeout](https://github.com/onopko/setAnimationFrameTimeout))

```html
<script src="jquery.min.js"></script>
<script src="setAnimationFrameTimeout.min.js"></script>
<script src="jquery.modern.inview.min.js"></script>
```


## Usage

```javascript
$('div').on('inview', function(event, isInView) {
	if (isInView) {
		// element is now visible in the viewport
	}
	else {
		// element has gone out of viewport
	}
});
```

To stop listening for the event - simply unbind:

```javascript
$('div').off('inview');
```

If you would like the event only to trigger once per element while the page is loaded, you can use the .one() method instead of .on():

```javascript
$('div').one('inview', ...);
```

### options

jquery.modern.inview accepts offsetStartX • offsetEndX • offsetStartY • offsetEndY properties.
Each value can be took Number (px) or String (%) type.

* offsetStartX (Default: 0)
* offsetEndX (Default: 0)
* offsetStartY (Default: 0)
* offsetEndY (Default: 0)

```javascript
$('div').on('inview', { offsetStartX: 30, offsetEndX: 0, offsetStartY: '-10%', offsetEndY: 0 }, function(event, isInView) {
	if (isInView) {

	}
	else {

	}
});
```

## Recommended Browser Compatibility

* Safari 8+
* Google Chrome 20+
* Firefox 15+
* Opera 15+
* Edge 12+
* IE 10+
* iOS 9.2+
* Android 4.4+


## License

The MIT License ([MIT](http://www.opensource.org/licenses/mit-license.php))

Copyright © 2018 Takehiko Ono <me@onotakehiko.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
