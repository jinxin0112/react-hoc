import React, { useState } from 'react';
import { Subtract } from 'utility-types';
export interface InjectedCounterProps {
  value: number;
  onIncrement(): void;
  onDecrement(): void;
}

const makeCounter = <P extends InjectedCounterProps>(
  Component: React.ComponentType<P>
) => {
  return (props: Subtract<P, InjectedCounterProps>) => {
    const [value, setValue] = useState(0);
    const counterProps: InjectedCounterProps = {
      value,
      onIncrement() {
        setValue(pre => pre + 1);
      },
      onDecrement() {
        setValue(pre => pre - 1);
      }
    };
    return <Component {...counterProps as P} {...props} />;
  };
};

export default makeCounter;
