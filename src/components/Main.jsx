import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchNews } from "../features/newsSlice";
import { Link } from "react-router-dom";

const Main = () => {
  const news = useSelector((state) => state.news.news);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <main>
      <div>
        {news.map((item) => {
          return (
            <div>
              <Link to={`/news/${item._id}`}>{item.title}</Link>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Main;
