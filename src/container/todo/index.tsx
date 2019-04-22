import React, { useReducer, RefObject, createRef } from 'react';

interface IlistItem {
  label: string;
  flished: boolean;
}
interface IState<T> {
  list: T[];
}

type State = IState<IlistItem>;

interface IAction {
  type: string;
  payload?: any;
}

const initialState: State = {
  list: [
    {
      label: 'learn typescript',
      flished: false
    }
  ]
};

function todoReducer(state: State, action: IAction) {
  switch (action.type) {
    case 'ADD':
      return {
        list: [...state.list, action.payload]
      };
    case 'TOGGLE':
      return {
        list: state.list.map((item, index) => {
          index === action.payload && (item.flished = !item.flished);
          return item;
        })
      };
    default:
      return state;
  }
}

export default () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const inputRef: RefObject<HTMLInputElement> = createRef();
  const { list } = state;
  return (
    <div>
      <input ref={inputRef} type="text" />
      <button
        onClick={() => {
          dispatch({
            type: 'ADD',
            payload: {
              label: inputRef.current && inputRef.current.value,
              flished: false
            }
          });
        }}
      >
        +
      </button>
      <ul>
        {list.map((item, index) => (
          <li key={index}>
            <span
              style={{
                textDecoration: `${item.flished ? 'line-through' : 'none'}`
              }}
            >
              {item.label}
            </span>
            <button
              onClick={() => {
                dispatch({
                  type: 'TOGGLE',
                  payload: index
                });
              }}
            >
              toggle
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
