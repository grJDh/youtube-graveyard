import { DateTime } from "luxon";
import "./Card.css";

interface CardProps {
  failed?: boolean;
  channelID: string;
  channelThumbnail: string;
  channelTitle: string;
  lastVideoID?: string;
  lastVideoThumbnail?: string;
  lastVideoTitle?: string;
  lastVideoDate?: string;
}

const Card = ({
  failed = false,
  channelID,
  channelThumbnail,
  channelTitle,
  lastVideoID = "",
  lastVideoThumbnail = "",
  lastVideoTitle = "",
  lastVideoDate = "",
}: CardProps) => {
  const formatDate = (date: string): string => {
    const uploadDate = DateTime.fromISO(date);
    const difference = uploadDate.diffNow("days").toObject();

    const relative = DateTime.now().plus(difference).toRelative();

    return uploadDate.toLocaleString(DateTime.DATE_FULL) + " (" + relative + ")";
  };

  return (
    <li className="card">
      <a
        href={"https://www.youtube.com/channel/" + channelID}
        className="a-warper"
        target="_blank"
        rel="noreferrer"
        // aria-label={"Go to " + channelTitle + "'s channel page"}
      >
        <div className="channel-warper">
          <img
            src={channelThumbnail}
            alt={channelTitle + "'s channel avatar"}
          />
          <h2 className="text-overflow">{channelTitle}</h2>
        </div>
      </a>
      <span className="border"></span>
      {!failed && (
        <a
          href={"https://youtube.com/watch?v=" + lastVideoID}
          className="a-warper"
          target="_blank"
          rel="noreferrer"
          // aria-label={"Go to " + channelTitle + "'s last uploaded video"}
        >
          <div className="video-warper">
            <div className="thumbnail">
              <img
                src={lastVideoThumbnail}
                alt={channelTitle + "'s last uploaded video thumbnail"}
              />
              <p className="video-date">{formatDate(lastVideoDate)}</p>
            </div>
            <p className="text-overflow">{lastVideoTitle}</p>
          </div>
        </a>
      )}
    </li>
  );
};

export default Card;
