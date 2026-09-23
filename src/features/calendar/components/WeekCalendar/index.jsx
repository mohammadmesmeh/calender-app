import { useCallback, useMemo } from "react";
import { useCalendarData } from "../../hooks/useCalendarData";
import { useCalendarDataDrop } from "../../hooks/useCalendarDataDrop";
import { useCalendarDate } from "../../context/CalendarDateContext/useCalendarDate";
import { useCalendarOverlay } from "../../context/CalendarOverlayContext";
import { getWeekDays, isSameDay, HOUR_HEIGHT } from "../../utils/calendarUtils";
import { buildCalendarItems } from "../../utils/calendarItems";
import { minutesToCalendarTime, timeFromDropOffset } from "../../utils/dragDrop";
import { itemBlockHeight, itemBlockTop, layoutDayBlocks } from "../../utils/calendarTime";
import { CalendarEventBar } from "../CalendarEventBar";
import { CurrentTimeLine } from "../CurrentTimeLine";
import { TimeGutter } from "../TimeGutter";
import { CalendarAddButton } from "../CalendarAddButton";
import { CalendarDragPreview } from "../CalendarDragPreview";
import { useLocalization } from "@/i18n/LocalizationProvider";

const DAY_GRID_CLASS = "grid grid-cols-[3.5rem_repeat(7,minmax(0,1fr))] md:grid-cols-[4rem_repeat(7,minmax(0,1fr))]";

// Each 24h column is a stack of 24 slot rows. A slot becomes a drop-candidate
// highlight on hover AND the primary click-to-create surface.
const SLOT_CLASS =
  "group relative border-b border-border/40 cursor-pointer transition-colors duration-100 hover:bg-primary/[0.06] hover:ring-1 hover:ring-inset hover:ring-primary/40 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-primary/40";
const SLOT_ADD_CLASS = "absolute start-0.5 top-0.5 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150";

// Gap between side-by-side items in an overlap lane.
const LANE_GAP_PX = 3;

const useCreateAtSlot = () => {
  const { openAdd } = useCalendarOverlay();
  return useCallback(
    (day, hour) => (event) => {
      if (!event || (event.button != null && event.button !== 0)) return;
      const current = event.currentTarget;
      const cell = (event.target && event.target.closest && event.target.closest("[data-slot-hour]")) || current;
      const rect = cell?.getBoundingClientRect?.();
      let offset = 0;
      if (rect && typeof event.clientY === "number") {
        offset = Math.min(HOUR_HEIGHT - 1, Math.max(0, event.clientY - rect.top));
      }
      const time = minutesToCalendarTime(timeFromDropOffset(hour * HOUR_HEIGHT + offset));
      openAdd(day, time);
    },
    [openAdd]
  );
};

export const WeekCalendar = () => {
    const { events, tasks } = useCalendarData();
    const { viewDate } = useCalendarDate();
    const { openAdd, openItem } = useCalendarOverlay();

    const { draggingItem, dragPoint, getDragSourceProps, getDropTargetProps } = useCalendarDataDrop();
    const createAtSlot = useCreateAtSlot();
    const { t, month, weekday, time } = useLocalization();

    const weekDays = useMemo(() => getWeekDays(viewDate), [viewDate]);

    const weekItems = useMemo(
        () => weekDays.map((day) => buildCalendarItems(events, tasks, day)),
        [events, tasks, weekDays]
    );

    const weekLayouts = useMemo(
        () => weekItems.map((items) => layoutDayBlocks(items)),
        [weekItems]
    );

    const today = new Date();

    return (
        <div className="flex flex-col flex-1 min-h-0 bg-surface overflow-hidden">
            {/* Day headers */}
            <div className={`sticky top-0 z-10 bg-surface border-b border-border ${DAY_GRID_CLASS} px-container-sm md:px-container-md lg:px-container-lg`}>
                <div />
                {weekDays.map((day) => {
                    const isToday = isSameDay(day, today);
                    return (
                        <div
                            key={day.toISOString()}
                            className="group relative flex flex-col items-center justify-center py-2 px-1 border-s border-border"
                            {...getDropTargetProps({ date: day })}
                        >
                            <span className={`text-[11px] md:text-xs font-medium uppercase tracking-wide ${isToday ? "text-primary" : "text-text-muted/70"}`}>
                                {weekday(day, "short")}
                            </span>
                            <span className={`mt-0.5 inline-flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-full text-sm md:text-base font-medium ${isToday ? "bg-primary text-white" : "text-text"}`}>
                                {day.getDate()}
                            </span>
                            <CalendarAddButton
                                onClick={() => openAdd(day)}
                                label={`${t('calendar.addItemOn')} ${month(day, "short")} ${day.getDate()}`}
                                className="absolute end-1 top-1.5 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150"
                            />
                        </div>
                    );
                })}
            </div>

            {/* Scrollable time grid */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-minimal">
                <div className="flex px-container-sm md:px-container-md lg:px-container-lg pt-3 pb-3">
                    <div className="sticky start-0 z-10 flex bg-surface">
                        <TimeGutter className="w-14 md:w-16" />
                    </div>

                    <div className="flex-1 grid grid-cols-7 border-s border-border">
                        {weekDays.map((day, dayIndex) => {
                            const isToday = isSameDay(day, today);
                            const dayItems = weekItems[dayIndex];
                            const dayLayout = weekLayouts[dayIndex];
                            return (
                                <div
                                    key={day.toISOString()}
                                    className="relative"
                                    role="gridcell"
                                    {...getDropTargetProps({ date: day, kind: "time" })}
                                >
                                    {Array.from({ length: 24 }, (_, i) => (
                                        <div
                                            key={i}
                                            data-slot-hour={i}
                                            onClick={(event) => {
                                                if (event.target?.closest?.("button")) return;
                                                createAtSlot(day, i)(event);
                                            }}
                                            style={{ height: HOUR_HEIGHT }}
                                            className={SLOT_CLASS}
                                        >
                                            <CalendarAddButton
                                                onClick={createAtSlot(day, i)}
                                                label={`${t('calendar.addItemAt')} ${time(new Date(2024, 0, 1, i, 0, 0, 0))}`}
                                                className={SLOT_ADD_CLASS}
                                            />
                                        </div>
                                    ))}

                                    <div className="pointer-events-none absolute inset-0 z-10">
                                        {dayItems.map((item, itemIndex) => {
                                            const lanes = dayLayout[itemIndex] || { inlineStartPct: 0, widthPct: 100 };
                                            return (
                                                <div
                                                    key={`${item.source}-${item.id}`}
                                                    className="pointer-events-auto absolute"
                                                    style={{
                                                        top: itemBlockTop(item),
                                                        height: itemBlockHeight(item),
                                                        insetInlineStart: `calc(${lanes.inlineStartPct}% + ${LANE_GAP_PX}px)`,
                                                        width: `calc(${lanes.widthPct}% - ${2 * LANE_GAP_PX}px)`,
                                                        zIndex: 11,
                                                    }}
                                                >
                                                    <CalendarEventBar
                                                        event={{ title: item.title, time: item.time, color: item.color }}
                                                        completed={item.completed}
                                                        isDragging={!!draggingItem && draggingItem.source === item.source && draggingItem.id === item.id}
                                                        className="h-full w-full"
                                                        {...getDragSourceProps(item, () => openItem(item))}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {isToday && <CurrentTimeLine />}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <CalendarDragPreview item={draggingItem} startPoint={dragPoint} />
        </div>
    );
};