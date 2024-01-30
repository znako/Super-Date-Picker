import {
    addDays,
    addHours,
    addMinutes,
    addMonths,
    addSeconds,
    addWeeks,
    addYears,
} from "date-fns";
import { useRef, useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import "./DatePickerRelative.scss";

type OptionsType =
    | "Seconds"
    | "Minutes"
    | "Hours"
    | "Days"
    | "Weeks"
    | "Months"
    | "Years";

const OPTIONS: Array<OptionsType> = [
    "Seconds",
    "Minutes",
    "Hours",
    "Days",
    "Weeks",
    "Months",
    "Years",
];

const MIN_INPUT_VALUE = 0;
const MAX_INPUT_VALUE = 99999;

interface DatePickerRelativeProps {
    className?: string;
    onChangeDate: (day: Date) => void;
    inputValue: string;
    setInputValue: (value: string) => void;
    selectValue: string;
    setSelectValue: (value: string) => void;
}

export const DatePickerRelative = (props: DatePickerRelativeProps) => {
    const {
        className,
        onChangeDate,
        inputValue,
        setInputValue,
        selectValue,
        setSelectValue,
    } = props;

    const currentDate = new Date();

    const isValidInput = (value: string) => {
        return (
            value === "" ||
            (value.match(/^\d+$/) &&
                Number(value) >= MIN_INPUT_VALUE &&
                Number(value) <= MAX_INPUT_VALUE)
        );
    };

    const changeDate = (inputValue: string, selectValue: string) => {
        const option = selectValue.split(" ")[0] as OptionsType;
        const type = selectValue.split(" ").length === 2 ? -1 : 1;

        switch (option) {
            case "Seconds":
                onChangeDate(
                    addSeconds(currentDate, type * Number(inputValue))
                );
                break;
            case "Minutes":
                onChangeDate(
                    addMinutes(currentDate, type * Number(inputValue))
                );
                break;
            case "Hours":
                onChangeDate(addHours(currentDate, type * Number(inputValue)));
                break;
            case "Days":
                onChangeDate(addDays(currentDate, type * Number(inputValue)));
                break;
            case "Weeks":
                onChangeDate(addWeeks(currentDate, type * Number(inputValue)));
                break;
            case "Months":
                onChangeDate(addMonths(currentDate, type * Number(inputValue)));
                break;
            case "Years":
                onChangeDate(addYears(currentDate, type * Number(inputValue)));
                break;
            default:
                break;
        }
    };

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newInputValue = e.target.value;
        if (!isValidInput(newInputValue)) {
            return;
        }
        setInputValue(newInputValue);
        changeDate(newInputValue, selectValue);
    };

    const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectValue(e.target.value);
        changeDate(inputValue, e.target.value);
    };

    return (
        <div className={classNames("DatePickerRelative", {}, [className])}>
            <input
                type="number"
                min={MIN_INPUT_VALUE}
                max={MAX_INPUT_VALUE}
                value={inputValue}
                onChange={onChangeInput}
            />
            <select value={selectValue} onChange={onChangeSelect}>
                {OPTIONS.map((option, index) => (
                    <option value={`${option} ago`} key={`ago-${index}`}>
                        {option} ago
                    </option>
                ))}
                {OPTIONS.map((option, index) => (
                    <option
                        value={`${option} from now`}
                        key={`from now-${index}`}
                    >
                        {option} from now
                    </option>
                ))}
            </select>
        </div>
    );
};
