"use client";

import { useState, useEffect } from 'react';
import type { Video } from '@/lib/data';
import { generateSubscriptionPrompt } from '@/ai/flows/subscription-prompt-generation';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Rocket, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SubscriptionModalProps {
  video: Video | null;
  isOpen: boolean;
  onClose: () => void;
}

const subscriptionBenefits = [
  "Access to all premium videos",
  "Exclusive content from top creators",
  "Ad-free viewing experience",
  "High-quality streaming",
];

export function SubscriptionModal({ video, isOpen, onClose }: SubscriptionModalProps) {
  const { isSubscribed, toggleSubscription } = useAuth();
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && video) {
      setIsLoading(true);
      generateSubscriptionPrompt({
        isSubscribed,
        contentName: video.title,
        subscriptionBenefits,
      })
        .then((response) => {
          setPrompt(response.prompt);
        })
        .catch((error) => {
          console.error("Error generating prompt:", error);
          setPrompt("Subscribe to unlock exclusive content and enjoy all the benefits of a premium membership.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isOpen, video, isSubscribed]);

  const handleSubscribe = () => {
    toggleSubscription();
    onClose();
    toast({
      title: "🎉 Welcome to Premium!",
      description: "You've successfully subscribed. Enjoy your exclusive content!",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
             Unlock Premium Content
          </DialogTitle>
          <DialogDescription>
            Join SwipeStream Premium to watch this video and more.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : (
            <p className="text-sm text-foreground/80">{prompt}</p>
          )}
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Maybe Later
          </Button>
          <Button onClick={handleSubscribe} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Rocket className="mr-2 h-4 w-4" />
            Subscribe Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
