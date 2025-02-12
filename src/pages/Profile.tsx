
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import LLMSettings from '@/components/LLMSettings';

interface Conversation {
  id: string;
  prompt: string;
  response: string;
  image_url: string | null;
  created_at: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [userEmail, setUserEmail] = useState<string | undefined>();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }
      setUserEmail(session.user.email);
      fetchConversations();
    };

    checkUser();
  }, [navigate]);

  const fetchConversations = async () => {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setConversations(data || []);
    } catch (error: any) {
      console.error('Error fetching conversations:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  if (loading) {
    return <div className="min-h-screen gradient-bg flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen gradient-bg p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="" alt={userEmail} />
              <AvatarFallback>
                {userEmail?.[0]?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-fashion-text">{userEmail}</h1>
            </div>
          </div>
          <Button onClick={handleSignOut} variant="outline">Sign Out</Button>
        </div>

        {/* LLM Settings */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-fashion-text">AI Model Settings</h2>
          <LLMSettings />
        </div>

        {/* Conversation History */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-fashion-text">Fashion Advice History</h2>
          {conversations.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center text-fashion-muted">
              No fashion advice history yet. Start by getting some fashion advice!
            </div>
          ) : (
            <div className="space-y-4">
              {conversations.map((conv) => (
                <div key={conv.id} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 space-y-4">
                  <div className="flex items-start space-x-4">
                    {conv.image_url && (
                      <img
                        src={conv.image_url}
                        alt="Fashion item"
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1 space-y-2">
                      <p className="font-medium text-fashion-text">Prompt:</p>
                      <p className="text-fashion-muted">{conv.prompt}</p>
                      <p className="font-medium text-fashion-text mt-4">Response:</p>
                      <p className="text-fashion-muted">{conv.response}</p>
                      <p className="text-sm text-fashion-muted mt-2">
                        {new Date(conv.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
