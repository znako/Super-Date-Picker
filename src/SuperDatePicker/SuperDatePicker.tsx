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
import { ReactComponent as CalendarIcon } from "shared/assets/calendar.svg";
import { ReactComponent as ArrowIcon } from "shared/assets/right-arrow.svg";

type DateSideType = "left" | "right";

const getFormattedDate = (date: Date) => {
    return format(date, "dd-MM-yyy HH:mm:ss.SSS");
};

interface SuperDatePickerProps {
    className?: string;
    startDate?: Date;
    endDate?: Date;
    onChangeDate: ({
        startDate,
        endDate,
    }: {
        startDate: Date;
        endDate: Date;
    }) => void;
}

export const SuperDatePicker = (props: SuperDatePickerProps) => {
    const {
        className,
        startDate,
        endDate,
        onChangeDate: onChangeDateProps,
    } = props;
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

    const setRecentlyUsedUtility = (content: JSX.Element) => {
        setRecentlyUsed((prevState) => [content, ...prevState.slice(0, 19)]);
    };

    const handleError = () => {
        setIntervalData(null);
        setError(true);
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
                        setError(false);
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
            if (day < rightDate && !(isNow && isRightDateNow)) {
                setInRecently(day, rightDate, "left");
            } else {
                handleError();
            }
        } else if (dateSide === "right") {
            setRightDate(day);
            setIsRightDateNow(isNow ?? false);
            if (leftDate < day && !(isNow && isLeftDateNow)) {
                setInRecently(leftDate, day, "right");
            } else {
                handleError();
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

    useEffect(() => {
        onChangeDateProps({ startDate: leftDate, endDate: rightDate });
    }, [leftDate, rightDate]);

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
                <Button
                    theme={ButtonTheme.CLEAR}
                    className="SuperDatePicker__quick-menu-button"
                >
                    <CalendarIcon />
                    <ArrowIcon className="SuperDatePicker__arrow-icon" />
                </Button>
            </Popover>
            <div className={"SuperDatePicker-inputWrapper"}>
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
                        className={classNames(
                            "SuperDatePicker-inputWrapper__input",
                            { "SuperDatePicker-inputWrapper_error": error },
                            ["SuperDatePicker-inputWrapper__input_left"]
                        )}
                    >
                        {isLeftDateNow
                            ? "now"
                            : leftDate && getFormattedDate(leftDate)}
                    </div>
                </Popover>
                <span className="SuperDatePicker-inputWrapper__arrow">
                    {"->"}
                </span>
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
                        className={classNames(
                            "SuperDatePicker-inputWrapper__input",
                            { "SuperDatePicker-inputWrapper_error": error },
                            []
                        )}
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
                className={"SuperDatePicker__refresh-button"}
                disabled={error}
            >
                Refresh
            </Button>
        </div>
    );
};
