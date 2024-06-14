import { AnimationArrayType } from "@/lib/types";

function partition(
  array: number[],
  begin: number,
  finish: number,
  animations: AnimationArrayType
) {
  let i = begin;
  let j = finish + 1;
  const condition = true;
  const pivot = array[begin];

  while (condition) {
    /**
     * Find the first element from the left that is greater than the pivot
     * If the element is greater than the pivot, stop
     * If the element is less than the pivot, continue
     *
     * array[++i] => 'i = i + 1' and then array[i]
     */
    while (array[++i] <= pivot) {
      if (i === finish) break;
      animations.push([[i], false]);
    }
    /**
     * Find the first element from the right that is less than the pivot
     * If the element is less than the pivot, stop
     * If the element is greater than the pivot, continue
     */
    while (array[--j] >= pivot) {
      if (j === begin) break;
      animations.push([[j], false]);
    }
    /**
     * If the left pointer is greater than the right pointer, break
     */

    if (j <= i) break;
    /**
     * Swap the elements at the left and right pointers
     * array[i] and array[j] are the elements to be swapped
     * [array[i], array[j]] = [array[j], array[i]] swaps the elements
     */
    animations.push([[i, array[j]], true]);
    animations.push([[j, array[i]], true]);
    [array[i], array[j]] = [array[j], array[i]];
  }
  /**
   * Swap the pivot with the element at the right pointer
   * array[begin] is the pivot
   */
  animations.push([[begin, array[j]], true]);
  animations.push([[j, array[begin]], true]);
  [array[begin], array[j]] = [array[j], array[begin]];
  return j;
}

function runQuickSort(
  array: number[],
  begin: number,
  finish: number,
  animations: AnimationArrayType
) {
  /**
   * If the array has more than one element
   * If the array has only one element, it is already sorted
   */
  if (begin < finish) {
    /**
     * Partition the array into two halves
     */
    const part = partition(array, begin, finish, animations);
    /**
     * Recursively sort the two halves
     */
    runQuickSort(array, begin, part - 1, animations);
    runQuickSort(array, part + 1, finish, animations);
  }
}
export function generateQuickSortAnimationArray(
  isSorting: boolean,
  array: number[],
  runAnimation: (animations: AnimationArrayType) => void
) {
  if (isSorting) return;
  if (array.length <= 1) return array;

  const animations: AnimationArrayType = [];
  const auxiliaryArray = array.slice();
  runQuickSort(auxiliaryArray, 0, array.length - 1, animations);
  runAnimation(animations);
}
