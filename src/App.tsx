import React from "react";
import {
  useInfiniteLaunchesPastListQuery,
  useLaunchNextQuery
} from "./generated";
import Layout from "./Container";

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
    <Layout>
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
  );
}

export default App;
