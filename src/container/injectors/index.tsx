import React from 'react';
import makeCounter, { InjectedCounterProps } from './makeCounter';

interface CounterProps extends InjectedCounterProps {
  style?: React.CSSProperties;
}

const Counter = (props: CounterProps) => {
  return (
    <div style={props.style}>
      <button onClick={props.onIncrement}>+</button>
      <span>{props.value}</span>
      <button onClick={props.onDecrement}>-</button>
    </div>
  );
};

export default function() {
  const RealCounter = makeCounter(Counter);
  return <RealCounter style={{ color: 'red' }} />;
}
