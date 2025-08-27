import { Metadata } from 'next';
import css from './Home.module.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 NoteHub',
  description: 'Sorry, the page you are looking for does not exist.',
  openGraph: {
    title: '404 Notehub',
    description:
      "Looks like you've reached a dead end. Let's get you back to your notes.",
    url: 'https://08-zustand-zeta-one.vercel.app/404',
    images: [
      {
        url: 'https://seocom.agency/wp-content/uploads/2024/05/Errores-Web-404-403-503-502-401.-Significado-y-soluciones-1.jpg.webp',
        width: 1200,
        height: 630,
        alt: 'not found 404',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: '404 Notehub',
    description:
      "Looks like you've reached a dead end. Let's get you back to your notes.",
    images: [
      {
        url: 'https://seocom.agency/wp-content/uploads/2024/05/Errores-Web-404-403-503-502-401.-Significado-y-soluciones-1.jpg.webp',
        width: 1200,
        height: 630,
        alt: 'not found 404',
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/" className={css.link}>
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
