import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

import Button from "../../components/Buttons/Button";
import LinkButton from "../../components/Buttons/LinkButton";
import Loading from "../../components/Loading/Loading";

import "./Start.css";

const Start = () => {
  const [serverStatus, setServerStatus] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const checkServer = async () => {
      try {
        const response = await fetch("https://yt-graveyard-server-grjdh.vercel.app");
        setServerStatus(response.status);
      } catch (error) {
        console.log(error);
        setServerStatus(503);
      }
    };

    checkServer();
  }, []);

  const checkServerResponse = () => {
    switch (serverStatus) {
      case 200:
        return renderContent();
      case null:
        return <Loading text="Checking server availability..." />;
      default:
        return (
          <main className="manual-steps">
            <p>Sorry, but the server is not responding. Please try again later!</p>
          </main>
        );
    }
  };

  const login = useGoogleLogin({
    onSuccess: async googleResponse =>
      navigate("/result", {
        state: {
          type: "auth",
          token: googleResponse.access_token,
        },
      }),
    scope: "https://www.googleapis.com/auth/youtube.readonly",
  });

  const renderContent = () => {
    return (
      <main className="start-container">
        <p>See which YouTube channels you are subscribed to are probably dead 💀</p>
        <Button
          text="Continue with Google Account"
          main
          onClick={() => login()}
        />
        <LinkButton
          to="/manual"
          text="Continue with Channel ID"
        />
      </main>
    );
  };

  return checkServerResponse();
};

export default Start;
