import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchNews } from "../features/newsSlice";
import { Link } from "react-router-dom";
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

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  if (loading) {
    return (
      <div style={{ color: "brown", fontSize: "50px", textAlign: "center" }}>
        News in progress. Wait...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: "brown", fontSize: "50px", textAlign: "center" }}>
        Error: {error.message}
      </div>
    );
  }

  return (
    <main>
      <div className="news_container">
        {news.map((item) => {
          return (
            <div key={item._id} className="news_card">
              <div className="card_items">
                <div>
                  <h5>{item.title}</h5>
                  <hr />
                </div>
                <div>
                  <h3>{item.subtitle.length > 93 ? item.subtitle.slice(0, 60) + "..." : item.subtitle}</h3>
                </div>
                <div>
                  <hr />
                  <Link to={`/news/${item._id}`}>Read more →</Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Home;
