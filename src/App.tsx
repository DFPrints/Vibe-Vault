
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { WallpaperProvider } from "./context/WallpaperContext";
import { AuthProvider } from "./context/AuthContext";
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryDetailPage from "./pages/CategoryDetailPage";
import SearchPage from "./pages/SearchPage";
import FavoritesPage from "./pages/FavoritesPage";
import WallpaperDetailPage from "./pages/WallpaperDetailPage";
import CreditsPage from "./pages/CreditsPage";
import PricingPage from "./pages/PricingPage";
import ProfilePage from "./pages/ProfilePage";
import AuthPage from "./pages/AuthPage";
import AdminPage from "./pages/AdminPage";
import DiscoverPage from "./pages/DiscoverPage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <WallpaperProvider>
          <BrowserRouter>
            <Toaster />
            <Sonner />
            
            {/* Header is visible on all pages except WallpaperDetailPage */}
            <Routes>
              <Route path="/wallpaper/:wallpaperId" element={<WallpaperDetailPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="*" element={
                <>
                  <Header />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/categories" element={<CategoriesPage />} />
                    <Route path="/category/:categoryId" element={<CategoryDetailPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/discover" element={<DiscoverPage />} />
                    <Route path="/favorites" element={
                      <ProtectedRoute>
                        <FavoritesPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/credits" element={<CreditsPage />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/profile" element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    } />
                    <Route path="/admin" element={
                      <ProtectedRoute adminOnly>
                        <AdminPage />
                      </ProtectedRoute>
                    } />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </>
              } />
            </Routes>
            
            <Navigation />
          </BrowserRouter>
        </WallpaperProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
