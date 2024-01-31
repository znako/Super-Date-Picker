import React, { useState } from "react";
import { Calendar } from "SuperDatePicker/DatePicker/DatePickerContent/Calendar/Calendar";
import { DatePickerContent } from "./DatePickerContent/DatePickerContent";
import { DatePickerControls } from "./DatePickerControls/DatePickerControls";

export type ControlTypes = "absolute" | "relative" | "now";

interface DatePickerProps {
    date: Date;
    onChangeDate: (day: Date) => void;
    onSetIsNowDate: (isNowDate: boolean) => void;
}

export const DatePicker = (props: DatePickerProps) => {
    const { onChangeDate, date, onSetIsNowDate } = props;
    const [controlType, setControlType] = useState<ControlTypes>("absolute");

    const onChangeControl = (controlType: ControlTypes) => () => {
        setControlType(controlType);
    };

    return (
        <div>
            <DatePickerControls
                controlType={controlType}
                onChangeControl={onChangeControl}
            />
            <DatePickerContent
                date={date}
                controlType={controlType}
                onChangeDate={onChangeDate}
                onSetIsNowDate={onSetIsNowDate}
            />
        </div>
    );
};
