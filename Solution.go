
package main

import (
    "math"
    "slices"
)

const DIVISOR = 3
const NOT_FOUND = math.MinInt
const NOT_POSSIBLE_TO_HAVE_VALID_SUM = 0

func maximumSum(input []int) int {
    slices.Sort(input)
    maxValuesGroupedByRemainder := createMaxValuesGroupedByRemainder(input)
    return findMaxSumOfThreeNumbersDivisibleByThree(maxValuesGroupedByRemainder)
}

func createMaxValuesGroupedByRemainder(input []int) [][]int {
    maxValuesGroupedByRemainder := make([][]int, DIVISOR)

    var totalElementsInAllGroups = 0
    for i := len(input) - 1; i >= 0; i-- {
        if len(maxValuesGroupedByRemainder[input[i] % DIVISOR]) >= DIVISOR {
            continue
        }

        totalElementsInAllGroups++
        maxValuesGroupedByRemainder[input[i] % DIVISOR] = append(maxValuesGroupedByRemainder[input[i] % DIVISOR], input[i])

        if allGroupsAreFilledWithRequiredNumberOfMaxValues(totalElementsInAllGroups) {
            break
        }
    }
    return maxValuesGroupedByRemainder
}

func allGroupsAreFilledWithRequiredNumberOfMaxValues(totalElementsInAllGroups int) bool {
    return totalElementsInAllGroups == DIVISOR * DIVISOR
}

func findMaxSumOfThreeNumbersDivisibleByThree(maxValuesGroupedByRemainder [][]int) int {
    maxSumThreeValuesDivisibleByThree := NOT_POSSIBLE_TO_HAVE_VALID_SUM
    sumMaxValueInEachGroup := 0

    for _, group := range maxValuesGroupedByRemainder {
        if len(group) == 0 {
            sumMaxValueInEachGroup = NOT_FOUND
            continue
        }

        sumMaxValueInEachGroup += group[0]

        if len(group) < DIVISOR {
            continue
        }

        sumCurrentGroup := 0
        for _, value := range group {
            sumCurrentGroup += value
        }
        maxSumThreeValuesDivisibleByThree = max(maxSumThreeValuesDivisibleByThree, sumCurrentGroup)
    }

    return max(maxSumThreeValuesDivisibleByThree, sumMaxValueInEachGroup)
}
