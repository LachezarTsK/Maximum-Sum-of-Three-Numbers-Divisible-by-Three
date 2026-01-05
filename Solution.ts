
function maximumSum(input: number[]): number {
    input.sort((x, y) => x - y);
    const maxValuesGroupedByRemainder = createMaxValuesGroupedByRemainder(input);
    return findMaxSumOfThreeNumbersDivisibleByThree(maxValuesGroupedByRemainder);
};

class Util {
    static DIVISOR = 3;
    static NOT_FOUND = Number.MIN_SAFE_INTEGER;
    static NOT_POSSIBLE_TO_HAVE_VALID_SUM = 0;
}

function createMaxValuesGroupedByRemainder(input: number[]): number[][] {
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

function allGroupsAreFilledWithRequiredNumberOfMaxValues(totalElementsInAllGroups: number): boolean {
    return totalElementsInAllGroups === Util.DIVISOR * Util.DIVISOR;
}

function findMaxSumOfThreeNumbersDivisibleByThree(maxValuesGroupedByRemainder: number[][]): number {
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
