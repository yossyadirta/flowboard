import { z } from "zod";
import { BOARD_ICON_IDS } from "@/components/app/board/BoardIcons";

export const boardSchema = z.object({
  name: z.string().min(1, "Board name is required"),
  icon: z.enum(BOARD_ICON_IDS),
  key: z
    .string()
    .max(5, "Board key must be at most 5 characters")
    .refine((val) => !val || val.length >= 2, {
      message: "key must be at least 2 characters",
    }),
});

export type BoardFormValues = z.infer<typeof boardSchema>;
