import "@/app/globals.css";
import { Toaster } from "react-hot-toast";
import Footer from './components/Footer'
import Sidebar from "./components/Sidebar";

export const metadata = {
  title: "OOH POINT",
  description: "OOH POINT Admin",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     <body
       
      >
        {/* Sidebar */}
        <Sidebar /> {/* Add Sidebar here */}

        {/* Main content area */}
        <main className="flex-grow lg:ml-20"> {/* Adjust margin-left based on sidebar size */}
          <Toaster/>{children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
   
    </html>
  );
}
