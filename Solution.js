
/**
 * @param {number[]} input
 * @return {number}
 */
var maximumSum = function (input) {
    input.sort((x, y) => x - y);
    const maxValuesGroupedByRemainder = createMaxValuesGroupedByRemainder(input);
    return findMaxSumOfThreeNumbersDivisibleByThree(maxValuesGroupedByRemainder);
};

class Util {
    static DIVISOR = 3;
    static NOT_FOUND = Number.MIN_SAFE_INTEGER;
    static NOT_POSSIBLE_TO_HAVE_VALID_SUM = 0;
}

/**
 * @param {number[]} input
 * @return {number[][]}
 */
function createMaxValuesGroupedByRemainder(input) {
    const maxValuesGroupedByRemainder = Array.from(new Array(Util.DIVISOR), () => new Array());

    let totalElementsInAllGroups = 0;
    for (let i = input.length - 1; i >= 0; --i) {
        if (maxValuesGroupedByRemainder[input[i] % Util.DIVISOR].length >= Util.DIVISOR) {
            continue;
        }

        ++totalElementsInAllGroups;
        maxValuesGroupedByRemainder[input[i] % Util.DIVISOR].push(input[i]);

        if (allGroupsAreFilledWithRequiredNumberOfMaxValues(totalElementsInAllGroups)) {
            break;
        }
    }
    return maxValuesGroupedByRemainder;
}

/**
 * @param {number} totalElementsInAllGroups
 * @return {boolean}
 */
function allGroupsAreFilledWithRequiredNumberOfMaxValues(totalElementsInAllGroups) {
    return totalElementsInAllGroups === Util.DIVISOR * Util.DIVISOR;
}

/**
 * @param {number[][]} maxValuesGroupedByRemainder
 * @return {number}
 */
function findMaxSumOfThreeNumbersDivisibleByThree(maxValuesGroupedByRemainder) {
    let maxSumThreeValuesDivisibleByThree = Util.NOT_POSSIBLE_TO_HAVE_VALID_SUM;
    let sumMaxValueInEachGroup = 0;

    for (let group of maxValuesGroupedByRemainder) {
        if (group.length === 0) {
            sumMaxValueInEachGroup = Util.NOT_FOUND;
            continue;
        }

        sumMaxValueInEachGroup += group[0];

        if (group.length < Util.DIVISOR) {
            continue;
        }

        let sumCurrentGroup = 0;
        for (let value of group) {
            sumCurrentGroup += value;
        }
        maxSumThreeValuesDivisibleByThree = Math.max(maxSumThreeValuesDivisibleByThree, sumCurrentGroup);
    }

    return Math.max(maxSumThreeValuesDivisibleByThree, sumMaxValueInEachGroup);
}
