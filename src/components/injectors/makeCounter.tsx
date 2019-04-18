import React, { useState } from 'react';

export interface InjectedCounterProps {
  value: number;
  onIncrement(): void;
  onDecrement(): void;
}

const makeCounter = <P extends InjectedCounterProps>(
  Component: React.ComponentType<P>
) => {
  const [value, setValue] = useState(0);
  const props:InjectedCounterProps = {
    value,
    onIncrement() {
      setValue(pre => pre + 1);
    },
    onDecrement() {
      setValue(pre => pre - 1);
    }
  };
  return <Component {...props as P} />;
};

export default makeCounter;
