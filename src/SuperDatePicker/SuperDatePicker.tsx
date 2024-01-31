import { Popover } from "antd";
import {
    addMinutes,
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    interval,
    isSameDay,
    startOfMonth,
} from "date-fns";
import React, { HTMLFactory, useEffect, useRef, useState } from "react";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { classNames } from "../shared/lib/classNames/classNames";
import { Calendar } from "./DatePicker/DatePickerContent/Calendar/Calendar";
import { DatePicker } from "./DatePicker/DatePicker";
import "./SuperDatePicker.scss";
import { QuickMenu } from "./QuickMenu/QuickMenu";

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

    const [error, setError] = useState(false);
    const [intervalData, setIntervalData] = useState<null | number>(null);
    const [recentlyUsed, setRecentlyUsed] = useState<Array<JSX.Element>>([]);

    const onClickDiv = (dateSide: DateSideType) => () => {
        setDateSide(dateSide);
    };

    useEffect(() => {
        console.log(recentlyUsed);
    }, [recentlyUsed]);

    const setRecentlyUsedUtility = (content: JSX.Element) => {
        setRecentlyUsed((prevState) => [content, ...prevState.slice(0, 19)]);
    };

    const onChangeDate = (day: Date, isNow?: boolean) => {
        const setInRecently = (
            leftDate: Date,
            rightDate: Date,
            side: "left" | "right"
        ) => {
            const content = (
                <div
                    onClick={() => {
                        setLeftDate(leftDate);
                        setRightDate(rightDate);
                        setIsLeftDateNow(
                            side === "left" ? !!isNow : isLeftDateNow
                        );
                        setIsRightDateNow(
                            side === "right" ? !!isNow : isRightDateNow
                        );
                        setInRecently(leftDate, rightDate, side);
                    }}
                >
                    {((side === "left" && isNow) ||
                    (side === "right" && isLeftDateNow)
                        ? "now"
                        : getFormattedDate(leftDate)) +
                        " -> " +
                        ((side === "right" && isNow) ||
                        (side === "left" && isRightDateNow)
                            ? "now"
                            : getFormattedDate(rightDate))}
                </div>
            );
            setRecentlyUsedUtility(content);
        };
        setError(false);
        if (dateSide === "left") {
            setLeftDate(day);
            setIsLeftDateNow(isNow ?? false);
            if (day < rightDate) {
                setInRecently(day, rightDate, "left");
            } else {
                setIntervalData(null);
                setError(true);
            }
        } else if (dateSide === "right") {
            setRightDate(day);
            setIsRightDateNow(isNow ?? false);
            if (leftDate < day) {
                setInRecently(leftDate, day, "right");
            } else {
                setIntervalData(null);
                setError(true);
            }
        }
    };

    const onClickRefresh = () => {
        const now = new Date();
        if (isLeftDateNow) {
            setLeftDate(now);
            console.log(now, rightDate);
        } else if (isRightDateNow) {
            setRightDate(now);
            console.log(leftDate, now);
        }
    };

    useEffect(() => {
        let intervalId: NodeJS.Timer | undefined;
        if (intervalData !== null) {
            intervalId = setInterval(onClickRefresh, intervalData);
        } else {
            clearInterval(intervalId);
            setIntervalData(null);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [intervalData, isLeftDateNow, isRightDateNow]);

    const setLeftDateQuickMenuHandler = (date: Date) => {
        setLeftDate(date);
        setIsLeftDateNow(false);
    };

    const setRightDateQuickMenuHandler = (date: Date) => {
        setRightDate(date);
        setIsRightDateNow(false);
    };

    return (
        <div className={classNames("SuperDatePicker", {}, [className])}>
            <Popover
                content={
                    <QuickMenu
                        setLeftDate={setLeftDateQuickMenuHandler}
                        setRightDate={setRightDateQuickMenuHandler}
                        recentlyUsed={recentlyUsed}
                        setRecentlyUsed={setRecentlyUsedUtility}
                        intervalData={intervalData}
                        setIntervalData={setIntervalData}
                        error={error}
                    />
                }
                trigger={"click"}
            >
                <Button theme={ButtonTheme.PRIMARY}>quick</Button>
            </Popover>
            <div className="SuperDatePicker-inputWrapper">
                <Popover
                    content={
                        <DatePicker
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
            </div>
            <Button
                onClick={onClickRefresh}
                theme={error ? ButtonTheme.DISABLED : ButtonTheme.PRIMARY}
                className={"SuperDatePicker__button"}
            >
                Refresh
            </Button>
        </div>
    );
};
