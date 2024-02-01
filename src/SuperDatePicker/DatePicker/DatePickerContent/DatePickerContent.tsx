import React, { useEffect, useState } from "react";
import { Calendar } from "./Calendar/Calendar";
import { ControlTypes } from "../DatePicker";
import { DatePickerNow } from "./DatePickerNow/DatePickerNow";
import { DatePickerRelative } from "./DatePickerRelative/DatePickerRelative";

interface DatePickerContentProps {
    controlType: ControlTypes;
    onChangeDate: (day: Date, isNow?: boolean) => void;
    date: Date;
}

// Компонент отображения тела DatePicker`a
// В зависимости от контрола отображается:
// "Absolute" - Calendar, чтоб конкретно выбрать дату
// "Relative" - DatePickerRelative, чтобы выбрать дату относительно текущей даты
// "Now" - DatePickerNow, установить текущую дату с возможностью refresh
export const DatePickerContent = (props: DatePickerContentProps) => {
    const { controlType, onChangeDate, date } = props;

    const [inputValueRelative, setInputValueRelative] = useState("");
    const [selectValueRelative, setSelectValueRelative] = useState("Days ago");

    const resetRelatveState = () => {
        setInputValueRelative("");
        setSelectValueRelative("Days ago");
    };

    useEffect(() => {
        if (controlType !== "relative") {
            resetRelatveState();
        }
    }, [date]);

    return (
        <>
            {controlType === "absolute" ? (
                <Calendar onChangeDate={onChangeDate} date={date} />
            ) : controlType === "relative" ? (
                <DatePickerRelative
                    onChangeDate={onChangeDate}
                    inputValue={inputValueRelative}
                    setInputValue={setInputValueRelative}
                    selectValue={selectValueRelative}
                    setSelectValue={setSelectValueRelative}
                />
            ) : controlType === "now" ? (
                <DatePickerNow onChangeDate={onChangeDate} />
            ) : null}
        </>
    );
};
