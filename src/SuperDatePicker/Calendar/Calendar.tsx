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
import { classNames } from "../../shared/lib/classNames/classNames";
import "./Calendar.scss";
import { CalendarElement } from "./CalendarElement/CalendarElement";
import { CalendarHeader } from "./CalendarHeader/CalendarHeader";

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

    const onClickArrowHeader = (type: "next" | "prev") => () => {
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
            <CalendarHeader
                onClickArrowHeader={onClickArrowHeader}
                date={date}
            />
            <div className="dateContainer">
                {WEEKDAYS.map((weekday) => (
                    <CalendarElement key={weekday}>{weekday}</CalendarElement>
                ))}
                {new Array((getDay(firstDayOfMonth) || 7) - 1)
                    .fill(0)
                    .map((_, index) => (
                        <CalendarElement
                            key={"empty-" + index}
                        ></CalendarElement>
                    ))}
                {daysInMonth.map((day, index) => (
                    <CalendarElement
                        key={index}
                        className={classNames(
                            "dateContainer__date",
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
                            []
                        )}
                        onClick={onClickDateHandler(day)}
                    >
                        {format(day, "d")}
                    </CalendarElement>
                ))}
            </div>
        </div>
    );
};
