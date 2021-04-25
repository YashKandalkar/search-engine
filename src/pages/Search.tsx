import { useState, useEffect } from "react";
import { Layout, Card, Input, Typography, Pagination, Tag, Empty } from "antd";
import { CodeFilled } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import { Redirect, useHistory, useLocation } from "react-router";
import { GFG, StackOverflow } from "../assets/icons";
import { ApiResponse } from "../interfaces/ApiResponse";

const { Content, Header } = Layout;
const { Search } = Input;
const { Title, Text, Link } = Typography;

const blankRes = {
  url: "",
  text: "",
};

const firstResult = {
  result: [blankRes, blankRes, blankRes, blankRes],
};

export const SearchPage = () => {
  const [urlsLoaded, setUrlsLoaded] = useState(false);
  const urlParamsOne = new URLSearchParams(window.location.search);
  const [text, setText] = useState(urlParamsOne.get("text"));
  const [pageCount, setPageCount] = useState(1);
  const [results, setResults]: [ApiResponse | null, Function] = useState({
    result: [],
  });
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const location = useLocation();
  const history = useHistory();
  // TODO: ADD TAG FOR SO questions
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
          let pagesCount = (data.count ?? 1) / 15;
          if (pagesCount > 0) setPageCount(Math.ceil(pagesCount));
          else setPageCount(1);

          const temp: ApiResponse = { result: [] };
          data.result.forEach((el) => {
            if (!urlsVisited.includes(el.url)) {
              urlsVisited.push(el.url);
              if (!el.title || el.title === "What\u2019s New") {
                const t = new URL(el.url);
                const pathname = trim(t.pathname, "/");
                let tStr = pathname.substr(pathname.lastIndexOf("/") + 1);
                tStr = tStr.replaceAll("-", " ");

                temp.result.push({
                  ...el,
                  title: tStr,
                });
              } else {
                temp.result.push(el);
              }
            }
          });

          setResults(temp);
          setUrlsLoaded(true);
        })
        .catch(console.log);
    }
    return () => {};
  }, [location]);

  const onSearch = (text: string) => {
    let trimmed = text.trim();
    if (trimmed) {
      if (trimmed.substr(0, 2) === "#g") {
        window.open(
          "https://www.google.com/search?q=" + encodeURI(trimmed.substr(3))
        );
        return;
      } else {
        history.push("/search?text=" + encodeURI(trimmed));
        window.location.reload();
      }
    }
  };

  const onPageChange = (page: number) => {
    if (text?.trim()) {
      history.push("/search?text=" + encodeURI(text.trim()) + "&page=" + page);
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
            cursor: "pointer",
          }}
          onClick={() => history.push("/")}
        />
        {!isMobile && (
          <Title
            level={2}
            style={{ margin: "0 8px", color: "#0288D1", cursor: "pointer" }}
            onClick={() => history.push("/")}
          >
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
          {Boolean(results?.result?.length) && urlsLoaded ? (
            results?.result?.map((result, ind) => (
              <Card
                title={""}
                loading={!urlsLoaded}
                bordered={false}
                key={ind}
                style={{ margin: "32px 0" }}
              >
                {result.url.startsWith("https://stackoverflow.com") ? (
                  <StackOverflow style={{ marginRight: 6 }} />
                ) : (
                  <GFG style={{ marginRight: 6, width: "10px !important" }} />
                )}
                <Text
                  type="secondary"
                  style={{ fontSize: "0.8rem", width: "90%" }}
                  ellipsis
                >
                  {result.url}
                </Text>
                <br />
                <div style={{ margin: "6px 0", padding: 0 }}>
                  <Link
                    href={result.url}
                    style={{ fontSize: "1.2rem", width: "90%" }}
                    ellipsis
                  >
                    {result.title}
                  </Link>
                </div>
                {result.tags && (
                  <>
                    {typeof result.tags === "string" ? (
                      <Tag style={{ marginBottom: 8 }}>{result.tags}</Tag>
                    ) : (
                      result.tags
                        .slice(0, isMobile ? 3 : 4)
                        .map((tag, ind) => (
                          <Tag
                            key={ind}
                            style={{ marginBottom: 8, marginRight: 10 }}
                          >
                            {tag}
                          </Tag>
                        ))
                    )}
                    <br />
                  </>
                )}

                {result.text === "no text" ? (
                  ""
                ) : (
                  <Text style={{}}>{result.text ?? ""}</Text>
                )}
              </Card>
            ))
          ) : !urlsLoaded ? (
            firstResult?.result?.map((_, ind) => (
              <Card
                title={""}
                loading={!urlsLoaded}
                bordered={false}
                key={ind}
                style={{ margin: "32px 0" }}
              />
            ))
          ) : (
            <Empty
              style={{ marginTop: "20%" }}
              description={"Could not find any results!"}
            />
          )}
        </div>
      </Content>
      {urlsLoaded && Boolean(results?.result?.length) && (
        <Pagination
          defaultCurrent={Number.parseInt(
            new URLSearchParams(window.location.search).get("page") ?? "1"
          )}
          showSizeChanger={false}
          showQuickJumper
          onChange={onPageChange}
          total={pageCount}
          style={{ marginBottom: "32px" }}
        />
      )}
    </Layout>
  );
};

function trim(s: string, c: string) {
  if (c === "]") c = "\\]";
  if (c === "^") c = "\\^";
  if (c === "\\") c = "\\\\";
  return s.replace(new RegExp("^[" + c + "]+|[" + c + "]+$", "g"), "");
}
