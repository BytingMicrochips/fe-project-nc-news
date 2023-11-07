import axios from "axios";
import { useEffect, useState, Fragment, useContext } from "react";
import { UserContext } from "../App";

export const Footer = () => {
    const [user, setUser] = useContext(UserContext);
    const [allUsers, setAllUsers] = useState([])
    const [userAvatar, setUserAvatar] = useState("");
    
useEffect(() => {
      axios
        .get(`https://nc-news-service-h8vo.onrender.com/api/users`)
          .then(({ data }) => {
            setAllUsers(data.users)
        });
}, [])

useEffect(() => {
    allUsers.filter((eachUser) => {
        if (eachUser.username === user) {
          setUserAvatar(eachUser.avatar_url)
      }
  })
}, [allUsers, user])
    

const handleChangeUser = (e) => {
    setUser(e.currentTarget.value);
    }   

    return (
      <>
        <div id="loggedInWrapper">
          <div className="loggedInAs">
                    <p>You are logged in as {user}</p>
                    <img src={userAvatar}/>
          </div>
          <div className="loggedInAs">
            <p>Change user to </p>
            <select defaultValue={user} onChange={handleChangeUser}>
              {allUsers.map((eachUser) => {
                return (
                  <option value={eachUser.username}>{eachUser.username}</option>
                );
              })}
            </select>
          </div>
        </div>
      </>
    );
}