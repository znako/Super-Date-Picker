import {
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isSameDay,
    startOfMonth,
} from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { classNames } from "../../classNames/classNames";
import "./Calendar.scss";

export const WEEKDAYS = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

interface CalendarProps {
    onChangeDate: (day: Date) => void;
}

export const Calendar = (props: CalendarProps) => {
    const { onChangeDate } = props;

    const currentDate = new Date();
    const [date, setDate] = useState(currentDate);
    const firstDayOfMonth = startOfMonth(date);
    const lastDayOfMonth = endOfMonth(date);
    const daysInMonth = eachDayOfInterval({
        start: firstDayOfMonth,
        end: lastDayOfMonth,
    });

    const onClickArrow = (type: "next" | "prev") => () => {
        const newDate = addMonths(date, type === "next" ? 1 : -1);
        onChangeDate(newDate);
        setDate(newDate);
    };

    const onClickDateHandler = (day: Date) => () => {
        onChangeDate(day);
        setDate(day);
    };

    useEffect(() => {
        onChangeDate(currentDate);
    }, []);

    return (
        <div className="calendarContainer">
            <div className="calendarContainer__header">
                <button onClick={onClickArrow("prev")}>prev</button>
                <h2 className="calendarContainer__title">
                    {format(date, "MMMM yyyy")}
                </h2>
                <button onClick={onClickArrow("next")}>next</button>
            </div>
            <div className="dateContainer">
                {WEEKDAYS.map((weekday) => (
                    <div key={weekday} className="dateContainer__element">
                        {weekday}
                    </div>
                ))}
                {new Array((getDay(firstDayOfMonth) || 7) - 1)
                    .fill(0)
                    .map((_, index) => (
                        <div
                            key={"empty-" + index}
                            className="dateContainer__element"
                        ></div>
                    ))}
                {daysInMonth.map((day, index) => (
                    <div
                        key={index}
                        className={classNames(
                            "dateContainer__element",
                            {
                                dateContainer__date_current: isSameDay(
                                    day,
                                    new Date()
                                ),
                                dateContainer__date_selected: isSameDay(
                                    day,
                                    date
                                ),
                            },
                            ["dateContainer__date"]
                        )}
                        onClick={onClickDateHandler(day)}
                    >
                        {format(day, "d")}
                    </div>
                ))}
            </div>
        </div>
    );
};
