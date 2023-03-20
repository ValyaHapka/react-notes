import React from 'react';
import { searchNotesByTags } from '../../redux/slices/notes-slice';
import { useAppDispatch } from '../../redux/store';

import styles from './search-input.module.scss';

export const Search = () => {
  const dispatch = useAppDispatch();
  return (
    <input
      type="search"
      className={styles.search}
      onChange={(e) => dispatch(searchNotesByTags(e.target.value))}
    />
  );
};
