import classNames from "classnames";
import cls from "./Button.module.css"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
   isActive: boolean,
}

const Button = ({ children, isActive, ...otherProps}:ButtonProps) => {
   return (
      <>
         <button className={classNames(cls.btn, isActive ? cls.active : undefined)} {...otherProps} >{children}</button>
      </>
   );
};

export default Button;