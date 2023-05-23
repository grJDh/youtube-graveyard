import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { useLocation } from "react-router-dom";

import Card from "../../components/Card/Card";
import Loading from "../../components/Loading/Loading";

import "./Result.css";
import ErrorResponse from "../../components/ErrorResponse/ErrorResponse";
import NumberInput from "../../components/NumberInput/NumberInput";
import Dropdown from "../../components/Dropdown/Dropdown";

// time options
const DATE_OPTIONS = ["month(s)", "year(s)"] as const;
type TDATE_OPTIONS = (typeof DATE_OPTIONS)[number];

//sorting options
const SORT_OPTIONS = ["from new to old", "from old to new"] as const;
type TSORT_OPTIONS = (typeof SORT_OPTIONS)[number];

interface IChannelData {
  channelID: string;
  channelThumbnail: string;
  channelTitle: string;
  lastVideoDate: string;
  lastVideoID: string;
  lastVideoThumbnail: string;
  lastVideoTitle: string;
}
interface IFailedToLoadChannelData {
  channelID: string;
  channelThumbnail: string;
  channelTitle: string;
}

const Result = () => {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [subsData, setSubsData] = useState<IChannelData[]>([]);
  const [failedToLoadChannels, setFailedToLoadChannels] = useState<IFailedToLoadChannelData[]>([]);
  const [filteredAndSortedData, setFilteredAndSortedData] = useState<IChannelData[]>([]);
  const [numberValue, setNumberValue] = useState<number>(6);
  const [dropdownValue, setDropdownValue] = useState<TDATE_OPTIONS>("month(s)");
  const [isAscending, setIsAscending] = useState<TSORT_OPTIONS>("from new to old");

  const { state } = useLocation();

  //https://yt-graveyard-server-grjdh.vercel.app
  //http://localhost:3000

  //sending access_token or channel ID to backend and recieving response
  useEffect(() => {
    const getSubsData = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const serverResponse = await fetch("https://yt-graveyard-server-grjdh.vercel.app", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(state),
      });

      if (serverResponse.ok) {
        const jsonListOfSubs = await serverResponse.json();

        setSubsData(jsonListOfSubs.body);
        setFailedToLoadChannels(jsonListOfSubs.failedToLoadChannels);
        // console.log(jsonListOfSubs.body);
        // console.log(jsonListOfSubs.failedToLoadChannels);

        setIsFetching(false);
      } else {
        const error = await serverResponse.json();
        setError(error.error);
        setIsFetching(false);
        console.error("Error:", error.error);
      }
    };

    if (state) getSubsData();
  }, [state]);

  // filter data based on dropdown value and number value
  const filterData = async (data: IChannelData[]): Promise<IChannelData[]> => {
    const filteredData = data.filter(element => {
      const uploadDate = DateTime.fromISO(element.lastVideoDate);
      const difference = uploadDate.diffNow(["months", "years"]).toObject();

      if (dropdownValue === "month(s)") {
        const roundedDifference = difference.months !== undefined ? Math.abs(difference.months) : 0;
        return roundedDifference >= numberValue;
      } else {
        const roundedDifference = difference.years !== undefined ? Math.abs(difference.years) : 0;
        return roundedDifference >= numberValue;
      }
    });

    return filteredData;
  };

  // sort data based on last video date
  const sortData = async (data: IChannelData[]): Promise<IChannelData[]> => {
    const sortedData = [...data].sort((a, b) => {
      const aDate = DateTime.fromISO(a.lastVideoDate);
      const bDate = DateTime.fromISO(b.lastVideoDate);

      const dateDifference = aDate.diff(bDate, "days").toObject();

      if (dateDifference.days) return dateDifference.days;
      else return 0;
    });

    return sortedData;
  };

  // update filtered and sorted data when dropdown or number value changes
  useEffect(() => {
    const updateData = async () => {
      const filteredData = await filterData(subsData);
      const sortedData = await sortData(filteredData);
      setFilteredAndSortedData(sortedData);
    };

    updateData();
  }, [subsData, numberValue, dropdownValue]);

  //show loader while waiting for backend response or show an error if they didn't log in
  const renderContent = (): JSX.Element => {
    if (!state)
      return <ErrorResponse text="You didn't log in to your Google Account or provided Youtube channel ID!" />;
    if (isFetching) return <Loading text="Walking to graveyard..." />;
    if (error) return renderError();
    return renderGrid();
  };

  const renderError = (): JSX.Element => {
    switch (error) {
      case "subscriberNotFound":
        return <ErrorResponse text="Channel with this channel ID does not exist." />;
      case "subscriptionForbidden":
        return <ErrorResponse text="You forgot to make your subscriptions public." />;
      case "subscriptionsNotFound":
        return (
          <ErrorResponse text="Sorry, but we couldn't find your subscriptions. Either you don't have them, or some unknown error has occurred. If the latter, then please try logging in with your Google Account instead." />
        );
      case "quotaExceeded": {
        const whenQuotaResets = DateTime.fromObject({ hour: 0, minute: 0, second: 0 }, { zone: "pst" })
          .toLocal()
          .toLocaleString(DateTime.TIME_SIMPLE);
        return (
          <ErrorResponse
            text={`Sorry, but it looks like we exceeded our API quota. Please try again after ${whenQuotaResets} in your local time.`}
          />
        );
      }
      default:
        return <ErrorResponse text="Something went wrong. Please try again later." />;
    }
  };

  //actual content
  const renderGrid = (): JSX.Element => {
    return (
      <main className="result-page">
        <p>Here are YouTube channels that haven't released a video in at least...</p>
        <div className="controls">
          <NumberInput
            text="Filter by number of..."
            min={1}
            value={numberValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNumberValue(event.target.valueAsNumber)}
          />
          <Dropdown
            text="...months or years"
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              setDropdownValue(event.target.value as TDATE_OPTIONS)
            }
            value={dropdownValue}
            options={[...DATE_OPTIONS]}
          ></Dropdown>
          <Dropdown
            text="Sort..."
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              setIsAscending(event.target.value as TSORT_OPTIONS)
            }
            value={isAscending}
            options={[...SORT_OPTIONS]}
          ></Dropdown>
        </div>
        {filteredAndSortedData.length === 0 ? (
          <p className="no-results highlight">No results found!</p>
        ) : (
          <ul className="cards-grid">
            {(isAscending === "from new to old" ? [...filteredAndSortedData].reverse() : filteredAndSortedData).map(
              (element, i) => (
                <Card
                  key={i}
                  channelID={element.channelID}
                  channelThumbnail={element.channelThumbnail}
                  channelTitle={element.channelTitle}
                  lastVideoID={element.lastVideoID}
                  lastVideoThumbnail={element.lastVideoThumbnail}
                  lastVideoTitle={element.lastVideoTitle}
                  lastVideoDate={element.lastVideoDate}
                />
              )
            )}
          </ul>
        )}
        {failedToLoadChannels.length > 0 && (
          <p>...and here are the channels where we couldn't find the latest video :(</p>
        )}
        <ul className="cards-grid">
          {failedToLoadChannels.sort().map((element, i) => (
            <Card
              failed
              key={i}
              channelID={element.channelID}
              channelThumbnail={element.channelThumbnail}
              channelTitle={element.channelTitle}
            />
          ))}
        </ul>
      </main>
    );
  };

  return renderContent();
};

export default Result;
