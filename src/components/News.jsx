import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchComments, createComment } from "../features/commentSlice";
import { fetchNews } from "../features/newsSlice";
import { FaTelegramPlane } from "react-icons/fa";
import "./styles/newsStyles.css";

const Comments = () => {
  const { id } = useParams();

  const [text, setText] = useState("");
  const token = useSelector((state) => state.application.token);

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

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  useEffect(() => {
    dispatch(createComment());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <main className="main_container">
      <div className="image_container">
        {news.map((item) => {
          return (
            <div className="capture">
              <img
                src={`http://localhost:4000/assets/Images/${item.image}`}
                alt=""
              />
            </div>
          );
        })}
      </div>
      <div className="subtitle_container">
        {news.map((item) => {
          return <div>{item.subtitle}</div>;
        })}
      </div>
      <div className="comments_container">
        {comments.map((comment) => {
          return (
            <>
              <div key={comment._id} className="user_info">
                <div className="nickname">{comment.user.login}</div>
                <div className="comment">{comment.text}</div>
                <div className="date">{comment.createdAt}</div>
              </div>
              <hr />
            </>
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
    </main>
  );
};

export default Comments;
