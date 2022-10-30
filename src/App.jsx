import { useState, useEffect } from "react";
import Header from "./components/Header";
import Button from "./components/Button";
import {formatearDinero, calcularTotalPagar } from './helpers';

function App() {

  
  //1ro= variable 2do funcionDeVr
  const [cantidad, setCantidad] = useState(10000);
  const [meses, setMeses] = useState(6);
  const [total, setTotal] = useState(0);
  const [pago, setPago] = useState(0)

  //use effect se ejecuta cada vez que un componente se actualice, o solo una vez si su arreglo esta vacio
  //max dos dependencias por useEffect
  useEffect(() => {
    const resultadoTotal = calcularTotalPagar(cantidad, meses);
    setTotal(resultadoTotal)

    
  },[cantidad, meses]);

  useEffect(() => {
    //calcular el pago mensual
    setPago(total / meses);
  },[total]);
  
  const MIN = 0;
  const MAX = 20000;
  const STEP = 100;

  function handleChange(e) {
    setCantidad(+e.target.value);//+ le dices que el valor es un nro
  }

  function handleClickDecremento() {
    const valor = cantidad - STEP;

    if(valor < MIN) {
      alert('Cantidad no valida');
      return;
    }
    setCantidad(valor);
  }

  function handleClickIncremento() {
    const valor = cantidad + STEP;

    if(valor > MAX) {
      alert('Cantidad no valida');
      return;
    }
    setCantidad(valor);
  }

  return (
    <div className="my-20 max-w-lg mx-auto bg-white shadow p-10">
      <Header/>

      <div className="flex justify-between my-6">
        <Button
          operador="-"
          fn={handleClickDecremento}
        />
        <Button 
          operador="+"
          fn={handleClickIncremento}

        />
      </div>

      <input 
        type="range"
        className="w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600"
        onChange={handleChange} 
        min={MIN}
        max={MAX}
        step={STEP}
        value={cantidad}
      />

      <p className="text-center my-10 text-5xl font-extrabold text-indigo-600">
        {formatearDinero(cantidad)}
      </p>

      <h2 className="text-2xl font-extrabold text-gray-500 text-center">
          Elige un <span className="text-indigo-600">Plazo</span> a pagar
      </h2>

      <select 
        className="mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center font-bold text-gray-500"
        value={meses}
        onChange={ e => setMeses(+e.target.value)}
      >
        <option value="6">6 Meses</option>
        <option value="12">12 Meses</option>
        <option value="24">24 Meses</option>
      </select>

      <div className="my-5 space-y-3 bg-gray-50 p-5">
        <h2 className="text-2xl font-extrabold text-gray-500 text-center">
            Resumen de <span className="text-indigo-600">Pagos</span>
        </h2>

        <p
          className="text-xl text-gray-500 text-center font-bold"
        >
          {meses} Meses
        </p>
        <p
          className="text-xl text-gray-500 text-center font-bold"
        >
          {formatearDinero(total)} Total a pagar
        </p>
        <p
          className="text-xl text-gray-500 text-center font-bold"
        >
         {formatearDinero(pago)} Mesuales
        </p>
      </div>
    </div>
  )
}

export default App
