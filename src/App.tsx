import React, { lazy, Suspense, useState } from 'react';
import {StandardUpload} from './container/upload';
import 'antd/dist/antd.css';

function App() {
  const list: string[] = ['enhancers', 'injectors', 'combine', 'todo','upload'];
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
      <div>
        <StandardUpload action={''}></StandardUpload>
      </div>
    </div>
  );
}

export default App;
