import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icons';

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-muted/40 p-4">
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader className="text-center">
          <Icons.logo className="mx-auto h-12 w-auto" />
          <CardTitle className="mt-4 text-2xl font-bold tracking-tight">Admin Panel</CardTitle>
          <CardDescription>Sign in to manage CivicConnect</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="admin@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full" asChild>
                <Link href="/admin/dashboard">Login</Link>
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            <Link href="/" className="underline">
              Switch to Citizen Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
