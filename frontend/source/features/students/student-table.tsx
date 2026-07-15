import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";


import {
  studentColumns,
} from "./student-columns";
import type { Student } from "@/service/student.service";



interface Props {

  data: Student[];

}



export function StudentTable({
  data,
}: Props) {


  const table =
    useReactTable({

      data,

      columns:
        studentColumns,


      getCoreRowModel:
        getCoreRowModel(),

    });



  return (

    <table className="w-full">


      <thead>

        {
          table
            .getHeaderGroups()
            .map(group => (

              <tr key={group.id}>

                {
                  group.headers.map(header => (

                    <th key={header.id}>

                      {
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      }

                    </th>

                  ))

                }

              </tr>

            ))

        }

      </thead>


      <tbody>

        {
          table
            .getRowModel()
            .rows
            .map(row => (

              <tr key={row.id}>

                {
                  row
                    .getVisibleCells()
                    .map(cell => (

                      <td key={cell.id}>

                        {
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        }

                      </td>

                    ))

                }

              </tr>

            ))

        }


      </tbody>


    </table>

  )

}
