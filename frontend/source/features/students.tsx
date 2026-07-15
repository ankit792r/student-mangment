"use client";

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
  MoreHorizontal,
  Search,
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

export default function StudentsPage() {
  const [search, setSearch] = useState("");

  const { data = [], isLoading } = useStudents({
    search,
  });

  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = React.useMemo<ColumnDef<Student>[]>(
    () => [
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
      },

      {
        id: "actions",

        cell: ({ row }) => {
          const student = row.original;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() =>
                  (window.location.href = `/students/${student._id}`)
                  }
                >
                  View
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() =>
                  (window.location.href = `/students/${student._id}/edit`)
                  }
                >
                  Edit
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    []
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

            <Button>
              Add Student
            </Button>

          </div>

        </CardHeader>

        <CardContent>

          <div className="mb-6">

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
            <div className="space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
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
                          className="h-24 text-center"
                        >
                          No students found.
                        </TableCell>

                      </TableRow>
                    )}

                  </TableBody>

                </Table>

              </div>

              <div className="mt-4 flex items-center justify-between">

                <div className="text-sm text-muted-foreground">
                  Showing{" "}
                  {table.getRowModel().rows.length}{" "}
                  student(s)
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

    </div>
  );
}
