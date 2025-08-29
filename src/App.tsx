import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import Index from "./pages/Index";
import CreateTask from "./pages/CreateTask";
import Inbox from "./pages/Inbox";
import Important from "./pages/Important";
import Calendar from "./pages/Calendar";
import Patients from "./pages/Patients";
import Analytics from "./pages/Analytics";
import Trash from "./pages/Trash";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function PrivateRoute({ children }: { children: JSX.Element }) {
  const doctor = localStorage.getItem("doctor");
  return doctor ? children : <Navigate to="/login" />;
}

function ProtectedRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/create-task" element={<CreateTask />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/important" element={<Important />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/trash" element={<Trash />} />
        <Route path="/settings" element={<Settings />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          {/* All routes accessible without login */}
          <Route path="/*" element={<ProtectedRoutes />} />
        </Routes>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
