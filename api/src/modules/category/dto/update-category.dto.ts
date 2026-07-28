/* eslint-disable prettier/prettier */
//src/modules/category/dto/update-category.dto.ts
// DTO for updating an existing category

import { PartialType } from "@nestjs/swagger";
import { CreateCategoryDto } from "./create-category.dto";

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) { }