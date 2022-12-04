import React from "react";
import Icon from "../../images/Icon.png";
import Osplaslogo from "../../images/osplash.png";
import downarrow from "../../images/down.png";
import questionIcon from "../../images/question.png";
import iconlink from "../../images/Iconlink.png";
import { useNavigate } from "react-router-dom";
import "./Card.css";

const Card = () => {
  const navigate = useNavigate();
  const userdata = JSON.parse(localStorage.getItem("selectedUser"));
  const handleNavigate = () => {
    navigate("/invite");
  };
  return (
    <div className="card-container">
      <div className="card-top">
        <div className="card-top-left">
          <div className="card-top-img">
            <img src={Icon} alt="git-hub-share" />
          </div>
          <div className="card-top-text">
            <h2 className="card-top-text-h2">Share to web</h2>
            <p className="card-top-text-p">
              Publish and share link with anyone
            </p>
          </div>
        </div>
        <div className="card-top-right">
          <label class="switch">
            <input type="checkbox" />
            <span class="slider round"></span>
          </label>
        </div>
      </div>
      <div className="card-main">
        <div className="input-section">
          <input
            type="text"
            placeholder="People, emails, groups"
            onFocus={handleNavigate}
            className="invite-input"
          />
          <button className="invite-btn">invite</button>
        </div>
        <div className="default-member">
          <div className="default-member-left">
            <div className="default-member-img">
              <img src={Osplaslogo} alt="git-hub-share" />
            </div>
            <div className="default-member-text">
              <h2 className="default-member-text-h2">Everyone at OSlash</h2>
              <p className="default-member-text-p">25 workspace members</p>
            </div>
          </div>
          <div className="default-member-right">
            <span>No access</span>
            <img src={downarrow} alt="Down Arrow" />
          </div>
        </div>
        <div>
          {userdata !== null &&
            userdata.map((user, i) => {
              return (
                <div className="default-member" key={i}>
                  <div className="default-member-left">
                    <div className="default-member-img"><img src={user.profileImg} alt="git-hub-share" /></div>
                    <div className="default-member-text">
                      {user.name !== undefined ? (
                        <h2 className="default-member-text-h2">{user.name}</h2>
                      ) : (
                        <h2 className="default-member-text-h2">
                          {user.branch}
                        </h2>
                      )}
                      <p className="default-member-text-p">{user.email}</p>
                    </div>
                  </div>
                  <div className="default-member-right">
                    <span>{user.access}</span>
                    <img src={downarrow} alt="Down Arrow" />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="card-footer">
        <div className="card-inner-footer">
          <div className="card-footer-left">
            <img
              className="card-footer-img"
              src={questionIcon}
              alt="git-hub-share"
            />
            <h2 className="card-footer-text-h2">learn about sharing</h2>
          </div>
          <div className="card-footer-right">
            <img
              className="card-footer-img"
              src={iconlink}
              alt="git-hub-share"
            />
            <p className="card-footer-text-p">Copy link</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
