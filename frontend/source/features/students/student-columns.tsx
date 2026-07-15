import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal } from "lucide-react";

import { createColumnHelper } from "@tanstack/react-table";
import type { Student } from "@/service/student.service";

const helper = createColumnHelper<Student>();

export const studentColumns = [

  helper.accessor("admissionNumber", {
    header: "Admission No",
  }),

  helper.accessor("name", {
    header: "Name",
  }),

  helper.accessor("course", {
    header: "Course",
  }),

  helper.accessor("year", {
    header: "Year",
  }),

  helper.display({

    id: "actions",

    header: "",

    cell: ({ row }) => {

      const student = row.original;

      return (

        <DropdownMenu>

          <DropdownMenuTrigger>

            <Button
              variant="ghost"
              size="icon"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>

          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">

            <DropdownMenuItem>
              View
            </DropdownMenuItem>

            <DropdownMenuItem>
              Edit
            </DropdownMenuItem>

          </DropdownMenuContent>

        </DropdownMenu>

      );
    },

  }),
];
