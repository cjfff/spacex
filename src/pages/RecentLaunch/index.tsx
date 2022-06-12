import React from "react";
import { Spin, Descriptions } from "antd";
import { useLaunchNextQuery } from "../../generated";
import dayjs from "dayjs";
const RecentLaunch = () => {
  const { data, isLoading } = useLaunchNextQuery();

  return (
    <Spin spinning={isLoading}>
      <Descriptions title="Recent Launch" layout="vertical" bordered>
        <Descriptions.Item label="MISSION_NAME">
          {data?.launchNext?.mission_name}
        </Descriptions.Item>

        <Descriptions.Item label="LAUNCH_DATE">
          {data?.launchNext?.launch_date_local &&
            dayjs(data?.launchNext?.launch_date_local).format(
              "YYYY-MM-DD hh:mm"
            )}
        </Descriptions.Item>
        <Descriptions.Item label="LAUNCH_SITE">
          {data?.launchNext?.launch_site?.site_name_long}
        </Descriptions.Item>
        <Descriptions.Item label="ROKET">{`${data?.launchNext?.rocket?.rocket_type} - ${data?.launchNext?.rocket?.rocket_name}`}</Descriptions.Item>
        <Descriptions.Item label="DETAIL">
          {data?.launchNext?.details}
        </Descriptions.Item>
      </Descriptions>
    </Spin>
  );
};

export default RecentLaunch;
