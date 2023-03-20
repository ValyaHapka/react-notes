import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import { CreateNote } from './components/create-note/create-note';
import { NotesList } from './components/notes-list/notes-list';
import { store } from './redux/store';

import './App.scss';
import { Search } from './components/search-input/search-input';

function App() {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (isOpened) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [isOpened]);

  return (
    <Provider store={store}>
      <div className="App">
        <button type="button" className="create-button" onClick={() => setIsOpened(!isOpened)}>
          Create Note
        </button>
        <Search />
        <CreateNote isOpened={isOpened} setIsOpened={setIsOpened} />
        <NotesList />
      </div>
    </Provider>
  );
}

export default App;
