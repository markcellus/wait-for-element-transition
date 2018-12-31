import * as chai from 'chai';
import * as sinon from 'sinon';
import waitForElementTransition from '../wait-for-element-transition';

const { assert } = chai;

describe('waitForElementTransition', () => {
    it('when there is a single computed property', done => {
        const el = document.createElement('div');
        const callbackSpy = sinon.spy();
        let highestTimeMilliseconds = 50;
        const promiseDelay = 20; // promise returned from waitForElementTransition has a slight delay we need to account for
        el.style.width = '0px';
        el.style.transitionProperty = 'width';
        el.style.transitionDelay = highestTimeMilliseconds + 'ms';
        el.style.width = '25px';
        waitForElementTransition(el).then(callbackSpy);
        assert.equal(
            callbackSpy.callCount,
            0,
            'after calling waitForElementTransition() on an element that has a transition delay, the callback is not fired immediately because the transition hasnt finished'
        );
        window.setTimeout(() => {
            assert.equal(callbackSpy.callCount, 1, 'callback is fired after the transition delay time elapses');
            highestTimeMilliseconds = 100;
            el.style.transitionDelay = '100ms';
            el.style.transitionDuration = highestTimeMilliseconds + 'ms';
            waitForElementTransition(el).then(callbackSpy);
            assert.equal(
                callbackSpy.callCount,
                1,
                'callback is NOT immediately fired after a call to waitForElementTransition(), because the appropriate time hasnt yet elapsed'
            );
            window.setTimeout(() => {
                assert.equal(
                    callbackSpy.callCount,
                    2,
                    'after setting the transition duration to a higher number than the transition delay, callback is fired after the transition duration time elapses'
                );
                const highestTime = 0.3;
                highestTimeMilliseconds = highestTime * 1000;
                el.style.transitionDelay = '100ms';
                el.style.transitionDuration = highestTime + 's';
                waitForElementTransition(el).then(callbackSpy);
                assert.equal(
                    callbackSpy.callCount,
                    2,
                    'callback is NOT immediately fired after a call to waitForElementTransition(), because the appropriate time hasnt yet elapsed'
                );
                window.setTimeout(() => {
                    assert.equal(
                        callbackSpy.callCount,
                        3,
                        'callback is still fired after the transition duration time elapses, even when it uses a seconds unit with a time value lower than the milliseconds time value of the transition duration'
                    );
                    done();
                }, highestTimeMilliseconds + promiseDelay + 1);
            }, highestTimeMilliseconds + promiseDelay + 1);
        }, highestTimeMilliseconds + promiseDelay + 1);
    });

    it('on element that has multiple computed transition properties', done => {
        const el = document.createElement('div') as HTMLDivElement;
        const callbackSpy = sinon.spy();
        let highestTimeMilliseconds = 75;
        const promiseDelay = 20; // promise returned from waitForElementTransition has a slight delay we need to account for
        el.style.transitionDelay = highestTimeMilliseconds + 'ms';
        waitForElementTransition(el).then(callbackSpy);
        assert.equal(
            callbackSpy.callCount,
            0,
            'callback is NOT immediately fired after a call to waitForElementTransition(), because the appropriate time hasnt yet elapsed'
        );
        setTimeout(() => {
            assert.equal(
                callbackSpy.callCount,
                1,
                'waitForElementTransition() fires callback at the appropriate time when on an element that has multiple transition delays'
            );
            highestTimeMilliseconds = 100;
            el.style.transitionDuration = highestTimeMilliseconds + 'ms';
            waitForElementTransition(el).then(callbackSpy);
            assert.equal(
                callbackSpy.callCount,
                1,
                'callback is NOT immediately fired after a call to waitForElementTransition(), because the appropriate time hasnt yet elapsed'
            );
            setTimeout(() => {
                assert.equal(
                    callbackSpy.callCount,
                    2,
                    'waitForElementTransition() fires callback at the appropriate time when on an element that has multiple transition durations'
                );
                highestTimeMilliseconds = 200;
                el.style.transitionDuration = '100ms';
                el.style.transitionDelay = highestTimeMilliseconds + 'ms';
                waitForElementTransition(el).then(callbackSpy);
                assert.equal(
                    callbackSpy.callCount,
                    2,
                    'callback is NOT immediately fired after a call to waitForElementTransition(), because the appropriate time hasnt yet elapsed'
                );
                setTimeout(() => {
                    assert.equal(
                        callbackSpy.callCount,
                        3,
                        'waitForElementTransition() fires callback at the appropriate time when on an element that has multiples of both transition delays and durations'
                    );
                    const highestTime = 0.3;
                    highestTimeMilliseconds = highestTime * 1000;
                    el.style.transitionDuration = '100ms';
                    el.style.transitionDelay = highestTime + 's';
                    waitForElementTransition(el).then(callbackSpy);
                    assert.equal(
                        callbackSpy.callCount,
                        3,
                        'callback is NOT immediately fired after a call to waitForElementTransition(), because the appropriate time hasnt yet elapsed'
                    );
                    setTimeout(() => {
                        assert.equal(
                            callbackSpy.callCount,
                            4,
                            'waitForElementTransition() fires callback at the appropriate time when on an element that has multiples of both transition delays and durations, even when one has a seconds unit'
                        );
                        done();
                    }, highestTimeMilliseconds + promiseDelay + 1);
                }, highestTimeMilliseconds + promiseDelay + 1);
            }, highestTimeMilliseconds + promiseDelay + 1);
        }, highestTimeMilliseconds + promiseDelay + 1);
    });
});
