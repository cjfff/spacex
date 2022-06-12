import React from "react";
import classNames from "classnames";
import { Spin, List, Skeleton, Divider } from "antd";
import { PlaySquareOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";

import {
  LaunchesPastListQuery,
  useInfiniteLaunchesPastListQuery
} from "../../generated";

import { useVideoModal } from "./VideoModal";

import styles from "./index.module.less";

const LIMIT = 10;

const LaunchesPast = () => {
  const { data, isLoading, hasNextPage, fetchNextPage } =
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

  const list = data?.pages.reduce((acc, item) => {
    return acc!.concat(item.launchesPast || []);
  }, [] as LaunchesPastListQuery["launchesPast"]);

  const { showModal, videoModal } = useVideoModal();

  return (
    <Spin spinning={isLoading}>
      {videoModal}
      <InfiniteScroll
        dataLength={list!?.length || 0}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<Skeleton paragraph={{ rows: 3 }} active />}
        endMessage={
          !!list?.length ? (
            <Divider plain>It is all, nothing more 🤐</Divider>
          ) : null
        }
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={list!}
          renderItem={(item) => (
            <List.Item key={item?.id}>
              <List.Item.Meta
                title={
                  <div
                    onClick={() => {
                      if (item?.links?.article_link) {
                        window.open(item?.links?.article_link, "_blank");
                      }
                    }}
                    className={classNames(styles["name-wrap"], {
                      [styles.link]: !!item?.links?.article_link
                    })}
                  >
                    <span className={styles.date}>
                      {item?.launch_date_local &&
                        dayjs(item?.launch_date_local).format(
                          "YYYY-MM-DD hh:mm"
                        )}
                    </span>
                    <span className={styles.name}>
                      {item?.mission_name}

                      <span className={styles.success}>
                        {item?.launch_success && "🚀"}
                      </span>
                    </span>
                  </div>
                }
                description={
                  <div>
                    <div className={styles.launchSite}>
                      launch-site: {item?.launch_site?.site_name_long}
                    </div>
                    <div>{item?.details}</div>
                  </div>
                }
              />
              <div>
                <span className={styles.video}>
                  {item?.links?.video_link && (
                    <PlaySquareOutlined
                      onClick={() => {
                        showModal({
                          title: item.mission_name!,
                          link: item.links?.video_link!
                        });
                      }}
                    />
                  )}
                </span>
              </div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </Spin>
  );
};

export default LaunchesPast;
