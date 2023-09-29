import './App.css';
import InputFile from './Components/InputFile/InputFile';
import Menu from './Components/Menu/Menu';
import { useEffect, useState } from 'react';

export interface checkedList {
  [index: string]: boolean;
}

function App() {

  const [data, setData] = useState<String | ArrayBuffer | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [checked, setChecked] = useState<checkedList>({});
  const [selectedMethods, setSelectedMethods] = useState<string[]>([]);

  function checkboxCheck(event: React.ChangeEvent<HTMLInputElement>): void {
    const id = event.target.id;
    if (event.target.checked) {
      setChecked({ ...checked, [id]: true })
    }
    else {
      setChecked({ ...checked, [id]: false })
    }
  }

  useEffect(() => setSelectedMethods(Object.keys(checked).filter(el => checked[el]))
    , [checked]);

  function submitHandler(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (isOpen && selectedMethods.length > 0) {
      alert(selectedMethods)
    }
  }

  const menuItems = [
    "Сортировка вставками",
    "Сортировка выбором",
    "Сортировка обменом",
    "Быстрая сортировка",
    "Сортировка деревом",
    "Пирамидальная сортировка",
    "Сортировка Шелла",
    "Сортировка слиянием",
  ]

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsText(event.target.files[0]);
      reader.onload = () => {
        setData(reader.result)
        setIsOpen(true)
      }
    }
  }

  return (
    <div className="app">
      <div className="area" >
        <div className="wrapper">
          <InputFile onChange={onChange} data={data} />
          <Menu changeHandler={checkboxCheck} submitHandler={submitHandler} isActive={isOpen && selectedMethods.length > 0} items={menuItems} />
        </div>
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div >
    </div>
  );
}

export default App;
