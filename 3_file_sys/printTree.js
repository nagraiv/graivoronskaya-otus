function printTree(data, depth) {
    let currentDepth = depth ?? 100;
    currentDepth += 2;
    let output = '';
    let spaceFiller = '';
    function innerRecursion(data, currentDepth) {
        currentDepth -= 1;
        if (currentDepth > 0) {
            output += spaceFiller + data.name + '\n';

            if (Array.isArray(data.items) && data.items.length > 0) {
                if (spaceFiller.slice(-3) === '├──') {
                    spaceFiller = spaceFiller.slice(0, -3) + '│  ';
                }
                if (spaceFiller.slice(-3) === '└──') {
                    spaceFiller = spaceFiller.slice(0, -3) + '   ';
                }
                data.items.forEach((el, index, array) => {
                    if (index === array.length - 1) {
                        spaceFiller += '└';
                    } else {
                        spaceFiller += '├';
                    }
                    spaceFiller += '──';
                    innerRecursion(el, currentDepth);
                });
            }
        }
        spaceFiller = spaceFiller.slice(0, -3);
    }
    innerRecursion(data, currentDepth);
    console.log(output);
}

module.exports = {
    printTree
}
