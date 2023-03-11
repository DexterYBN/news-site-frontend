import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchNews } from "../features/newsSlice";
import Skeleton from "./Skeleton";
import Error from "./Error";
import "./styles/homeStyles.css";

const Home = () => {
  const { id } = useParams();

  const news = useSelector((state) =>
    state.news.news.filter((news) => {
      if (!id) return true;
      return news.category._id === id;
    })
  );

  const loading = useSelector((state) => state.news.loading);
  const error = useSelector((state) => state.news.error);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const sceleton = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  if (error) {
    return <Error />;
  }

  return (
    <main>
      <div className="news_container">
        {news.map((item) => {
          return (
            <div key={item._id} className="news_card">
              {loading ? (
                sceleton
              ) : (
                <div className="card_items">
                  <div>
                    <h5>{item.title}</h5>
                    <hr />
                  </div>
                  <div>
                    <h3>
                      {item.subtitle.length > 1
                        ? item.subtitle.slice(0, 100) + "..."
                        : item.subtitle}
                    </h3>
                  </div>
                  <div>
                    <hr />
                    <Link to={`/news/${item._id}`}>Read more →</Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Home;
