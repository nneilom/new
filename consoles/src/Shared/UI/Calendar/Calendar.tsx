import { useState } from "react";
import "./Calendar.scss";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import { IDays } from "./types";
import { months, weekdays } from "./variables";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { dateSlice } from "../../../Entities/RegistratorEntities/RegistratorLists/TicketsHistory/DateSlice";

const Calendar = () => {
  const dispatch = useAppDispatch();
  const { currentDate } = useAppSelector(
    (state) => state.dateReducer
  );
  const date: any = new Date();
  const presentMonth = date.getMonth();
  const presentYear = date.getFullYear();
  const presentDay = date.getDate();
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(
    date.getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    date.getFullYear()
  );

  const nextMonth = () => {
    if (currentMonthIndex < 11) {
      setCurrentMonthIndex(currentMonthIndex + 1);
    } else if (currentMonthIndex === 11) {
      setCurrentMonthIndex(0);
      setCurrentYear(currentYear + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonthIndex > 0) {
      setCurrentMonthIndex(currentMonthIndex - 1);
    } else if (currentMonthIndex === 0) {
      setCurrentMonthIndex(11);
      setCurrentYear(currentYear - 1);
    }
  };

  const getDaysOfMonth = () => {
    const currMonth = months.filter(
      (month) => month.index === currentMonthIndex
    );

    const daysOfMonth: IDays = { month: currentMonthIndex, days: [] };

    for (let i = 1; i <= currMonth[0].days; i++) {
      daysOfMonth.month = currMonth[0].index;
      daysOfMonth.days.push(i);
    }

    return daysOfMonth;
  };

  const getEmptyWeekDays = () => {
    const currMonth = months.filter(
      (month) => month.index === currentMonthIndex
    );
    const setDate = new Date(
      `${currMonth[0].month} 01, ${currentYear}`
    );
    const indexOfFirstDay = setDate.getDay();

    const emptyDaysOfWeek: number[] = [];

    if (indexOfFirstDay === 0) {
      for (let i = -6; i < indexOfFirstDay; i++) {
        emptyDaysOfWeek.push(i);
      }
    } else {
      for (let i = 1; i < indexOfFirstDay; i++) {
        emptyDaysOfWeek.push(i);
      }
    }

    return emptyDaysOfWeek;
  };

  const selectDate = (day: number, month: number, year: number) => {
    dispatch(
      dateSlice.actions.setCurrentDate({
        day: day < 10 ? `0${day}` : String(day),
        month: month < 10 ? `0${month}` : String(month),
        year: String(year),
      })
    );
  };

  return (
    <div className="calendar">
      {months.map((month) => (
        <div
          key={month.month}
          className={`calendar__month ${
            currentMonthIndex === month.index
              ? "calendar__month_active"
              : null
          }`}
        >
          <div className="calendar__header">
            <span>
              {month.month} {currentYear}
            </span>
            <div className="calendar__arrows_wrapper">
              <div className="calendar__prev" onClick={prevMonth}>
                <MdOutlineKeyboardArrowLeft />
              </div>
              <div className="calendar__next" onClick={nextMonth}>
                <MdOutlineKeyboardArrowRight />
              </div>
            </div>
          </div>
          <div className="calendar__weekdays">
            {weekdays.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className="calendar__days_wrapper">
            {getEmptyWeekDays().map((dayweek) => (
              <div key={dayweek}></div>
            ))}
            {getDaysOfMonth().days.map((day: any) => (
              <div
                onClick={() => {
                  selectDate(day, currentMonthIndex + 1, currentYear);
                }}
                key={day}
                className={`calendar__day ${
                  presentMonth !== getDaysOfMonth().month
                    ? null
                    : presentYear !== currentYear
                    ? null
                    : day === presentDay
                    ? "calendar__currDay"
                    : null
                } ${
                  Number(currentDate.day) !== day
                    ? null
                    : Number(currentDate.month) !== currentMonthIndex + 1
                    ? null
                    : Number(currentDate.year) !== currentYear
                    ? null
                    : "calendar__selected-day"
                }`}
              >
                <span>{day}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Calendar;
