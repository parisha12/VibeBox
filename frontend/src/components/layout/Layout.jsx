import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-pink-50">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-5">{children}</main>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
