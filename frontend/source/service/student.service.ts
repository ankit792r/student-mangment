import axios from "@/lib/axios";

export type StudentGender = "male" | "female";

export interface Student {
  _id: string;
  admissionNumber: number;
  name: string;
  course: string;
  year: string;
  dob: string;
  email: string;
  phone: string;
  gender?: StudentGender;
  address?: string;
  profileImageUrl?: string;
}

export interface CreateStudentDto {
  name: string;
  course: string;
  year: string;
  dob: string;
  email: string;
  phone: string;
  gender?: StudentGender;
  address?: string;
}

export type UpdateStudentDto = Partial<CreateStudentDto>;

export interface StudentSearchQuery {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?:
  | "name"
  | "course"
  | "year";
  sortOrder?:
  | "asc"
  | "desc";
}

export interface StudentAnalytics {
  totalStudents: number;
  maleStudents: number;
  femaleStudents: number;
  courses: number;
}




const STUDENT_URL = "/students";


export const studentService = {

  async createStudent(
    data: CreateStudentDto,
  ): Promise<Student> {

    const response =
      await axios.post<Student>(
        STUDENT_URL,
        data,
      );

    return response.data;
  },


  async getStudentById(
    id: string,
  ): Promise<Student> {

    const response =
      await axios.get<Student>(
        `${STUDENT_URL}/${id}`,
      );

    return response.data;
  },


  async updateStudent(
    id: string,
    data: UpdateStudentDto,
  ): Promise<Student> {

    const response =
      await axios.put<Student>(
        `${STUDENT_URL}/${id}`,
        data,
      );

    return response.data;
  },


  async updateStudentPartial(
    id: string,
    data: UpdateStudentDto,
  ): Promise<void> {

    await axios.patch(
      `${STUDENT_URL}/${id}`,
      data,
    );
  },


  async deleteStudent(
    id: string,
  ): Promise<void> {

    await axios.delete(
      `${STUDENT_URL}/${id}`,
    );
  },


  async listStudents(
    params?: StudentSearchQuery,
  ): Promise<Student[]> {

    const response =
      await axios.get<Student[]>(
        STUDENT_URL,
        {
          params,
        },
      );

    return response.data;
  },


  async updateProfileImage(
    id: string,
    file: File,
  ): Promise<string> {

    const formData =
      new FormData();

    formData.append(
      "file",
      file,
    );


    const response =
      await axios.post<string>(
        `${STUDENT_URL}/${id}/update-profile`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        },
      );

    return response.data;
  },


  async getAnalytics()
    : Promise<StudentAnalytics> {
    const response =
      await axios.get<StudentAnalytics>(
        `${STUDENT_URL}/analytics`,
      );

    return response.data;
  },

};
