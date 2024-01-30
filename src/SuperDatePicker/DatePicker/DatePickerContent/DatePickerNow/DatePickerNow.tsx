import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import "./DatePickerNow.scss";

interface DatePickerNowProps {
    onChangeDate: (day: Date) => void;
    onSetIsNowDate: (isNowDate: boolean) => void;
    className?: string;
}

export const DatePickerNow = (props: DatePickerNowProps) => {
    const { onChangeDate, onSetIsNowDate, className } = props;

    const onClickNowHandler = () => {
        onChangeDate(new Date());
        onSetIsNowDate(true);
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
