import * as projectsServices from "@/services/server/projectServices";

export default async function Page({ params }: { params: { slug: string } }) {
  const project = await projectsServices.getProjectById(params.slug)
  return (
    <div>
      {project.name}
    </div>
  )
}