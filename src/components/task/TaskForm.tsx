"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import {
  TASK_STATUS,
  TaskFormValues,
  taskSchema,
} from "@/schemas/task.schemas";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "../ui/calendar";
import { CalendarIcon } from "lucide-react";

type Props = {
  onSubmit: (values: TaskFormValues) => void;
  defaultValues?: Partial<TaskFormValues>;
  onValidityChange?: (isValid: boolean) => void;
};

export function TaskForm({ onSubmit, defaultValues, onValidityChange }: Props) {
  const {
    handleSubmit,
    register,
    control,
    formState: { isValid, isDirty },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    mode: "onChange",
    defaultValues: {
      title: defaultValues?.title ?? "",
      status: defaultValues?.status ?? undefined,
      dueDate: defaultValues?.dueDate ?? new Date(),
    },
  });

  function formatDate(date: Date | undefined) {
    if (!date) {
      return "";
    }
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  useEffect(() => {
    onValidityChange?.(isDirty && isValid);
  }, [onValidityChange, isDirty, isValid]);

  return (
    <form
      id="board-form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-4 flex-col"
    >
      <FieldGroup>
        <Field>
          <Label htmlFor="title">Task</Label>
          <Input {...register("title")} id="title" placeholder="e.g. Study" />
        </Field>
        <Controller
          name="status"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <Label htmlFor="status">Status</Label>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id="status"
                  className="w-full"
                  aria-invalid={fieldState.invalid}
                >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {TASK_STATUS.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          )}
        />
        <Controller
          name="dueDate"
          control={control}
          render={({ field }) => {
            const { value, onChange } = field;

            return (
              <Field>
                <FieldLabel>Due Date</FieldLabel>

                <InputGroup>
                  <InputGroupInput
                    value={value ? formatDate(value) : ""}
                    placeholder="Select date"
                    readOnly
                  />

                  <InputGroupAddon align="inline-end">
                    <Popover>
                      <PopoverTrigger asChild>
                        <InputGroupButton
                          variant="ghost"
                          size="icon-xs"
                          aria-label="Select date"
                        >
                          <CalendarIcon />
                        </InputGroupButton>
                      </PopoverTrigger>

                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                      >
                        <Calendar
                          mode="single"
                          selected={value}
                          onSelect={(date) => {
                            if (date) {
                              onChange(date);
                            }
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            );
          }}
        />
      </FieldGroup>
    </form>
  );
}
