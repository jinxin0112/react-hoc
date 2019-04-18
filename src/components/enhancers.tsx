import React, { useState, useEffect } from 'react';

interface WithLoadingProps {
  loading: boolean;
}

const withLoading = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & WithLoadingProps> => ({
  loading,
  ...resProps
}: WithLoadingProps) =>
  loading ? <div>loading...</div> : <Component {...resProps as P} />;

export default function() {
  const [loading, setLoading] = useState(false);
  function startLoading() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }
  const LoadingComp = withLoading(() => <div>down</div>);
  return (
    <div>
      <button onClick={startLoading} disabled={loading}>
        start
      </button>
      <LoadingComp loading={loading} />
    </div>
  );
}
