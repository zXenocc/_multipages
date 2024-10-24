import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import './Calculator.css';

const Calculator = () => {
    const [currentOperand, setCurrentOperand] = useState('');
    const [previousOperand, setPreviousOperand] = useState('');
    const [currentOperator, setCurrentOperator] = useState(null);
    const [result, setResult] = useState(null);
    const [lastOperand, setLastOperand] = useState(null);

    const updateDisplay = () => {
        return currentOperand || result || "0";
    };

    const appendNumber = (number) => {
        if (number === '.' && currentOperand.includes('.')) return;
        setCurrentOperand((prev) => prev + number);
    };

    const operate = (operator) => {
        if (currentOperand === '') return;
        if (previousOperand !== '') {
            calculateResult();
        }
        setCurrentOperator(operator);
        setPreviousOperand(currentOperand);
        setCurrentOperand('');
    };

    const calculateResult = () => {
        let calculation;
        const prev = parseFloat(previousOperand);
        const current = currentOperand ? parseFloat(currentOperand) : lastOperand;

        if (isNaN(prev) || isNaN(current)) return;

        switch (currentOperator) {
            case '+':
                calculation = prev + current;
                break;
            case '-':
                calculation = prev - current;
                break;
            case '*':
                calculation = prev * current;
                break;
            case '/':
                calculation = prev / current;
                break;
            default:
                return;
        }

        setResult(calculation);
        setCurrentOperand('');
        setPreviousOperand(calculation.toString());
        setLastOperand(current);
    };

    const clearDisplay = () => {
        setCurrentOperand('');
        setPreviousOperand('');
        setCurrentOperator(null);
        setLastOperand(null);
        setResult(null);
    };

    const deleteLast = () => {
        setCurrentOperand((prev) => prev.slice(0, -1));
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            calculateResult();
        } else if (event.key === 'Escape') {
            clearDisplay();
        } else if (event.key === 'Backspace') {
            deleteLast();
        } else if (['+', '-', '*', '/'].includes(event.key)) {
            operate(event.key);
        } else if (event.key === '.') {
            appendNumber(event.key);
        } else if (!isNaN(event.key)) {
            appendNumber(event.key);
        }
    };

    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className="calculator">
            <div className="display">
                <input type="text" id="display" value={updateDisplay()} disabled />
            </div>
            <div className="buttons">
                <button onClick={clearDisplay}>C</button>
                <button onClick={() => operate('/')}>÷</button>
                <button onClick={() => operate('*')}>×</button>
                <button onClick={deleteLast}>DEL</button>
                <button onClick={() => appendNumber('7')}>7</button>
                <button onClick={() => appendNumber('8')}>8</button>
                <button onClick={() => appendNumber('9')}>9</button>
                <button onClick={() => operate('-')}>-</button>
                <button onClick={() => appendNumber('4')}>4</button>
                <button onClick={() => appendNumber('5')}>5</button>
                <button onClick={() => appendNumber('6')}>6</button>
                <button onClick={() => operate('+')}>+</button>
                <button onClick={() => appendNumber('1')}>1</button>
                <button onClick={() => appendNumber('2')}>2</button>
                <button onClick={() => appendNumber('3')}>3</button>
                <button onClick={calculateResult} id="equal">=</button>
                <button onClick={() => appendNumber('0')} className="zero">0</button>
                <button onClick={() => appendNumber('.')}>.</button>
            </div>
        </div>
    );
};

export default Calculator;











// import React, { useState, useEffect } from 'react';

// import './Calculatorr.css'

// function Calculator() {
//   const [currentOperand, setCurrentOperand] = useState('');
//   const [previousOperand, setPreviousOperand] = useState('');
//   const [operation, setOperation] = useState(undefined);
//   const [shouldResetDisplay, setShouldResetDisplay] = useState(false);
//   const [lastOperand, setLastOperand] = useState('');
//   const [lastOperation, setLastOperation] = useState(undefined);

//   useEffect(() => {
//     const handleKeyboardInput = (event) => {
//       const key = event.key;

//       if (isFinite(key)) {
//         appendNumber(key);
//       } else if (key === '+') {
//         handleOperatorClick('+');
//       } else if (key === '-') {
//         handleOperatorClick('-');
//       } else if (key === '*') {
//         handleOperatorClick('*');
//       } else if (key === '/') {
//         handleOperatorClick('÷');
//       } else if (key === 'Enter') {
//         event.preventDefault();
//         handleEqualsClick();
//       } else if (key === 'Escape') {
//         clearDisplay();
//       } else if (key === '%') {
//         handlePercentClick();
//       } else if (key === 'Backspace') {
//         clearEntry();
//       } else if (key === '.') {
//         appendNumber('.');
//       } else if (key === 'c' || key === 'C') {
//         clearDisplay();
//       }
//     };

//     window.addEventListener('keydown', handleKeyboardInput);

//     return () => {
//       window.removeEventListener('keydown', handleKeyboardInput);
//     };
//   }, [currentOperand, previousOperand, operation]);

//   const clearDisplay = () => {
//     setCurrentOperand('');
//     setPreviousOperand('');
//     setOperation(undefined);
//     setLastOperand('');
//     setLastOperation(undefined);
//     document.getElementById('display').textContent = '0';
//   };

//   const clearEntry = () => {
//     setCurrentOperand(currentOperand.slice(0, -1));
//     if (currentOperand === '') {
//       setCurrentOperand('0');
//     }
//     updateDisplay();
//   };

//   const appendNumber = (number) => {
//     if (document.getElementById('display').textContent === '0' || shouldResetDisplay) {
//       document.getElementById('display').textContent = '';
//       setShouldResetDisplay(false);
//     }

//     if (currentOperand.replace(/\s+/g, '').length >= 9) return;

//     if (number === '.' && currentOperand.includes('.')) return;

//     setCurrentOperand(currentOperand.replace(/\s+/g, '') + number);
//     updateDisplay();
//   };

//   const chooseOperation = (op) => {
//     if (currentOperand === '') return;
//     if (previousOperand !== '') {
//       compute();
//     }
//     setOperation(op);
//     setPreviousOperand(currentOperand);
//     setCurrentOperand('');
//     setShouldResetDisplay(true);
//   };

//   const compute = () => {
//     let computation;
//     const prev = parseFloat(previousOperand);
//     const current = parseFloat(currentOperand || previousOperand);
//     if (isNaN(prev) || isNaN(current)) return;

//     switch (operation || lastOperation) {
//       case '+':
//         computation = prev + current;
//         break;
//       case '-':
//         computation = prev - current;
//         break;
//       case '*':
//         computation = prev * current;
//         break;
//       case '÷':
//         computation = prev / current;
//         break;
//       default:
//         return;
//     }

//     document.getElementById('display').textContent = computation;
//     setCurrentOperand(computation);
//     setLastOperand(current);
//     setLastOperation(operation);
//     setOperation(undefined);
//     setPreviousOperand('');
//   };

//   const updateDisplay = () => {
//     document.getElementById('display').textContent = formatNumberWithSpaces(currentOperand);
//   };

//   const handleOperatorClick = (op) => {
//     chooseOperation(op);
//   };

//   const handleEqualsClick = () => {
//     if (operation) {
//       compute();
//     } else if (lastOperation) {
//       setPreviousOperand(currentOperand);
//       setCurrentOperand(lastOperand);
//       setOperation(lastOperation);
//       compute();
//     }
//   };

//   const handlePercentClick = () => {
//     setCurrentOperand(String(parseFloat(currentOperand) / 100));
//     updateDisplay();
//   };

//   const handleNegateClick = () => {
//     setCurrentOperand(String(parseFloat(currentOperand) * -1));
//     updateDisplay();
//   };

//   const formatNumberWithSpaces = (number) => {
//     const numStr = number.toString().replace(/\s+/g, '');
//     if (numStr.length > 9) return numStr.slice(0, 9);

//     return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
//   };

//   return (
//     <div className="calculator">
//       <div id="display" className="display">0</div>
//       <div className="buttons">
//         <button className="btn btn-success" id="clear" onClick={clearDisplay}>AC</button>
//         <button className="btn btn-success negate" onClick={handleNegateClick}>+/-</button>
//         <button className="btn btn-success percent" onClick={handlePercentClick}>%</button>
//         <button className="btn btn-danger divide" onClick={() => handleOperatorClick('÷')}>÷</button>

//         <button className="btn btn-warning" onClick={() => appendNumber('7')}>7</button>
//         <button className="btn btn-warning" onClick={() => appendNumber('8')}>8</button>
//         <button className="btn btn-warning" onClick={() => appendNumber('9')}>9</button>
//         <button className="btn btn-danger" id="multiply" onClick={() => handleOperatorClick('*')}>×</button>

//         <button className="btn btn-warning" onClick={() => appendNumber('4')}>4</button>
//         <button className="btn btn-warning" onClick={() => appendNumber('5')}>5</button>
//         <button className="btn btn-warning" onClick={() => appendNumber('6')}>6</button>
//         <button className="btn btn-danger" id="subtract" onClick={() => handleOperatorClick('-')}>−</button>

//         <button className="btn btn-warning" onClick={() => appendNumber('1')}>1</button>
//         <button className="btn btn-warning" onClick={() => appendNumber('2')}>2</button>
//         <button className="btn btn-warning" onClick={() => appendNumber('3')}>3</button>
//         <button className="btn btn-danger" id="add" onClick={() => handleOperatorClick('+')}>+</button>

//         <button className="btn btn-warning" id="zero" onClick={() => appendNumber('0')}>0</button>
//         <button className="btn btn-warning" id="decimal" onClick={() => appendNumber('.')}>.</button>
//         <button className="btn btn-danger" id="equals" onClick={handleEqualsClick}>=</button>
//       </div>
//     </div>
//   );
// }

// export default Calculator;