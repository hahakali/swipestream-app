import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft } from 'lucide-react';

const GoogleIcon = () => (
  <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
    <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-76.2 64.5C308.6 102.3 280.9 92 248 92c-71 0-129.5 58.5-129.5 130s58.5 130 129.5 130c78.2 0 109.5-56.2 113.4-82.4H248v-67.3h239.5c2.3 12.7 3.8 26.6 3.8 41.8z"></path>
  </svg>
);

const AppleIcon = () => (
  <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
    <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C39.2 141.6 0 184.2 0 241.2c0 61.6 44.5 102.9 93.3 111.3 33.4 5.9 65.4-17.5 88.5-17.5 23.2 0 57.3 19.3 93.3 16.5 30.3-2.5 64.3-39.2 64.3-80.5zM224 512c-49.2 0-82.3-30.3-102-53.5-34.4-40.4-56-112-56-112 88.5 24.6 122.5 82.3 207 82.3 1.5 0 3-1.8 3-1.8s-1.5-39.7-1.5-55.5c0-16.7-15-27-31.5-27-21 0-42 16.5-52.5 16.5-12 0-31.5-15-46.5-15-30 0-58.5 22.5-73.5 22.5-30 0-51-19.7-78-46.5-27-27-42-60-42-99 0-48 31.5-85.5 63-108 31.5-22.5 67.5-36 108-36 31.5 0 63 13.5 85.5 13.5 22.5 0 45-13.5 73.5-13.5 48 0 87 31.5 109.5 58.5 2.5 3 4.5 7.5 4.5 12 0 3-1.5 6-4.5 9-10.5 15-27 28.5-48 39-31.5 16.5-67.5 27-99 27-21 0-39-4.5-57-13.5-4.5-2.3-6-6-6-10.5 0-6 4.5-12 10.5-12 31.5 0 48-22.5 48-43.5 0-21-16.5-42-46.5-42-30 0-57 21-72 21-15 0-37.5-21-63-21-25.5 0-48 16.5-60 16.5-12 0-24-6-34.5-18-2.3-2.3-4.5-3-6-3s-3.8.8-6 3c-15 15-27 42-27 69 0 27 10.5 54 30 75 21 21 45 31.5 73.5 31.5 21 0 40.5-10.5 58.5-10.5s40.5 10.5 58.5 10.5c18 0 34.5-7.5 51-22.5 3-3 6-4.5 10.5-4.5s7.5 1.5 10.5 4.5c13.5 15 28.5 30 48 39 21 9 43.5 13.5 66 13.5 49.5 0 85.5-31.5 94.5-54 2.3-6 1.5-12-1.5-16.5-13.5-18-36-31.5-58.5-42-12-6-24-10.5-36-13.5-18-4.5-36-7.5-54-7.5-6 0-12 1.5-18 3-9 3-18 6-28.5 6-10.5 0-21-3-31.5-9-3-1.5-6-1.5-9 0-19.5 10.5-39 19.5-58.5 19.5-21 0-42-10.5-60-31.5-18-21-28.5-48-28.5-79.5 0-31.5 12-58.5 34.5-79.5 22.5-21 51-33 82.5-33 22.5 0 46.5 9 66 9s43.5-9 66-9c31.5 0 61.5 12 82.5 33 21 21 34.5 48 34.5 79.5 0 31.5-12 58.5-34.5 79.5z"></path>
  </svg>
);


export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="absolute top-4 left-4">
        <Button asChild variant="outline" className="text-foreground">
            <Link href="/">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Feed
            </Link>
        </Button>
      </div>
      <Card className="w-full max-w-sm border-border">
        <CardHeader>
          <CardTitle className="text-2xl">Login to SwipeStream</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            Sign in
          </Button>
          
          <div className="relative my-2">
            <Separator />
            <span className="absolute left-1/2 -translate-x-1/2 top-[-10px] bg-card px-2 text-xs text-muted-foreground">
              OR CONTINUE WITH
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline">
                <GoogleIcon />
              Google
            </Button>
            <Button variant="outline">
                <AppleIcon />
              Apple
            </Button>
          </div>
        </CardContent>
        <CardFooter className="text-sm">
          <p className="text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="#" className="underline text-primary">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}