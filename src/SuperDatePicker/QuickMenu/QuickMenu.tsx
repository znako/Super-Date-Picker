import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { QuickMenuCommonly } from "./QuickMenuCommonly/QuickMenuCommonly";
import "./QuickMenu.scss";
import { QuickMenuRecently } from "./QuickMenuRecently/QuickMenuRecently";
import { QuickMenuInterval } from "./QuickMenuInterval/QuickMenuInterval";

interface QuickMenuProps {
    className?: string;
    setLeftDate: (date: Date) => void;
    setRightDate: (date: Date) => void;
    setRecentlyUsed: (content: JSX.Element) => void;
    recentlyUsed: Array<JSX.Element>;
    intervalData: null | number;
    setIntervalData: (intervalData: null | number) => void;
    error: boolean;
}

// Меню ьыстрого доступа
// Позволяет установить даты по готовым шаблонам
//           установить ранее используемые даты
// А также установить автообновление дат
export const QuickMenu = (props: QuickMenuProps) => {
    const {
        className,
        setLeftDate,
        setRightDate,
        recentlyUsed,
        setRecentlyUsed,
        intervalData,
        setIntervalData,
        error,
    } = props;

    return (
        <div className={classNames("QuickMenu", {}, [className])}>
            <QuickMenuCommonly
                setLeftDate={setLeftDate}
                setRightDate={setRightDate}
                setRecentlyUsed={setRecentlyUsed}
            />
            <hr className="QuickMenu__line" />
            {!!recentlyUsed.length && (
                <>
                    <QuickMenuRecently recentlyUsed={recentlyUsed} />
                    <hr className="QuickMenu__line" />
                </>
            )}
            <QuickMenuInterval
                intervalData={intervalData}
                setIntervalData={setIntervalData}
                error={error}
            />
        </div>
    );
};
