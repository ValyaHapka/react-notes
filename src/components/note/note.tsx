import React, { useState } from 'react';
import Highlighter from 'react-highlight-words';

import edit from '../../assets/img/edit.svg';
import save from '../../assets/img/save.svg';
import delete_icon from '../../assets/img/delete.svg';

import styles from './note.module.scss';
import { NoteProps } from '../../interfaces/NoteState';
import { useAppDispatch } from '../../redux/store';
import { editNote } from '../../redux/slices/notes-slice';

interface INote {
  note: NoteProps;
  deleteNote: (id: string) => void;
}

export const Note: React.FC<INote> = ({ note, deleteNote }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editText, setEditText] = useState('');
  const dispatch = useAppDispatch();

  const saveValues = () => {
    const tags = editText.match(/\B(#[a-zA-ZА-Яа-я0-9Ёёй]+)(\s|$)/gi);
    const trimmedTags = tags?.map((item) => item.trim());

    const editedNote = { ...note, title: editTitle, text: editText, tags: trimmedTags };
    dispatch(editNote(editedNote));
    setIsEditing(false);
  };

  return (
    <div className={styles.note}>
      <div className={styles.note_head}>
        {isEditing ? (
          <input defaultValue={note.title} onChange={(e) => setEditTitle(e.target.value)} />
        ) : (
          <h4>{note.title}</h4>
        )}

        <div className={styles.note_head_buttons}>
          {isEditing ? (
            <img src={save} alt="" onClick={saveValues} />
          ) : (
            <img src={edit} alt="" onClick={() => setIsEditing(true)} />
          )}

          <img src={delete_icon} alt="" onClick={() => deleteNote(note.id)} />
        </div>
      </div>
      <hr />
      {isEditing ? (
        <textarea
          defaultValue={note.text}
          className={styles.note_area}
          onChange={(e) => setEditText(e.target.value)}></textarea>
      ) : (
        <p className={styles.note_text}>
          <Highlighter
            textToHighlight={note.text}
            searchWords={[/\B(#[a-zA-ZА-Яа-я0-9Ёёй]+)(\s|$)/gi]}
          />
        </p>
      )}
      <ul className={styles.note_tags}>
        {note.tags?.map((t) => (
          <li>{t}</li>
        ))}
      </ul>
    </div>
  );
};
