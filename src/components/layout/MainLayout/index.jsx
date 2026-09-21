import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { MainMenu } from "@/components/navigation/MainMenu";
import { useContext } from "react";
import { VisibleContext } from "@/features/sidebar/context/VisibleContext";
import { TaskProvider } from "@/features/tasks/context/TaskContext";
import { EventProvider } from "@/features/calendar/context/EventContext";
import { CalendarDateProvider } from "@/features/calendar/context/CalendarDateContext";
import { CalendarOverlayProvider } from "@/features/calendar/context/CalendarOverlayContext";

export const MainLayout = () => {
  const { isVisibleMenu } = useContext(VisibleContext);

  return (
    <TaskProvider>
      <EventProvider>
        <CalendarDateProvider>
          <CalendarOverlayProvider>
            <div className="flex h-dvh flex-col overflow-hidden bg-background">
              <Header className="shrink-0" />

              <div className="flex flex-1 min-h-0 overflow-hidden lg:flex-row">
                <main className="flex flex-1 min-h-0 flex-col overflow-hidden">
                  <Outlet />
                </main>

                {isVisibleMenu && (
                  <aside className="hidden lg:flex w-64 border-l border-border bg-surface/90 shadow-subtle">
                    <div className="h-full overflow-y-auto">
                      <MainMenu />
                    </div>
                  </aside>
                )}
              </div>
            </div>
          </CalendarOverlayProvider>
        </CalendarDateProvider>
      </EventProvider>
    </TaskProvider>
  );
};