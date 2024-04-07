"use client"
import React from 'react'
import Link from 'next/link';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@nextui-org/react";
import { LuEye } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";

import { columns } from './const'
import { IProject } from 'interfaces/project';

interface Props {
    projects: IProject[]
}

const Projects = ({ projects }: Props) => {
    const renderCell = React.useCallback((project: any, columnKey: any) => {
        const cellValue = project[columnKey];
        switch (columnKey) {
            case "name":
                return (
                    <Link
                        href={`/dashboard/projects/${project.id}`}
                    >
                        {project.name}
                    </Link>
                );
            case "description":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue || '-'}</p>
                    </div>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <LuEye />
                            </span>
                        </Tooltip>
                        <Tooltip content="Edit user">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <FaRegEdit />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <RiDeleteBin6Line />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
            // return cellValue;
        }
    }, []);

    return (
        <Table aria-label="Example table with custom cells"
            classNames={{
                wrapper: "shadow-none",
            }}
        >
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={projects || []}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

export default Projects