import React from 'react';
import makeCounter, { InjectedCounterProps } from './makeCounter';
const Counter = (props: InjectedCounterProps) => {
  return (
    <div>
      <button onClick={props.onIncrement}>+</button>
      <span>{props.value}</span>
      <button onClick={props.onDecrement}>-</button>
    </div>
  );
};

export default function() {
  return makeCounter(Counter);
}
