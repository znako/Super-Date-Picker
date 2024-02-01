import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import "./DatePickerNow.scss";

interface DatePickerNowProps {
    onChangeDate: (day: Date, isNow?: boolean) => void;
    className?: string;
}

// Устанавливаем дату как now c возможностью обновления до текущей даты
export const DatePickerNow = (props: DatePickerNowProps) => {
    const { onChangeDate, className } = props;

    // Устанавливаем текущую и говорим, что она с возможностью обновления
    const onClickNowHandler = () => {
        onChangeDate(new Date(), true);
    };

    return (
        <div className={classNames("DatePickerNow", {}, [className])}>
            <div className="DatePickerNow__text">
                Setting the time to "now" means that on every refresh this time
                will be set to the time of the refresh.
            </div>
            <Button
                onClick={onClickNowHandler}
                theme={ButtonTheme.PRIMARY}
                className="DatePickerNow__button"
            >
                Set now
            </Button>
        </div>
    );
};
