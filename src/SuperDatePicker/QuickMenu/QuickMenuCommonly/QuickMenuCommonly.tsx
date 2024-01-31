import {
    addDays,
    endOfDay,
    endOfMonth,
    endOfWeek,
    endOfYear,
    startOfDay,
    startOfMonth,
    startOfWeek,
    startOfYear,
} from "date-fns";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import "./QuickMenuCommonly.scss";

interface QuickMenuCommonlyProps {
    className?: string;
    setLeftDate: (date: Date) => void;
    setRightDate: (date: Date) => void;
    setRecentlyUsed: (content: JSX.Element) => void;
    recentlyUsed: Array<JSX.Element>;
}

export const QuickMenuCommonly = (props: QuickMenuCommonlyProps) => {
    const {
        className,
        setLeftDate,
        setRightDate,
        setRecentlyUsed,
        recentlyUsed,
    } = props;
    const currentDate = new Date();

    const CommonlyUsedOptions: Record<
        string,
        { leftDate: Date; rightDate: Date }
    > = {
        Today: {
            leftDate: startOfDay(currentDate),
            rightDate: endOfDay(currentDate),
        },
        Yesterday: {
            leftDate: startOfDay(addDays(currentDate, -1)),
            rightDate: endOfDay(startOfDay(addDays(currentDate, -1))),
        },
        "This week": {
            leftDate: startOfWeek(currentDate, { weekStartsOn: 1 }),
            rightDate: addDays(endOfWeek(currentDate), 1),
        },
        "Week to date": {
            leftDate: startOfWeek(currentDate, { weekStartsOn: 1 }),
            rightDate: currentDate,
        },
        "This month": {
            leftDate: startOfMonth(currentDate),
            rightDate: endOfMonth(currentDate),
        },
        "Month to date": {
            leftDate: startOfMonth(currentDate),
            rightDate: currentDate,
        },
        "This year": {
            leftDate: startOfYear(currentDate),
            rightDate: endOfYear(currentDate),
        },
        "Year to date": {
            leftDate: startOfYear(currentDate),
            rightDate: currentDate,
        },
    };

    const onClickOption =
        ({
            leftDate,
            rightDate,
            option,
        }: {
            leftDate: Date;
            rightDate: Date;
            option: string;
        }) =>
        () => {
            console.log("124", recentlyUsed);

            setLeftDate(leftDate);
            setRightDate(rightDate);
            const content = (
                <div onClick={onClickOption({ leftDate, rightDate, option })}>
                    {option}
                </div>
            );
            setRecentlyUsed(content);
        };

    return (
        <div className={classNames("QuickMenuCommonly", {}, [className])}>
            <h4>Commonly used</h4>
            <div className="QuickMenuCommonly-container">
                {Object.entries(CommonlyUsedOptions).map(
                    ([option, { leftDate, rightDate }], index) => (
                        <div key={index}>
                            <Button
                                className={"QuickMenuCommonly__element"}
                                onClick={onClickOption({
                                    leftDate,
                                    rightDate,
                                    option,
                                })}
                                theme={ButtonTheme.CLEAR}
                            >
                                {option}
                            </Button>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};
