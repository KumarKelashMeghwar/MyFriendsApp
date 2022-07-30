import React, { useEffect, useState } from "react";
import FriendCard from "./FriendCard";

const Home = () => {
  const [friends, setFriends] = useState({});

  useEffect(() => {
    const getData = async () => {
      let userid = JSON.parse(localStorage.getItem("user"))._id;
      let result = await fetch(
        "https://myfriendsappnode.herokuapp.com/get-friends",
        {
          method: "POST",
          body: JSON.stringify({ userid }),
          headers: {
            "Content-Type": "application/json",
            authorization: JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      result = await result.json();
      setFriends(result);
    };
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="friends_area">
        {friends.data &&
          friends.data.map((friend) => {
            return (
              <FriendCard
                key={friend.mobile}
                photo={friend.image.data.data}
                name={friend.name}
                gender={friend.gender}
                country={friend.country}
                mobile={friend.mobile}
              />
            );
          })}
      </div>
    </>
  );
};

export default Home;
