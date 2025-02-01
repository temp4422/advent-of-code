// Day 1: Historian Hysteria

// Part 1
import fs from 'node:fs'

// 1. Convert input to array
const input = fs.readFileSync('./input.txt', 'utf8', (err, data) => {
  if (err) throw err
  return data
})
const convertedInput = input.split('\n').map((pair) => pair.split(/\s+/))

// 2. Get distance
function findTotalDistance(input) {
  const sortedInputLeft = input.map((value) => value[0]).toSorted((a, b) => a - b)
  const sortedInputRight = input.map((value) => value[1]).toSorted((a, b) => a - b)

  const sortedInput = []
  for (let i = 0; i < input.length; i++) {
    sortedInput.push([sortedInputLeft[i], sortedInputRight[i]])
  }

  let totalDistance = 0
  for (let i = 0; i < sortedInput.length; i++) {
    totalDistance += Math.abs(sortedInput[i][0] - sortedInput[i][1])
  }
  return totalDistance
}
const totalDistance = findTotalDistance(convertedInput)
console.log(totalDistance)
// Completion time: 00:30
