import React, { useEffect, useRef, useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import "./QuickMenuInterval.scss";

interface QuickMenuIntervalProps {
    className?: string;
    intervalData: null | number;
    setIntervalData: (intervalData: null | number) => void;
    error: boolean;
}
type OptionsType = "Seconds" | "Minutes" | "Hours";
const OPTIONS: Record<OptionsType, number> = {
    Seconds: 1 * 1000,
    Minutes: 60 * 1000,
    Hours: 3600 * 1000,
};

export const QuickMenuInterval = (props: QuickMenuIntervalProps) => {
    const { className, intervalData, setIntervalData, error } = props;
    const [inputValue, setInputValue] = useState("");
    const [selectValue, setSelectValue] = useState<OptionsType>("Seconds");
    const [isUnvalid, setIsUnvalid] = useState(true);

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsUnvalid(
            !e.target.value.match(/^(?![0.]+$)\d+(\.\d{1,2})?$/gm)?.length
        );
        setInputValue(e.target.value);
    };

    const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectValue(e.target.value as OptionsType);
    };

    const onClickStartInterval = () => {
        setIntervalData(Number.parseFloat(inputValue) * OPTIONS[selectValue]);
    };

    const onClickStopInterval = () => {
        setIntervalData(null);
    };

    return (
        <div className={classNames("QuickMenuInterval", {}, [className])}>
            <h4>Refresh every</h4>
            <div className="QuickMenuInterval-body">
                <div className="QuickMenuInterval-inputsWrapper">
                    <input
                        value={inputValue}
                        onChange={onChangeInput}
                        className="QuickMenuInterval-inputsWrapper__input"
                    />
                    <select
                        value={selectValue}
                        onChange={onChangeSelect}
                        className="QuickMenuInterval-inputsWrapper__input"
                    >
                        {Object.keys(OPTIONS).map((option, index) => (
                            <option value={option} key={index}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                {!intervalData ? (
                    <Button
                        theme={
                            error || isUnvalid
                                ? ButtonTheme.DISABLED
                                : ButtonTheme.PRIMARY
                        }
                        onClick={onClickStartInterval}
                        className="QuickMenuInterval-body__button"
                    >
                        Start
                    </Button>
                ) : (
                    <Button
                        theme={ButtonTheme.PRIMARY}
                        onClick={onClickStopInterval}
                        className="QuickMenuInterval-body__button"
                    >
                        Stop
                    </Button>
                )}
            </div>
        </div>
    );
};
