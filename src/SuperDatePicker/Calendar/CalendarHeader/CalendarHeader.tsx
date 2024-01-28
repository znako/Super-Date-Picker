import { format } from "date-fns";
import React from "react";
import "./CalendarHeader.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { ReactComponent as ArrowIcon } from "shared/assets/right-arrow.svg";
import { Button } from "shared/ui/Button/Button";

interface CalendarHeaderProps {
    onClickArrowHeader: (type: "next" | "prev") => () => void;
    date: Date;
    className?: string;
}

export const CalendarHeader = (props: CalendarHeaderProps) => {
    const { onClickArrowHeader, date, className } = props;
    return (
        <div className={classNames("CalendarHeader", {}, [className])}>
            <Button onClick={onClickArrowHeader("prev")}>
                <ArrowIcon
                    className={classNames("CalendarHeader__arrow", {}, [
                        "CalendarHeader__arrow_left",
                    ])}
                />
            </Button>
            <h2 className="CalendarHeader__title">
                {format(date, "MMMM yyyy")}
            </h2>
            <Button onClick={onClickArrowHeader("next")}>
                <ArrowIcon className="CalendarHeader__arrow" />
            </Button>
        </div>
    );
};
