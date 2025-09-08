"use client";

import Link from 'next/link';
import { Film, LogIn, LogOut, Crown } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


export function Header() {
  const { isLoggedIn, isSubscribed, logout, toggleSubscription } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/50 to-transparent">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-white">
          <Film className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">SwipeStream</h1>
        </Link>
        <div className="flex items-center gap-4">
           {isLoggedIn && (
             <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                   <div className="flex items-center space-x-2">
                    <Crown className={`h-5 w-5 ${isSubscribed ? 'text-yellow-400' : 'text-gray-500'}`} />
                    <Switch
                      id="subscription-mode"
                      checked={isSubscribed}
                      onCheckedChange={toggleSubscription}
                      aria-label="Toggle premium subscription"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle Premium Subscription (Dev)</p>
                </TooltipContent>
              </Tooltip>
             </TooltipProvider>
          )}

          <Separator orientation="vertical" className="h-8 bg-gray-600" />
          
          {isLoggedIn ? (
            <Button variant="ghost" size="icon" onClick={logout} className="text-white hover:bg-white/10 hover:text-white">
              <LogOut className="h-6 w-6" />
              <span className="sr-only">Log Out</span>
            </Button>
          ) : (
            <Button asChild variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/login">
                <LogIn className="mr-2 h-5 w-5" />
                Login
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
