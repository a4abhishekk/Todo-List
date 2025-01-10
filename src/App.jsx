import React from 'react';
import Todo from './components/Todo';

const App = () => {
  return (
    <div className='bg-stone-900 flex flex-col items-center justify-center py-4 min-h-screen'>
      <Todo />
    </div>
  );
}

export default App;
