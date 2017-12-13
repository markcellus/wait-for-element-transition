[![Build Status](https://travis-ci.org/mkay581/wait-for-element-transition.svg?branch=master)](https://travis-ci.org/mkay581/wait-for-element-transition)
[![npm version](https://badge.fury.io/js/wait-for-element-transition.svg)](https://badge.fury.io/js/wait-for-element-transition)

#  waitForElementTransition()

## Benefits

* Easily wait for an element's css transition to end
* Native javascript with no bloated dependencies
* Safer and more reliable than `transitionstart` and `transitionend` events
* Plays nicely with the latest specifications

## Usage

Let's say you have the problem (that many of us have) where you need to wait for the completion of your element's
 [CSS transition](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Using_CSS_transitions)
 before your code continues. Given the following CSS...


```css
.animate {
    transition-property: background-color;
    transition-duration: 100ms;
    transition-timing-function: ease-out;
}
```

You can call the `waitForElementTransition` method to wait until the element finishes its css transition before doing other
things in your javascript code. Like so:

```javascript

// ES6 import
import waitForElementTransition from 'wait-for-element-transition';

// OR use dist file
<script type="text/javascript" src="/dist/wait-for-element-transition.min.js"></script>

let element = document.querySelector('div');
element.classList.add('animate'); // start transition
waitForElementTransition(element).then(() => {
    // 100 milliseconds later...
    console.log('transition complete!');
});
```

If the element has already transitioned before the `waitForElementTransition()` is called, the `waitForElementTransition()`s promise will resolve immediately. So you can always guarantee that your code will run, just as it would synchronously.



