import ProtectedRoutes from "./utils/ProtectedRoutes"
import Header from "./views/home/components/Header"
import Home from "./views/home/Home"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import NotFound from "./views/not-found/NotFound"
import Plans from "./views/plans/Plans"
import Resume from "./views/resume/Resume"
import { PlanProvider } from "./views/plans/PlanContext"

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <Header />
      <div className="content">{children}</div>
    </div>
  )
}

export default function App() {
  return (
    <PlanProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/plans" element={<Plans />} />
              <Route path="/resume" element={<Resume />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </PlanProvider>
  )
}
