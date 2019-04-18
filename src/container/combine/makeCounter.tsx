import React, { useState } from 'react';
import { Subtract } from 'utility-types';

export interface InjectedCounterProps {
  value: number;
  onIncrement(): void;
  onDecrement(): void;
}

export interface MakeCounterProps {
  maxValue: number;
  minValue: number;
}

const makeCounter = <P extends InjectedCounterProps>(
  Component: React.ComponentType<P>
) => {
  return (props: Subtract<P, InjectedCounterProps> & MakeCounterProps) => {
    const [value, setValue] = useState(0);
    const { maxValue, minValue } = props;
    const counterProps = {
      value,
      onIncrement: () => {
        setValue(pre => (pre + 1 > maxValue ? pre : pre + 1));
      },
      onDecrement: () => {
        setValue(pre => (pre - 1 < minValue ? pre : pre - 1));
      }
    };
    return (
      <Component {...props as P & MakeCounterProps} {...counterProps as P} />
    );
  };
};

export default makeCounter;
