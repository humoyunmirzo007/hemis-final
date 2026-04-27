import { MOCK_MATERIALS } from '@/src/constants';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Download, File as FileIcon, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Materials() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="text-red-500" size={24} />;
      case 'ppt': return <FileIcon className="text-orange-500" size={24} />;
      case 'xls': return <FileIcon className="text-green-500" size={24} />;
      default: return <FileIcon className="text-blue-500" size={24} />;
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-[#F2F2F7]">
      <div className="p-4 space-y-4">
        {MOCK_MATERIALS.map((material, idx) => (
          <motion.div
            key={material.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="border-none shadow-sm rounded-2xl overflow-hidden active:scale-[0.98] transition-transform">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  {getIcon(material.fileType)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 text-sm truncate">{material.title}</h4>
                  <p className="text-[11px] font-medium text-slate-500 mt-0.5">{material.subject}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase">
                      {material.fileType}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">{material.size}</span>
                    <span className="text-[10px] font-bold text-slate-400">·</span>
                    <span className="text-[10px] font-bold text-slate-400">{material.date}</span>
                  </div>
                </div>
                <button className="p-2.5 bg-[#E3F2FD] text-[#1877F2] rounded-xl hover:bg-[#1877F2] hover:text-white transition-colors">
                  <Download size={18} />
                </button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="h-24" />
    </div>
  );
}
