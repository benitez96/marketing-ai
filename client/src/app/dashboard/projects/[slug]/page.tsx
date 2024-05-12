import { CustomCard } from "@/components/custom-card/CustomCard";
import { Projects } from "@/components/projects/Projects";
import * as projectsServices from "@/services/server/projectServices";
import { getUserCached } from "@/services/server/userService";
import { revalidatePath } from "next/cache";
import { TfiWrite } from "react-icons/tfi";

export default async function Page({ params }: { params: { brandId: string } }) {
  return (
    <Projects />
  )
}