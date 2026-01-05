
import kotlin.math.max

class Solution {

    private companion object {
        const val DIVISOR = 3
        const val NOT_FOUND = Integer.MIN_VALUE
        const val NOT_POSSIBLE_TO_HAVE_VALID_SUM = 0
    }

    fun maximumSum(input: IntArray): Int {
        input.sort()
        val maxValuesGroupedByRemainder = createMaxValuesGroupedByRemainder(input)
        return findMaxSumOfThreeNumbersDivisibleByThree(maxValuesGroupedByRemainder)
    }

    private fun createMaxValuesGroupedByRemainder(input: IntArray): Array<MutableList<Int>> {
        val maxValuesGroupedByRemainder = Array(DIVISOR) { mutableListOf<Int>() }

        var totalElementsInAllGroups = 0
        for (i in input.size - 1 downTo 0) {
            if (maxValuesGroupedByRemainder[input[i] % DIVISOR].size >= DIVISOR) {
                continue
            }

            ++totalElementsInAllGroups
            maxValuesGroupedByRemainder[input[i] % DIVISOR].add(input[i])

            if (allGroupsAreFilledWithRequiredNumberOfMaxValues(totalElementsInAllGroups)) {
                break
            }
        }
        return maxValuesGroupedByRemainder
    }

    private fun allGroupsAreFilledWithRequiredNumberOfMaxValues(totalElementsInAllGroups: Int): Boolean {
        return totalElementsInAllGroups == DIVISOR * DIVISOR
    }

    private fun findMaxSumOfThreeNumbersDivisibleByThree(maxValuesGroupedByRemainder: Array<MutableList<Int>>): Int {
        var maxSumThreeValuesDivisibleByThree = NOT_POSSIBLE_TO_HAVE_VALID_SUM
        var sumMaxValueInEachGroup = 0

        for (group in maxValuesGroupedByRemainder) {
            if (group.isEmpty()) {
                sumMaxValueInEachGroup = NOT_FOUND
                continue
            }

            sumMaxValueInEachGroup += group[0]

            if (group.size < DIVISOR) {
                continue
            }

            var sumCurrentGroup = 0
            for (value in group) {
                sumCurrentGroup += value
            }
            maxSumThreeValuesDivisibleByThree = max(maxSumThreeValuesDivisibleByThree, sumCurrentGroup)
        }

        return max(maxSumThreeValuesDivisibleByThree, sumMaxValueInEachGroup)
    }
}
