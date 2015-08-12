export function cleanData(data) {
    data.forEach(function(block) {
        if (block.hasOwnProperty('copy')) {
             block.copy = block.copy.replace(/[\r\n]+/g, '\n').split('\n');
        }
    });
    return data;
}

export var getCumulativeOffset = function (obj) {
    var left, top;
    left = top = 0;
    if (obj.offsetParent) {
        do {
            left += obj.offsetLeft;
            top  += obj.offsetTop;
        } while (obj = obj.offsetParent);
    }
    return {
        x : left,
        y : top
    };
};