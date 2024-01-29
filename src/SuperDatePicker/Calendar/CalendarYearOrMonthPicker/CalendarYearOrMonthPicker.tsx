import { getMonth, getYear, setMonth, setYear } from "date-fns";
import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import "./CalendarYearOrMonthPicker.scss";

interface CalendarYearOrMonthPickerProps {
    className?: string;
    date: Date;
    onClick: (date: Date) => () => void;
    type: "month" | "year";
}

const COUNT_OF_DISPLAYED_YEARS = 15;
const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const CalendarYearOrMonthPicker = (
    props: CalendarYearOrMonthPickerProps
) => {
    const { className, date, onClick, type } = props;

    return (
        <div
            className={classNames("CalendarYearOrMonthPicker", {}, [className])}
        >
            {type === "year"
                ? Array.from({ length: COUNT_OF_DISPLAYED_YEARS }).map(
                      (_, index) => {
                          if (
                              index !==
                              Math.floor((COUNT_OF_DISPLAYED_YEARS - 1) / 2)
                          ) {
                              const newDate = setYear(
                                  date,
                                  getYear(date) - 7 + index
                              );
                              return (
                                  <div
                                      onClick={onClick(newDate)}
                                      key={index}
                                      className="CalendarYearOrMonthPicker__element"
                                  >
                                      {getYear(newDate)}
                                  </div>
                              );
                          } else {
                              return (
                                  <div
                                      onClick={onClick(date)}
                                      key={index}
                                      className={classNames(
                                          "CalendarYearOrMonthPicker__element",
                                          {},
                                          [
                                              "CalendarYearOrMonthPicker__element_selected",
                                          ]
                                      )}
                                  >
                                      {getYear(date)}
                                  </div>
                              );
                          }
                      }
                  )
                : MONTHS.map((month, index) => (
                      <div
                          key={index}
                          className={classNames(
                              "CalendarYearOrMonthPicker__element",
                              {
                                  CalendarYearOrMonthPicker__element_selected:
                                      index === getMonth(date),
                              },
                              []
                          )}
                          onClick={onClick(setMonth(date, index))}
                      >
                          {month}
                      </div>
                  ))}
        </div>
    );
};
