// --- Day 2: Red-Nosed Reports ---

// --- Part One ---
import fs from 'node:fs'

// Convert input to array
const input = fs.readFileSync('./day-02/input.txt', 'utf8', (err, data) => data)
const convertedInput = input.split('\n').map((elements) => elements.split(/\s+/).map(Number)) // Convert to number type

function getSafeReport(input) {
  function isSafe(report) {
    for (let i = 0; i < report.length - 1; i++) {
      // Same level
      if (report[i] === report[i + 1]) return false
      // Differ by more then 3 levels
      if (Math.abs(report[i] - report[i + 1]) > 3) return false
      // // Decreasing and increasing levels
      if (report[i] > report[i + 1] && report[i + 1] < report[i + 2]) return false
      if (report[i] < report[i + 1] && report[i + 1] > report[i + 2]) return false
    }
    return true
  }

  let safeReports = 0
  for (const report of input) {
    if (isSafe(report)) safeReports++
  }
  return safeReports
}
const safeReports = getSafeReport(convertedInput)
console.log(safeReports) // 564

// Issues:
// At first I was operating on strings, so some strings is not less or more than other strings, while numbers are!
// For example, if your report contained multi‑digit numbers (like "10" and "2"), the string comparison "10" > "2" would be false (because lexicographically, "1" comes before "2"), even though numerically 10 is greater than 2.
// Remeber to parse proper type.
// Solved with help of ChatGPT
