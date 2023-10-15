function tree(data) {
    let output = '';
    let spaceFiller = '';
    function innerRecursion(data) {
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
                innerRecursion(el);
            });
        }
        spaceFiller = spaceFiller.slice(0, -3);
    }
    innerRecursion(data);
    console.log(output);
}

const data = {
    "name": 1,
    "items": [{
        "name": 2,
        "items": [{ "name": 3 }, { "name": 4 }]
    }, {
        "name": 5,
        "items": [{ "name": 6 }]
    }]
};

const data1 = {
    "name": 1,
    "items": [{
        "name": 2,
        "items": [{ "name": 3 }, { "name": 4, "items": [ { "name": 44 } ] }, { "name": 33 }]
    }, {
        "name": 5,
        "items": [{ "name": 6,  "items": [ { "name": 7 } ] }]
    }]
};

tree(data);

tree(data1);
