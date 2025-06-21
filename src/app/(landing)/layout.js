// import Navbar from "../../../components/Navbar.jsx";
import Navbar from "../../components/Navbar.jsx"

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
