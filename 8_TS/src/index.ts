const fs = require('fs');
const readline = require('readline');

interface StringToNumber {
    [key: string]: number
}

// объект промежуточного представления текста в виде словаря
const wordsIndex: StringToNumber = {};

function splitLineIntoWords(line: string) : void {
    const words : string[] = line
        .toLowerCase()
        .replace(/\+|-|–|—|\.|,|!|\?|:|;|'|"|«|»|\n|\r|\t/g, ' ')
        .split(' ')
        .filter(el => !!el);
    words.forEach(word => word in wordsIndex ? wordsIndex[word] += 1 : wordsIndex[word] = 1);
    // console.log(words);
    // console.log(wordsIndex);
}

function sortWords(wordsObj: StringToNumber): string {
    const vector: number[] = [];
    Object.keys(wordsObj)
        .sort()
        .map(key => vector.push(wordsObj[key]));
    // console.log(vector);
    return vector.toString();
}

(async () => {
    // console.log(process.argv[2]);
    const filePath = process.argv[2] || '/data/file5.txt';

    const readStream = fs.createReadStream(__dirname + filePath, { encoding: 'utf8' });
    const writeStream = fs.createWriteStream(__dirname + '/data/output.txt', { encoding: 'utf8' });

    // читаем по строке, чтобы chunk не разрезал слово
    const rl = readline.createInterface({
        input: readStream,
        crlfDelay: Infinity
    });

    // каждую строку разбиваем на слова и индексируем их в объекте wordsIndex
    rl.on('line', (chunk: string): void => {
        splitLineIntoWords(chunk);
    })

    // когда весь текст прочитан, сортируем слова (ключи объекта wordsIndex) и выводим вектор количества слов
    rl.on('close', function(): void {
        writeStream.write( sortWords(wordsIndex) );
    });

})();
