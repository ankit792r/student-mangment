import { z } from "zod"
import { StudentIdSchema } from "../../../schemas/student.schema";

export const StudentIdParamDtoSchema = z.object({
  id: StudentIdSchema
})

export type StudentIdParamDto = z.infer<typeof StudentIdParamDtoSchema>
