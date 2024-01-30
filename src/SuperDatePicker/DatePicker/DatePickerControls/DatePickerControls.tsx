import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { ControlTypes } from "../DatePicker";
import "./DatePickerControls.scss";

enum ControlTypesEnum {
    ABSOLUTE = "Absolute",
    RELATIVE = "Relative",
}

interface DatePickerControlsProps {
    controlType: ControlTypes;
    onChangeControl: (controlType: ControlTypes) => () => void;
    className?: string;
}

export const DatePickerControls = (props: DatePickerControlsProps) => {
    const { controlType, onChangeControl, className } = props;
    return (
        <div className={classNames("DatePickerControls", {}, [className])}>
            <div
                className={classNames("DatePickerControls__element", {
                    DatePickerControls__element_selected:
                        controlType === "absolute",
                })}
                onClick={onChangeControl("absolute")}
            >
                Absolute
            </div>
            <div
                className={classNames("DatePickerControls__element", {
                    DatePickerControls__element_selected:
                        controlType === "relative",
                })}
                onClick={onChangeControl("relative")}
            >
                Relative
            </div>
            <div
                className={classNames("DatePickerControls__element", {
                    DatePickerControls__element_selected: controlType === "now",
                })}
                onClick={onChangeControl("now")}
            >
                Now
            </div>
        </div>
    );
};
