import React, { lazy, Suspense, useState } from 'react';

function App() {
  const list: string[] = ['enhancers', 'injectors', 'combine', 'todo'];
  const [cur, setCur] = useState(list[0]);

  let Comp: React.LazyExoticComponent<React.ComponentType<any>> = lazy(() =>
    import(`./container/${cur}`)
  );
  return (
    <div>
      <ul>
        {list.map((i, idx) => {
          return (
            <li
              onClick={() => {
                setCur(i);
              }}
              key={idx}
            >
              <a href="javascript:void(0)">{i}</a>
            </li>
          );
        })}
      </ul>
      <div>
        <Suspense fallback={<div>loading...</div>}>
          <Comp />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
