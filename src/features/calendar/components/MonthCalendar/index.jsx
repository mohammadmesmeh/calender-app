import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CONST } from "@/constants/const";
import { BaseCalendarDay } from "../BaseCalendarDay";
import { useCalendarData } from "../../hooks/useCalendarData";
import { useCalendarDataDrop } from "../../hooks/useCalendarDataDrop";
import { useCalendarDate } from "../../context/CalendarDateContext/useCalendarDate";
import { useCalendarOverlay } from "../../context/CalendarOverlayContext";
import { buildCalendarItems } from "../../utils/calendarItems";
import { isSameDay } from "../../utils/calendarUtils";
import { CalendarEventBar } from "../CalendarEventBar";
import { CalendarAddButton } from "../CalendarAddButton";
import { CalendarDragPreview } from "../CalendarDragPreview";

const MAX_VISIBLE_ITEMS = 3;

export const MonthCalendar = () => {
    const { events, tasks } = useCalendarData();
    const { viewDate, selectedDate, goToDay } = useCalendarDate();
    const { openAdd, openItem } = useCalendarOverlay();
    const navigate = useNavigate();

    const { draggingItem, dragPoint, getDragSourceProps, getDropTargetProps } = useCalendarDataDrop();

    const YEAR = viewDate.getFullYear();
    const MONTH = viewDate.getMonth();

    const today = new Date();

    const grid = useMemo(() => {
        const first = new Date(YEAR, MONTH, 1);
        const numFirst = first.getDay();
        const start = new Date(YEAR, MONTH, 1 - numFirst);
        return Array.from({ length: 42 }, (_, i) => {
            const date = new Date(start);
            date.setDate(start.getDate() + i);
            return date;
        });
    }, [YEAR, MONTH]);

    const itemsByDate = useMemo(() => {
        const map = {};
        grid.forEach((date) => {
            map[date.getTime()] = buildCalendarItems(events, tasks, date);
        });
        return map;
    }, [events, tasks, grid]);

    const openDay = (date) => {
        goToDay(date);
        navigate("/day");
    };

    return (
        <div className="flex flex-col flex-1 min-h-0 bg-surface overflow-hidden">
            <div className="grid grid-cols-7 px-container-sm md:px-container-md lg:px-container-lg pb-1.5 md:pb-2 pt-2 md:pt-3 border-b border-border sticky top-0 z-10 bg-surface">
                {CONST.DAYS__OF__WEEK.map((item, index) => (
                    <div
                        key={index}
                        className="text-center text-[10px] md:text-xs font-medium text-text-muted uppercase tracking-wider"
                    >
                        <span className="hidden sm:inline">{item}</span>
                        <span className="sm:hidden">{item.slice(0, 3)}</span>
                    </div>
                ))}
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden">
                <div className="grid grid-cols-7 border-border border-b">
                    {grid.map((date, index) => {
                        const isLastRow = index >= grid.length - 7
                        const isOutsideMonth = date.getMonth() !== MONTH
                        const isSelected = isSameDay(date, selectedDate)
                        const isToday = isSameDay(date, today)

                        const monthLabel = isOutsideMonth
                            ? date.getMonth() < MONTH
                                ? CONST.MONTHS__OF__YEAR[(MONTH - 1 + 12) % 12]
                                : CONST.MONTHS__OF__YEAR[(MONTH + 1) % 12]
                            : null

                        const items = itemsByDate[date.getTime()] || []
                        const visibleItems = items.slice(0, MAX_VISIBLE_ITEMS)
                        const overflow = items.length - MAX_VISIBLE_ITEMS

                        const addLabel = `${monthLabel ? monthLabel + ' ' : ''}${date.getDate()}`

                        return (
                            <div
                                key={`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`}
                                className={`border-e border-border ${!isLastRow ? 'border-b' : ''} ${isOutsideMonth ? 'bg-background/40' : ''}`}
                                {...getDropTargetProps({ date })}
                            >
                                <BaseCalendarDay
                                    day={date.getDate()}
                                    Month={monthLabel}
                                    isToday={isToday}
                                    isSelected={isSelected}
                                    isOutsideMonth={isOutsideMonth}
                                    isWeekend={date.getDay() === 0 || date.getDay() === 6}
                                    action={
                                        <CalendarAddButton
                                            onClick={() => openAdd(date)}
                                            label={`Add item on ${addLabel}`}
                                            className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150"
                                        />
                                    }
                                >
                                    {visibleItems.map((item) => (
                                        <CalendarEventBar
                                            key={`${item.source}-${item.id}`}
                                            event={{ title: item.title, time: item.time, color: item.color }}
                                            completed={item.completed}
                                            isDragging={!!draggingItem && draggingItem.source === item.source && draggingItem.id === item.id}
                                            {...getDragSourceProps(item, () => openItem(item))}
                                        />
                                    ))}
                                    {overflow > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => openDay(date)}
                                            className="text-start text-[10px] md:text-[11px] font-medium text-text-secondary hover:text-primary transition-colors"
                                        >
                                            +{overflow} more
                                        </button>
                                    )}
                                </BaseCalendarDay>
                            </div>
                        )
                    })}
                </div>
            </div>

            <CalendarDragPreview item={draggingItem} startPoint={dragPoint} />
        </div>
    )
}