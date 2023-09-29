import cls from './Menu.module.css'
import classNames from 'classnames';
import Button from '../Button/Button';

export interface MenuProps {
   isActive: boolean,
   items: string[],
   changeHandler(event: React.ChangeEvent<HTMLInputElement>): void,
   submitHandler(event: React.FormEvent<HTMLFormElement>): void,
}

const Menu = ({ changeHandler, submitHandler,items, isActive }: MenuProps) => {
   return (
            <div className={classNames(cls.wrapper)} >
               <form className={cls.wrapper} onSubmit={submitHandler} action="">
                  <div className={cls.menu}>
                     <h2 className={cls.title}>Выберете метод(ы) сортировки</h2>
                     {items.map(el =>
                        <div className={cls.item} >
                           <input id={el} type="checkbox" onChange={changeHandler} className={cls.checkbox} />
                           <label className={cls.text} htmlFor={el}>
                              <div className={cls.text}>{el}</div>
                           </label>
                        </div>)}
                  </div>
                  <Button isActive={isActive} type='submit'>Сортировать!</Button>
               </form>
            </div>
   )
}

export default Menu;