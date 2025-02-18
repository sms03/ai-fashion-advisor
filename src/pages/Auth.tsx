
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Footer } from '@/components/shared/Footer';

const Auth = () => {
  const [email, setEmail] = useState("");
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
      const { error } = isLogin
        ? await supabase.auth.signInWithPassword({ 
            email, 
            password,
          })
        : await supabase.auth.signUp({ 
            email, 
            password,
            options: {
              data: {
                username: username,
              }
            }
          });

      if (error) throw error;

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
        <div className="w-full max-w-md space-y-8 bg-white/80 backdrop-blur-sm p-6 rounded-xl dark:bg-black/20 dark:text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-fashion-text dark:text-[#F2FCE2] font-playfair">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-fashion-muted dark:text-[#E5DEFF]/80 mt-2">
              {isLogin
                ? "Sign in to your account to continue"
                : "Sign up for a new account"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="username" className="text-fashion-text dark:text-[#F2FCE2]">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required={!isLogin}
                  className="bg-fashion-input dark:bg-black/40 dark:text-white"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-fashion-text dark:text-[#F2FCE2]">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-fashion-input dark:bg-black/40 dark:text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-fashion-text dark:text-[#F2FCE2]">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-fashion-input dark:bg-black/40 dark:text-white"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#F2FCE2] text-[#1B1B1B] hover:bg-[#E5F0D5] border border-[#E5E5E5] dark:bg-[#F2FCE2]/20 dark:text-white dark:hover:bg-[#F2FCE2]/30"
              disabled={loading}
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
