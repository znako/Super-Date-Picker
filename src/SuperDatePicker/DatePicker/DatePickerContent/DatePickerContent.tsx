import React, { useEffect, useState } from "react";
import { Calendar } from "../../Calendar/Calendar";
import { ControlTypes } from "../DatePicker";
import { DatePickerRelative } from "./DatePickerRelative/DatePickerRelative";

interface DatePickerContentProps {
    controlType: ControlTypes;
    onChangeDate: (day: Date) => void;
    date: Date;
}

export const DatePickerContent = (props: DatePickerContentProps) => {
    const { controlType, onChangeDate, date } = props;

    const [inputValueRelative, setInputValueRelative] = useState("");
    const [selectValueRelative, setSelectValueRelative] = useState("Days ago");

    useEffect(() => {
        if (controlType !== "relative") {
            setInputValueRelative("");
            setSelectValueRelative("Days ago");
        }
    }, [onChangeDate]);

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
            ) : null}
        </>
    );
};
