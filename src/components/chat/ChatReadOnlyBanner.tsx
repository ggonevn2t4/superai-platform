
import React from 'react';
import { Share2 } from 'lucide-react';

interface ChatReadOnlyBannerProps {
  isShared: boolean;
}

const ChatReadOnlyBanner: React.FC<ChatReadOnlyBannerProps> = ({ isShared }) => {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-yellow-700">
      <p className="flex items-center gap-2">
        <Share2 size={16} />
        {isShared ? 'Bạn đang xem một cuộc trò chuyện được chia sẻ' : 'Cuộc trò chuyện này không còn được chia sẻ'}
      </p>
    </div>
  );
};

export default ChatReadOnlyBanner;
