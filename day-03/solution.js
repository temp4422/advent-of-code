// --- Day 3: Mull It Over ---

// --- Part One ---

import fs from 'node:fs'
const input = fs.readFileSync('./day-03/input.txt', 'utf8')

function getMulSum(input) {
  const mulRegex = new RegExp(/mul\(\d+,\d+\)/g)
  const mulArray = input.match(mulRegex)

  let sum = 0
  for (let i = 0; i < mulArray.length; i++) {
    let digits = mulArray[i].slice(4, -1).split(',')
    sum += digits[0] * digits[1]
  }
  return sum
}
const multiplicationsResults = getMulSum(input)
console.log(multiplicationsResults)
