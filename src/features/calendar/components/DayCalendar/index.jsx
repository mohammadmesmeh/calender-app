import { useCallback, useMemo } from "react";
import { useCalendarData } from "../../hooks/useCalendarData";
import { useCalendarDataDrop } from "../../hooks/useCalendarDataDrop";
import { useCalendarDate } from "../../context/CalendarDateContext/useCalendarDate";
import { useCalendarOverlay } from "../../context/CalendarOverlayContext";
import { isSameDay, formatHourTime, HOUR_HEIGHT } from "../../utils/calendarUtils";
import { buildCalendarItems } from "../../utils/calendarItems";
import { minutesToCalendarTime, timeFromDropOffset } from "../../utils/dragDrop";
import { itemBlockHeight, itemBlockTop, layoutDayBlocks } from "../../utils/calendarTime";
import { CalendarEventBar } from "../CalendarEventBar";
import { CurrentTimeLine } from "../CurrentTimeLine";
import { TimeGutter } from "../TimeGutter";
import { CalendarAddButton } from "../CalendarAddButton";
import { CalendarDragPreview } from "../CalendarDragPreview";

// Each day column is a stack of 24 slot rows. A slot is both a drop-candidate
// highlight on hover and the primary click-to-create surface.
const SLOT_CLASS =
  "group relative border-b border-border/40 cursor-pointer transition-colors duration-100 hover:bg-primary/[0.06] hover:ring-1 hover:ring-inset hover:ring-primary/40 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-primary/40";
const SLOT_ADD_CLASS = "absolute left-0.5 top-0.5 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150";

// Gap between side-by-side items in an overlap lane.
const LANE_GAP_PX = 3;

// Snaps the pointer Y inside a slot to the nearest 30-min time and opens the
// "add" overlay for that exact date+time (shares the drop math with DnD).
const useCreateAtSlot = (date) => {
  const { openAdd } = useCalendarOverlay();
  return useCallback(
    (hour) => (event) => {
      if (!event || (event.button != null && event.button !== 0)) return;
      const current = event.currentTarget;
      const cell = (event.target && event.target.closest && event.target.closest("[data-slot-hour]")) || current;
      const rect = cell?.getBoundingClientRect?.();
      let offset = 0;
      if (rect && typeof event.clientY === "number") {
        offset = Math.min(HOUR_HEIGHT - 1, Math.max(0, event.clientY - rect.top));
      }
      const time = minutesToCalendarTime(timeFromDropOffset(hour * HOUR_HEIGHT + offset));
      openAdd(date, time);
    },
    [openAdd, date]
  );
};

export const DayCalendar = () => {
    const { events, tasks } = useCalendarData();
    const { viewDate } = useCalendarDate();
    const { openItem } = useCalendarOverlay();

    const { draggingItem, dragPoint, getDragSourceProps, getDropTargetProps } = useCalendarDataDrop();
    const createAtSlot = useCreateAtSlot(viewDate);

    const isToday = isSameDay(viewDate, new Date());

    const dayItems = useMemo(
        () => buildCalendarItems(events, tasks, viewDate),
        [events, tasks, viewDate]
    );

    const dayLayout = useMemo(() => layoutDayBlocks(dayItems), [dayItems]);

    return (
        <div className="flex flex-col flex-1 min-h-0 bg-surface overflow-hidden">
            {/* Scrollable time grid */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-minimal">
                <div className="flex px-container-sm md:px-container-md lg:px-container-lg pt-3 pb-3">
                    <TimeGutter className="w-14 md:w-16" />

                    <div className="relative flex-1 border-l border-border" role="gridcell"
                        {...getDropTargetProps({ date: viewDate, kind: "time" })}
                    >
                        {Array.from({ length: 24 }, (_, i) => (
                            <div
                                key={i}
                                data-slot-hour={i}
                                onClick={(event) => {
                                    if (event.target?.closest?.("button")) return;
                                    createAtSlot(i)(event);
                                }}
                                style={{ height: HOUR_HEIGHT }}
                                className={SLOT_CLASS}
                            >
                                <CalendarAddButton
                                    onClick={createAtSlot(i)}
                                    label={`Add item at ${formatHourTime(i)}`}
                                    className={SLOT_ADD_CLASS}
                                />
                            </div>
                        ))}

                        <div className="pointer-events-none absolute inset-0 z-10">
                            {dayItems.map((item, itemIndex) => {
                                const lanes = dayLayout[itemIndex] || { leftPct: 0, widthPct: 100 };
                                return (
                                    <div
                                        key={`${item.source}-${item.id}`}
                                        className="pointer-events-auto absolute"
                                        style={{
                                            top: itemBlockTop(item),
                                            height: itemBlockHeight(item),
                                            left: `calc(${lanes.leftPct}% + ${LANE_GAP_PX}px)`,
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
                </div>
            </div>

            <CalendarDragPreview item={draggingItem} startPoint={dragPoint} />
        </div>
    );
};