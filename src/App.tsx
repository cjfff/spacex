import React from "react";
import {
  useInfiniteLaunchesPastListQuery,
  useLaunchNextQuery
} from "./generated";
import Layout from "./Container";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const LaunchesPast = React.lazy(() => import("./pages/LaunchesPast"));
const RecentLaunch = React.lazy(() => import("./pages/RecentLaunch"));

const LIMIT = 10;

function App() {
  const { data: recentData } = useLaunchNextQuery();

  console.log(recentData);
  const { status, data, isLoading, hasNextPage, fetchNextPage } =
    useInfiniteLaunchesPastListQuery(
      "offset",
      {
        limit: LIMIT,
        offset: 0
      },
      {
        getNextPageParam(lastPage, allPages) {
          const offset = (allPages.length ?? 0) * LIMIT;

          // less then limit, meaning is no next page
          if ((lastPage.launchesPast?.length || 0) < LIMIT) {
            return;
          }

          return {
            offset
          };
        }
      }
    );

  console.log(data);
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
        <button
          onClick={() => {
            if (!isLoading) {
              fetchNextPage();
            }
          }}
        >
          fetch next
        </button>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
