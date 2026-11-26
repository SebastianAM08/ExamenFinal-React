import { Outlet } from 'react-router-dom';

import Header from '../components/Header.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-fondo text-texto">
      <Header />
      <Navbar />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
