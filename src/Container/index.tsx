import React from "react";
import { Layout, Menu } from "antd";
import classNames from "classnames";
import styles from "./index.module.less";

const { Header, Content } = Layout;

const App: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <Layout>
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        items={[
          {
            key: "a",
            label: "recent"
          },
          {
            key: "b",
            label: "lunches"
          }
        ]}
      />
    </Header>
    <Content
      className="site-layout"
      style={{ padding: "0 50px", marginTop: 64 }}
    >
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

export default App;
