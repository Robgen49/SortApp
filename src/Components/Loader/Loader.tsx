import cls from "./Loader.module.css"

export interface LoaderPropsType{

}

const Loader = () => {
   return (
      <div className={cls.loader}></div>
   );
};

export default Loader;