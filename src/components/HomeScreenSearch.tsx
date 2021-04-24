import { Input, Typography } from "antd";
import { CodeFilled } from "@ant-design/icons";
import { useHistory } from "react-router";

const { Search } = Input;
const { Title } = Typography;

export const HomeScreenSearch = () => {
  const history = useHistory();

  const onSearch = (text: string) => {
    if (text.trim()) {
      history.push("/search?text=" + encodeURI(text.trim()));
    }
  };
  return (
    <div style={{ zIndex: 1 }}>
      <span
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <CodeFilled style={{ fontSize: 69, color: "#0288D1" }} />
        <Title
          className="searchTitle"
          style={{
            marginBottom: 5,
            marginLeft: 10,
            fontSize: 48,
            color: "#0288D1",
          }}
        >
          {"DevSearch"}
        </Title>
      </span>
      <Search
        placeholder="input search text"
        allowClear
        size="large"
        onSearch={onSearch}
        className={"homeScreenSearch"}
      />
    </div>
  );
};
