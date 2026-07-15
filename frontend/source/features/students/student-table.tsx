import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";


import {
  studentColumns,
} from "./student-columns";
import type { Student } from "@/service/student.service";
import { Table, TableBody, TableHeader } from "@/components/ui/table";



interface Props {

  data: Student[];

}



export function StudentTable({
  data,
}: Props) {


  const table = useReactTable({
    data,
    columns: studentColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
  });


  return (

    <Table>

      <TableHeader>


      </TableHeader>

      <TableBody>

        {table.getRowModel().rows.length ? (

          table.getRowModel()

        ) : (

          <TableRow>

            <TableCell
              colSpan={studentColumns.length}
              className="h-32 text-center text-muted-foreground"
            >

              No students found

            </TableCell>

          </TableRow>

        )}

      </TableBody>

    </Table>
  )

}
