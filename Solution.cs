
using System;
using System.Collections.Generic;

public class Solution
{
    private static readonly int DIVISOR = 3;
    private static readonly int NOT_FOUND = int.MinValue;
    private static readonly int NOT_POSSIBLE_TO_HAVE_VALID_SUM = 0;

    public int MaximumSum(int[] input)
    {
        Array.Sort(input);
        List<int>[] maxValuesGroupedByRemainder = CreateMaxValuesGroupedByRemainder(input);
        return FindMaxSumOfThreeNumbersDivisibleByThree(maxValuesGroupedByRemainder);
    }

    private List<int>[] CreateMaxValuesGroupedByRemainder(int[] input)
    {
        List<int>[] maxValuesGroupedByRemainder = new List<int>[DIVISOR];
        for (int i = 0; i < maxValuesGroupedByRemainder.Length; ++i)
        {
            maxValuesGroupedByRemainder[i] = [];
        }

        int totalElementsInAllGroups = 0;
        for (int i = input.Length - 1; i >= 0; --i)
        {
            if (maxValuesGroupedByRemainder[input[i] % DIVISOR].Count >= DIVISOR)
            {
                continue;
            }

            ++totalElementsInAllGroups;
            maxValuesGroupedByRemainder[input[i] % DIVISOR].Add(input[i]);

            if (AllGroupsAreFilledWithRequiredNumberOfMaxValues(totalElementsInAllGroups))
            {
                break;
            }
        }
        return maxValuesGroupedByRemainder;
    }

    private bool AllGroupsAreFilledWithRequiredNumberOfMaxValues(int totalElementsInAllGroups)
    {
        return totalElementsInAllGroups == DIVISOR * DIVISOR;
    }

    private int FindMaxSumOfThreeNumbersDivisibleByThree(List<int>[] maxValuesGroupedByRemainder)
    {
        int maxSumThreeValuesDivisibleByThree = NOT_POSSIBLE_TO_HAVE_VALID_SUM;
        int sumMaxValueInEachGroup = 0;

        foreach (var group in maxValuesGroupedByRemainder)
        {
            if (group.Count == 0)
            {
                sumMaxValueInEachGroup = NOT_FOUND;
                continue;
            }

            sumMaxValueInEachGroup += group[0];

            if (group.Count < DIVISOR)
            {
                continue;
            }

            int sumCurrentGroup = 0;
            foreach (int value in group)
            {
                sumCurrentGroup += value;
            }
            maxSumThreeValuesDivisibleByThree = Math.Max(maxSumThreeValuesDivisibleByThree, sumCurrentGroup);
        }

        return Math.Max(maxSumThreeValuesDivisibleByThree, sumMaxValueInEachGroup);
    }
}
