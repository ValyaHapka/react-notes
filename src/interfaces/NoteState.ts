export interface NoteProps {
  title: string;
  text: string;
  id: string;
  tags: string[] | undefined;
}

export interface NoteState {
  baseNotes: NoteProps[];
  notes: NoteProps[];
  json: any[];
  search: string;
}
