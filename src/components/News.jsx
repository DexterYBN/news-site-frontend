import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchComments, createComment } from "../features/commentSlice";
import { fetchNews } from "../features/newsSlice";
import { FaTelegramPlane } from "react-icons/fa";
import "./styles/commentStyles.css";

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
    <main>
      <div>
        {news.map((item) => {
          return <div>{item.subtitle}</div>;
        })}
      </div>
      <div className="comments">
        {comments.map((comment) => {
          return (
            <div key={comment._id}>
              <p>
                {comment.createdAt} {comment.user.login}
              </p>
              <p>{comment.text}</p>
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
    </main>
  );
};

export default Comments;
