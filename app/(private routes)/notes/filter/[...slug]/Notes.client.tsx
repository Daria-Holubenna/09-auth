'use client';

import css from './Notes.module.css';

import { useState, useEffect } from 'react';
import { fetchNotes } from '@/lib/api/clientApi';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { Toaster } from 'react-hot-toast';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Loading from '../../../../loading';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import Link from 'next/link';
interface DataProps {
  tag: string | undefined;
}
export default function NotesClient({ tag }: DataProps) {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setCurrentPage(1);
  }, [tag]);
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['notes', currentPage, debouncedSearch, tag],
    queryFn: () =>
      fetchNotes(
              currentPage,
        debouncedSearch,
        tag ?? ''
      ),
    placeholderData: keepPreviousData,
  });
  const handlePageClick = (selectedItem: { selected: number } | number) => {
    if (typeof selectedItem === 'number') {
      setCurrentPage(selectedItem + 1);
    } else {
      setCurrentPage(selectedItem.selected + 1);
    }
  };
  const handleInputChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };
  const notesToDisplay = data?.notes || [];
  const totalPages = data?.totalPages || 0;
  return (
    <div className={css.app}>
      <Toaster />
      <header className={css.toolbar}>
        <SearchBox onSearchChange={handleInputChange} />
        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            onPageChange={handlePageClick}
            currentPage={currentPage - 1}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>
      {isLoading && <Loading />}
      {isError && <ErrorMessage />}
      {isSuccess &&
        (notesToDisplay.length > 0 ? (
          <NoteList notes={notesToDisplay} />
        ) : (
          <p>No notes found. Create your first note!</p>
        ))}
    </div>
  );
}
