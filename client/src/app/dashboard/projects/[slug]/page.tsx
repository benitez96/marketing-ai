import axios from "axios";
import { cookies } from "next/headers";

import { IProject } from "interfaces/project";
import { TOKEN_NAME } from "@/utils/const";

const getProjectById = async (id: string) => {
  try {
    const response = await axios.get<IProject>(`http://localhost:8000/api/chats/${id}`, {
      headers: { Authorization: `Bearer ${cookies().get(TOKEN_NAME)?.value}` }
    })
    return response.data
  } catch (error) {
    console.error(error)
    return { name: '' }
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const project = await getProjectById(params.slug)

  return (
    <div>
      {project.name}
    </div>
  )
}