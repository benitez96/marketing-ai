import { Projects } from "@/components/projects/Projects";
import * as projectsServices from "@/services/server/projectServices";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  const brand = await projectsServices.getProjectsByBrandId(params.slug)
  if (brand === null) {
    return redirect('/dashboard/brands')
  }
  return (
    <Projects brand={brand} />
  )
}