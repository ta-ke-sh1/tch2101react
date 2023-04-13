import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { host_url } from "../../utils/utils";
const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    fetchIdeas();
  }, []);

  async function fetchIdeas() {
    axios
      .get(host_url + "/idea/")
      .then((res) => {
        console.log(res);
        var ideas = [];
        for (let i = 0; i < res.data.length; i++) {
          ideas.push(res.data[i]);
        }
        setIdeas(ideas);
      })
      .catch((err) => console.error(err));
  }

  return (
    <Layout>
      <Header style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}>
        <div
          style={{
            float: "right",
            width: 120,
            height: 31,
            margin: "16px 24px 16px 0",
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />

        <Menu
          theme="dark"
          mode="horizontal"
        //   defaultSelectedKeys={['2']}
          items={[
            {
              key: '1',
            //   icon: <UserOutlined />,
              label: 'Thread',
            },
            {
              key: '2',
            //   icon: <VideoCameraOutlined />,
              label: 'Add Category',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'Upload Idea',
            },
          ]}
        />
      </Header>
      <Content
        className="site-layout "
        style={{ margin: "24px 16px 0", overflow: "initial" }}
      >
        <Breadcrumb style={{ margin: "16px 0" }} className="flex justify-center items-center h-16  sm:h-20 bg-gray-100"> 
        <h1 class="text-gray-800 text-lg sm:text-2xl font-bold">Tiêu đề của bạn</h1></Breadcrumb>
      </Content>
      <Footer style={{ textAlign: "center" }}>TCH2202</Footer>
    </Layout>
  );
};

export default App;
