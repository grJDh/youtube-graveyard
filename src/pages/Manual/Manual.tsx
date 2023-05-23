import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import Input from "../../components/Input/Input";
import Spoiler from "../../components/Spoiler/Spoiler";
import Button from "../../components/Buttons/Button";

import yt_privacy from "../../assets/guide/yt_privacy.png";
import channel_id from "../../assets/guide/channel_id.png";

import "./Manual.css";

const Manual = () => {
  const [channelID, setChannelID] = useState("");

  const navigate = useNavigate();

  const handleSetToken = event => setChannelID(event.target.value);

  const handleSubmit = event => {
    event.preventDefault();
    navigate("/result", {
      state: {
        type: "manual",
        token: channelID,
      },
    });
  };

  return (
    <main className="manual-steps">
      <p>
        If you don't want to log in to your Google Account, then in order for the site to see your subscriptions you
        need to <span className="highlight">make them public</span>.
      </p>
      <p>
        You can do this by following{" "}
        <a
          className="highlight"
          href="https://www.youtube.com/account_privacy"
        >
          this link
        </a>{" "}
        and turning off the "Keep all my subscriptions private" option. Don't worry — you can turn it back on later!
      </p>

      <form
        className="manual-input"
        onSubmit={handleSubmit}
      >
        <Input
          placeholder="UCYourChannelID"
          onChange={handleSetToken}
          required
          value={channelID}
          pattern="(UC).*"
          help='Must start with "UC"'
          text="After that, enter your channel ID here:"
        />
        <Button
          text="Continue"
          main
          submit
        />
      </form>

      <Spoiler title="Where can I find my channel ID?">
        <p>
          Follow <a href="https://studio.youtube.com/">this link</a> and look at the adress bar. See a bunch of
          characters after "channel/" that starts with "UC"? This is your channel ID.{" "}
        </p>
        <p>
          <span className="highlight">If you don't have a channel</span>, then you can use{" "}
          <Link to="/">your Google Account</Link> instead
        </p>
        <img
          src={channel_id}
          alt="Where to find your channel ID"
        />
      </Spoiler>

      <Spoiler title="Where can I make my subscriptions public?">
        <p>
          Follow <a href="https://www.youtube.com/account_privacy">this link</a>{" "}
        </p>
        <img
          src={yt_privacy}
          alt='"Keep all my subscriptions private" setting'
        />
      </Spoiler>
    </main>
  );
};

export default Manual;
