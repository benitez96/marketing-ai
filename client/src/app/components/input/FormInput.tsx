"use client"
import { Input } from "@nextui-org/react";
import { ChangeEvent } from "react";

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
        case Types.Text:
            return (
                <Input type="string" label={input.label} required={input.required} placeholder={input.placeholder} name={input.name} value={value} onChange={handleChange} />
            )
    }
}