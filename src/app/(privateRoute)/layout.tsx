import { AppSidebar } from '@/components/modules/Dashboard/app-sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

// dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-[1200px] mx-auto flex -mt-20 ">
      <SidebarProvider>
        <AppSidebar className="sticky top-0 h-screen  " />
        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-10 bg-background flex h-16 items-center gap-2 border-b px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
            </div>
          </header>
          <div className="p-4 pt-0 min-h-[calc(100vh-4rem)]">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}