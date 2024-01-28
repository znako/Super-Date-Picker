import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import "./Button.scss";

export enum ButtonTheme {
    CLEAR = "clear",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children: ReactNode;
    theme?: ButtonTheme;
}

// UI компонент button с возможностью настройки темы
export const Button = (props: ButtonProps) => {
    const {
        className,
        children,
        theme = ButtonTheme.CLEAR,
        disabled,
        ...otherProps
    } = props;
    return (
        <button
            className={classNames("Button", { ["Button_disabled"]: disabled }, [
                className,
                `Button_${theme}`,
            ])}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    );
};
