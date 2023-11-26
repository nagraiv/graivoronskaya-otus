const fs = require('fs');
const readline = require('readline');

// объект промежуточного представления текста в виде словаря
const wordsIndex = {};

function splitLineIntoWords(line) {
    const words = line
        .toLowerCase()
        .replace(/\+|-|–|—|\.|,|!|\?|:|;|'|"|«|»|\n|\r|\t/g, ' ')
        .split(' ')
        .filter(el => !!el);
    words.forEach(word => word in wordsIndex ? wordsIndex[word] += 1 : wordsIndex[word] = 1);
    // console.log(words);
    // console.log(wordsIndex);
}

function sortWords(wordsObj) {
    const vector = [];
    Object.keys(wordsObj)
        .sort()
        .map(key => vector.push(wordsObj[key]));
    // console.log(vector);
    return vector.toString();
}

(async () => {
    const readStream = fs.createReadStream(__dirname + '/data/file5.txt', { encoding: 'utf8' });
    const writeStream = fs.createWriteStream(__dirname + '/data/output.txt', { encoding: 'utf8' });

    // читаем по строке, чтобы chunk не разрезал слово
    const rl = readline.createInterface({
        input: readStream,
        crlfDelay: Infinity
    });

    // каждую строку разбиваем на слова и индексируем их в объекте wordsIndex
    rl.on('line', chunk => {
        splitLineIntoWords(chunk);
     })

    // когда весь текст прочитан, сортируем слова (ключи объекта wordsIndex) и выводим вектор количества слов
    rl.on('close',function() {
        writeStream.write( sortWords(wordsIndex) );
    });

})();
