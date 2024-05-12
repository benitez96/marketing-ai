"use client"
import React, { useContext } from 'react'
import { Projects } from '../projects/Projects'
import { UserContext } from "providers/providers";

export const ClientProjects = () => {
    const { currentBrand, isLoading } = useContext(UserContext)

    if (isLoading) {
        return <h1>Loading</h1>
    }
    return (
        <div>
            <Projects brand={currentBrand} />
        </div>
    )
}
