import ProtectedRoutes from "./utils/ProtectedRoutes"
import Header from "./views/home/components/Header"
import Home from "./views/home/Home"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import NotFound from "./views/not-found/NotFound"

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <Header />
      <div className="content">{children}</div>{" "}
      {/* Aquí va el contenido dinámico */}
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/plans" element={<div>Plans</div>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  )
}
