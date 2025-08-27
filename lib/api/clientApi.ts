import type { CreateNote, Note } from '@/types/note';
import { nextServer } from './api';
import toast from 'react-hot-toast';
import { AuthRequest, User } from '@/types/user';

export interface FetchNotesRes {
  notes: Note[];
  totalPages: number;
}

export interface CheckSessionRes {
  success: boolean;
}

export interface ParamsTypes {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}

export interface UpdateMeRequest {
  username: string;
}

export async function fetchNotes(
  page: number,
  search: string,
  tag: string,
): Promise<FetchNotesRes | undefined> {
  try {
    const perPage = 12;
    const params: ParamsTypes = {
      tag,
      page,
      perPage,
    };

    if (search?.trim()) {
      params.search = search;
    }
    if (tag?.trim()) {
      params.tag = tag;
    }

    const response = await nextServer.get<FetchNotesRes>('/notes', {
      params,
    });

    return response.data;
  } catch (error) {
    toast.error('Something went wrong...Try again, please');
  }
}

export async function createNote({
  title,
  content,
  tag,
}: CreateNote): Promise<Note | undefined> {
  try {
    const params: CreateNote = {
      title,
      content,
      tag,
    };
    const response = await nextServer.post<Note>('/notes', params);
    return response.data;
  } catch (error) {
    toast.error('Something went wrong...Try again, please');
  }
}

export async function deleteNote(id: string): Promise<Note | undefined> {
  try {
    const response = await nextServer.delete<Note>(`notes/${id}`);
    return response.data;
  } catch (error) {
    toast.error('Something went wrong...Try again, please');
  }
}

export async function fetchNoteById(id: string): Promise<Note | undefined> {
  const response = await nextServer.get<Note>(`notes/${id}`);
  return response.data;
}

export async function register(data: AuthRequest) {
  const response = await nextServer.post<User>('/auth/register', data);
  return response.data;
}

export async function login(data: AuthRequest) {
  const response = await nextServer.post<User>('/auth/login', data);
  return response.data;
}

export async function logout() {
  try {
    const response = await nextServer.post('/auth/logout');
    return response.data;
  } catch {
    toast.error('Something went wrong...Try again, please');
  }
}

export async function session() {
  try {
    const response = await nextServer.get<CheckSessionRes>('/auth/session');
    return response.data.success;
  } catch {
    toast.error('Something went wrong...Try again, please');
  }
}

export async function getMe() {
  try {
    const response = await nextServer.get<User>('/users/me');
    return response.data;
  } catch {
    toast.error('Something went wrong...Try again, please');
  }
}

export async function updateMe({ username }: UpdateMeRequest) {
  try {
    const res = await nextServer.patch<User>('/users/me', { username });
    return res.data;
  } catch (error) {
    toast.error(error instanceof Error ? error.message : String(error));
    throw error;
  }
}