"use client";

import { useState, useEffect } from 'react';
import type { Video } from '@/lib/data';
import { generateSubscriptionPrompt } from '@/ai/flows/subscription-prompt-generation';
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
  toggleSubscription: () => void;
  isSubscribed?: boolean;
}

const subscriptionBenefits = [
  "访问所有高级视频",
  "顶尖创作者的独家内容",
  "无广告观看体验",
  "高清流媒体",
];

export function SubscriptionModal({ video, isOpen, onClose, toggleSubscription, isSubscribed }: SubscriptionModalProps) {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && video) {
      setIsLoading(true);
      generateSubscriptionPrompt({
        isSubscribed: !!isSubscribed,
        contentName: video.title,
        subscriptionBenefits,
      })
        .then((response) => {
          setPrompt(response.prompt);
        })
        .catch((error) => {
          console.error("Error generating prompt:", error);
          setPrompt("订阅以解锁独家内容，享受高级会员的所有权益。");
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
      title: "🎉 欢迎加入 Premium!",
      description: "您已成功订阅。尽情享受您的专属内容吧！",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
             解锁高级内容
          </DialogTitle>
          <DialogDescription>
            加入 SwipeStream Premium 观看此视频及更多内容。
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
            以后再说
          </Button>
          <Button onClick={handleSubscribe} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Rocket className="mr-2 h-4 w-4" />
            立即订阅
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
