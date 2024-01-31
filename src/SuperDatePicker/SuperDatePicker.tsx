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
import React, { useEffect, useRef, useState } from "react";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { classNames } from "../shared/lib/classNames/classNames";
import { Calendar } from "./DatePicker/DatePickerContent/Calendar/Calendar";
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
    const [isLeftDateNow, setIsLeftDateNow] = useState<boolean>(false);
    const [isRightDateNow, setIsRightDateNow] = useState<boolean>(false);
    const [leftDate, setLeftDate] = useState<Date>(startDate || currentDate);
    const [rightDate, setRightDate] = useState<Date>(
        endDate || addMinutes(currentDate, 30)
    );

    const onClickDiv = (dateSide: DateSideType) => () => {
        setDateSide(dateSide);
    };

    const onChangeDate = (day: Date) => {
        if (dateSide === "left") {
            setLeftDate(day);
        } else if (dateSide === "right") {
            setRightDate(day);
        }
        console.log(day);
    };

    useEffect(() => {
        console.log(leftDate);
        console.log(rightDate);
    }, [leftDate, rightDate]);

    const onClickRefresh = () => {
        if (isLeftDateNow) {
            setLeftDate(new Date());
        } else if (isRightDateNow) {
            setRightDate(new Date());
        }
    };

    return (
        <div className={classNames("SuperDatePicker", {}, [className])}>
            <div className="SuperDatePicker-inputWrapper">
                <Popover
                    content={
                        <DatePicker
                            onSetIsNowDate={setIsLeftDateNow}
                            onChangeDate={onChangeDate}
                            date={leftDate}
                        />
                    }
                    trigger={"click"}
                >
                    <div
                        onClick={onClickDiv("left")}
                        className="SuperDatePicker-inputWrapper__input"
                    >
                        {isLeftDateNow
                            ? "now"
                            : leftDate && getFormattedDate(leftDate)}
                    </div>
                </Popover>
                <Popover
                    content={
                        <DatePicker
                            onSetIsNowDate={setIsRightDateNow}
                            onChangeDate={onChangeDate}
                            date={rightDate}
                        />
                    }
                    trigger={"click"}
                >
                    <div
                        onClick={onClickDiv("right")}
                        className="SuperDatePicker-inputWrapper__input"
                    >
                        {isRightDateNow
                            ? "now"
                            : rightDate && getFormattedDate(rightDate)}
                    </div>
                </Popover>
                <Button
                    onClick={onClickRefresh}
                    theme={ButtonTheme.PRIMARY}
                    className={"SuperDatePicker__button"}
                >
                    Refresh
                </Button>
            </div>
        </div>
    );
};
