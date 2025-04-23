import React, { useState, useEffect } from "react";
import "./index.css";

// 1 - Получите массив всех валют из API Frankfurter и запишите его в state.
// 2 - Используя map, динамически создайте options внутри select.
// 3 - Получите значения выбранных валют из обоих select и запишите их в state fromCurrency и toCurrency.
// 4 - Создайте state для записи amount из input. Запишите данные из input в этот state.
// 5 - Создайте вторую асинхронную функцию для получения значения конвертации двух валют. Запишите результат конвертации в новый state - convertedAmount. Покажите результат в интерфейсе.
// 6 - Добавьте в обе функции блоки try/catch/finally. Создайте state для loading (true/false) и error ("Сообщение ошибки").
// 7 - Внедрите логику отображения загрузки и ошибок в интерфейсе.
// 8 - Добавьте проверку, чтобы amount был больше 0.

//https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD

const API_URL = "https://api.frankfurter.app";

function App() {
  const [state, setState] = useState([])
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('USD');
  const [amount, setAmount] = useState(1);

  useEffect(() => {
   async function fetchData() {
     const res = await fetch(`${API_URL}/latest`)
     const data = await res.json()
     setState(Object.keys(data.rates))
   }
    fetchData()
  }, [])


  return (
    <div className="app">
      <h1>Currency Exchange Calculator</h1>

      <div className="converter-container">
        <p className="error"></p>

        <div className="input-group">
          <input type="number" placeholder="Amount" className="input-field" value={amount} onChange={(e) => setAmount(e.target.value) } />
          <select className="dropdown" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
            {state.map((s) => {
              return  <option key={s} value={s}>{s}</option>
            })}

          </select>
          <span className="arrow">→</span>
          <select className="dropdown" value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
            {state.map((s) => {
              return  <option key={s} value={s}>{s}</option>
            })}
          </select>
        </div>
        <button className="convert-button">Convert</button>
        <p className="loading">Converting...</p>

        <p className="result"></p>
      </div>
    </div>
  );
}

export default App;
