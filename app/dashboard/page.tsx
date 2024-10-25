import { requireUser } from "../lib/hooks";

export default async function DashboardPage(){
  const session = await requireUser();

  return (
    <div>
      <p>
        Dashboard
      </p>
    </div>
  )
}