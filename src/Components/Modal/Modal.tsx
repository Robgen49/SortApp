import classNames from "classnames";
import { completedMethodsType } from "../../App";
import Loader from "../Loader/Loader";
import Button from "../Button/Button";
import cls from "./Modal.module.css"

export interface ModalProps {
   selectedMethods: string[],
   isOpen: boolean,
   completedMethods: completedMethodsType,
   loadFileHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Modal = ({ selectedMethods, completedMethods, loadFileHandler }: ModalProps) => {

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
         <div className={cls.buttonWrapper} >
            <Button onClick={loadFileHandler} isActive={Object.keys(completedMethods).length === selectedMethods.length}>Скачать файл!</Button>
         </div>
      </div>
   );
};

export default Modal;