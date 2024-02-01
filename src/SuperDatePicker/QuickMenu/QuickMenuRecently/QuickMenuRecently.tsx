import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import "./QuickMenuRecently.scss";

interface QuickMenuRecentlyProps {
    className?: string;
    recentlyUsed: Array<JSX.Element>;
}

// Список последних используемых дат
// Принимает список уже готовых JSX элементов
export const QuickMenuRecently = (props: QuickMenuRecentlyProps) => {
    const { className, recentlyUsed } = props;

    return (
        <div className={classNames("QuickMenuRecently", {}, [className])}>
            <h4>Recently used date ranges</h4>
            <div className="QuickMenuRecently-container">
                {recentlyUsed.map((content, index) => (
                    <div className="QuickMenuRecently__element" key={index}>
                        {content}
                    </div>
                ))}
            </div>
        </div>
    );
};
