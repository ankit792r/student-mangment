import type { StudentRepositoryInterface } from "../../schemas/student/student.interface";
import type { Student, StudentId } from "../../schemas/student/student.schema";
import type { StudentAnalyticsResponseDto } from "../../service/student/dto/student-analytics.dto";
import type { StudentSearchQueryDto } from "../../service/student/dto/student-search.dto";
import type { Pool } from "pg";

export class PgStudentRepository implements StudentRepositoryInterface {
  constructor(
    private readonly db: Pool,
  ) { }

  async create(student: Student): Promise<void> {
    await this.db.query(
      `
      INSERT INTO students (
        id,
        admission_number,
        name,
        email,
        phone,
        course,
        year,
        gender,
        profile_image_url
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      `,
      [
        student._id,
        student.admissionNumber,
        student.name,
        student.email,
        student.phone,
        student.course,
        student.year,
        student.gender,
        student.profileImageUrl,
      ],
    );
  }

  async update(student: Student): Promise<void> {
    await this.db.query(
      `
      UPDATE students
      SET
        admission_number=$2,
        name=$3,
        email=$4,
        phone=$5,
        course=$6,
        year=$7,
        gender=$8,
        profile_image_url=$9
      WHERE id=$1
      `,
      [
        student._id,
        student.admissionNumber,
        student.name,
        student.email,
        student.phone,
        student.course,
        student.year,
        student.gender,
        student.profileImageUrl,
      ],
    );
  }

  async updatePartial(
    id: StudentId,
    dto: Partial<Student>,
  ): Promise<boolean> {
    // Build dynamic query
    const fields = Object.keys(dto);

    if (!fields.length) return false;

    const values = Object.values(dto);

    const setClause = fields
      .map((field, index) => `${field}=$${index + 2}`)
      .join(", ");

    const result = await this.db.query(
      `
      UPDATE students
      SET ${setClause}
      WHERE id=$1
      `,
      [id, ...values],
    );

    return result.rowCount! > 0;
  }

  async delete(id: StudentId): Promise<void> {
    await this.db.query(
      "DELETE FROM students WHERE id=$1",
      [id],
    );
  }

  async getStudentById(id: StudentId): Promise<Student | null> {
    const result = await this.db.query(
      "SELECT * FROM students WHERE id=$1",
      [id],
    );

    return result.rows[0] ?? null;
  }

  async list(page: number, limit: number): Promise<Student[]> {
    const offset = (page - 1) * limit;

    const result = await this.db.query(
      `
      SELECT *
      FROM students
      LIMIT $1 OFFSET $2
      `,
      [limit, offset],
    );

    return result.rows;
  }

  async search(dto: StudentSearchQueryDto): Promise<Student[]> {
    // implement using WHERE clauses
    return [];
  }

  async analytics(): Promise<StudentAnalyticsResponseDto> {
    // implement using COUNT() and GROUP BY
    throw new Error("Not implemented");
  }
}
