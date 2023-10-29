const fs = require('fs');
const path = require('path');
function makeFileTree(startPath, depth) {
    let currentDepth = depth ?? 100;
    currentDepth += 2;
    const tree = {};
    function innerRecursion(currentPath, currentDepth, currentLevelObj) {
        currentDepth -= 1;
        if (currentDepth > 1) {
            currentLevelObj.name = path.basename(currentPath);
            if (fs.statSync(currentPath).isDirectory()) {
                currentLevelObj.items = [];
                try {
                    fs.readdirSync(currentPath).forEach((item, index, array) => {
                        const nextPath = path.join(currentPath, item);
                        const nextLevelObj = {};
                        currentLevelObj.items.push(nextLevelObj);
                        innerRecursion(nextPath, currentDepth, nextLevelObj);
                    });
                } catch (e) {
                    console.log(e);
                    delete currentLevelObj.items;
                }
            }
        } else if (currentDepth === 1) {
            currentLevelObj.name = path.basename(currentPath);
        }
    }
    innerRecursion(startPath, currentDepth, tree);
    return tree;
}

module.exports = {
    makeFileTree
}
