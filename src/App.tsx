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

  const menuItems = Object.keys(sortList);

  const checkboxCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    if (event.target.checked) {
      setChecked({ ...checked, [id]: true })
    }
    else {
      setChecked({ ...checked, [id]: false })
    }
  }

  const sort = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isFileLoaded && selectedMethods.length > 0) {
      setIsModalOpen(prevState => true);
      setTimeout(() => {
        selectedMethods.slice(0, -1).forEach(sortMethodName => {
          const worker = new Worker(new URL("./worker.ts", import.meta.url))
          worker.postMessage([sortMethodName, data]);
          worker.onmessage = (e) => {
            setCompletedMethods(prevState => ({ ...prevState, [sortMethodName]: e.data[1] }));
          }
        })
        const sortMethodName = selectedMethods[selectedMethods.length - 1];
        const worker = new Worker(new URL("./worker.ts", import.meta.url))
        worker.postMessage([sortMethodName, data]);
        worker.onmessage = (e) => {
          setCompletedMethods(prevState => ({ ...prevState, [sortMethodName]: e.data[1] }));
          setData(e.data[0]);
        }
      }, 1000)
    }
  }

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const loadFileHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (selectedMethods.length === Object.keys(completedMethods).length) {
      const result = JSON.stringify(data);
      console.log(data);
      console.log(result);
      let a = document.createElement("a");
      let file = new Blob([result], { type: 'text/plain' });
      a.href = URL.createObjectURL(file);
      a.download = "result.txt";
      a.click();
      setIsModalOpen(false);
      setData(null);  
      setisFileLoaded(false);
    }
  }

  useEffect(() => setSelectedMethods(Object.keys(checked).filter(el => checked[el])), [checked]);

  return (
    <div className="app">
      <div className="area" >
        {isModalOpen ? <Modal loadFileHandler={loadFileHandler} selectedMethods={selectedMethods} isOpen={isModalOpen} completedMethods={completedMethods} /> : <></>}
        <div className={classNames("wrapper", isModalOpen ? "hide" : undefined)}>
          <InputFile onChange={onFileChange} data={data} />
          <Menu changeHandler={checkboxCheck} submitHandler={sort} isActive={isFileLoaded && selectedMethods.length > 0} items={menuItems} />
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
