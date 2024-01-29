import {
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    getHours,
    getMilliseconds,
    getMinutes,
    getSeconds,
    isSameDay,
    setHours,
    setMilliseconds,
    setMinutes,
    setSeconds,
    startOfMonth,
} from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { classNames } from "../../shared/lib/classNames/classNames";
import "./Calendar.scss";
import { CalendarElement } from "./CalendarElement/CalendarElement";
import { CalendarHeader } from "./CalendarHeader/CalendarHeader";
import { CalendarTimePicker } from "./CalendarTimePicker/CalendarTimePicker";

export const WEEKDAYS = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

interface CalendarProps {
    onChangeDate: (day: Date) => void;
    calssName?: string;
}

export const Calendar = (props: CalendarProps) => {
    const { onChangeDate, calssName } = props;

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

    function updateDate(hours: number, minutes: number): Date;
    function updateDate(day: Date): Date;
    function updateDate(dayOrHours: Date | number, minutes?: number): Date {
        if (minutes !== undefined && typeof dayOrHours === "number") {
            return setMilliseconds(
                setSeconds(setMinutes(setHours(date, dayOrHours), minutes), 0),
                0
            );
        } else {
            return setMilliseconds(
                setSeconds(
                    setMinutes(
                        setHours(dayOrHours, getHours(date)),
                        getMinutes(date)
                    ),
                    getSeconds(date)
                ),
                getMilliseconds(date)
            );
        }
    }

    const onClickDateHandler = (day: Date) => () => {
        const newDate = updateDate(day);
        onChangeDate(newDate);
        setDate(newDate);
    };

    const onClickTimeHandler =
        ({ hours, minutes }: { hours: number; minutes: number }) =>
        () => {
            const newDate = updateDate(hours, minutes);
            onChangeDate(newDate);
            setDate(newDate);
        };

    useEffect(() => {
        onChangeDate(currentDate);
    }, []);

    return (
        <div className={classNames("Calendar", {}, [calssName])}>
            <div>
                <CalendarHeader
                    onClickArrowHeader={onClickArrowHeader}
                    date={date}
                />
                <div className="dateContainer">
                    {WEEKDAYS.map((weekday) => (
                        <CalendarElement key={weekday}>
                            {weekday}
                        </CalendarElement>
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
            <CalendarTimePicker
                date={date}
                onClickTimeHandler={onClickTimeHandler}
            />
        </div>
    );
};
