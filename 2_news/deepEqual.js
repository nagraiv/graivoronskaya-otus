function deepEqual(actual, expected) {
    let result = {
        // путь к первому несовпадающему свойству
        'path': '',
        'equal': 'unknown',
    };
    function innerRecursion(actual, expected) {
        if (actual === expected || Number.isNaN(actual) && Number.isNaN(expected)) {
            // условие покрывает примитивы и ссылки на один и тот же объект
            result.equal = true;
        } else {
            if (typeof actual === 'object' && typeof expected === 'object' && Array.isArray(actual) === Array.isArray(expected)) {
                // при типе object необходимо исследовать значения свойств (null = null уже рассмотрен)
                // result.equal = 'to explore';
                const keysActual = Object.keys(actual);
                // если в объектах разное количество свойств, то несовпадение найдено
                if (keysActual.length !== Object.keys(expected).length) {
                    result.equal = false;
                    return;
                }
                // перебираем все итерируемые свойства объекта actual
                for (let key of keysActual) {
                    result.path = result.path === '' ? key : result.path + '.' + key;
                    // если в expected нет текущего свойства, то фиксируем негативный результат и путь
                    if (!expected.hasOwnProperty(key)) {
                        result.equal = false;
                        break;
                    }
                    innerRecursion(actual[key], expected[key]);
                    // если рекурсивное сравнение вложенного объекта вернуло ошибку,
                    // то прерываем дальнейшие проверки
                    if (!result.equal) {
                        break;
                    } else {
                        // иначе вычёркиваем проверенный путь перед следующей итерацией
                        result.path = result.path.split('.').slice(0, -1).join('.');
                    }
                }
            } else {
                // в эту ветку попали случаи, когда типы различны, либо примитивы одного типа с разными значениями
                result.equal = false;
            }
        }
    }
    innerRecursion(actual, expected);
    console.log(result.equal ? 'OK' : `ERROR: ${result.path}`);
}

const obj1 = {
    a: {
        b: 1,
    },
};
const obj2 = {
    a: {
        b: 2,
    },
};
const obj3 = {
    a: {
        b: 1,
    },
};

const obj4 = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
};

const obj5 = ['a', 'b', 'c'];

const obj6 = () => {}

const obj7 = () => {}

const obj8 = [true, 10, 'string'];

const obj9 = [10, 'string', true];

const obj10 = {
    'c': 0,
    'ef': false,
    'a': obj6,
    'd': [1, 2, {'gt': true, 'rew': null}],
};

const obj11 = {
    'd': [1, 2, {'gt': true, 'rew': 'null'}],
    'ef': false,
    'a': obj6,
    'c': 0,
};

const obj12 = [[1, 2, 3, 4], {'string': 'yes', 'number': 7}, [null], {'a': false}];
const obj13 = [[1, 2, 3, 4], {'string': 'yes', 'number': 0}, {'0': null}, {'a': false}];

deepEqual(obj8, obj9);
deepEqual(obj10, obj11);
deepEqual(obj12, obj13);
