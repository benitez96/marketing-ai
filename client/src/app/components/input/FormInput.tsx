"use client"

import { Types, IFormInput } from "interfaces/form"
import { RadioInput } from "../Radio/RadioInput"
import SelectInput from "../select-input/SelectInput";

interface Props {
    input: IFormInput;
}

export const FormInput = ({ input }: Props) => {
    switch (input.type) {
        case Types.RADIO:
            return (
                <RadioInput name={input.name} description={input.description} label={input.label} values={input.values} />
            )
        case Types.SELECT:
            return (
                <SelectInput label={input.label} name={input.name} required={input.required} values={input.values} placeholder={input.placeholder} />
            )
    }
}