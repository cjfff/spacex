import React from "react";
import Layout from "./Container";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const LaunchesPast = React.lazy(() => import("./pages/LaunchesPast"));
const RecentLaunch = React.lazy(() => import("./pages/RecentLaunch"));

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            index
            element={
              <React.Suspense>
                <RecentLaunch />
              </React.Suspense>
            }
          />
          <Route
            path="past"
            element={
              <React.Suspense>
                <LaunchesPast />
              </React.Suspense>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
