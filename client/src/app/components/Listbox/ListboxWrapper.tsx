import React from "react";

interface Props {
    children: React.ReactNode
}

export const ListboxWrapper = ({ children }: Props) => (
    <div className="w-full h-full max-w-[260px] px-1 py-2 rounded-small border-default-200 dark:border-default-100">
        {children}
    </div>
);