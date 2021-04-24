import { useState, useEffect } from "react";
import { Layout, Card, Input, Typography } from "antd";
import { CodeFilled } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import { Redirect, useHistory } from "react-router";
import { StackOverflow } from "../assets/icons";
import { ApiResponse } from "../interfaces/ApiResponse";

const { Content, Header } = Layout;
const { Search } = Input;
const { Title, Text, Link } = Typography;

export const SearchPage = () => {
  const [urlsLoaded, setUrlsLoaded] = useState(false);
  const urlParamsOne = new URLSearchParams(window.location.search);
  const [text, setText] = useState(urlParamsOne.get("text"));
  const [results, setResults]: [ApiResponse | null, Function] = useState({
    result: [],
  });
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const history = useHistory();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("text");
    setText(searchQuery ?? "");
    if (searchQuery) {
      fetch(
        "https://dev-search-api.herokuapp.com/search" + window.location.search
      )
        .then((res) => res.json())
        .then((data: ApiResponse) => {
          const urlsVisited: string[] = [];
          const temp: ApiResponse = { result: [] };
          data.result.forEach((el) => {
            if (!urlsVisited.includes(el.url)) {
              urlsVisited.push(el.url);
              const t = new URL(el.url);
              const pathname = trim(t.pathname, "/");
              let tStr = pathname.substr(pathname.lastIndexOf("/") + 1);
              tStr = tStr.replaceAll("-", " ");

              temp.result.push({
                ...el,
                title: tStr,
              });
            }
          });

          setResults(temp);
          setUrlsLoaded(true);
        })
        .catch(console.log);
    }
    return () => {};
  }, []);

  const onSearch = (text: string) => {
    if (text.trim()) {
      history.push("/search?text=" + encodeURI(text.trim()));
      window.location.reload();
    }
  };
  const urlParams = new URLSearchParams(window.location.search);
  return !(urlParams.get("text") ?? "").trim() ? (
    <Redirect to="/" />
  ) : (
    <Layout>
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          height: isMobile ? "4rem" : "6rem",
          display: "flex",
          alignItems: "center",
          padding: isMobile ? "0 2rem" : undefined,
        }}
      >
        <CodeFilled
          style={{
            fontSize: isMobile ? "1.5rem" : "2.5rem",
            color: "#0288D1",
          }}
        />
        {!isMobile && (
          <Title level={2} style={{ margin: "0 8px", color: "#0288D1" }}>
            DevSearch
          </Title>
        )}
        <Search
          placeholder="Search"
          defaultValue={text ?? ""}
          allowClear
          size={isMobile ? "small" : "large"}
          onSearch={onSearch}
          style={{ margin: isMobile ? "0 1rem" : "0 5rem", maxWidth: 640 }}
        />
      </Header>
      <Content
        className="site-layout"
        style={{
          padding: isMobile ? 0 : "0 50px",
          marginTop: isMobile ? "2rem" : "6rem",
        }}
      >
        <div
          className="site-layout-background"
          style={{
            padding: 24,
            minHeight: 380,
            alignItems: "center",
            maxWidth: 640,
            margin: "0 auto",
            textAlign: "left",
          }}
        >
          {results?.result?.map((result) => (
            <Card
              title={""}
              loading={!urlsLoaded}
              bordered={false}
              key={result.url}
              style={{ margin: "32px 0" }}
            >
              <StackOverflow style={{ marginRight: 6 }} />
              <Text
                type="secondary"
                style={{ fontSize: "0.8rem", width: "80%" }}
                ellipsis
              >
                {result.url}
              </Text>
              <br />
              <div style={{ margin: "6px 0", padding: 0 }}>
                <Link href={result.url} style={{ fontSize: "1.2rem" }}>
                  {result.title}
                </Link>
              </div>

              {result.text === "no text" ? (
                ""
              ) : (
                <Text style={{}}>{result.text}</Text>
              )}
            </Card>
          ))}
        </div>
      </Content>
    </Layout>
  );
};

function trim(s: string, c: string) {
  if (c === "]") c = "\\]";
  if (c === "^") c = "\\^";
  if (c === "\\") c = "\\\\";
  return s.replace(new RegExp("^[" + c + "]+|[" + c + "]+$", "g"), "");
}
