import React from "react";
import { Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames";
import styles from "./index.module.less";

const { Header, Content } = Layout;

const Container: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[pathname]}
          onSelect={(data) => {
            navigate(data.key);
          }}
          items={[
            {
              key: "/",
              label: "Recent Launch"
            },
            {
              key: "/past",
              label: "Past Launches"
            }
          ]}
        />
      </Header>
      <Content className="site-layout" style={{ marginTop: 64 }}>
        <div
          className={classNames(
            "site-layout-background",
            styles["container-layout"]
          )}
          style={{
            minHeight: "calc(100vh - 110px)"
          }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );
};

export default Container;
