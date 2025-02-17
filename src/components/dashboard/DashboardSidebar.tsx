
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, History, Image, MessageSquare } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";

export const DashboardSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="absolute left-4 top-4">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] bg-white/80 backdrop-blur-sm">
        <nav className="space-y-4 py-4">
          <h2 className="text-lg font-semibold px-4 mb-4">Activity History</h2>
          <ScrollArea className="h-[calc(100vh-100px)] px-4">
            <div className="space-y-4">
              <div className="bg-white/50 p-4 rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-sm text-fashion-muted">
                  <History className="h-4 w-4" />
                  <span>Today</span>
                </div>
                <div className="space-y-3">
                  <HistoryItem 
                    type="image"
                    text="Generated summer outfit ideas"
                    time="2h ago"
                  />
                  <HistoryItem 
                    type="prompt"
                    text="Requested style recommendations"
                    time="3h ago"
                  />
                </div>
              </div>
              
              <div className="bg-white/50 p-4 rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-sm text-fashion-muted">
                  <History className="h-4 w-4" />
                  <span>Yesterday</span>
                </div>
                <div className="space-y-3">
                  <HistoryItem 
                    type="image"
                    text="Created outfit combination"
                    time="1d ago"
                  />
                  <HistoryItem 
                    type="prompt"
                    text="Asked about color matching"
                    time="1d ago"
                  />
                </div>
              </div>
            </div>
          </ScrollArea>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

const HistoryItem = ({ type, text, time }: { type: 'prompt' | 'image', text: string, time: string }) => {
  return (
    <div className="flex items-start gap-3 p-2 rounded-md hover:bg-white/50 transition-colors">
      <div className="mt-1">
        {type === 'image' ? (
          <Image className="h-4 w-4 text-fashion-muted" />
        ) : (
          <MessageSquare className="h-4 w-4 text-fashion-muted" />
        )}
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-sm text-fashion-text">{text}</p>
        <p className="text-xs text-fashion-muted">{time}</p>
      </div>
    </div>
  );
};
