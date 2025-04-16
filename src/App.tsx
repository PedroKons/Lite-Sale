import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

// Importe suas páginas
import Dashboard from "@/pages/Dashboard"
import CustomerRegistration from "./pages/CustomerRegistration"
import SellersRegistration from "./pages/SellersRegistration"




function App() {
  return (
    <BrowserRouter>
        <SidebarProvider>
          <AppSidebar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sales">
              <Route path="list" />
              <Route path="register"  />
              <Route path="customers"  element={<CustomerRegistration />} />
              <Route path="sellers"  element={<SellersRegistration />}/>
            </Route>
            <Route path="/products">
              <Route path="list"  />
              <Route path="register"  />
            </Route>
          </Routes>
        </SidebarProvider>
    </BrowserRouter>
  )
}

export default App
