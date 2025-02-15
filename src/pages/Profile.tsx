
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import LLMSettings from '@/components/LLMSettings';
import ProfileEditor from '@/components/ProfileEditor';
import { useIsMobile } from '@/hooks/use-mobile';

interface Conversation {
  id: string;
  prompt: string;
  response: string;
  image_url: string | null;
  created_at: string;
}

interface Profile {
  first_name: string;
  last_name: string;
  username: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [userEmail, setUserEmail] = useState<string | undefined>();
  const [profile, setProfile] = useState<Profile>({
    first_name: '',
    last_name: '',
    username: '',
  });
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }
      setUserEmail(session.user.email);
      await Promise.all([
        fetchConversations(),
        fetchProfile(),
      ]);
    };

    checkUser();
  }, [mounted, navigate]);

  const fetchConversations = async () => {
    if (!mounted) return;
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setConversations(data || []);
    } catch (error: any) {
      console.error('Error fetching conversations:', error.message);
    }
  };

  const fetchProfile = async () => {
    if (!mounted) return;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('first_name, last_name, username')
        .single();

      if (error) throw error;
      if (data) {
        setProfile(data);
      }
    } catch (error: any) {
      console.error('Error fetching profile:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const getDisplayName = () => {
    if (profile.first_name || profile.last_name) {
      return `${profile.first_name} ${profile.last_name}`.trim();
    }
    return profile.username || userEmail;
  };

  if (!mounted || loading) {
    return <div className="min-h-screen gradient-bg flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen gradient-bg p-2 sm:p-4">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-8">
        {/* Profile Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6">
          <div className={`flex ${isMobile ? 'flex-col items-center space-y-4' : 'items-center justify-between'}`}>
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12 sm:h-16 sm:w-16">
                <AvatarImage src="" alt={getDisplayName()} />
                <AvatarFallback>
                  {getDisplayName()?.[0]?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-fashion-text break-all">
                  {getDisplayName()}
                </h1>
                {userEmail && userEmail !== profile.username && (
                  <p className="text-sm text-fashion-muted">{userEmail}</p>
                )}
              </div>
            </div>
            <Button 
              onClick={handleSignOut} 
              variant="outline"
              className="w-full sm:w-auto mt-4 sm:mt-0 bg-[#F1F0FB] text-[#1B1B1B] hover:bg-[#E5E4F5] border-[#E5E5E5]"
            >
              Sign Out
            </Button>
          </div>
        </div>

        {/* Profile Editor */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold text-fashion-text">Edit Profile</h2>
          <ProfileEditor 
            initialData={profile}
            onUpdate={fetchProfile}
          />
        </div>

        {/* LLM Settings */}
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold text-fashion-text">AI Model Settings</h2>
          <LLMSettings />
        </div>

        {/* Conversation History */}
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold text-fashion-text">Fashion Advice History</h2>
          {conversations.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-center text-fashion-muted">
              No fashion advice history yet. Start by getting some fashion advice!
            </div>
          ) : (
            <div className="space-y-4">
              {conversations.map((conv) => (
                <div key={conv.id} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 space-y-4">
                  <div className={`flex ${isMobile ? 'flex-col' : 'items-start space-x-4'}`}>
                    {conv.image_url && (
                      <img
                        src={conv.image_url}
                        alt="Fashion item"
                        className={`${isMobile ? 'w-full h-48 mb-4' : 'w-24 h-24'} object-cover rounded-lg`}
                      />
                    )}
                    <div className="flex-1 space-y-2">
                      <p className="font-medium text-fashion-text">Prompt:</p>
                      <p className="text-fashion-muted text-sm sm:text-base">{conv.prompt}</p>
                      <p className="font-medium text-fashion-text mt-4">Response:</p>
                      <p className="text-fashion-muted text-sm sm:text-base">{conv.response}</p>
                      <p className="text-xs sm:text-sm text-fashion-muted mt-2">
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
