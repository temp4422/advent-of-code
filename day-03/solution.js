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
console.log(multiplicationsResults) // 161085926

// --- Part Two ---

function getEnabledMulSum(input) {
  const mulRegex = new RegExp(/mul\(\d+,\d+\)/g)
  const mulArray = []

  let enableIndex = 0
  let disableIndex = 0
  let stringSlice = ''

  while (disableIndex != -1) {
    disableIndex = input.indexOf("don't()", enableIndex) // JS spec: indexOf(searchString, position)
    stringSlice = input.slice(enableIndex, disableIndex)
    mulArray.push(...stringSlice.match(mulRegex))
    enableIndex = input.indexOf('do()', disableIndex)
  }

  let sum = 0
  for (let i = 0; i < mulArray.length; i++) {
    let digits = mulArray[i].slice(4, -1).split(',')
    sum += digits[0] * digits[1]
  }
  return sum
}
const enabledMultiplicationsResults = getEnabledMulSum(input)
console.log(enabledMultiplicationsResults) // 82045421
