import { z } from "zod";
import { BOARD_ICON_IDS } from "@/components/app/board/BoardIcons";

export const boardSchema = z.object({
  name: z.string().min(1, "Board name is required"),
  icon: z.enum(BOARD_ICON_IDS),
  key: z
    .string()
    .min(3, "Board key must be at least 3 characters")
    .max(5, "Board key must be at most 5 characters"),
});

export type BoardFormValues = z.infer<typeof boardSchema>;
