import { z } from "zod";

export const TASK_STATUS = [
  { label: "Todo", value: "todo" },
  { label: "In Progress", value: "in-progress" },
  { label: "Done", value: "done" },
] as const;

export const taskStatusSchema = z.enum(TASK_STATUS.map((item) => item.value));

export const taskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  status: taskStatusSchema,
  dueDate: z.date(),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
