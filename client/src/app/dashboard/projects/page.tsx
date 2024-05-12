import { ClientProjects } from "@/components/client-projects/ClientProjects";
import { Projects } from "@/components/projects/Projects";

export default async function Page({ params }: { params: { brandId: string } }) {

    return (
        <ClientProjects />
    )
}