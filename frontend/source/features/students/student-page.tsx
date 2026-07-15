import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";

import { StudentTable } from "./student-table";
import { StudentFilters } from "./student-filters";

import { useStudents } from "@/hooks/student.hook";

export default function StudentsPage() {
  const [search, setSearch] = useState("");

  const { data = [], isLoading } = useStudents({
    search,
  });

  return (
    <div className="space-y-6 p-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-semibold">
            Students
          </h1>

          <p className="text-muted-foreground">
            Manage all students
          </p>
        </div>

      </div>

      <Card>

        <CardContent className="space-y-4 pt-6">

          <StudentFilters
            value={search}
            onChange={setSearch}
          />

          <StudentTable
            data={data}
            loading={isLoading}
          />

        </CardContent>

      </Card>

    </div>
  );
}
