import { z } from "zod";
import { BOARD_ICON_IDS } from "@/components/board/BoardIcons";

export const boardSchema = z.object({
  name: z.string().min(1, "Board name is required"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(200, "Description must be at most 200 characters."),
  icon: z.enum(BOARD_ICON_IDS),
});

export type BoardFormValues = z.infer<typeof boardSchema>;
