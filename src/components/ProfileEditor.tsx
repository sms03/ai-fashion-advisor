
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface ProfileData {
  first_name: string;
  last_name: string;
  username: string;
  email?: string;
}

interface ProfileEditorProps {
  initialData: ProfileData;
  onUpdate: () => void;
}

const ProfileEditor = ({ initialData, onUpdate }: ProfileEditorProps) => {
  const [formData, setFormData] = useState<ProfileData>(initialData);
  const [loading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const { toast } = useToast();

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'username' && value !== initialData.username) {
      const { data } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', value)
        .single();

      if (data) {
        setUsernameError('This username is already taken');
      } else {
        setUsernameError('');
      }
    }
  };

  const updateProfile = async () => {
    if (usernameError) {
      toast({
        title: "Error",
        description: "Please choose a different username",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          first_name: formData.first_name,
          last_name: formData.last_name,
          username: formData.username,
        })
        .eq('id', (await supabase.auth.getUser()).data.user?.id);

      if (profileError) throw profileError;

      if (formData.email && formData.email !== initialData.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: formData.email,
        });

        if (emailError) throw emailError;
      }

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      onUpdate();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first_name">First Name</Label>
          <Input
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            placeholder="Enter your first name"
            className="rounded-full border-fashion-border"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last_name">Last Name</Label>
          <Input
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            placeholder="Enter your last name"
            className="rounded-full border-fashion-border"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          className="rounded-full border-fashion-border"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Enter your username"
          className="rounded-full border-fashion-border"
        />
        {usernameError && (
          <p className="text-sm text-red-500 mt-1">{usernameError}</p>
        )}
      </div>

      <Button 
        onClick={updateProfile} 
        disabled={loading || !!usernameError}
        className="w-full rounded-full bg-[#F2FCE2] text-[#1B1B1B] hover:bg-[#E5F0D5] border-[#E5E5E5] dark:bg-[#F2FCE2]/20 dark:text-white dark:hover:bg-[#F2FCE2]/30"
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Update Profile
      </Button>
    </div>
  );
};

export default ProfileEditor;
