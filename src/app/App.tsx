import { format } from "date-fns";
import React, { useState } from "react";
import { SuperDatePicker } from "../SuperDatePicker/SuperDatePicker";

function App() {
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());

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
