import React from "react";
import { classNames } from "../../../shared/lib/classNames/classNames";
import "./CalendarElement.scss";

interface CalendarElementProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export const CalendarElement = ({
    children,
    className,
    onClick,
}: CalendarElementProps) => {
    return (
        <div
            className={classNames("CalendarElement", {}, [className])}
            onClick={onClick}
        >
            {children}
        </div>
    );
};
