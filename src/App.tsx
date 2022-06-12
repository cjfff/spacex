import React, { useState, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import logo from "./logo.svg";
import { useInfiniteLaunchesPastListQuery } from "./generated";

import "./App.css";

const LIMIT = 10;

function App() {
  const { status, data, isLoading, hasNextPage, fetchNextPage } =
    useInfiniteLaunchesPastListQuery(
      "offset",
      {
        limit: LIMIT,
        offset: 0,
      },
      {
        getNextPageParam(lastPage, allPages) {
          const offset = (allPages.length ?? 0) * LIMIT;

          // less then limit, meaning is no next page
          if ((lastPage.launchesPast?.length || 0) < LIMIT) {
            return;
          }

          return {
            offset,
          };
        },
      }
    );

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button
          onClick={() => {
            if (!isLoading) {
              fetchNextPage();
            }
          }}
        >
          fetch next
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
