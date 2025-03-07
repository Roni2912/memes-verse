import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
          <main className="flex-1 flex flex-col pt-16 pr-8 pl-8 pb-16 ">
            {children}
          </main>
      <Footer />
    </div>
  );
};

export default Layout;