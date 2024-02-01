import { addMinutes } from "date-fns";
import React, { useState } from "react";
import { SuperDatePicker } from "../SuperDatePicker/SuperDatePicker";

function App() {
    // Пример взаимодействия с SuperDatePicker
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(addMinutes(new Date(), 30));

    const onChangeDate = ({
        startDate,
        endDate,
    }: {
        startDate: Date;
        endDate: Date;
    }) => {
        setStartDate(startDate);
        setEndDate(endDate);
    };
    return (
        <div className="App">
            <SuperDatePicker
                startDate={startDate}
                endDate={endDate}
                onChangeDate={onChangeDate}
            />
        </div>
    );
}

export default App;
