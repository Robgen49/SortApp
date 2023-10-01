import { sortListType } from "./App";
import { SortMethods } from "./Utils/SortMethods";

const sortList: sortListType = {
   "Сортировка вставками": SortMethods.insertionSort,
   "Сортировка выбором": SortMethods.selectionSort,
   "Сортировка обменом": SortMethods.bubbleSort,
   "Быстрая сортировка": SortMethods.quickSort,
   "Сортировка деревом": SortMethods.sortWithTree,
   "Пирамидальная сортировка": SortMethods.heapSort,
   "Сортировка Шелла": SortMethods.shellSort,
   "Сортировка слиянием": SortMethods.mergeSort,
}

//eslint-disable-next-line
const ctx: Worker = self as any;
ctx.addEventListener("message", (event) => {
   const name = event.data[0];
   const data = event.data[1];
   const response = [];
   const t1 = Date.now();
   const result = sortList[name](data);
   const t2 = Date.now();
   response.push(result);
   response.push((t2-t1)/1000 + "s")
   postMessage(response)
})

export{}