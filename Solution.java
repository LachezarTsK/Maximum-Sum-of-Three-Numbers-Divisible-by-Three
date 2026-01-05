
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution {

    private static final int DIVISOR = 3;
    private static final int NOT_FOUND = Integer.MIN_VALUE;
    private static final int NOT_POSSIBLE_TO_HAVE_VALID_SUM = 0;

    public int maximumSum(int[] input) {
        Arrays.sort(input);
        List<Integer>[] maxValuesGroupedByRemainder = createMaxValuesGroupedByRemainder(input);
        return findMaxSumOfThreeNumbersDivisibleByThree(maxValuesGroupedByRemainder);
    }

    private List<Integer>[] createMaxValuesGroupedByRemainder(int[] input) {
        List<Integer>[] maxValuesGroupedByRemainder = new List[DIVISOR];
        for (int i = 0; i < maxValuesGroupedByRemainder.length; ++i) {
            maxValuesGroupedByRemainder[i] = new ArrayList<>();
        }

        int totalElementsInAllGroups = 0;
        for (int i = input.length - 1; i >= 0; --i) {
            if (maxValuesGroupedByRemainder[input[i] % DIVISOR].size() >= DIVISOR) {
                continue;
            }

            ++totalElementsInAllGroups;
            maxValuesGroupedByRemainder[input[i] % DIVISOR].add(input[i]);

            if (allGroupsAreFilledWithRequiredNumberOfMaxValues(totalElementsInAllGroups)) {
                break;
            }
        }
        return maxValuesGroupedByRemainder;
    }

    private boolean allGroupsAreFilledWithRequiredNumberOfMaxValues(int totalElementsInAllGroups) {
        return totalElementsInAllGroups == DIVISOR * DIVISOR;
    }

    private int findMaxSumOfThreeNumbersDivisibleByThree(List<Integer>[] maxValuesGroupedByRemainder) {
        int maxSumThreeValuesDivisibleByThree = NOT_POSSIBLE_TO_HAVE_VALID_SUM;
        int sumMaxValueInEachGroup = 0;

        for (var group : maxValuesGroupedByRemainder) {
            if (group.isEmpty()) {
                sumMaxValueInEachGroup = NOT_FOUND;
                continue;
            }

            sumMaxValueInEachGroup += group.get(0);

            if (group.size() < DIVISOR) {
                continue;
            }

            int sumCurrentGroup = 0;
            for (int value : group) {
                sumCurrentGroup += value;
            }
            maxSumThreeValuesDivisibleByThree = Math.max(maxSumThreeValuesDivisibleByThree, sumCurrentGroup);
        }

        return Math.max(maxSumThreeValuesDivisibleByThree, sumMaxValueInEachGroup);
    }
}
