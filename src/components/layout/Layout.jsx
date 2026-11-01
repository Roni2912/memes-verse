import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import Spinner from '../ui/Spinner';

export default function Layout() {
  const { pathname } = useLocation();
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-control focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-foreground"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        <Suspense fallback={<Spinner />}>
          <div key={pathname} className="animate-page">
            <Outlet />
          </div>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
