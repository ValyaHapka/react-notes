import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NoteProps, NoteState } from '../../interfaces/NoteState';

import { RootState } from '../store';

const initialState: NoteState = {
  baseNotes: [],
  notes: [],
  json: [],
  search: '',
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNewNote: (state, action: PayloadAction<NoteProps>) => {
      state.notes.push(action.payload);
      state.baseNotes.push(action.payload);
    },
    editNote: (state, action) => {
      const note = state.notes.findIndex((n) => n.id === action.payload.id);
      state.notes[note] = action.payload;
      const baseNote = state.baseNotes.findIndex((n) => n.id === action.payload.id);
      state.baseNotes[baseNote] = action.payload;
    },
    removeNote: (state, action) => {
      state.notes = state.notes.filter((n) => n.id !== action.payload);
      state.baseNotes = state.baseNotes.filter((n) => n.id !== action.payload);
    },
    searchNotesByTags: (state, action) => {
      state.search = action.payload;
      function filterBySearch(notes: NoteProps[]) {
        return notes.filter((note) =>
          note.tags?.find((tag) => tag.toLowerCase().includes(state.search.toLowerCase())),
        );
      }
      if (state.search === '') {
        state.notes = state.baseNotes;
      } else {
        state.notes = filterBySearch(state.baseNotes);
      }
    },
  },
});

export const { addNewNote, editNote, removeNote, searchNotesByTags } = notesSlice.actions;

export const notesSelector = (state: RootState) => state.notes;

export default notesSlice.reducer;
