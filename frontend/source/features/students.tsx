import * as React from "react";
import { useState } from "react";

import { useStudents } from "@/hooks/student.hook";
import type { Student } from "@/service/student.service";

import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  ArrowUpDown,
  Eye,
  MoreHorizontal,
  Search,
  SquarePen,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Skeleton } from "@/components/ui/skeleton";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddStudentDialog from "./add-student";
import EditStudentDialog from "./edit-student";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function StudentsPage() {
  const [search, setSearch] = useState("");

  const { data = [], isLoading } = useStudents({
    search,
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [editingStudent, setEditingStudent] =
    useState<Student | null>(null);

  const columns = React.useMemo<ColumnDef<Student>[]>(
    () => [
      {
        id: "student",
        header: "Student",
        cell: ({ row }) => {
          const student = row.original;

          return (
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  src={student.profileImageUrl}
                />
                <AvatarFallback>
                  {student.name
                    .split(" ")
                    .map((x) => x[0])
                    .join("")
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="font-medium">
                  {student.name}
                </p>

                <p className="text-xs text-muted-foreground">
                  {student.admissionNumber}
                </p>
              </div>
            </div>
          );
        },
      },

      {
        accessorKey: "admissionNumber",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }
          >
            Admission No
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
      },

      {
        accessorKey: "name",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
      },

      {
        accessorKey: "course",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }
          >
            Course
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
      },

      {
        accessorKey: "year",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }
          >
            Year
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const year = row.original.year;

          const map: Record<string, string> = {
            "1": "First",
            "2": "Second",
            "3": "Third",
            "4": "Fourth",
          };

          return `${map[year]} Year`;
        }
      },

      {
        id: "actions",

        cell: ({ row }) => {
          const student = row.original;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger >
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem
                // onClick={() =>
                //   (window.location.href = `/students/${student._id}`)
                // }
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View


                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => setEditingStudent(student)}
                >
                  <SquarePen className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [setEditingStudent]
  );

  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,
    },

    onSortingChange: setSorting,

    getCoreRowModel: getCoreRowModel(),

    getSortedRowModel: getSortedRowModel(),

    getFilteredRowModel: getFilteredRowModel(),

    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="container mx-auto py-8 px-4">

      <Card>

        <CardHeader>

          <div className="flex items-center justify-between">

            <div>

              <CardTitle className="text-2xl">
                Students
              </CardTitle>

              <CardDescription>
                Manage your students
              </CardDescription>

            </div>

            <AddStudentDialog />
          </div>

        </CardHeader>

        <CardContent className="space-y-6">

          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div className="relative max-w-sm">

              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

              <Input
                placeholder="Search students..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

          </div>

          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-12 w-full"
                />
              ))}
            </div>
          ) : (
            <>
              <div className="rounded-md border overflow-x-auto">

                <Table>

                  <TableHeader>

                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>

                        {headerGroup.headers.map((header) => (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          </TableHead>
                        ))}

                      </TableRow>
                    ))}

                  </TableHeader>

                  <TableBody>

                    {table.getRowModel().rows.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>

                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}

                        </TableRow>
                      ))
                    ) : (
                      <TableRow>

                        <TableCell
                          colSpan={columns.length}
                          className="h-40 text-center"
                        >
                          <div className="space-y-2">
                            <p className="font-medium">
                              No students found
                            </p>

                            <p className="text-sm text-muted-foreground">
                              Try changing your search or add a new student.
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}

                  </TableBody>

                </Table>

              </div>

              <div className="mt-4 flex items-center justify-between">

                <div className="text-sm text-muted-foreground">
                  Showing
                  <strong>
                    {table.getRowModel().rows.length}
                  </strong>
                  of
                  <strong>
                    {data.length}
                  </strong>
                  students
                </div>

                <div className="flex gap-2">

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    Previous
                  </Button>

                  <div className="flex items-center px-3 text-sm">
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    Next
                  </Button>

                </div>

              </div>
            </>
          )}

        </CardContent>

      </Card>

      <EditStudentDialog
        student={editingStudent}
        open={!!editingStudent}
        onOpenChange={(open) => {
          if (!open) setEditingStudent(null);
        }}
      />
    </div>
  );
}
