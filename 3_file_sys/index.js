const { program } = require('commander');
const { printTree } = require('./printTree');
const { makeFileTree } = require('./makeFileTree');

program
    .argument('<path>', 'A starting path of directory to print')
    .option('-d, --depth <number>', 'A depth of recursive directory visit');

program.parse();

const startDir = program.args[0];
const { depth } = program.opts();

const fileTree = makeFileTree(startDir, parseInt(depth));

printTree(fileTree);
