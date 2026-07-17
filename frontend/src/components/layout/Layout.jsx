import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import MusicPlayer from '../music/MusicPlayer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-pink-50 pb-24">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-5">{children}</main>
      </div>

      <Footer />

      <MusicPlayer />
    </div>
  );
};

export default Layout;
