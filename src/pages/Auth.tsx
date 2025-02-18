
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Footer } from '@/components/shared/Footer';

const Auth = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(searchParams.get('mode') !== 'signup');

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/');
      }
    };
    checkUser();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // Check if input is email or username
        const isEmail = emailOrUsername.includes('@');
        let email = emailOrUsername;
        
        if (!isEmail) {
          // If username, get the corresponding email
          const { data: userData, error: userError } = await supabase
            .from('profiles')
            .select('id')
            .eq('username', emailOrUsername)
            .single();
          
          if (userError || !userData) {
            throw new Error('Invalid username or password');
          }
        }

        const { error } = await supabase.auth.signInWithPassword({ 
          email: email, 
          password 
        });
        
        if (error) throw error;

      } else {
        // Check if username exists
        const { data: existingUser } = await supabase
          .from('profiles')
          .select('username')
          .eq('username', username)
          .single();

        if (existingUser) {
          throw new Error('Username already exists. Please choose a different one.');
        }

        const { error } = await supabase.auth.signUp({ 
          email: emailOrUsername, 
          password,
          options: {
            data: {
              username: username,
            }
          }
        });

        if (error) throw error;
      }

      toast({
        title: isLogin ? "Welcome back!" : "Account created",
        description: isLogin
          ? "You have successfully logged in"
          : "Please check your email to verify your account",
      });

      if (isLogin) {
        navigate('/');
      }
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

  const toggleMode = () => {
    setIsLogin(!isLogin);
    const newMode = isLogin ? 'signup' : 'login';
    navigate(`/auth?mode=${newMode}`);
  };

  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md space-y-8 bg-white/80 backdrop-blur-sm p-6 rounded-xl dark:bg-black/20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-fashion-text dark:text-[#F2FCE2] font-playfair">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-fashion-muted dark:text-[#E5DEFF]/80 mt-2">
              {isLogin
                ? "Sign in with your email or username"
                : "Sign up for a new account"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a username"
                  required={!isLogin}
                  className="rounded-full border-fashion-border"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="emailOrUsername">
                {isLogin ? "Email or Username" : "Email"}
              </Label>
              <Input
                id="emailOrUsername"
                type={isLogin ? "text" : "email"}
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                placeholder={isLogin ? "Enter your email or username" : "Enter your email"}
                required
                className="rounded-full border-fashion-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="rounded-full border-fashion-border"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#F2FCE2] text-[#1B1B1B] hover:bg-[#E5F0D5] border-[#E5E5E5] dark:bg-[#F2FCE2]/20 dark:text-white dark:hover:bg-[#F2FCE2]/30"
            >
              {loading ? "Loading..." : (isLogin ? "Sign In" : "Sign Up")}
            </Button>
          </form>

          <div className="text-center">
            <Button
              variant="link"
              onClick={toggleMode}
              className="text-fashion-muted dark:text-[#E5DEFF]/80 hover:text-fashion-text dark:hover:text-[#E5DEFF]"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Auth;
