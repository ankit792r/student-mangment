import React, { useEffect, useState } from "react";

import {
  useUpdateStudent,
  useUpdateStudentProfileImage,
} from "@/hooks/student.hook";

import type {
  Student,
  StudentGender,
} from "@/service/student.service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Loader2, Upload } from "lucide-react";

type Props = {
  student: Student | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type StudentForm = {
  name: string;
  course: string;
  year: string;
  dob: string;
  email: string;
  phone: string;
  gender: StudentGender | "";
  address: string;
};

export default function EditStudentDialog({
  student,
  onOpenChange,
  open
}: Props) {

  const [profileFile, setProfileFile] =
    useState<File | null>(null);

  const [preview, setPreview] = useState(
    student?.profileImageUrl ?? ""
  );

  const {
    mutateAsync: updateStudent,
    isPending,
  } = useUpdateStudent();

  const {
    mutateAsync: uploadProfile,
    isPending: uploadingImage,
  } = useUpdateStudentProfileImage();

  const loading = isPending || uploadingImage;

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

  useEffect(() => {
    if (!open) return;

    if (student == null) return;

    setForm({
      name: student.name,
      course: student.course,
      year: student.year,
      dob: student.dob,
      email: student.email,
      phone: student.phone,
      gender: student.gender ?? "",
      address: student.address ?? "",
    });

    setPreview(student.profileImageUrl ?? "");
    setProfileFile(null);
  }, [open, student]);

  useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleChange = (
    key: keyof StudentForm,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setProfileFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (
      !form.name ||
      !form.course ||
      !form.year ||
      !form.email
    ) {
      return;
    }

    try {
      if (student == null) return;

      await updateStudent({
        id: student._id,
        data: {
          ...form,
          gender: form.gender as StudentGender,
        },
      });

      if (profileFile) {
        await uploadProfile({
          id: student._id,
          file: profileFile,
        });
      }

      onOpenChange(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>

          <DialogDescription>
            Update student information and profile image.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">

          {/* Profile */}

          <div className="flex flex-col items-center gap-4">

            <div className="h-28 w-28 overflow-hidden rounded-full border bg-muted">
              {preview ? (
                <img
                  src={preview}
                  alt={form.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                  No Image
                </div>
              )}
            </div>

            <Label
              htmlFor="profile-image"
              className="cursor-pointer"
            >
              <div className="flex items-center gap-2 rounded-md border px-4 py-2 hover:bg-accent">
                <Upload className="h-4 w-4" />
                Change Profile Image
              </div>
            </Label>

            <Input
              id="profile-image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImage}
            />

          </div>

          {/* Form */}

          <div className="grid gap-4">

            <div className="grid gap-2">
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  handleChange("name", e.target.value)
                }
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">

              <div className="grid gap-2">
                <Label>Course</Label>
                <Input
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
                  onValueChange={(v) =>
                    handleChange("year", v ?? "")
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

            <div className="grid gap-4 md:grid-cols-2">

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
                  onValueChange={(v) =>
                    handleChange("gender", v ?? "")
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="male">
                      Male
                    </SelectItem>
                    <SelectItem value="female">
                      Female
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

            </div>

            <div className="grid gap-4 md:grid-cols-2">

              <div className="grid gap-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    handleChange("email", e.target.value)
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label>Phone</Label>
                <Input
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
                value={form.address}
                onChange={(e) =>
                  handleChange("address", e.target.value)
                }
              />
            </div>

          </div>

        </div>

        <DialogFooter>

          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save Changes
          </Button>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

