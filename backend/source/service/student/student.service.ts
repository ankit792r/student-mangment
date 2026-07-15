import type { Collection } from "mongodb";
import { AppError } from "../../runtime/errors/app-error";
import {
  createStudentId,
  StudentSchema,
  type Student,
  type StudentId,
} from "../../schemas/student.schema.ts";
import type { StudentAnalyticsResponseDto } from "./dto/student-analytics.dto";

import type { StudentCreateDto } from "./dto/student-create.dto";
import { StudentBasicResponseDtoSchema, StudentFullResponseDtoSchema, type StudentBasicResponseDto, type StudentFullResponseDto } from "./dto/student-response.dto";
import type { StudentSearchQueryDto } from "./dto/student-search.dto";
import type { StudentUpdateDto } from "./dto/student-update.dto";
import StudentError from "./student.error";

export class StudentService {
  constructor(
    private readonly collection: Collection<Student>,
  ) { }

  async createStudent(dto: StudentCreateDto): Promise<Student> {
    // TODO: Generate admission number from your own sequence logic.
    const admissionNumber = Date.now();

    const student = StudentSchema.parse({
      ...dto,
      _id: createStudentId(),
      admissionNumber,
    });

    await this.collection.insertOne(student);
    return student;
  }

  async getStudentByIdOrThrow(
    id: StudentId,
  ): Promise<Student> {
    const student = await this.collection.findOne({ _id: id });

    if (!student)
      throw new AppError(StudentError.StudentNotFound);

    return student;
  }

  async updateStudent(
    id: StudentId,
    dto: StudentUpdateDto,
  ): Promise<StudentFullResponseDto> {
    const existing = await this.getStudentByIdOrThrow(id);

    const updatedStudent = StudentSchema.parse({
      ...existing,
      ...dto,
    });

    await this.collection.replaceOne(
      { _id: id },
      updatedStudent,
    );
    return StudentFullResponseDtoSchema.parse(updatedStudent);
  }

  async updateStudentPartial(
    id: StudentId,
    dto: Partial<StudentUpdateDto>,
  ): Promise<boolean> {
    await this.getStudentByIdOrThrow(id);

    const res = await this.collection.updateOne(
      { _id: id },
      {
        $set: dto,
      },
    );

    return res.matchedCount > 0;
  }

  async updateStudentProfileImage(
    id: StudentId,
    profileImageUrl: string,
  ): Promise<void> {
    await this.getStudentByIdOrThrow(id);

    await this.updateStudentPartial(id, {
      profileImageUrl,
    });
  }

  async deleteStudent(id: StudentId): Promise<void> {
    await this.getStudentByIdOrThrow(id);
    await this.collection.deleteOne({ _id: id });
  }

  async listStudents(
    dto: StudentSearchQueryDto
  ): Promise<StudentBasicResponseDto[]> {



    const query: any = {};

    if (dto.search) {
      query.$or = [
        { name: { $regex: dto.search, $options: "i" } },
        { email: { $regex: dto.search, $options: "i" } },
        { phone: { $regex: dto.search, $options: "i" } },
        {
          admissionNumber: Number(dto.search) || -1,
        },
      ];
    }

    if (dto.course)
      query.course = dto.course;

    if (dto.year)
      query.year = dto.year;

    if (dto.gender)
      query.gender = dto.gender;

    const res = await this.collection
      .find(query)
      .sort({
        [dto.sortBy]:
          dto.sortOrder === "asc" ? 1 : -1,
      })
      .skip((dto.page - 1) * dto.limit)
      .limit(dto.limit)
      .toArray();

    return res.map(student =>
      StudentBasicResponseDtoSchema.parse(student)
    );
  }

  async getAnalytics(): Promise<StudentAnalyticsResponseDto> {

    const totalStudents =
      await this.collection.countDocuments();

    const genderAgg = await this.collection
      .aggregate([
        {
          $group: {
            _id: "$gender",
            count: { $sum: 1 },
          },
        },
      ])
      .toArray();

    const courseAgg = await this.collection
      .aggregate([
        {
          $group: {
            _id: "$course",
            count: { $sum: 1 },
          },
        },
      ])
      .toArray();

    const yearAgg = await this.collection
      .aggregate([
        {
          $group: {
            _id: "$year",
            count: { $sum: 1 },
          },
        },
      ])
      .toArray();

    return {
      totalStudents,

      gender: {
        male:
          genderAgg.find(x => x._id === "male")
            ?.count ?? 0,

        female:
          genderAgg.find(x => x._id === "female")
            ?.count ?? 0,
      },

      byCourse: courseAgg.map(x => ({
        course: x._id,
        count: x.count,
      })),

      byYear: yearAgg.map(x => ({
        year: x._id,
        count: x.count,
      })),
    };
  }
}
