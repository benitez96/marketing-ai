import React, { MutableRefObject } from 'react'
import { CustomRadio } from './CustomRadio';
import { RadioGroup } from '@nextui-org/react';
import { IFormInput, IFormInputValues } from 'interfaces/form';

type Props = Omit<IFormInput, 'type'>

export const RadioInput = ({ description, label, values }: Props) => {
    return (
        <RadioGroup label={label} description={description}>
            {
                values.map((radio: IFormInputValues) => {
                    return (
                        <CustomRadio description="Fast and efficient, but often not as accurate or original as GPT-4." value={radio.value} label={radio.label}>
                            {radio.label}
                        </CustomRadio>
                    )
                })
            }
        </RadioGroup>
    );
}
