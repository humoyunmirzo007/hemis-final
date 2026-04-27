import { MOCK_CERTIFICATES } from '@/src/constants';
import { Card, CardContent } from '@/components/ui/card';
import { FileCheck, Clock, XCircle, FilePlus, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export default function Certificates() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Ready': return <FileCheck className="text-green-500" size={20} />;
      case 'Pending': return <Clock className="text-orange-500" size={20} />;
      case 'Rejected': return <XCircle className="text-red-500" size={20} />;
      default: return <Clock size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready': return 'bg-green-50 text-green-600 border-green-100';
      case 'Pending': return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'Rejected': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-slate-50 text-slate-600';
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-[#F2F2F7]">
      <div className="p-4 space-y-4">
        {/* Request New button */}
        <button className="w-full bg-[#1877F2] text-white p-4 rounded-2xl flex items-center justify-center gap-2 font-bold shadow-lg shadow-blue-200 active:scale-[0.98] transition-transform">
          <FilePlus size={20} />
          Yangi ma'lumotnoma so'rash
        </button>

        <h3 className="font-bold text-slate-800 text-sm px-1 pt-2 uppercase tracking-wider">Mening so'rovlarim</h3>

        {MOCK_CERTIFICATES.map((cert, idx) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-50 rounded-xl">
                      {getStatusIcon(cert.status)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-[14px] leading-tight">{cert.title}</h4>
                      <p className="text-[11px] font-medium text-slate-500 mt-1">So'rov sanasi: {cert.requestDate}</p>
                    </div>
                  </div>
                  <div className={cn(
                    "px-2.5 py-1 rounded-lg text-[10px] font-black uppercase border",
                    getStatusColor(cert.status)
                  )}>
                    {cert.status === 'Ready' ? 'Tayyor' : cert.status === 'Pending' ? 'Jarayonda' : 'Rad etildi'}
                  </div>
                </div>

                {cert.status === 'Ready' && (
                  <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                    <p className="text-[11px] font-bold text-slate-400">Tayyor bo'lgan sana: {cert.readyDate}</p>
                    <button className="flex items-center gap-1.5 text-[12px] font-bold text-[#1877F2] bg-blue-50 px-3 py-1.5 rounded-lg active:scale-95 transition-transform">
                      <Download size={14} /> PDF yuklash
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="h-24" />
    </div>
  );
}
