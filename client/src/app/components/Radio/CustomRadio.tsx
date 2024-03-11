"use client"
import { RadioGroup, Radio, cn } from "@nextui-org/react";
import { Field, useFormikContext } from "formik";

export const CustomRadio = (props: any) => {
    const { children, ...otherProps } = props;
    const { setFieldValue } = useFormikContext();
    return (
        <Field name={'naming'}>
            {({ field }: { field: any }) => (
                <Radio
                    checked={field.value === props.value}
                    onChange={() => setFieldValue(props.name, props.value)}
                    description={props.description}
                    value={props.value}
                    classNames={{
                        base: cn(
                            "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                            "flex-row cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                            "data-[selected=true]:border-primary"
                        ),
                    }}
                >
                    {props.label}
                </Radio >
            )}
        </Field>
    );

};