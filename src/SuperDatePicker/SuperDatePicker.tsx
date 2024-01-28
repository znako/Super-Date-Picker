import { Popover } from "antd";
import {
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isSameDay,
    startOfMonth,
} from "date-fns";
import React, { useRef, useState } from "react";
import { classNames } from "../classNames/classNames";
import { Calendar } from "./Calendar/Calendar";
import "./SuperDatePicker.scss";

const WEEKDAYS = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

type DateSideType = "left" | "right";

const getFormattedDate = (date: Date) => {
    return format(date, "dd-MM-yyy HH:mm:ss.SSS");
};

export const SuperDatePicker = () => {
    const targetDiv = useRef<null | HTMLDivElement>(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [dateSide, setDateSide] = useState<null | DateSideType>(null);
    const [leftDate, setLeftDate] = useState<null | Date>(null);
    const [rightDate, setRightDate] = useState<null | Date>(null);

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
                    content={<Calendar onChangeDate={onChangeDate} />}
                    trigger={"click"}
                >
                    <div onClick={onClickDiv("left")} className="input">
                        {leftDate && getFormattedDate(leftDate)}
                    </div>
                </Popover>
                <Popover
                    content={<Calendar onChangeDate={onChangeDate} />}
                    trigger={"click"}
                >
                    <div onClick={onClickDiv("right")} className="input">
                        {rightDate && getFormattedDate(rightDate)}
                    </div>
                </Popover>
            </div>
            {showCalendar && <Calendar onChangeDate={onChangeDate} />}
        </div>
    );
};
