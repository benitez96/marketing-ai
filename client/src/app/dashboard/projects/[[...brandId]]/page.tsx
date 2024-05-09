import * as projectsServices from "@/services/server/projectServices";
import { getUserCached } from "@/services/server/userService";
import { revalidatePath } from "next/cache";

export default async function Page({ params }: { params: { brandId: string } }) {
  // const project = await projectsServices.getProjectById(params.brandId)
  return (
    <div>
      Projects for brandId: {params.brandId}
    </div>
  )
}