import "./Loading.css";

import coffin_1 from "../../assets/loading/coffin_1.svg";
import coffin_2 from "../../assets/loading/coffin_2.svg";
import coffin_3 from "../../assets/loading/coffin_3.svg";
import coffin_floor from "../../assets/loading/coffin_floor.svg";

const Loading = ({ text }) => {
  return (
    <main className="loading-container">
      <p>{text}</p>
      <div className="loading-anim">
        <img
          className="coffin"
          src={coffin_1}
        />
        <img
          className="coffin"
          src={coffin_2}
        />
        <img
          className="coffin"
          src={coffin_3}
        />
        <img src={coffin_floor} />
      </div>
    </main>
  );
};

export default Loading;
