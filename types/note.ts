import { FetchNotesRes } from '@/lib/api/clientApi';

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNote {
  title: string;
  content?: string;
  tag: NoteTag;
}

export type NoteTag = 'Work' | 'Todo' | 'Personal' | 'Meeting' | 'Shopping';

export type NotesClientProps = {
  initialPage: number;
  initialSearch: string;
  initialData: FetchNotesRes;
  initialTag: string;
};
