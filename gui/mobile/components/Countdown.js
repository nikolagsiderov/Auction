import { useEffect, useState } from "react";
import { Text } from "react-native";
import moment from "moment";

const Countdown = (props) => {
  const calculateTimeLeft = () => {
    let currentTime = Math.floor(Date.now() / 1000).toString();
    let leftTime = props.endDate - currentTime;
    let duration = moment.duration(leftTime, "seconds");
    let interval = 1000;

    if (duration.asSeconds() <= 0) {
      clearInterval(interval);
      //window.location.reload(true); //#skip the cache and reload the page from the server
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

  return <Text>{timeLeft}</Text>;
};

export default Countdown;
