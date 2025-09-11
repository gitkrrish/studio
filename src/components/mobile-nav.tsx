
'use client';

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/user-nav"
import { PlusCircle, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileNav() {
    return (
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
                    <hr />
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
    )
}
