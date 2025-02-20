import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { LoadingSpinner } from './components/LoadingSpinner';
import Home from './pages/Home';

// Lazy load pages
const VerseFinder = React.lazy(() => import('./pages/VerseFinder'));
const Bible = React.lazy(() => import('./pages/Bible'));
const Trivia = React.lazy(() => import('./pages/Trivia'));
const Contact = React.lazy(() => import('./pages/Contact'));
const BibleStudy = React.lazy(() => import('./pages/BibleStudy'));
const StudyDashboard = React.lazy(() => import('./pages/BibleStudy/StudyDashboard'));
const DailyMotivation = React.lazy(() => import('./pages/DailyMotivation'));
const Profile = React.lazy(() => import('./pages/Profile'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

const LoadingFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="bible"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Bible />
            </Suspense>
          }
        />
        <Route
          path="verses"
          element={
            <PrivateRoute>
              <Suspense fallback={<LoadingFallback />}>
                <VerseFinder />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="trivia"
          element={
            <PrivateRoute>
              <Suspense fallback={<LoadingFallback />}>
                <Trivia />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="study"
          element={
            <PrivateRoute>
              <Suspense fallback={<LoadingFallback />}>
                <BibleStudy />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="study/dashboard"
          element={
            <PrivateRoute>
              <Suspense fallback={<LoadingFallback />}>
                <StudyDashboard />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="daily-motivation"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <DailyMotivation />
            </Suspense>
          }
        />
        <Route
          path="profile"
          element={
            <PrivateRoute>
              <Suspense fallback={<LoadingFallback />}>
                <Profile />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="contact"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Contact />
            </Suspense>
          }
        />
        <Route
          path="404"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <NotFound />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}