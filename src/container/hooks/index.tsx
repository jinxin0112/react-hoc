import React, { useState, useRef, useEffect, useReducer, useCallback, Reducer } from 'react';

const example = () => {
  const [count, setCount] = useState(0);

  function log() {
    setCount(count + 1);
    setTimeout(() => {
      console.log(count);
    }, 3000);
  }

  return (
    <>
      <div>点击{count}次</div>
      <button onClick={log}>click</button>
    </>
  );
};

const example1 = () => {
  const count = useRef(0);

  function log() {
    count.current++;
    setTimeout(() => {
      console.log(count.current);
    }, 3000);
  }

  return (
    <>
      <div>点击{count.current}次</div>
      <button onClick={log}>click</button>
    </>
  );
};

const example2 = () => {
  const [count, setCount] = useState(0);

  const currentValue = useCurrentValue(count);

  function log() {
    setCount(count + 1);
    setTimeout(() => {
      console.log(currentValue.current);
    }, 3000);
  }

  return (
    <>
      <div>点击{count}次</div>
      <button onClick={log}>click</button>
    </>
  );
};

function useCurrentValue(value: number) {
  const countRef = useRef(0);
  useEffect(() => {
    countRef.current = value;
  }, [value]);
  return countRef;
}

const example3 = () => {
  const [count, setCount] = useState(0);
  // useEffect(() => {
  //   const timeout = setInterval(() => {
  //     setCount(count + 1);
  //   }, 1000);
  //   return () => {
  //     // 在重新执行effect之前执行
  //     console.log('return');
  //     clearInterval(timeout);
  //   };
  // }, [count]);
  useEffect(() => {
    const timeout = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    return () => {
      // 在重新执行effect之前执行
      console.log('return');
      clearInterval(timeout);
    };
  }, []);
  return (
    <>
      <h3>{count}</h3>
    </>
  );
};

interface IState {
  count: number;
  step: number;
}
interface IAction {
  type: string;
  payload?: any;
}
const reducer: Reducer<IState, IAction> = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    default:
      return state;
  }
};
const initialState = {
  count: 0,
  step: 1
};
const example4 = () => {
  const [state, dispatch] = useReducer<Reducer<IState, IAction>>(reducer, initialState);
  // dispatch 不会变
  useEffect(() => {
    const timeout = setInterval(() => {
      dispatch({
        type: 'increment'
      });
    }, 1000);
    return () => clearInterval(timeout);
  }, [dispatch]);
  return (
    <>
      <h3>{state.count}</h3>
    </>
  );
};

const example5 = () => {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const add = useCallback(() => {
    console.log(count + step);
  }, [count, step]);
  useEffect(() => {
    add();
  }, [step]);
  const handleClick = () => {
    setStep(c => c + 1);
  };
  return (
    <>
      <h3>{count}</h3>
      <button onClick={handleClick}>log</button>
    </>
  );
};

export default example5;
