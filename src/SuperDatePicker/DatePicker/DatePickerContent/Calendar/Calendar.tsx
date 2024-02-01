import {
    addDays,
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    getHours,
    getMilliseconds,
    getMinutes,
    getSeconds,
    isSameDay,
    setHours,
    setMilliseconds,
    setMinutes,
    setSeconds,
    startOfMonth,
} from "date-fns";
import { useState } from "react";
import { classNames } from "../../../../shared/lib/classNames/classNames";
import "./Calendar.scss";
import { CalendarElement } from "./CalendarElement/CalendarElement";
import { CalendarHeader } from "./CalendarHeader/CalendarHeader";
import { CalendarTimePicker } from "./CalendarTimePicker/CalendarTimePicker";
import { CalendarYearOrMonthPicker } from "./CalendarYearOrMonthPicker/CalendarYearOrMonthPicker";

export const WEEKDAYS = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

interface CalendarProps {
    onChangeDate: (day: Date) => void;
    className?: string;
    date: Date;
}

// Календарь
// Привычный виджет календаря, есть возможность выбрать дату по клику на ячейку
// можно переключаться по стрелочкам между месяцами
// можно по нажатию на месяц выбрать месяц в году, а на год - соответственно год))
// также есть TimePicker для выбора времени
export const Calendar = (props: CalendarProps) => {
    const { onChangeDate, className, date } = props;
    const [showYearOrMonthPicker, setShowYearOrMonthPicker] = useState<
        null | "year" | "month"
    >(null);

    const [calendarDate, setDate] = useState(date);

    // Получаем даты текущего месяца
    const firstDayOfMonth = startOfMonth(calendarDate);
    const lastDayOfMonth = endOfMonth(calendarDate);
    const daysInMonth = eachDayOfInterval({
        start: firstDayOfMonth,
        end: lastDayOfMonth,
    });

    // Получаем даты предыдущего месяца
    const startOfPrevMonth = addDays(
        firstDayOfMonth,
        -((getDay(firstDayOfMonth) || WEEKDAYS.length) - 1)
    );
    const endOfPrevMonth = addDays(firstDayOfMonth, -1);
    const daysInPreviousMonth =
        startOfPrevMonth <= endOfPrevMonth
            ? eachDayOfInterval({
                  start: startOfPrevMonth,
                  end: endOfPrevMonth,
              })
            : [];

    // Получаем даты следующего месяца
    const startOfNextMonth = addDays(lastDayOfMonth, 1);
    const endOfNextMonth = addDays(
        lastDayOfMonth,
        WEEKDAYS.length - (getDay(lastDayOfMonth) || WEEKDAYS.length)
    );
    const daysInNextMonth =
        startOfNextMonth <= endOfNextMonth
            ? eachDayOfInterval({
                  start: startOfNextMonth,
                  end: endOfNextMonth,
              })
            : [];

    // Переключаемся по стрелкам между месяцами
    const onClickArrowHeader = (type: "next" | "prev") => () => {
        const newDate = addMonths(calendarDate, type === "next" ? 1 : -1);
        onChangeDate(newDate);
        setDate(newDate);
    };

    function updateDate(hours: number, minutes: number): Date;
    function updateDate(day: Date): Date;
    function updateDate(dayOrHours: Date | number, minutes?: number): Date {
        if (minutes !== undefined && typeof dayOrHours === "number") {
            return setMilliseconds(
                setSeconds(
                    setMinutes(setHours(calendarDate, dayOrHours), minutes),
                    0
                ),
                0
            );
        } else {
            return setMilliseconds(
                setSeconds(
                    setMinutes(
                        setHours(dayOrHours, getHours(calendarDate)),
                        getMinutes(calendarDate)
                    ),
                    getSeconds(calendarDate)
                ),
                getMilliseconds(calendarDate)
            );
        }
    }

    // Нажатие на дату
    const onClickDateHandler = (day: Date) => () => {
        const newDate = updateDate(day);
        onChangeDate(newDate);
        setDate(newDate);
    };

    // Нажатие на время
    const onClickTimeHandler =
        ({ hours, minutes }: { hours: number; minutes: number }) =>
        () => {
            const newDate = updateDate(hours, minutes);
            onChangeDate(newDate);
            setDate(newDate);
        };

    // Нажатие на месяц или год, показываем пикер месяца/года
    const onClickYearOrMonthHeader = (type: "year" | "month") => () => {
        setShowYearOrMonthPicker(type);
    };

    // Нажатие в пикере Месяц/Год
    const onClickYearOrMonthPicker = (date: Date) => () => {
        setDate(date);
        onChangeDate(date);
        setShowYearOrMonthPicker(null);
    };

    return (
        <div className={classNames("Calendar", {}, [className])}>
            <div>
                <CalendarHeader
                    onClickArrowHeader={onClickArrowHeader}
                    date={calendarDate}
                    onClick={onClickYearOrMonthHeader}
                />
                <div className="dateContainer">
                    {WEEKDAYS.map((weekday) => (
                        <CalendarElement key={weekday}>
                            {weekday}
                        </CalendarElement>
                    ))}
                    {daysInPreviousMonth.map((day, index) => (
                        <CalendarElement
                            key={"prev-" + index}
                            className={classNames("dateContainer__date", {}, [
                                "dateContainer__date_not-this-month",
                            ])}
                            onClick={onClickDateHandler(day)}
                        >
                            {format(day, "d")}
                        </CalendarElement>
                    ))}
                    {daysInMonth.map((day, index) => (
                        <CalendarElement
                            key={index}
                            className={classNames(
                                "dateContainer__date",
                                {
                                    dateContainer__date_current: isSameDay(
                                        day,
                                        new Date()
                                    ),
                                    dateContainer__date_selected: isSameDay(
                                        day,
                                        date
                                    ),
                                },
                                []
                            )}
                            onClick={onClickDateHandler(day)}
                        >
                            {format(day, "d")}
                        </CalendarElement>
                    ))}
                    {daysInNextMonth.map((day, index) => (
                        <CalendarElement
                            key={"next-" + index}
                            className={classNames("dateContainer__date", {}, [
                                "dateContainer__date_not-this-month",
                            ])}
                            onClick={onClickDateHandler(day)}
                        >
                            {format(day, "d")}
                        </CalendarElement>
                    ))}
                </div>
            </div>
            <CalendarTimePicker
                date={calendarDate}
                onClickTimeHandler={onClickTimeHandler}
            />
            {showYearOrMonthPicker && (
                <CalendarYearOrMonthPicker
                    date={calendarDate}
                    onClick={onClickYearOrMonthPicker}
                    type={showYearOrMonthPicker}
                />
            )}
        </div>
    );
};
