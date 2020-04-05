[![Build Status](https://travis-ci.com/mkay581/wait-for-element-transition.svg?branch=master)](https://travis-ci.com/mkay581/wait-for-element-transition)
[![npm version](https://badge.fury.io/js/wait-for-element-transition.svg)](https://badge.fury.io/js/wait-for-element-transition)

# waitForElementTransition()

Let's say you have the problem (that many of us have) where you need to wait for the completion of your element's
[CSS transition](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Using_CSS_transitions)
before your code continues. You can use this library and call a `waitForElementTransition` method to wait until
the element finishes its css transition before doing other things in your javascript code.

## Benefits

-   Easily wait for an element's css transition to end using JavaScript
-   Allows you to keep your transition/animation css properties separate from your JS
-   Native javascript with no dependencies
-   Safer and more reliable than `transitionstart` and `transitionend` events
-   Plays nicely with the latest specifications

## Installation

You can either use the dist file directly in your project:

```html
<script
    type="text/javascript"
    src="/dist/wait-for-element-transition.min.js"
></script>
```

Or install via npm

```bash
npm i wait-for-element-transition
```

and import

```javascript
import waitForElementTransition from 'wait-for-element-transition';
```

## Usage

Here's an example where we want to wait for an element's background color to change from black to red.

```html
<style>
    div {
        background-color: black;
        transition-property: background-color;
        transition-duration: 100ms;
        transition-timing-function: ease-out;
    }

    .red {
        background-color: red;
    }
</style>

<div>Transition this element</div>

<script
    type="text/javascript"
    src="/dist/wait-for-element-transition.min.js"
></script>
<script>
    const element = document.querySelector('div');
    element.classList.add('red'); // start transition
    waitForElementTransition(element).then(() => {
        // 100 milliseconds later...
        console.log('element background color changed to red!');
    });
</script>
```

If the element has already transitioned before the `waitForElementTransition()` is called, the `waitForElementTransition()`s
promise will resolve immediately. So you can always guarantee that your code will run, just as it would synchronously.

## Alternatives

### The `transitionend` event

Using the `transitionend` or `animationend` events on an Element will allow you to wait until an Element's transition
has ended, but this approach is limited:

1. The events don't fire in the case where a transition is removed before completion (i.e. display is set to "none" or if
   the css property is removed) and
1. The events don't fire when there are no css transition properties specified, which doesn't allow us to run the
   same animation-completion logic on elements which may or may not be animated.

### Web Animations

-   Not supported in all browsers like Internet Explorer or Safari
