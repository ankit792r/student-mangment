import { Button } from "@/components/ui/button";

export function DataTablePagination({ table }) {
  return (
    <div className="flex items-center justify-between py-4">

      <div className="text-sm text-muted-foreground">
        Page {table.getState().pagination.pageIndex + 1}
        {" "}of{" "}
        {table.getPageCount()}
      </div>

      <div className="space-x-2">

        <Button
          variant="outline"
          size="sm"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          Previous
        </Button>

        <Button
          variant="outline"
          size="sm"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          Next
        </Button>

      </div>

    </div>
  );
}
