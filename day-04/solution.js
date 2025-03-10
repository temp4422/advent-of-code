// --- Day 4: Ceres Search ---

// --- Part One ---

import fs from 'node:fs'
const input = fs.readFileSync('./day-04/input.txt', 'utf8')

// to be horizontal, vertical, diagonal, written backwards, or even overlapping other words
function countXmas(input) {
  function getCount(inputString) {
    // This function is generated by ChatGPT o3-mini-high
    const xmasMatches = inputString.match(/XMAS/g) || []
    const samxMatches = inputString.match(/SAMX/g) || []
    return xmasMatches.length + samxMatches.length
  }

  // 1. Count in rows
  // Convert input to horizontal strings
  const rows = input.split('\n')

  let rowsCount = 0
  for (const string of rows) {
    rowsCount += getCount(string)
  }

  // 2. Count in columns
  // Convert horizontal strings to vertical strings
  const columns = rows[0].split('').map((_, i) => rows.map((row) => row[i]).join(''))

  let columnsCount = 0
  for (const string of columns) {
    columnsCount += getCount(string)
  }

  // 3. Count diagonal

  // Trick: we count from "0 - columns.length", what is negative number.
  // This mean we count undefined matrix. Why?
  // Because in time we get to column "0" we will have row "10".
  // This allows to traverse full matrix in one pass.
  // Otherwise we need to count twice: first - from middle to top right, second - from middle to bottom left.

  // 3.1 Traverse matrix from bottom left to top right
  const diagonals = []
  for (let i = 0 - columns.length; i < columns.length; i++) {
    let newString = ''
    for (let loc = 0; loc < rows.length; loc++) {
      let char = rows[loc][loc + i]
      if (char) newString += char // Filter undefined
    }
    if (newString) diagonals.push(newString) // Filter empty string
  }

  // 3.2 Traverse matrix from top left to bottom right
  // Because we start from behind the rows, to get full matrix - we need to compensate, i.e. multiply by 2
  for (let i = 0; i < columns.length * 2; i++) {
    let newString = ''
    for (let loc = columns.length - 1; loc >= 0; loc--) {
      let char = columns[loc][i - loc]
      if (char) newString += char
    }
    if (newString) diagonals.push(newString)
  }

  // 3.3 Actual counting
  let diagonalsCount = 0
  for (const string of diagonals) {
    diagonalsCount += getCount(string)
  }

  // 4. Sum all counting results
  let xmasCount = rowsCount + columnsCount + diagonalsCount
  return xmasCount
}
const xmasCount = countXmas(input)
console.log(xmasCount) // 2575

// My attemps

// --- Attemp 1 ---
// function getCount(input) {
//   let count = 0
//   let startIndex = 0
//   while (true) {
//     startIndex = input.indexOf('XMAS', startIndex)
//     if (startIndex === -1) {
//       break
//     } else {
//       count++
//       startIndex += 'XMAS'.length // padding
//     }
//   }
//   // Count reverse
//   startIndex = 0
//   while (true) {
//     startIndex = input.indexOf('SAMX', startIndex)
//     if (startIndex === -1) {
//       break
//     } else {
//       count++
//       startIndex += 'SAMX'.length // padding
//     }
//   }
//   return count
// }
//
// // Left to right direction
// // Half 1
// const diagonals = []
// for (let i = 0; i < rows.length; i++) {
//   let newString = ''
//   for (let j = 0; j < rows[i].length; j++) {
//     if (rows[j][j + i]) newString += rows[j][j + i]
//   }
//   diagonals.push(newString)
// }
// // Half 2
// // Backward generation "rows.length - 2", because we already count middle diagonal above
// for (let i = rows.length - 2; i >= 0; i--) {
//   let newString = ''
//   for (let j = rows[i].length - 1; j >= 0; j--) {
//     if (rows[j][i - (rows.length - 1 - j)]) {
//       newString += rows[j][i - (rows.length - 1 - j)]
//     }
//   }
//   diagonals.push(newString)
// }
// // Right to left direction
// // Half 1
// for (let i = 0; i < columns.length; i++) {
//   let newString = ''
//   for (let j = 0; j < columns[i].length; j++) {
//     if (columns[j][j + i]) newString += columns[j][j + i]
//   }
//   diagonals.push(newString)
// }
// // Half 2
// // Backward generation "rows.length - 2", because we already count middle diagonal above
// for (let i = columns.length - 2; i >= 0; i--) {
//   let newString = ''
//   for (let j = columns[i].length - 1; j >= 0; j--) {
//     if (columns[j][i - (columns.length - 1 - j)]) {
//       newString += columns[j][i - (columns.length - 1 - j)]
//     }
//   }
//   diagonals.push(newString)
// }

// --- Attemp 2 ---
// // Convert horizontal strings to diagonals
// const diagonalInput1 = rows[0]
//   .split('')
//   .map((_, i) => rows.map((_, j) => rows[j][j + i]).join(''))
// const horizontalInputReverse = rows.map((_, i) =>
//   rows[i].split('').reverse().join('')
// )
// const diagonalInput2 = horizontalInputReverse[0]
//   .split('')
//   .map((_, i) => horizontalInputReverse.map((_, j) => horizontalInputReverse[j][j + i]).join(''))
// // Convert vertical strings to diagonals
// const diagonalInput3 = columns[0]
//   .split('')
//   .map((_, i) => columns.map((_, j) => columns[j][j + i]).join(''))
// const verticalInputReverse = columns.map((_, i) =>
//   columns[i].split('').reverse().join('')
// )
// const diagonalInput4 = verticalInputReverse[0]
//   .split('')
//   .map((_, i) => verticalInputReverse.map((_, j) => verticalInputReverse[j][j + i]).join(''))
// const diagonals = [...diagonalInput1, ...diagonalInput2, ...diagonalInput3, ...diagonalInput4]
// console.log(diagonals)
