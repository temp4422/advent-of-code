// --- Day 1: Historian Hysteria ---

// --- Part One ---
import fs from 'node:fs'

// Convert input to array
const input = fs.readFileSync('./day-01/input.txt', 'utf8', (err, data) => data)
const convertedInput = input.split('\n').map((pair) => pair.split(/\s+/))

// Sort left and right halfs of input independently
const sortedInputLeft = convertedInput.map((value) => value[0]).toSorted((a, b) => a - b)
const sortedInputRight = convertedInput.map((value) => value[1]).toSorted((a, b) => a - b)

// Get distance
function findTotalDistance(leftHalf, rightHalf) {
  let totalDistance = 0
  for (let i = 0; i < leftHalf.length; i++) {
    totalDistance += Math.abs(leftHalf[i] - rightHalf[i])
  }
  return totalDistance
}
const totalDistance = findTotalDistance(sortedInputLeft, sortedInputRight)
console.log(totalDistance) // 1603498
// Completion time: 00:30

// --- Part Two ---
function getSimilarityScore(leftHalf, rightHalf) {
  // Set similarity score for each left number
  const leftNumbersFrequency = new Map()
  for (const leftNumber of leftHalf) {
    for (const rightNumber of rightHalf) {
      if (leftNumber === rightNumber) {
        leftNumbersFrequency.set(leftNumber, (leftNumbersFrequency.get(leftNumber) ?? 0) + 1)
      }
    }
  }

  const leftNumbersScore = []
  for (const number of leftHalf) {
    leftNumbersScore.push(parseInt(number) * (leftNumbersFrequency.get(number) ?? 0))
  }

  const similarityScore = leftNumbersScore.reduce((a, b) => a + b, 0)
  return similarityScore
}
const similarityScore = getSimilarityScore(sortedInputLeft, sortedInputRight)
console.log(similarityScore) // 25574739
// Completion time: 01:00
