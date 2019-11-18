const path = require('path')
const { exec } = require('child_process')

const testCompilePath = path.resolve(__dirname, './compiler.js')

const p = exec(`yarn && gulp -f ${testCompilePath} buildTest --color`)

p.stdout.on('data', stdout => console.info(stdout))
p.stderr.on('data', stderr => console.info(stderr))
