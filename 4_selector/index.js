const selectorStringify = (selectorArrOfObj) => {
    const selectorArrOfStr = [];
    selectorArrOfObj.forEach(obj => {
        let str = '';
        if (obj.hasOwnProperty('nesting')) {
            str += obj['nesting'] + ' ';
        }
        if (obj.hasOwnProperty('tag')) {
            str += obj['tag'];
        }
        if (obj.hasOwnProperty('classList') && obj.classList.length) {
            str += '.' + obj['classList'].join('.');
        }
        if (obj.hasOwnProperty('pseudo')) {
            if (obj['pseudo'] === 'first') {
                str += ':first-child';
            } else if (obj['pseudo'] === 'last') {
                str += ':last-child';
            } else {
                str += `:nth-child(${obj['pseudo']})`;
            }
        }
        if (str !== '') {
            selectorArrOfStr.push(str);
        }
    });
    return selectorArrOfStr.join(' ');
}

const selectorTest = [
    {
        'tag': 'ul',
    },
    {
        'tag': 'li',
        'classList': ['list_item', 'green'],
    },
    {
        'tag': '',
        'classList': ['lazy_lading'],
        'pseudo': 'last',
    }
];

// console.log(selectorStringify(selectorTest));

const getPath = ( node ) => {
    if (node.tagName.toLowerCase() === 'html') {
        return 'html';
    }
    let selector = [];
    let isSingle = false;
    let currentNode = node;

    // собираем цепочку селекторов (тэгов и классов) от элемента до body
    do {
        const obj = {
            'tag': currentNode.tagName.toLowerCase(),
            'classList': Array.from(currentNode.classList),
            // 'node': currentNode,
        };
        selector.unshift(obj);

        currentNode = currentNode.parentNode;
        isSingle = document.querySelectorAll( selectorStringify(selector) ).length === 1;
    } while (currentNode.tagName.toLowerCase() !== 'html' && !isSingle);

    // если полный набор тэгов с классами не даёт единственного элемента - добавляем псевдоэлементы
    if (!isSingle) {
        currentNode = node;
        for (let i = selector.length - 1; i >= 0; i -= 1) {
            if (currentNode.parentNode.children.length === 1 || selector[i].tag === 'body') {
                currentNode = currentNode.parentNode;
                continue;
            }
            const obj = {};
            // определяем номер потомка
            const index = Array.from( currentNode.parentNode.children ).indexOf( currentNode );
            if (index === 0) {
                obj.pseudo = 'first';
            } else if (currentNode.nextElementSibling === null) {
                obj.pseudo = 'last';
            } else {
                obj.pseudo = (index + 1).toString();
            }

            Object.assign(selector[i], obj);
            if (document.querySelectorAll( selectorStringify(selector) ).length === 1) {
                break;
            }
            currentNode = currentNode.parentNode;
        }
    }

    // если полный набор тэгов с классами и псевдоэлементами не даёт единственного элемента - добавляем прямую вложенность
    if (document.querySelectorAll(selectorStringify(selector)).length > 1) {
        console.log('трудный случай!');
        currentNode = node;
        for (let i = selector.length - 1; i > 0; i -= 1) {
            // selector.splice(i, 0, { 'tag': '>' });
            Object.assign(selector[i], { 'nesting': '>' });
            if (document.querySelectorAll( selectorStringify(selector) ).length === 1) {
                break;
            }
            currentNode = currentNode.parentNode;
        }
    }

    // убираем избыточные селекторы
    for (let i = 0; i < selector.length; i += 1) {
        const item = selector[i];
        if (item.hasOwnProperty('nesting')) {
            const tagNesting = item.nesting;
            delete item.nesting;
            if (document.querySelectorAll(selectorStringify(selector)).length > 1 || document.querySelector(selectorStringify(selector)) !== node) {
                item.nesting = tagNesting;
            }
        }
        if (item.hasOwnProperty('pseudo')) {
            const tagPseudo = item.pseudo;
            delete item.pseudo;
            if (document.querySelectorAll(selectorStringify(selector)).length > 1 || document.querySelector(selectorStringify(selector)) !== node) {
                item.pseudo = tagPseudo;
            }
        }
        if (item.hasOwnProperty('tag')) {
            const tagName = item.tag;
            delete item.tag;
            if (selectorStringify(selector) === '' ||
                (( item.hasOwnProperty('pseudo') || i < selector.length - 1 && selector[i+1].hasOwnProperty('nesting')) && !(item.hasOwnProperty('classList') && item.classList.length)) ||
                document.querySelectorAll(selectorStringify(selector)).length > 1 ||
                document.querySelector(selectorStringify(selector)) !== node) {
                item.tag = tagName;
            }
        }
        if (item.hasOwnProperty('classList') && item.classList.length) {
            item.classList.forEach(classItem => {
                const classListCopy = [...item.classList];
                item.classList = item.classList.filter(el => el !== classItem);
                if (selectorStringify(selector) === '' ||
                    item.hasOwnProperty('pseudo') ||
                    i < selector.length - 1 && selector[i+1].hasOwnProperty('nesting') ||
                    document.querySelectorAll(selectorStringify(selector)).length > 1 ||
                    document.querySelector(selectorStringify(selector)) !== node) {
                    item.classList = classListCopy;
                }
            });
        }
    }
    selector = selector.filter(item => item.hasOwnProperty('tag') || (item.hasOwnProperty('classList') && item.classList.length));
    console.log(selector);

    return selectorStringify(selector);
}
