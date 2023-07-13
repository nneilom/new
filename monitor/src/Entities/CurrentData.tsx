import { useEffect, useState } from "react";

const CurrentDate = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const dateOptions: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    const today = new Date().toLocaleDateString(undefined, dateOptions);
    setCurrentDate(today);
  }, []);

  return <>{currentDate}</>;
};

export default CurrentDate;
