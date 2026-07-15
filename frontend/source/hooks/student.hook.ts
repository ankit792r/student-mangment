// src/hooks/student.hook.ts

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  studentService,
  type CreateStudentDto,
  type StudentSearchQuery,
  type UpdateStudentDto,
} from "@/service/student.service";



const STUDENT_KEY = "students" as const;


export const studentKeys = {

  all: [
    STUDENT_KEY,
  ] as const,


  list: (
    params?: StudentSearchQuery,
  ) => [
    STUDENT_KEY,
    "list",
    params ?? {},
  ] as const,


  detail: (
    id: string,
  ) => [
    STUDENT_KEY,
    "detail",
    id,
  ] as const,


  analytics: [
    STUDENT_KEY,
    "analytics",
  ] as const,

};


// GET /students

export function useStudents(
  params?: StudentSearchQuery,
) {

  return useQuery({

    queryKey:
      studentKeys.list(params),

    queryFn:
      () =>
        studentService.listStudents(params),

  });

}



// GET /students/:id

export function useStudent(
  id: string,
) {

  return useQuery({

    queryKey:
      studentKeys.detail(id),

    queryFn:
      () =>
        studentService.getStudentById(id),

    enabled:
      Boolean(id),

  });

}



// POST /students

export function useCreateStudent() {

  const queryClient =
    useQueryClient();


  return useMutation({

    mutationFn:
      (
        data: CreateStudentDto,
      ) =>
        studentService.createStudent(data),


    onSuccess:
      () => {

        queryClient.invalidateQueries({

          queryKey:
            studentKeys.all,

        });

      },

  });

}



// PUT /students/:id

export function useUpdateStudent() {

  const queryClient =
    useQueryClient();


  return useMutation({

    mutationFn:
      ({
        id,
        data,
      }: {
        id: string;
        data: UpdateStudentDto;
      }) =>
        studentService.updateStudent(
          id,
          data,
        ),


    onSuccess:
      (
        _,
        variables,
      ) => {


        queryClient.invalidateQueries({

          queryKey:
            studentKeys.detail(
              variables.id,
            ),

        });


        queryClient.invalidateQueries({

          queryKey:
            studentKeys.list(),

        });

      },

  });

}



// PATCH /students/:id

export function useUpdateStudentPartial() {

  const queryClient =
    useQueryClient();


  return useMutation({

    mutationFn:
      ({
        id,
        data,
      }: {
        id: string;
        data: UpdateStudentDto;
      }) =>
        studentService.updateStudentPartial(
          id,
          data,
        ),


    onSuccess:
      (
        _,
        variables,
      ) => {


        queryClient.invalidateQueries({

          queryKey:
            studentKeys.detail(
              variables.id,
            ),

        });


      },

  });

}



// DELETE /students/:id

export function useDeleteStudent() {

  const queryClient =
    useQueryClient();


  return useMutation({

    mutationFn:
      (
        id: string,
      ) =>
        studentService.deleteStudent(id),


    onSuccess:
      () => {

        queryClient.invalidateQueries({

          queryKey:
            studentKeys.all,

        });

      },

  });

}



// POST /students/:id/update-profile

export function useUpdateStudentProfileImage() {

  const queryClient =
    useQueryClient();


  return useMutation({

    mutationFn:
      ({
        id,
        file,
      }: {
        id: string;
        file: File;
      }) =>
        studentService.updateProfileImage(
          id,
          file,
        ),


    onSuccess:
      (
        _,
        variables,
      ) => {


        queryClient.invalidateQueries({

          queryKey:
            studentKeys.detail(
              variables.id,
            ),

        });

      },

  });

}



// GET /students/analytics

export function useStudentAnalytics() {

  return useQuery({

    queryKey:
      studentKeys.analytics,

    queryFn:
      () =>
        studentService.getAnalytics(),

  });

}
