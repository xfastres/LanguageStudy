import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from './stores/authStore';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  const checkAuth = useAuthStore((s) => s.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<div>Login Page</div>} />
        <Route path="/register" element={<div>Register Page</div>} />
        <Route path="/onboarding" element={<div>Onboarding Page</div>} />
        <Route path="/" element={<ProtectedRoute><div>Home - Input Feed</div></ProtectedRoute>} />
        <Route path="/player/:id" element={<ProtectedRoute><div>Player Page</div></ProtectedRoute>} />
        <Route path="/discovery" element={<ProtectedRoute><div>Discovery Page</div></ProtectedRoute>} />
        <Route path="/progress" element={<ProtectedRoute><div>Progress Page</div></ProtectedRoute>} />
        <Route path="/community" element={<ProtectedRoute><div>Community Page</div></ProtectedRoute>} />
        <Route path="/achievements" element={<ProtectedRoute><div>Achievements Page</div></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><div>Profile Page</div></ProtectedRoute>} />
        <Route path="/companion" element={<ProtectedRoute><div>AI Companion Page</div></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
