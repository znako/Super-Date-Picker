import React, { useState } from "react";
import { Calendar } from "SuperDatePicker/Calendar/Calendar";
import { DatePickerContent } from "./DatePickerContent/DatePickerContent";
import { DatePickerControls } from "./DatePickerControls/DatePickerControls";

export type ControlTypes = "absolute" | "relative";

interface DatePickerProps {
    date: Date;
    onChangeDate: (day: Date) => void;
}

export const DatePicker = (props: DatePickerProps) => {
    const { onChangeDate, date } = props;
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
            />
        </div>
    );
};
