function deepEqual(actual, expected) {
    let result = {
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
                let keysExpected = Object.keys(expected);
                // перебираем все итерируемые свойства объекта actual
                keysActual.forEach(key => {
                    // если ранее обнаружено несовпадение, то пропускаем дальнейшие проверки
                    if (!result.equal) {
                        return;
                    }
                    result.path = result.path === '' ? key : result.path + '.' + key;
                    // если в expected нет текущего свойства, то фиксируем негативный результат и путь
                    if (!keysExpected.includes(key)) {
                        result.equal = false;
                        return;
                    }
                    innerRecursion(actual[key], expected[key]);
                    // если рекурсивное сравнение вложенного объекта дало полное совпадение,
                    // то вычёркиваем ключ из списка и пути
                    if (result.equal) {
                        keysExpected = keysExpected.filter(el => el !== key);
                        result.path = result.path.split('.').slice(0, -1).join('.');
                    }
                });
                // если мы перебрали все свойства actual, но в expected оказалось больше свойств
                if (keysExpected.length > 0) {
                    result.equal = false;
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

const obj8 = true;

const obj9 = 1;

const obj10 = {
    'c': 0,
    'ef': false,
    'a': obj6,
    'd': [1, 2, 3 ,4 ,5],
};

const obj11 = {
    'd': [1, 2, 3],
    'ef': false,
    'a': obj6,
    'c': 0,
};

deepEqual(obj10, obj11);
