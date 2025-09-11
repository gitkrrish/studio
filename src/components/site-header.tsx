import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { UserNav } from "@/components/user-nav"
import { PlusCircle, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
          <Icons.logo className="h-8 w-8 text-primary" />
          <span className="hidden font-bold sm:inline-block">CivicConnect</span>
        </Link>
        <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
          <Link href="/dashboard" className="text-foreground/60 transition-colors hover:text-foreground/80">
            Community Feed
          </Link>
          <Link href="/dashboard/map" className="text-foreground/60 transition-colors hover:text-foreground/80">
            Map View
          </Link>
          <Link href="/dashboard/my-reports" className="text-foreground/60 transition-colors hover:text-foreground/80">
            My Reports
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Button asChild>
              <Link href="/dashboard/report">
                <PlusCircle className="mr-2 h-4 w-4" /> Report an Issue
              </Link>
            </Button>
            <UserNav />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4">
                <Link href="/dashboard" className="text-lg font-medium">
                  Community Feed
                </Link>
                <Link href="/dashboard/map" className="text-lg font-medium">
                  Map View
                </Link>
                <Link href="/dashboard/my-reports" className="text-lg font-medium">
                  My Reports
                </Link>
                <hr/>
                <Button asChild>
                  <Link href="/dashboard/report">
                    <PlusCircle className="mr-2 h-4 w-4" /> Report an Issue
                  </Link>
                </Button>
                 <div className="pt-4">
                   <UserNav />
                 </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
