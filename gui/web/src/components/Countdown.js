import { useEffect, useState } from "react";
import moment from "moment";

const Countdown = (props) => {
  const calculateTimeLeft = () => {
    let currentTime = Math.floor(Date.now() / 1000).toString();
    let leftTime = new Date(props.endDate).getTime() / 1000 - currentTime;
    let duration = moment.duration(leftTime, "seconds");
    let interval = 1000;

    if (duration.asSeconds() <= 0) {
      clearInterval(interval);
      window.location.reload(true);
    }

    duration = moment.duration(duration.asSeconds() - 1, "seconds");
    return (
      duration.days() +
      "д " +
      duration.hours() +
      "ч :" +
      duration.minutes() +
      "м :" +
      duration.seconds() +
      "с"
    );
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  return <span>{timeLeft}</span>;
};

export default Countdown;
