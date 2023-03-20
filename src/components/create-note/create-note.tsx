import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { NoteProps } from '../../interfaces/NoteState';
import { addNewNote } from '../../redux/slices/notes-slice';
import { useAppDispatch } from '../../redux/store';

import styles from './create-note.module.scss';

interface CreateNoteProps {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
}

export const CreateNote: React.FC<CreateNoteProps> = ({ isOpened, setIsOpened }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [disabled, setDisabled] = useState(true);
  const dispatch = useAppDispatch();

  const addNote = () => {
    const tags = text.match(/\B(#[a-zA-ZА-Яа-я0-9Ёёй]+)(\s|$)/gi);
    const trimmedTags = tags?.map((item) => item.trim());
    const newNote: NoteProps = { title, text, id: uuid(), tags: trimmedTags };

    dispatch(addNewNote(newNote));
    setIsOpened(false);
  };

  useEffect(() => {
    title && text ? setDisabled(false) : setDisabled(true);
  }, [title, text]);

  useEffect(() => {
    if (!isOpened) {
      setTitle('');
      setText('');
    }
  }, [isOpened]);

  return (
    <>
      {isOpened && (
        <>
          <div className={styles.blur} />
          <div className={styles.create}>
            <input
              type="text"
              className={styles.create_title}
              placeholder="title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              name="note-text"
              className={styles.create_text}
              placeholder="note..."
              onChange={(e) => setText(e.target.value)}></textarea>
            <button
              type="button"
              className={disabled ? styles.create_submit_disabled : styles.create_submit}
              onClick={() => addNote()}
              disabled={disabled}>
              Create
            </button>
          </div>
        </>
      )}
    </>
  );
};
