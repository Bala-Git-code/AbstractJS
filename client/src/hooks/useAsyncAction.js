import { useState } from 'react';

function useAsyncAction(action) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const run = async (...args) => {
    try {
      setIsLoading(true);
      setError('');
      return await action(...args);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { run, isLoading, error, setError };
}

export default useAsyncAction;
