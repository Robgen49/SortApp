import './App.css';
import InputFile from './Components/InputFile/InputFile';
import { SortMethods } from './Utils/SortMethods';
import Menu from './Components/Menu/Menu';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import Modal from './Components/Modal/Modal';

export interface checkedListType {
  [index: string]: boolean;
}

export interface completedMethodsType {
  [index: string]: number;
}

export interface sortListType {
  [index: string]: <Type> (arr: Type[]) => Type[]
}

function App() {

  const [data, setData] = useState<any>(null);
  const [isFileLoaded, setisFileLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checked, setChecked] = useState<checkedListType>({});
  const [selectedMethods, setSelectedMethods] = useState<string[]>([]);
  const [completedMethods, setCompletedMethods] = useState<completedMethodsType>({});

  const sortList: sortListType = {
    "Сортировка вставками": SortMethods.insertionSort,
    "Сортировка выбором": SortMethods.selectionSort,
    "Сортировка обменом": SortMethods.bubbleSort,
    "Быстрая сортировка": SortMethods.quickSort,
    "Сортировка деревом": SortMethods.sortWithTree,
    "Пирамидальная сортировка": SortMethods.heapSort,
    "Сортировка Шелла": SortMethods.shellSort,
    "Сортировка слиянием": SortMethods.mergeSort,
  }

  function checkboxCheck(event: React.ChangeEvent<HTMLInputElement>): void {
    const id = event.target.id;
    if (event.target.checked) {
      setChecked({ ...checked, [id]: true })
    }
    else {
      setChecked({ ...checked, [id]: false })
    }
  }


  useEffect(() => setSelectedMethods(Object.keys(checked).filter(el => checked[el])), [checked]);


  function submitHandler(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (isFileLoaded && selectedMethods.length > 0) {
      setIsModalOpen(prevState => true);
      setTimeout(() => selectedMethods.forEach(el => {
        const worker = new Worker(new URL("./worker.ts", import.meta.url))
        worker.postMessage([el, data]);
        worker.onmessage = (e) => {
          console.log(e.data[1])
          setCompletedMethods(prevState => ({ ...prevState, [el]: e.data[1] })); 
        }
      }), 1000)
    }
  }
  const menuItems = Object.keys(sortList);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsText(event.target.files[0]);
      reader.onload = () => {
        if (reader.result) {
          setData(reader.result?.toString().split(" ").map(el => parseInt(el)))
          setisFileLoaded(true)
        }
      }
    }
  }

  return (
    <div className="app">
      <div className="area" >
        {isModalOpen ? <Modal selectedMethods={selectedMethods} isOpen={isModalOpen} completedMethods={completedMethods} /> : <></>}
        <div className={classNames("wrapper", isModalOpen ? "hide" : undefined)}>
          <InputFile onChange={onChange} data={data} />
          <Menu changeHandler={checkboxCheck} submitHandler={submitHandler} isActive={isFileLoaded && selectedMethods.length > 0} items={menuItems} />
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
