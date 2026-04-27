import { MOCK_NOTIFICATIONS } from '@/src/constants';
import { Card, CardContent } from '@/components/ui/card';
import { Bell, Info, AlertTriangle, CheckCircle, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { AppNotification } from '@/src/types';

export default function Notifications() {
  const getIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'info': return <Info className="text-blue-500" size={20} />;
      case 'warning': return <AlertTriangle className="text-orange-500" size={20} />;
      case 'success': return <CheckCircle className="text-green-500" size={20} />;
      default: return <Bell className="text-slate-400" size={20} />;
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-[#F2F2F7]">
      <div className="p-4 space-y-3">
        {MOCK_NOTIFICATIONS.map((notif: AppNotification, idx: number) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className={cn(
              "border-none shadow-sm rounded-2xl overflow-hidden active:scale-[0.99] transition-transform cursor-pointer",
              notif.isRead ? "opacity-80" : "bg-white ring-1 ring-blue-100"
            )}>
              <CardContent className="p-4 flex items-start gap-4">
                <div className={cn(
                  "p-2.5 rounded-xl flex-shrink-0",
                  notif.type === 'info' ? "bg-blue-50" : notif.type === 'warning' ? "bg-orange-50" : "bg-green-50"
                )}>
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className={cn("font-bold text-slate-900 text-sm leading-tight", !notif.isRead && "text-blue-600")}>
                      {notif.title}
                    </h4>
                    {!notif.isRead && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-1 ml-2 flex-shrink-0"></div>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed mb-2">{notif.content}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{notif.date}</p>
                </div>
                <ChevronRight size={16} className="text-slate-300 self-center" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
        
        {MOCK_NOTIFICATIONS.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-4">
              <Bell size={40} className="text-slate-200" />
            </div>
            <p className="text-slate-900 font-bold">Bildirishnomalar yo'q</p>
          </div>
        )}
      </div>
      <div className="h-24" />
    </div>
  );
}
