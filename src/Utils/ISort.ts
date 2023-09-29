export interface ISort {
   bubbleSort<Type>(array: Array<Type>): Array<Type>;
   insertionSort<Type>(array: Array<Type>): Array<Type>;
   selectionSort<Type>(array: Array<Type>): Array<Type>;
   quickSort<Type>(array: Array<Type>): Array<Type>;
   shellSort<Type>(array: Array<Type>): Array<Type>;
   mergeSort<Type>(array: Array<Type>): Array<Type>;
   threeSort<Type>(array: Array<Type>): Array<Type>;
   heapSort<Type>(array: Array<Type>): Array<Type>;
}