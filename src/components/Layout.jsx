import Navbar from './Navbar';

const Layout = ({ children }) => (
  <div className="min-h-screen bg-gray-50">
    <Navbar />
    <main className="container mx-auto px-4 max-w-4xl">
      {children}
    </main>
  </div>
);
export default Layout;