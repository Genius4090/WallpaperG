import React from "react";
import "../styles/About.css";

function About() {
  return (
    <div className="container">
      <div className="about__father">
        <div className="about__hero__page">
          <div className="about__hero__text__box  animate__animated animate__fadeInDown">
            <h1 className="about__hero__heading">
              Everything About <br />
              <span className="about__hero__heading__part1 "> Websites</span> &
              <span className="about__hero__heading__part2"> Beyond</span>
            </h1>
          </div>
          <p className="about__hero__description animate__animated animate__fadeInUp">
            Find beautiful, high-quality wallpapers that enhance your devices
            and elevate your screen experience
          </p>
        </div>

        <div className="about__center__page">
          <div className="about__center__left__box ">
            <h1 className="about__center__heading animate__animated animate__fadeInDown">
              Unleash Your{" "}
              <span className="about__center__heading__part water-brush-regular">
                Style
              </span>{" "}
            </h1>
            <p className="about__center__description animate__animated animate__fadeIn">
              See how our wallpapers look on different screens and bring style
              to your devices! We offer high-quality 4K wallpapers with glowing
              effects and dark themes. Perfect for your laptop, phone, or tablet
            </p>
            <div className="about__center__left__minibox  animate__animated  animate__fadeInUp">
              <div className="about__minibox__left">
                <h2 className="about__minibox__left__heading">80%</h2>
                <p className="about__minibox__left__description">
                  Enjoy a variety of wallpapers in crisp 4K and high-quality for
                  every screen
                </p>
              </div>
              <div className="about__minibox__right">
                <h2 className="about__minibox__right__heading">500+</h2>
                <p className="about__minibox__right__description">
                  Discover over 500 elegant wallpapers that captivate and
                  transform your screens
                </p>
              </div>
            </div>
          </div>

          <img
            className="responsive__img animate__animated animate__fadeIn"
            src="./extra/resolution.webp"
            alt=""
          />
        </div>
        <div className="about__footer__page">
          <div className="about__footer__container ">
            <div className="about__footer__box1 ">
              <h2 className="about__footer__box1__heading animate__animated animate__fadeInLeft">
                Beyond universe
              </h2>
              <p className="about__footer__box1__description animate__animated   animate__fadeInDown">
                Let’s know more about us
              </p>
              <div className="animate__animated animate__fadeInDown" >
              <div className="about__footer__box1__bookbox ">
                <div className="book__star__box">
                  <img
                    className="star__img"
                    src="./extra/book__star.svg"
                    alt=""
                  />
                  <p className="book__heading">Currently Reading</p>
                </div>
                <p className="book__description">
                  Book of the Week We Recommend!
                </p>

                <img className="book__image" src="./extra/book.png" alt="" />
              </div>
              </div>
             
            </div>

            <div className="about__footer__box2 animate__animated animate__fadeInDown">
              <div className="footer__social__box">
                <div className="social__heading__box">
                  <img
                    className="star__img"
                    src="./extra/book__star.svg"
                    alt=""
                  />
                  <h2 className="social__heading">Our Tech Stacks</h2>
                </div>

                <p className="social__description">
                  Stay connected on social media for the latest wallpapers and
                  updates
                </p>

                <div className="social__link__box">
                  <div className="social__link github__btn">
                    <a
                      href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
                      target="_blank"
                    >
                      <i className="ri-github-line github"></i>
                    </a>
                  </div>
                  <div className="social__link discord__btn">
                    <a
                      href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
                      target="_blank"
                    >
                      {" "}
                      <i className="bx bxl-discord-alt discord"></i>
                    </a>
                  </div>
                  <div className="social__link telegram__btn">
                    <a
                      href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
                      target="_blank"
                    >
                      {" "}
                      <i className="bx bxl-telegram telegram"></i>{" "}
                    </a>
                  </div>
                  <div className="social__link twitter__btn">
                    <a
                      href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
                      target="_blank"
                    >
                      {" "}
                      <img
                        className="twitter__link twitter"
                        src="./extra/twitter.svg"
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="social__link instagram__btn">
                    <a
                      href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
                      target="_blank"
                    >
                      {" "}
                      <i className="ri-instagram-line instagram"></i>
                    </a>
                  </div>
                  <div className="social__link linkedin__btn">
                    <a
                      href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
                      target="_blank"
                    >
                      {" "}
                      <i className="ri-linkedin-box-fill linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="devs__box">
                <div className="devs__container">
                  <div className="dev__1"></div>
                  <div className="dev__2"></div>
                  <div className="dev__3"></div>
                </div>
                <p className="devs__text">
                  Some designers We <strong>admire</strong> 😍
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
