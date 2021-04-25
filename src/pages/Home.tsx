import { Layout, Image } from "antd";
import { HomeScreenSearch } from "../components/HomeScreenSearch";

const { Content } = Layout;

export const Home = () => {
  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <Content
        className="homeScreenContent"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Image
          preview={false}
          src={`https://source.unsplash.com/RCAhiGJsUUE/1920x900`}
          style={{
            height: "100vh",
            width: "auto",
            // filter: "blur(3px)",
            transform: "scale(1.01)",
          }}
        />
        <HomeScreenSearch />
      </Content>
    </Layout>
  );
};
