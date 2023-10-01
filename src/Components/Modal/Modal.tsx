import classNames from "classnames";
import { completedMethodsType, sortListType } from "../../App";
import Loader from "../Loader/Loader"
import cls from "./Modal.module.css"

export interface ModalProps {
   selectedMethods: string[],
   isOpen: boolean,
   completedMethods:completedMethodsType,
}

const Modal = ({ selectedMethods, completedMethods }: ModalProps) => {

   return (
      <div className={classNames(cls.wrapper)}>
         {selectedMethods.map(el =>
            <div className={cls.item}>
               <div className={cls.text}>
                  {el}
               </div>
               <div className={cls.time}>
                  {completedMethods[el] ?
                     completedMethods[el]
                     :
                     <Loader />
                  }
               </div>
            </div>
         )}
      </div>
   );
};

export default Modal;