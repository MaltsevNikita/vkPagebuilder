import React, { useState } from 'react';

// Инициализируем начальные опции для select с девятью товарами
const options = [
  { name: 'текст ', price: 100 },
  { name: 'текст + каринка', price: 500 },
  { name: 'текст + галерея', price: 4000 },
  { name: 'текст + слайдер', price: 2500 },
  { name: 'список с маркерами', price: 2100 },
  { name: 'квиз ', price: 5000 },
  { name: 'счётчик ', price: 700 },
  { name: 'миниатюры ', price: 2000 },
  { name: 'карта ', price: 3000 }
];

const App = () => {
  // Создаем состояние для хранения списка select с выбранными товарами
  const [selects, setSelects] = useState([]);

  const addSelect = () => {
    setSelects([...selects, { name: '', price: 0 }]);
  };

  const handleSelectChange = (selectedName, index) => {
    const newSelects = selects.map((select, i) => {
      if (i === index) {
        const selectedOption = options.find(option => option.name === selectedName);
        return { ...select, name: selectedName, price: selectedOption ? selectedOption.price : 0 };
      }
      return select;
    });
    setSelects(newSelects);
  };

  const removeSelect = (index) => {
    const newSelects = selects.filter((_, i) => i !== index);
    setSelects(newSelects);
  };

  const moveSelectUp = (index) => {
    if (index === 0) return;
    const newSelects = [...selects];
    [newSelects[index - 1], newSelects[index]] = [newSelects[index], newSelects[index - 1]];
    setSelects(newSelects);
  };

  const moveSelectDown = (index) => {
    if (index === selects.length - 1) return;
    const newSelects = [...selects];
    [newSelects[index], newSelects[index + 1]] = [newSelects[index + 1], newSelects[index]];
    setSelects(newSelects);
  };

  const calculateCost = () => {
    const totalCost = selects.reduce((acc, select) => acc + select.price, 0);
    console.log('Общая стоимость: ' + totalCost);
    return totalCost
  };

  const clearAll = () => {
    setSelects([]);
  };

  return (
    <div>
      <div className="buttons d-flex justify-content-start">
        <button  class="m-1 btn btn-primary" onClick={addSelect}>+</button>
        <button  class="m-1 btn btn-success" onClick={calculateCost}>Рассчитать стоимость</button>
        <button  class="m-1 btn btn-danger" className='btn btn-danger' onClick={clearAll}>Очистить всё</button>
      </div>

      <h1 className='m-2'>Общая стоимость: {calculateCost()}  руб.</h1>

      {selects.map((select, index) => (
        <div key={index}>
          <div className="selectBlock d-flex mt-5">
            <select
            value={select.name}
            className="m-1"
            onChange={(e) => handleSelectChange(e.target.value, index)}
          >
            <option value="">Выберите секцию</option>
            {options.map((option) => (
              <option key={option.name} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
          <div className="buttonsSelect d-flex justify-content-start">
            <button class="btn btn-primary m-1 btn-sm"  onClick={() => moveSelectUp(index)}>Вверх</button>
            <button class="btn btn-primary m-1 btn-sm" onClick={() => moveSelectDown(index)}>Вниз</button>
            <button class="btn btn-primary m-1 btn-sm" onClick={() => removeSelect(index)}>Удалить</button>
          </div>
          </div>

        </div>
      ))}
    </div>
  );
};

export default App;
