export class Node {
   private value: any;
   private left: any;
   private right: any;
   constructor(value: any) {
      this.value = value;
      this.left = null;
      this.right = null;
   }
   getRigth() {
      return this.right;
   }
   getLeft() {
      return this.left;
   }
   getValue() {
      return this.value;
   }
   setValue(value: any) {
      this.value = value;
   }
   setRight(rigth: any) {
      this.right = rigth;
   }
   setLeft(left: any) {
      this.left = left;
   }
}