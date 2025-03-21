
import React from 'react';
import { DownloadCloud, FileJson, FileText, FileCode } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface ExportMenuProps {
  onExport: (format: 'json' | 'text' | 'markdown') => void;
  disabled?: boolean;
}

const ExportMenu: React.FC<ExportMenuProps> = ({ onExport, disabled = false }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-muted-foreground" 
          disabled={disabled}
        >
          <DownloadCloud size={16} className="mr-1" />
          <span className="hidden sm:inline">Xuất</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Định dạng xuất</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onExport('json')}>
          <FileJson className="mr-2 h-4 w-4" />
          <span>JSON</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onExport('text')}>
          <FileText className="mr-2 h-4 w-4" />
          <span>Văn bản (TXT)</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onExport('markdown')}>
          <FileCode className="mr-2 h-4 w-4" />
          <span>Markdown (MD)</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportMenu;
