import { Popover } from "antd";
import {
    addMinutes,
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isSameDay,
    startOfMonth,
} from "date-fns";
import React, { useRef, useState } from "react";
import { classNames } from "../shared/lib/classNames/classNames";
import { Calendar } from "./Calendar/Calendar";
import { DatePicker } from "./DatePicker/DatePicker";
import "./SuperDatePicker.scss";

const WEEKDAYS = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

type DateSideType = "left" | "right";

const getFormattedDate = (date: Date) => {
    return format(date, "dd-MM-yyy HH:mm:ss.SSS");
};

interface SuperDatePickerProps {
    className?: string;
    startDate?: Date;
    endDate?: Date;
}

export const SuperDatePicker = (props: SuperDatePickerProps) => {
    const { className, startDate, endDate } = props;
    const [dateSide, setDateSide] = useState<null | DateSideType>(null);
    const currentDate = new Date();
    const [leftDate, setLeftDate] = useState<Date>(startDate || currentDate);
    const [rightDate, setRightDate] = useState<Date>(
        endDate || addMinutes(currentDate, 30)
    );

    const onClickDiv = (dateSide: DateSideType) => () => {
        setDateSide(dateSide);
        // if (showCalendar) {
        //     setShowCalendar((prevState) => !prevState);
        // } else {
        //     setShowCalendar(true);
        // }
    };

    const onChangeDate = (day: Date) => {
        if (dateSide === "left") {
            setLeftDate(day);
        } else if (dateSide === "right") {
            setRightDate(day);
        }
        console.log(day);
    };

    return (
        <div>
            <div className="inputWrapper">
                <Popover
                    content={
                        <DatePicker
                            onChangeDate={onChangeDate}
                            date={leftDate}
                        />
                    }
                    trigger={"click"}
                >
                    <div onClick={onClickDiv("left")} className="input">
                        {leftDate && getFormattedDate(leftDate)}
                    </div>
                </Popover>
                <Popover
                    content={
                        <DatePicker
                            onChangeDate={onChangeDate}
                            date={rightDate}
                        />
                    }
                    trigger={"click"}
                >
                    <div onClick={onClickDiv("right")} className="input">
                        {rightDate && getFormattedDate(rightDate)}
                    </div>
                </Popover>
            </div>
        </div>
    );
};
