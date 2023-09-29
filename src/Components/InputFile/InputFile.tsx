import { useId } from 'react'
import cls from './InputFile.module.css'
import cloudIcon from '../../assets/cloud-arrow-up-svgrepo-com.svg'
import completedCloudIcon from '../../assets/cloud-check-svgrepo-com.svg'
import classNames from 'classnames';

export interface InputTypeProps {
   onChange(event: React.ChangeEvent<HTMLInputElement>): void,
   data: String | ArrayBuffer | null,
}

const InputFile = ({ onChange, data }: InputTypeProps) => {
   const id = useId()
   return (
      <div className={cls.wrapper}>
         <input onChange={onChange} className={cls.inputFile} type="file" id={id} />
         {data ?
            <label className={classNames(cls.label, cls.loaded)} htmlFor={id}>
               <img src={completedCloudIcon} alt="icon" />
               <h2 className={cls.text}>Файл загружен</h2>
            </label>
            :
            <label className={cls.label} htmlFor={id}>
               <img src={cloudIcon} alt="icon" />
               <h2 className={cls.text}>Выбрать файл</h2>
            </label>
         }
      </div>
   );
};

export default InputFile;