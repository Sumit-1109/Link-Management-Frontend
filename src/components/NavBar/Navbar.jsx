import { useState } from "react";
import "./Navbar.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import morningImg from "../../assets/morning.png";
import afternoonImg from "../../assets/afternoon.png";
import eveningImg from "../../assets/evening.png";
import nightImg from "../../assets/night.png";
import create from '../../assets/create.png';
import search from '../../assets/search.png';
import { getUserDetails } from "../../services/auth";

function Navbar() {
  const navigate = useNavigate();

  const [time, setTime] = useState("");
  const [greeting, setGreeting] = useState("");
  const [greetingImg, setGreetingImg] = useState("");
  const [firstName, setFirstName] = useState("");
  const [initials, setInitials] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const getName = async () => {
        try {
          const res = await getUserDetails(token);
          const data = await res.json();

          if (res.status === 200) {

            setFirstName(data.firstName);
            setInitials(data.initials);

          } else {
            console.log("Something is wrong with the universe !!");
          }
        } catch (err) {
          console.log(err);
        }
      };

      getName();
    } else {
      console.log("Come on man, Login !!");
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const updateGreeting = () => {
      const now = new Date();
      const hour = now.getHours();
      let newGreeting = "";
      let imgSrc = "";

      console.log(now, hour);

      if (hour >= 5 && hour < 12) {
        newGreeting = `Good morning, ${firstName}`;
        imgSrc = morningImg;
      } else if (hour >= 12 && hour < 16) {
        newGreeting = `Good afternoon, ${firstName}`;
        imgSrc = afternoonImg;
      } else if (hour >= 16 && hour < 20) {
        newGreeting = `Good evening, ${firstName}`;
        imgSrc = eveningImg;
      } else if (hour >= 20 && hour < 5) {
        newGreeting = `Good night, ${firstName}`;
        imgSrc = nightImg;
      }

      setGreeting(newGreeting);
      setGreetingImg(imgSrc);
      setTime(
        now.toLocaleDateString("en-GB", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      );
    };

    updateGreeting();

    const interval = setInterval(() => {
      updateGreeting();
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [firstName]);

  return (
    <div className="navbarComponent">

      <div className="navbarGreetings">

        <div className="greetingTimeImage">

          <img src={greetingImg} alt="" />

        </div>

        <div className="greetingsNameAndTime">

          <p className="greetingsName">{greeting}</p>
          <p className="greetingsTime">{time}</p>

        </div>
      </div>

    <div className="navbarRight">
    <div className="createNewButton">
        <button> <img src={create} alt="create" /> Create New</button>
      </div>

      <div className="linkSearchBar">
        <img src={search} alt="search" />
        <input type="text" placeholder="Search link" />
      </div>

      <div className="greetingsInitial">
        <p>{initials}</p>
      </div>
    </div>

    </div>
  );
}

export default Navbar;
