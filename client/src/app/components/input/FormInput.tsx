"use client"

import { Types, IFormInput } from "interfaces/form"
import { RadioInput } from "../Radio/RadioInput"
import { useRef } from "react";

interface Props {
    input: IFormInput;
}

export const FormInput = ({ input }: Props) => {
    switch (input.type) {
        case Types.RADIO:
            return (
                <RadioInput name={input.name} description={input.description} label={input.label} values={input.values} />
            )
    }
}