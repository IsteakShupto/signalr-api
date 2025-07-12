"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import Skeleton from "@/components/skeleton";
import { useRef } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeGrid as Grid } from "react-window";
import User from "@/components/user";
import { User2 } from "lucide-react";

const fetchUsers = async ({ pageParam = 0 }) => {
  const res = await fetch(
    `https://tech-test.raintor.com/api/users/GetUsersList?take=10&skip=${pageParam}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  return res.json();
};

export default function UserFeedPage() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextSkip = allPages.length * 10;
      return nextSkip < lastPage.total ? nextSkip : undefined;
    },
  });

  const users = data?.pages.flatMap((page) => page.users) || [];

  const hasFetchedRef = useRef(false);

  const getColumnCount = (width: number) => {
    if (width >= 1024) return 3;
    if (width >= 640) return 2;
    return 1;
  };

  const handleItemsRendered = ({
    visibleRowStopIndex,
    rowCount,
  }: {
    overscanRowStartIndex: number;
    overscanRowStopIndex: number;
    visibleRowStartIndex: number;
    visibleRowStopIndex: number;
    rowCount: number;
  }) => {
    const isNearBottom = visibleRowStopIndex >= rowCount - 1;

    if (isNearBottom && hasNextPage && !hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchNextPage().finally(() => {
        setTimeout(() => {
          hasFetchedRef.current = false;
        }, 100);
      });
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-screen-xl">
        {Array.from({ length: 9 }).map((_, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 sm:p-6 text-red-600 text-center">
        Error loading user feed.
      </div>
    );
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto h-[85vh] px-4 sm:px-6 shadow-2xl rounded-2xl">
      <h1 className="text-2xl mb-4 pt-5 pb-3 border-b border-neutral-300 flex flex-wrap justify-between">
        <span className="flex items-center gap-2">
          <User2 /> Virtualized User Feed{" "}
        </span>
        {isFetchingNextPage && (
          <p>
            Fetching data{" "}
            <span className="loading loading-spinner loading-xs"></span>
          </p>
        )}
      </h1>
      <AutoSizer>
        {({ height, width }) => {
          const columnCount = getColumnCount(width);
          const columnWidth = Math.min(width / columnCount, 300);
          const rowCount = Math.ceil(users.length / columnCount);

          return (
            <Grid
              columnCount={columnCount}
              columnWidth={columnWidth}
              height={height - 80}
              rowCount={rowCount}
              rowHeight={208}
              width={width}
              onItemsRendered={({
                overscanRowStartIndex,
                overscanRowStopIndex,
                visibleRowStartIndex,
                visibleRowStopIndex,
              }) =>
                handleItemsRendered({
                  overscanRowStartIndex,
                  overscanRowStopIndex,
                  visibleRowStartIndex,
                  visibleRowStopIndex,
                  rowCount,
                })
              }
            >
              {({ rowIndex, columnIndex, style }) => {
                const index = rowIndex * columnCount + columnIndex;
                const user = users[index];
                if (!user) return null;

                return (
                  <div style={{ ...style, padding: "0.5rem" }}>
                    <User user={user} />
                  </div>
                );
              }}
            </Grid>
          );
        }}
      </AutoSizer>
    </div>
  );
}
