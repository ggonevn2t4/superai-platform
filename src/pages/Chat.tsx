
import React from 'react';
import ChatInterface from '../components/chat/ChatInterface';
import Layout from '../components/layout/Layout';
import { useChatPage } from '@/hooks/chat/useChatPage';
import ConversationsList from '@/components/chat/sidebar/ConversationsList';
import ChatContextHeader from '@/components/chat/header/ChatContextHeader';
import ModelSelector from '@/components/ui/ModelSelector';

const Chat: React.FC = () => {
  const {
    chatContext,
    conversations,
    isLoadingConversations,
    handleLoadConversation,
    handleDeleteConversation,
    handleNewChat,
    model,
    setModel
  } = useChatPage();

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-center mb-4">
          <div className="w-full max-w-md">
            <ModelSelector 
              onChange={setModel} 
              defaultModel={model}
            />
          </div>
        </div>
        
        <ChatContextHeader chatContext={chatContext} />
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="md:col-span-1 hidden md:block">
            <ConversationsList
              conversations={conversations}
              isLoadingConversations={isLoadingConversations}
              onLoadConversation={handleLoadConversation}
              onDeleteConversation={handleDeleteConversation}
              onNewChat={handleNewChat}
            />
          </div>
          
          <div className="md:col-span-4">
            <ChatInterface initialContext={chatContext} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
