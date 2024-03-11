import React, { MutableRefObject } from 'react'
import { CustomRadio } from './CustomRadio';
import { RadioGroup } from '@nextui-org/react';
import { IFormInput, IFormInputValues } from 'interfaces/form';

type Props = Omit<IFormInput, 'type'>

export const RadioInput = ({ description, label, values, name }: Props) => {
    return (
        <RadioGroup label={label} description={description}>
            {
                values.map((radio: IFormInputValues) => {
                    return (
                        <CustomRadio name={name} description={radio.description} value={radio.value} label={radio.label}>
                            {radio.label}
                        </CustomRadio>
                    )
                })
            }
        </RadioGroup>
    );
}
