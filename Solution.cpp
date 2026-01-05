
#include <array>
#include <limits>
#include <vector>
#include <ranges>
#include <algorithm>
using namespace std;

class Solution {

    static const int DIVISOR = 3;
    static const int NOT_FOUND = numeric_limits<int>::min();
    static const int NOT_POSSIBLE_TO_HAVE_VALID_SUM = 0;

public:
    int maximumSum(vector<int>& input) const {
        ranges::sort(input);
        array<vector<int>, DIVISOR> maxValuesGroupedByRemainder = createMaxValuesGroupedByRemainder(input);
        return findMaxSumOfThreeNumbersDivisibleByThree(maxValuesGroupedByRemainder);
    }

private:
    array<vector<int>, DIVISOR> createMaxValuesGroupedByRemainder(span<const int> input) const {
        array<vector<int>, DIVISOR> maxValuesGroupedByRemainder{};

        int totalElementsInAllGroups = 0;
        for (int i = input.size() - 1; i >= 0; --i) {
            if (maxValuesGroupedByRemainder[input[i] % DIVISOR].size() >= DIVISOR) {
                continue;
            }

            ++totalElementsInAllGroups;
            maxValuesGroupedByRemainder[input[i] % DIVISOR].push_back(input[i]);

            if (allGroupsAreFilledWithRequiredNumberOfMaxValues(totalElementsInAllGroups)) {
                break;
            }
        }
        return maxValuesGroupedByRemainder;
    }

    bool allGroupsAreFilledWithRequiredNumberOfMaxValues(int totalElementsInAllGroups) const {
        return totalElementsInAllGroups == DIVISOR * DIVISOR;
    }

    int findMaxSumOfThreeNumbersDivisibleByThree(span<const vector<int>> maxValuesGroupedByRemainder) const {
        int maxSumThreeValuesDivisibleByThree = NOT_POSSIBLE_TO_HAVE_VALID_SUM;
        int sumMaxValueInEachGroup = 0;

        for (const auto& group : maxValuesGroupedByRemainder) {
            if (group.empty()) {
                sumMaxValueInEachGroup = NOT_FOUND;
                continue;
            }

            sumMaxValueInEachGroup += group[0];

            if (group.size() < DIVISOR) {
                continue;
            }

            int sumCurrentGroup = 0;
            for (const auto& value : group) {
                sumCurrentGroup += value;
            }
            maxSumThreeValuesDivisibleByThree = max(maxSumThreeValuesDivisibleByThree, sumCurrentGroup);
        }

        return max(maxSumThreeValuesDivisibleByThree, sumMaxValueInEachGroup);
    }
};
