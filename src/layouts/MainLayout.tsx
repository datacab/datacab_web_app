import Footer from "@components/footer";
import Nav from "@components/navbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen"> {/* Ensure the layout takes at least the full height of the screen */}
      <Nav />
      <main className="flex-1">{children}</main> {/* This allows the main content to take up available space */}
      <Footer />
    </div>
  );
};

export default MainLayout;
