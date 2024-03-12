import React from "react";
import Projects from "@/components/project/Projects";

import * as projectsServices from "@/services/server/projectServices";

const ProjectsPage = async () => {
    const projects = await projectsServices.getProjects()

    return (
        <Projects projects={projects} />
    )
}


export default ProjectsPage