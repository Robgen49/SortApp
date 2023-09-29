import { Node } from "./Node";
export class BinarySearchTree<Type> {
   private root: any;
   constructor() {
      this.root = null;
   }
   insert(value: Type) {
      const node = new Node(value);
      if (!this.root) {
         this.root = node;
         return this;
      }
      let current = this.root;
      while (true) {
         if (value === current.getValue()) {
            return undefined;
         }
         if (value < current.getValue()) {
            if (!current.getLeft()) {
               current.setLeft(node);
               return this;
            }
            current = current.getLeft();
         } else {
            if (!current.getRigth()) {
               current.setRight(node);
               return this;
            }
            current = current.getRigth();
         }
      }
   }

   traverseInOrder(node = this.root, result: any = []) {
      if (node.getLeft()) {
         this.traverseInOrder(node.getLeft(), result);
      }
      result.push(node.getValue());
      if (node.right) {
         this.traverseInOrder(node.getRight(), result);
      }
      return result;
   }
}