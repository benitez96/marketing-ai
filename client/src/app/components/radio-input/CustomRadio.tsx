"use client"
import { Radio, cn } from "@nextui-org/react";
import { Field, useFormikContext } from "formik";

import { IFormInputValues } from 'interfaces/form';

type Props = IFormInputValues & {
  name: string;
  children: React.ReactNode
}

export const CustomRadio = ({ name, value, description, children }: Props) => {
    const { setFieldValue } = useFormikContext();
    return (
        <Field name={name}>
            {({ field }: { field: any }) => (
                <Radio
                    onChange={() => setFieldValue(name, value)}
                    description={description}
                    value={value}
                    classNames={{
                        base: cn(
                            "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                            "flex-row cursor-pointer rounded-lg gap-4 border-1 border-transparent",
                            "data-[selected=true]:border-primary"
                        ),
                    }}
                >
                    {children}
                </Radio >
            )}
        </Field>
    );

};
