import React, { useEffect, useState, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import EmployeeOrgApp from './EmployeeOrgApp'

function App() {
  const ceo = {
    uniqueId: 1,
    name: 'John',
    children: [
      {
        uniqueId: 2,
        name: 'Jane',
        children: [],
      },
      {
        uniqueId: 3,
        name: 'Android',
        children: [],
      },
    ]
  }

  const emplo = useRef(null);
  const target = useRef(null);
  const employees = new EmployeeOrgApp(ceo);

  const [ emp, setEmp ] = useState('');
  const [ targetEl, setTargetEl] = useState('')

  const handleUndo = () => {
    employees.undo();
  }

  const handleRedo = () => {
    employees.redo();
  }

  const handleShow = () => {
    employees.show();
  }

  const handeleMove = () => {
    employees.move(parseInt(emp), parseInt(targetEl));
  }

  return (
    <div className="App">
      <button onClick={() => handleUndo() }>undo</button><button onClick={() => handleShow() }>show Users</button><button onClick={() => handleRedo()}>redo</button>
      <input type="text"  onChange={(e) => setEmp(e.target.value)}/>
      <input type="text" onChange={(e) => setTargetEl(e.target.value)}/>
      <button onClick={() => handeleMove() }>move</button>
      <div>
      </div>
    </div>
  );
}

export default App;
