export function cleanData(data) {
    data.forEach(function(block) {
        if (block.hasOwnProperty('copy')) {
            block.copy = block.copy.replace(/[\r\n]+/g, '\n').split('\n');
        }
    });
    return data;
}

export var getCumulativeOffset = function(obj) {
    var left, top;
    left = top = 0;
    if (obj.offsetParent) {
        do {
            left += obj.offsetLeft;
            top += obj.offsetTop;
        } while (obj = obj.offsetParent);
    }
    return {
        x: left,
        y: top
    };
};

export function throttle(callback, limit) {
    var wait = false; // Initially, we're not waiting
    return function() { // We return a throttled function
        if (!wait) { // If we're not waiting
            callback.call(); // Execute users function
            wait = true; // Prevent future invocations
            setTimeout(function() { // After a period of time
                wait = false; // And allow future invocations
            }, limit);
        }
    }
}

export function prettifyTime(time) {
    // Minutes and seconds
    var mins = ~~(time / 60);
    var secs = time % 60;

    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0)
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs.toFixed(0);
    return ret;
}

export function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};
