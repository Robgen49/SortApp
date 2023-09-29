import classNames from "classnames";
import cls from "./Button.module.css"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
   clickHandler?(event:React.MouseEvent<HTMLButtonElement>):void,
   isActive: boolean,
}

const Button = ({clickHandler, children, isActive, ...otherProps}:ButtonProps) => {
   return (
      <>
         <button className={classNames(cls.btn, isActive ? cls.active : undefined)} {...otherProps} onClick={clickHandler} >{children}</button>
      </>
   );
};

export default Button;