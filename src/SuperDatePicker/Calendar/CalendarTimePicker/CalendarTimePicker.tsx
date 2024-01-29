import { addMinutes, format, getHours, getMinutes } from "date-fns";
import React, { useEffect, useRef } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import "./CalendarTimePicker.scss";

interface CalendarTimePickerProps {
    className?: string;
    date: Date;
    onClickTimeHandler: ({
        hours,
        minutes,
    }: {
        hours: number;
        minutes: number;
    }) => () => void;
}

const COUNT_OF_HALF_HOURS = 48;

export const CalendarTimePicker = (props: CalendarTimePickerProps) => {
    const { className, date, onClickTimeHandler } = props;
    const selectedTime = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        console.log(selectedTime.current);
        selectedTime.current?.scrollIntoView({ block: "center" });
    }, []);

    return (
        <div className={classNames("CalendarTimePicker", {}, [className])}>
            {Array.from({ length: COUNT_OF_HALF_HOURS }).map((_, index) => {
                const hours = Math.floor(index / 2);
                const minutes = (index * 30) % 60;
                const isSelectedTime =
                    getHours(date) === hours &&
                    (minutes === 30
                        ? getMinutes(date) >= 30
                        : getMinutes(date) < 30);
                return (
                    <div
                        key={index}
                        className={classNames("CalendarTimePicker__element", {
                            CalendarTimePicker__element_selected:
                                isSelectedTime,
                        })}
                        onClick={onClickTimeHandler({ hours, minutes })}
                        ref={isSelectedTime ? selectedTime : undefined}
                    >{`${hours.toString().padStart(2, "0")} : ${minutes
                        .toString()
                        .padStart(2, "0")}`}</div>
                );
            })}
        </div>
    );
};
