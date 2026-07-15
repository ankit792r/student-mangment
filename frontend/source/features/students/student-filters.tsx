import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function StudentFilters({
  value,
  onChange,
}: Props) {
  return (
    <div className="relative max-w-sm">

      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

      <Input
        className="pl-9"
        placeholder="Search students..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

    </div>
  );
}
