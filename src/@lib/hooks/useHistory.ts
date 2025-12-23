import { useState } from 'react';

export const useHistory = (initialHistory) => {
  const [state, setState] = useState(initialHistory);
  const [history, setHistory] = useState([initialHistory]);
  const [pointer, setPointer] = useState(0);

  const undo = () => {
    if (pointer > 0) {
      setPointer(pointer - 1);
      setState(history[pointer - 1]);
    }
  };

  const redo = () => {
    if (pointer < history.length - 1) {
      setPointer(pointer + 1);
      setState(history[pointer + 1]);
    }
  };

  const pushState = (newState) => {
    setState(newState);
    setHistory([...history.slice(0, pointer + 1), newState]);
    setPointer(pointer + 1);
  };

  return [state, pushState, undo, redo];
};
