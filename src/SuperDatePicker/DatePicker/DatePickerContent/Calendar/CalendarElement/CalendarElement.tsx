import React from "react";
import { classNames } from "../../../../../shared/lib/classNames/classNames";
import "./CalendarElement.scss";

interface CalendarElementProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

// Вспомоготаельный компонент для календаря со стилями и некоторыми пропсами
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
