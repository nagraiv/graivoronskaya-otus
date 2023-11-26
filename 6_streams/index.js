const fs = require('fs');
const readline = require('readline');
const { Transform } = require("stream");

const wordsIndex = {};

function splitLineIntoWords(line) {
    const words = line
        .toLowerCase()
        .replace(/\+|-|–|—|\.|,|!|\?|:|;|'|"|«|»|\n|\r|\t/g, ' ')
        .split(' ')
        .filter(el => !!el);
    words.forEach(word => word in wordsIndex ? wordsIndex[word] += 1 : wordsIndex[word] = 1);
    console.log(words);
    console.log(wordsIndex);
    // return JSON.stringify(wordsIndex);
}

function sortWords(wordsObj) {
    const vector = [];
    Object.keys(wordsObj)
        .sort()
        .map(key => vector.push(wordsObj[key]));
    console.log(vector);
    return vector.toString();
}

// splitLineIntoWords('+1 балл – использован     неоптимальный способ достижения результата\n' +
//     '+2 балл – оптимальный способ достижения результата использован дз:частично');
// sortWords(wordsIndex);
// splitLineIntoWords('Критерии оценки: 1.Факт свершения действия - ДЗ отправлена на проверку');
// sortWords(wordsIndex);

(async () => {
    const readStream = fs.createReadStream(__dirname + '/data/file4.txt', { encoding: 'utf8' });
    const writeStream = fs.createWriteStream(__dirname + '/data/output.txt', { encoding: 'utf8' });

    const transformStream = new Transform({
        transform(chunk, encoding, callback) {
            try {
                console.log(chunk);
                callback(null, chunk.toString().toLowerCase());
            } catch (e) {
                console.log('Error occurred: ', e);
                callback(e);
            }
        },
    });

// читаем по строке, чтобы chunk не разрезал слово
    const rl = readline.createInterface({
        input: readStream,
        crlfDelay: Infinity
    });

    // for await (const chunk of rl) {
    //     // transformStream.write(chunk + '\n');
    //     console.log(chunk);
    //     writeStream.write(chunk + '\n');
    // }
    //
    // writeStream.write('end of file');

    rl.on('line', chunk => {
        splitLineIntoWords(chunk);
        // console.log(chunk);
        // writeStream.write(chunk + '\n');
        // transformStream.write(chunk + '\n');
    })

    rl.on('close',function() {
        writeStream.write( sortWords(wordsIndex) );
        // writeStream.write('end of file');
        // transformStream.write('end of file');
    });

    // readStream.close();
    // writeStream.close();
    // transformStream.pipe(writeStream);

})();
