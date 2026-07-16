import { useState } from "react";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateStudent } from "@/hooks/student.hook";
import type { StudentGender } from "@/service/student.service";

type StudentForm = {
  name: string;
  course: string;
  year: string;
  dob: string;
  email: string;
  phone: string;
  gender: string;
  address: string;
};

export default function AddStudentDialog() {
  const [open, setOpen] = useState(false);
  const { mutateAsync } = useCreateStudent();

  const [form, setForm] = useState<StudentForm>({
    name: "",
    course: "",
    year: "",
    dob: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
  });

  const handleChange = (
    key: keyof StudentForm,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await mutateAsync({
        name: form.name,
        course: form.course,
        year: form.year,
        dob: form.dob,
        email: form.email,
        phone: form.phone,
        gender: form.gender.toLowerCase() as StudentGender,
        address: form.address,
      });

      // Close dialog
      setOpen(false);

      // Reset form
      setForm({
        name: "",
        course: "",
        year: "",
        dob: "",
        email: "",
        phone: "",
        gender: "",
        address: "",
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">

        <DialogHeader>

          <DialogTitle>
            Add Student
          </DialogTitle>

          <DialogDescription>
            Enter student information below.
          </DialogDescription>

        </DialogHeader>

        <div className="grid gap-5 py-4">

          <div className="grid gap-2">

            <Label>Name</Label>

            <Input
              placeholder="John Doe"
              value={form.name}
              onChange={(e) =>
                handleChange("name", e.target.value)
              }
            />

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="grid gap-2">

              <Label>Course</Label>

              <Input
                placeholder="BCA"
                value={form.course}
                onChange={(e) =>
                  handleChange("course", e.target.value)
                }
              />

            </div>

            <div className="grid gap-2">

              <Label>Year</Label>

              <Select
                value={form.year}
                onValueChange={(value) =>
                  handleChange("year", value ?? "")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>

                <SelectContent>

                  <SelectItem value="1">
                    First Year
                  </SelectItem>

                  <SelectItem value="2">
                    Second Year
                  </SelectItem>

                  <SelectItem value="3">
                    Third Year
                  </SelectItem>

                  <SelectItem value="4">
                    Fourth Year
                  </SelectItem>

                </SelectContent>

              </Select>

            </div>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="grid gap-2">

              <Label>Date of Birth</Label>

              <Input
                type="date"
                value={form.dob}
                onChange={(e) =>
                  handleChange("dob", e.target.value)
                }
              />

            </div>

            <div className="grid gap-2">

              <Label>Gender</Label>

              <Select
                value={form.gender}
                onValueChange={(value) =>
                  handleChange("gender", value ?? "")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>

                <SelectContent>

                  <SelectItem value="Male">
                    Male
                  </SelectItem>

                  <SelectItem value="Female">
                    Female
                  </SelectItem>

                  <SelectItem value="Other">
                    Other
                  </SelectItem>

                </SelectContent>

              </Select>

            </div>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="grid gap-2">

              <Label>Email</Label>

              <Input
                type="email"
                placeholder="student@example.com"
                value={form.email}
                onChange={(e) =>
                  handleChange("email", e.target.value)
                }
              />

            </div>

            <div className="grid gap-2">

              <Label>Phone</Label>

              <Input
                placeholder="+91 9876543210"
                value={form.phone}
                onChange={(e) =>
                  handleChange("phone", e.target.value)
                }
              />

            </div>

          </div>

          <div className="grid gap-2">

            <Label>Address</Label>

            <Textarea
              rows={4}
              placeholder="Enter full address..."
              value={form.address}
              onChange={(e) =>
                handleChange("address", e.target.value)
              }
            />

          </div>

        </div>

        <DialogFooter>

          <Button
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button onClick={handleSubmit}>
            Save Student
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}
