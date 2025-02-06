// --- Day 3: Mull It Over ---

// --- Part One ---

import fs from 'node:fs'
const input = fs.readFileSync('./day-03/input.txt', 'utf8')

function getDigitsArray(input) {
  const mulRegex = new RegExp(/mul\((\d+),(\d+)\)/g)
  const matches = input.matchAll(mulRegex)
  const digitsArray = Array.from(matches, (match) => [match[1], match[2]])
  return digitsArray
}
const digitsArray = getDigitsArray(input)

function getMultiplicationProduct(inputArray) {
  return inputArray.reduce((acc, value) => acc + value[0] * value[1], 0)
}
const multiplicationsResults = getMultiplicationProduct(digitsArray)
console.log(multiplicationsResults) // 161085926

// --- Part Two ---

function getEnabledMultiplicationProduct(input) {
  const digitsArray = []
  let enableIndex = 0
  let disableIndex = 0
  let stringSlice = ''

  while (disableIndex != -1) {
    disableIndex = input.indexOf("don't()", enableIndex) // JS spec: indexOf(searchString, position)
    stringSlice = input.slice(enableIndex, disableIndex)
    digitsArray.push(getDigitsArray(stringSlice))
    enableIndex = input.indexOf('do()', disableIndex)
  }

  let sum = 0
  for (const array of digitsArray) {
    sum += getMultiplicationProduct(array)
  }
  return sum
}
const enabledMultiplicationsResults = getEnabledMultiplicationProduct(input)
console.log(enabledMultiplicationsResults) // 82045421
