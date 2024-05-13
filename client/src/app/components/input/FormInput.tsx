"use client"
import { Input } from "@nextui-org/react";
import { ChangeEvent } from "react";
import { DateInput } from "@nextui-org/react";
import { CalendarDate } from "@internationalized/date";

import { Types, IFormInput } from "interfaces/form"
import { RadioInput } from "../radio-input/RadioInput"
import SelectInput from "../select-input/SelectInput";

interface Props {
    input: IFormInput;
    handleChange: (e: ChangeEvent<any>) => void
    value: any
}

export const FormInput = ({ input, value, handleChange }: Props) => {
    switch (input.type) {
        case Types.RADIO:
            return (
                <RadioInput name={input.name} description={input.description} label={input.label} values={input.values} />
            )
        case Types.SELECT:
            return (
                <SelectInput label={input.label} name={input.name} required={input.required} values={input.values} placeholder={input.placeholder} />
            )
        case Types.TEXT:
            return (
                <Input type="string" label={input.label} required={input.required} placeholder={input.placeholder} name={input.name} value={value} onChange={handleChange} />
            )
        case Types.DATE:
            return (
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <DateInput label={"Birth date"} placeholderValue={new CalendarDate(1995, 11, 6)} className="max-w-sm" />
                </div>
            )
    }
}