import React, { useEffect } from 'react';
import { notesSelector, removeNote } from '../../redux/slices/notes-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import { Note } from '../note/note';

import styles from './notes-list.module.scss';

export const NotesList = () => {
  const { notes } = useAppSelector((state) => notesSelector(state));
  const dispatch = useAppDispatch();

  useEffect(() => {
    localStorage.setItem('Notes', JSON.stringify(notes));
  }, [notes]);

  const deleteNote = (id: string) => {
    dispatch(removeNote(id));
  };

  return (
    <div className={styles.list}>
      {notes.map((note) => (
        <Note note={note} deleteNote={deleteNote} />
      ))}
    </div>
  );
};
