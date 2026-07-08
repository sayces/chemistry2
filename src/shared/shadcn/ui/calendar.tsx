"use client";

import * as React from "react";
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
  type Locale,
} from "react-day-picker";

import { cn } from "../../lib/styleUtils";
import { Button, buttonVariants } from "@/shared/shadcn/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "lucide-react";
import { useEffect, useRef } from "react";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "default",
  locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      disableNavigation
      showOutsideDays={showOutsideDays}
      className={cn("group/calendar", className)}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code, { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit"),
        month: cn("flex w-full flex-col", defaultClassNames.month),
        month_caption: cn(defaultClassNames.month_caption),
        weekdays: cn("grid grid-cols-7 w-full", defaultClassNames.weekdays),
        weekday: cn(defaultClassNames.weekday),
        week: cn(
          "mt-2 grid grid-cols-7 w-full justify-items-center items-center",
          defaultClassNames.week,
        ),
        day: cn(
          "group/day w-full text-center flex items-center justify-center ",
          defaultClassNames.day,
        ),
        today: cn(defaultClassNames.today),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          );
        },
        DayButton: ({ ...props }) => (
          <CalendarDayButton locale={locale} {...props} />
        ),
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const defaultClassNames = getDefaultClassNames();

  const ref = useRef<HTMLButtonElement>(null);

  return (
    <Button
      ref={ref}
      variant="default"
      size="icon"
      data-day={day.date.toLocaleDateString(locale?.code)}
      className={cn(
        "flex h-full w-full aspect-square items-center justify-center",
        defaultClassNames.day_button,
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
