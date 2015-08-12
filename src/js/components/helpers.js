export function cleanData(data) {
    data.forEach(function(block) {
        if (block.hasOwnProperty('copy')) {
             block.copy = block.copy.replace(/[\r\n]+/g, '\n').split('\n');
        }
    });
    return data;
}