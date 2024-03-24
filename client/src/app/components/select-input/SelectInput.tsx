import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { IFormInput } from "interfaces/form"
import { Field, useFormikContext } from "formik";

type Props = Pick<IFormInput, 'values' | 'name' | 'required' | 'label' | 'placeholder'>

export default function SelectInput({ values, name, required, label, placeholder }: Props) {
    const { setFieldValue } = useFormikContext();

    const handleOnChange = (e: any) => {
        const selectedValue = e.target.value
        setFieldValue(name, selectedValue)
    }

    return (
        <Field name={name}>
            {() => (
                <Select
                    name={name}
                    onChange={handleOnChange}
                    isRequired={required}
                    items={values}
                    label={label}
                    placeholder={placeholder || 'Select an option'}
                >
                    {(input) => <SelectItem key={input.value}>{input.label}</SelectItem>}
                </Select>
            )}
        </Field>
    );
}