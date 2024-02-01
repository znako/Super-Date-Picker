import React, { useState } from "react";
import { DatePickerContent } from "./DatePickerContent/DatePickerContent";
import { DatePickerControls } from "./DatePickerControls/DatePickerControls";

export type ControlTypes = "absolute" | "relative" | "now";

interface DatePickerProps {
    date: Date;
    onChangeDate: (day: Date, isNow?: boolean) => void;
}

// Компонент, который показывается при нажатии на одну из дат
// В шапке находится контролер, в теле - компонент, который соответствует контролеру
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
