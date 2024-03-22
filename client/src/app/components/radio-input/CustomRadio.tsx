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
          checked={field.value === value}
          onChange={() => setFieldValue(name, value)}
          description={description}
          value={value} 
          className={cn(
            "group inline-flex items-center hover:opacity-70 active:opacity-50 justify-between flex-row-reverse tap-highlight-transparent",
            "max-w-none cursor-pointer border-2 border-default rounded-lg gap-4 p-4 m-0",
            "data-[selected=true]:border-primary",
          )}
        >
          {children}
        </Radio >
      )}
    </Field>
  );

};
