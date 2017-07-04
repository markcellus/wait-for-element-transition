let Promise = require('es6-promise').Promise;

/**
 * Takes a value and separates the number and unit into a key/value map.
 * @param v - The value
 * @returns {{num: Number, unit: string}} Returns the map
 * @private
 */
let getCssPropUnitMap = function (v) {
  v.trim();
  let num = v.match('[0-9\.]+'),
    unit = 'ms';

  num = num ? num[0] : '';
  if (num) {
    unit = v.split(num)[1];
    num = Number(num);
  }
  return {
    num: num,
    unit: unit
  };
};

/**
 * Converts a css timing unit value into milliseconds.
 * @param {string} val - The value string
 * @returns {string} Returns the timing unit value in milliseconds
 */
let convertCssTimeValueToMilliseconds = function (val) {
  let number = getCssPropUnitMap(val).num,
    unit = val.replace(number, '');
  if (unit === 's') {
    val = number * 1000;
  } else {
    val = number;
  }
  return val + 'ms';
};


/**
 * Gets the time is takes for the element to transition to its show state.
 * @param {HTMLElement} el - The element
 * @returns {Number} Returns the total CSS transition time in milliseconds
 */
function getTransitionDuration (el) {

  /**
   * Takes a css property name and returns the javascript version of it.
   * @param {string} cssProp - The css property
   * @returns {string} Returns the javascript version
   * @private
   */
  let getJsPropName = function (cssProp) {
    // convert to camelCase
    return cssProp.replace(/-([a-z])/g, function (letter) {
      return letter[1].toUpperCase();
    });
  };

  /**
   * Gets the computed property of the element.
   * @param {string} prop - The name of the property to get
   * @returns {string} Returns the value of the property
   */
  let getCssComputedProperty = function (prop) {
    let style = window.getComputedStyle(el);
    return style.getPropertyValue(prop) || el.style[getJsPropName(prop)];
  };

  let delayProp = getCssComputedProperty('transition-delay') || '0ms';
  let durationProp = getCssComputedProperty('transition-duration') || '0ms';
  let times = Array.isArray(durationProp) ? durationProp : [durationProp];
  let delay = Array.isArray(delayProp) ? delayProp : [delayProp];
  let highest = 0;
  let map;

  times.push.apply(times, delay); // account for delay

  // calculate highest number of time
  times.forEach((value) => {
    value.split(',').forEach((v) => {
      v = convertCssTimeValueToMilliseconds(v);
      map = getCssPropUnitMap(v);
      if (map.num > highest) {
        highest = map.num;
      }
    });
  });

  return highest;
}

/**
 * Builds a transition promise that waits to resolve until the module el's CSS transition is completed (if applicable).
 * @returns {Promise} Returns a promise that resolves when the element has finished animating
 */
export default function waitForElementTransition (el) {
  let duration = getTransitionDuration(el);
  return new Promise((resolve) => {
    if (duration > 0) {
      setTimeout(resolve.bind(this, el), duration);
    } else {
      resolve(el);
    }
  });
}
