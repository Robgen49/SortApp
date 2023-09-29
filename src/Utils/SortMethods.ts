import { ISort } from "./ISort";
import { BinarySearchTree } from "./ThreeSort/BinaryThreeSort";

export class SortMethods implements ISort {

   // MARK: - Метод  сортировки вставками

   insertionSort<Type>(arr: Array<Type>): Array<Type> {
      for (let i = 1; i < arr.length; i++) {
         let current = arr[i];
         let j = i - 1;
         while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
         }
         arr[j + 1] = current;
      }
      return arr;
   }

   // MARK: -Метод сортировки выбором:

   selectionSort<Type>(arr: Array<Type>): Array<Type> {
      for (let i = 0; i < arr.length - 1; i++) {
         let minIndex = i;
         for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
               minIndex = j;
            }
         }
         if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
         }
      }
      return arr;
   }

   // MARK: - Метод сортировки обменом:

   bubbleSort<Type>(arr: Array<Type>): Array<Type> {
      for (let i = 0; i < arr.length - 1; i++) {
         for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
               [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
         }
      }
      return arr;
   }

   // MARK: - Метод быстрой сортировки:

   quickSort<Type>(arr: Array<Type>): Array<Type> {
      if (arr.length <= 1) {
         return arr;
      }
      const pivotIndex = Math.floor(arr.length / 2);
      const pivot = arr[pivotIndex];
      const left = [];
      const right = [];
      for (let i = 0; i < arr.length; i++) {
         if (i === pivotIndex) {
            continue;
         }
         if (arr[i] < pivot) {
            left.push(arr[i]);
         } else {
            right.push(arr[i]);
         }
      }
      return [...this.quickSort(left), pivot, ...this.quickSort(right)];
   }

   threeSort<Type>(arr: Array<Type>): Array<Type> {
      const tree = new BinarySearchTree();
      for (let i = 0; i < arr.length; i++) {
         tree.insert(arr[i]);
      }
      return tree.traverseInOrder();
   }

   heapSort<Type>(arr: Array<Type>): Array<Type> {
      function heapify<Type>(arr: Array<Type>, n: number, i: number):void {
         let largest = i;
         const left = 2 * i + 1;
         const right = 2 * i + 2;
         if (left < n && arr[left] > arr[largest]) {
            largest = left;
         }
         if (right < n && arr[right] > arr[largest]) {
            largest = right;
         }
         if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            heapify(arr, n, largest);
         }
      }

      const n = arr.length;
      for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
         heapify(arr, n, i);
      }
      for (let i = n - 1; i >= 0; i--) {
         [arr[0], arr[i]] = [arr[i], arr[0]];
         heapify(arr, i, 0);
      }
      return arr;
   }

   // Метод сортировки Шелла:

   shellSort<Type>(arr: Array<Type>): Array<Type> {
      const n = arr.length;
      let gap = Math.floor(n / 2);
      while (gap > 0) {
         for (let i = gap; i < n; i++) {
            let temp = arr[i];
            let j = i;
            while (j >= gap && arr[j - gap] > temp) {
               arr[j] = arr[j - gap];
               j -= gap;
            }
            arr[j] = temp;
         }
         gap = Math.floor(gap / 2);
      }
      return arr;
   }

   // Метод сортировки слиянием:

   mergeSort<Type>(arr: Array<Type>): Array<Type> {
      function merge(left: Array<Type>, right: Array<Type>): Array<Type> {
         const result = [];
         let i = 0;
         let j = 0;
         while (i <
            left.length && j < right.length) {
            if (left[i] < right[j]) {
               result.push(left[i]);
               i++;
            } else {
               result.push(right[j]);
               j++;
            }
         }
         return [...result, ...left.slice(i), ...right.slice(j)];
      }

      if (arr.length <= 1) {
         return arr;
      }
      const mid = Math.floor(arr.length / 2);
      const left = this.mergeSort(arr.slice(0, mid));
      const right = this.mergeSort(arr.slice(mid));
      return merge(left, right);
   }
}