import type { Student } from "@/service/student.service";
import {
  createColumnHelper,
  type ColumnDef
} from "@tanstack/react-table";

const columnHelper = createColumnHelper<Student>()


export const columns: ColumnDef<Student, any>[] = [

  {
    accessorKey: "admissionNumber",

    header: "Admission No",

  },


  {
    accessorKey: "name",

    header: "Name",

  },


  {
    accessorKey: "course",

    header: "Course",

  },


  {
    accessorKey: "year",

    header: "Year",

  },

  {
    id: "actions",

    header: "Actions",

    cell: ({ row }) => {

      const student =
        row.original;


      return (
        <div>

          <a href={`/students/${student._id}`}>
            View
          </a>


          <a href={`/students/${student._id}/edit`}>
            Edit
          </a>


        </div>
      )

    }

  }
]

export const studentColumns = [

  columnHelper.accessor("admissionNumber", {
    header: "Admission No",
  }),


  columnHelper.accessor("name", {
    header: "Name",
  }),


  columnHelper.accessor("course", {
    header: "Course",
  }),


  columnHelper.accessor("year", {
    header: "Year",
  }),


  columnHelper.display({
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {

      const student =
        row.original;


      return (
        <div>

          <a href={`/students/${student._id}`}>
            View
          </a>


          <a href={`/students/${student._id}/edit`}>
            Edit
          </a>


        </div>
      )

    }
  }),
];
