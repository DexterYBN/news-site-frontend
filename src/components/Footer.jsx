import React from "react";
import "./styles/footerStyles.css";
import insta from "../social/instagram.png";
import twitter from "../social/twitter.png";
import whats from "../social/whats.png";
import youtube from "../social/youtube.png";
import dis from "../social/discord.png";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../features/categoriesSlice";
import { Link } from "react-router-dom";

const Footer = () => {
  const categories = useSelector((state) => state.categories.categories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <footer>
      <div className="info">
        <div className="title_1">FIND US</div>
        <div className="address">
          Address <br />
          07 Trosheva Street <br />
          Grozny, GR 10001
        </div>
        <div className="hours">
          Hours <br /> Monday—Friday: 10:00AM-6:00PM <br />
          Saturday & Sunday: 7:00AM-10:00PM
        </div>
      </div>
      <div className="info">
        <div className="title_2">CATEGORIES</div>
        <div className="foo_categories">
          {categories.map((category) => {
            return (
              <li key={category._id}>
                <Link to={`/category/${category._id}`}>
                  {category.name}
                </Link>
              </li>
            );
          })}
        </div>
      </div>
      <div className="info">
        <div className="title_3">RECENT POSTS</div>
        <div className="posts">
          It’s not a faith in technology. It’s faith in people. <br />
          <br /> The great myth of our times is that technology is
          communication. <br />
          <br /> If the path be beautiful, let us not ask where it leads. <br />
          <br /> Everything has beauty, but not everyone sees it.
        </div>
      </div>
      <div className="footer_2">
        <div className="copy">
          Copyright © 2022{" "}
          <a href="http://intocode.ru" target="blank">
            Intocode.
          </a>
        </div>
        <div className="social">
          <a href="http://instagram.com" target="blank">
            <img src={insta} alt="inst" />
          </a>
          <a href="http://twitter.com" target="blank">
            <img src={twitter} alt="twitter" />
          </a>
          <a href="http://whatsapp.ru" target="blank">
            <img src={whats} alt="whats" />
          </a>
          <a href="http://youtube.com" target="blank">
            <img src={youtube} alt="youtube" />
          </a>
          <a href="http://discord.com" target="blank">
            <img src={dis} alt="ds" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
