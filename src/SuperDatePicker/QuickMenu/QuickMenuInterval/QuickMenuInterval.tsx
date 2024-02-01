import React, { useEffect, useRef, useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import "./QuickMenuInterval.scss";
import { ReactComponent as PlayIcon } from "shared/assets/play.svg";
import { ReactComponent as StopIcon } from "shared/assets/stop.svg";

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
            !e.target.value &&
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
                        disabled={error || isUnvalid}
                        className="QuickMenuInterval-body__button"
                    >
                        <PlayIcon
                            className={classNames(
                                "QuickMenuInterval-inputsWrapper__icon",
                                {
                                    "QuickMenuInterval-inputsWrapper__icon_disabled":
                                        error || isUnvalid,
                                },
                                []
                            )}
                        />
                        Start
                    </Button>
                ) : (
                    <Button
                        theme={ButtonTheme.PRIMARY}
                        onClick={onClickStopInterval}
                        className="QuickMenuInterval-body__button"
                    >
                        <StopIcon className="QuickMenuInterval-inputsWrapper__icon" />
                        Stop
                    </Button>
                )}
            </div>
        </div>
    );
};
