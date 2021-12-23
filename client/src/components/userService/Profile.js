import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate;

  if (!currentUser) {
    return navigate("/login");
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>
            {currentUser.user.first} {currentUser.user.last}'s
          </strong>{" "}
          Profile
        </h3>
      </header>

      <p>
        <strong>Id:</strong> {currentUser.user._id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.user.email}
      </p>
      <p>
        <strong>Admin Status:</strong>{" "}
        {currentUser.user.isAdmin ? <>Administrator</> : <>Normal User</>}
      </p>
    </div>
  );
};

export default Profile;
