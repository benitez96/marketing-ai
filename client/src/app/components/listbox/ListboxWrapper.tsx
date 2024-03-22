import React from "react";

interface Props {
    children: React.ReactNode
}

export const ListboxWrapper = ({ children }: Props) => (
    <div className="flex flex-col gap-2 p-2 justify-between h-full">
        {children}
    </div>
);
