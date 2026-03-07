"use client";

import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BoardFormValues, boardSchema } from "@/schemas/board.schemas";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { BOARD_ICONS_MAP, BoardIconId } from "./BoardIcons";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

type Props = {
  onSubmit: (values: BoardFormValues) => void;
  defaultValues?: BoardFormValues;
  onValidityChange?: (isValid: boolean) => void;
};

const icons = Object.keys(BOARD_ICONS_MAP) as BoardIconId[];

export function BoardForm({
  onSubmit,
  defaultValues,
  onValidityChange,
}: Props) {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { isValid, isDirty },
  } = useForm<BoardFormValues>({
    resolver: zodResolver(boardSchema),
    mode: "onChange",
    defaultValues: {
      name: defaultValues?.name ?? "",
      description: defaultValues?.description ?? "",
      icon: defaultValues?.icon ?? "briefcase",
    },
  });

  useEffect(() => {
    onValidityChange?.(isDirty && isValid);
  }, [onValidityChange, isDirty, isValid]);

  const selectedIcon = useWatch({
    control,
    name: "icon",
  });

  return (
    <form
      id="board-form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <FieldGroup>
        {/* NAME */}
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="board-name">Name</FieldLabel>

              <Input
                {...field}
                id="board-name"
                placeholder="e.g. Default Board"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="board-description">Description</FieldLabel>

              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  id="board-description"
                  rows={4}
                  className="min-h-24 resize-none"
                  placeholder="Short description for this board"
                  aria-invalid={fieldState.invalid}
                />

                <InputGroupAddon align="block-end">
                  <InputGroupText className="tabular-nums">
                    {field.value?.length ?? 0}/200
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* ICON */}
        <Field>
          <FieldLabel>Icon</FieldLabel>

          <div className="flex flex-wrap gap-2">
            {icons.map((iconId) => {
              const { emoji } = BOARD_ICONS_MAP[iconId];
              const selected = selectedIcon === iconId;

              return (
                <button
                  key={iconId}
                  type="button"
                  onClick={() =>
                    setValue("icon", iconId, {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                  }
                  aria-pressed={selected}
                  className="rounded-full focus:outline-none"
                >
                  <Avatar
                    className={cn(
                      "h-10 w-10 border transition-colors flex items-center justify-center",
                      selected
                        ? "border-primary"
                        : "border-transparent hover:border-muted-foreground/40",
                    )}
                  >
                    <AvatarFallback className="bg-transparent text-lg">
                      {emoji}
                    </AvatarFallback>
                  </Avatar>
                </button>
              );
            })}
          </div>
        </Field>
      </FieldGroup>
    </form>
  );
}
