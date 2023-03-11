import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchComments, createComment } from "../features/commentSlice";
import { fetchNews } from "../features/newsSlice";
import { FaTelegramPlane } from "react-icons/fa";
import Error from "./Error";
import "./styles/newsStyles.css";
import { serverUrl } from "../serverUrl.js";

const Comments = () => {
  const { id } = useParams();

  const [text, setText] = React.useState("");
  const token = useSelector((state) => state.application.token);
  const loading = useSelector((state) => state.categories.loading);
  const error = useSelector((state) => state.categories.error);

  const handleAddComment = () => {
    dispatch(createComment({ text, id }));
    setText("");
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const comments = useSelector((state) =>
    state.comments.comments.filter((comment) => {
      if (!id) return true;
      return comment.news === id;
    })
  );

  const news = useSelector((state) =>
    state.news.news.filter((news) => {
      if (!id) return true;
      return news._id === id;
    })
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  if (error) {
    return <Error />;
  }

  if (loading) {
    return (
      <div className="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  return (
    <main>
      {news.map((news) => {
        return (
          <div key={news._id} className="title_news">
            <h1>{news.title}</h1>
          </div>
        );
      })}
      <div className="main_container">
        <div className="image_container">
          {news.map((item) => {
            return (
              <div key={item._id} className="capture">
                <img
                  src={`${serverUrl}/assets/Images/${item.image}`}
                  alt=""
                />
              </div>
            );
          })}
        </div>
        <div className="subtitle_container">
          {news.map((item) => {
            return <div key={item._id}>{item.subtitle}</div>;
          })}
        </div>
        <div className="comments_container">
          <div style={{ textAlign: "center", color: "#eee" }}>
            <h2>Reviews</h2>
            <hr />
          </div>
          {comments.map((comment) => {
            return (
              <div key={comment._id}>
                <div className="user_info">
                  <div className="nickname">{comment.user.login}</div>
                  <div className="comment">{comment.text}</div>
                  <div className="date">{comment.createdAt}</div>
                </div>
                <hr />
              </div>
            );
          })}
        </div>
        {token && (
          <div className="form">
            <input
              type="text"
              onChange={handleChange}
              value={text}
              placeholder="Enter your comment"
            />
            <button disabled={!text} type="submit" onClick={handleAddComment}>
              <FaTelegramPlane />
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Comments;
