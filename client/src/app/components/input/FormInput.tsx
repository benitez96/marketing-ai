"use client"

import { Types, IFormInput } from "interfaces/form"
import { RadioInput } from "../Radio/RadioInput"
import { useRef } from "react";

type Props = IFormInput

export const FormInput = ({ type, description, label, values }: Props) => {
    switch (type) {
        case Types.RADIO:
            return (
                <RadioInput description={description} label={label} values={values}/>
            )
    }
}