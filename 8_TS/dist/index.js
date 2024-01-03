"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fs = require('fs');
const readline = require('readline');
const wordsIndex = {};
function splitLineIntoWords(line) {
    const words = line
        .toLowerCase()
        .replace(/\+|-|–|—|\.|,|!|\?|:|;|'|"|«|»|\n|\r|\t/g, ' ')
        .split(' ')
        .filter(el => !!el);
    words.forEach(word => word in wordsIndex ? wordsIndex[word] += 1 : wordsIndex[word] = 1);
}
function sortWords(wordsObj) {
    const vector = [];
    Object.keys(wordsObj)
        .sort()
        .map(key => vector.push(wordsObj[key]));
    return vector.toString();
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = process.argv[2] || '/data/file5.txt';
    const readStream = fs.createReadStream(__dirname + filePath, { encoding: 'utf8' });
    const writeStream = fs.createWriteStream(__dirname + '/data/output.txt', { encoding: 'utf8' });
    const rl = readline.createInterface({
        input: readStream,
        crlfDelay: Infinity
    });
    rl.on('line', (chunk) => {
        splitLineIntoWords(chunk);
    });
    rl.on('close', function () {
        writeStream.write(sortWords(wordsIndex));
    });
}))();
//# sourceMappingURL=index.js.map