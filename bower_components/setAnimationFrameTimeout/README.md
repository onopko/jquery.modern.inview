# setAnimationFrameTimeout [![Build Status](https://secure.travis-ci.org/onopko/setAnimationFrameTimeout.svg?branch=master)](https://travis-ci.org/onopko/setAnimationFrameTimeout) [![npm version](https://badge.fury.io/js/setanimationframetimeout.svg)](https://badge.fury.io/js/setanimationframetimeout)

setAnimationFrameTimeout is an alternative function of setTimeout for modern browsers.


## Usage

1. Include jQuery and plugin's code:

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
<script src="setAnimationFrameTimeout.min.js"></script>
```

2. Make a timer:

```javascript
var timer = $.setAnimationFrameTimeout(function () {
	// do something.
}, 1000);
```

3. And you can stop the timer:

```javascript
$.clearAnimationFrameTimeout(timer);
```

4. That’s it.

## License

The MIT License (MIT)

Copyright (c) 2018 Takehiko Ono

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
