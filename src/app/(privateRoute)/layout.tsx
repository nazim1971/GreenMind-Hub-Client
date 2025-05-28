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
    <div className="w-full container mx-auto flex -mt-20 px-5 sm:px-0">
      <SidebarProvider>
        <AppSidebar className="sticky top-0 h-screen  " />
        <SidebarInset className="flex-1 container overflow-x-hidden">
          <header className="sticky top-0 overflow-hidden z-10 dark:bg-neutral-900 flex h-16 items-center gap-2 border-b px-4">
            <div className="flex items-center gap-2 w-full">
              <SidebarTrigger className="-ml-1" />
            </div>
          </header>
          <div className="p-4 dark:bg-[#14b8a51d]  pt-0 min-h-[calc(100vh-4rem)]">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}