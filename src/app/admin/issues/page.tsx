import { issues } from "@/lib/data"
import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"

export default async function IssuesPage() {
  const data = issues

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Issue Management</h2>
            <p className="text-muted-foreground">
                View, manage, and resolve all reported issues.
            </p>
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
