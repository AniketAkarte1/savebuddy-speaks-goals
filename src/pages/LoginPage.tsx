import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { PiggyBank, Mail, Lock, RefreshCw } from 'lucide-react';
import VoiceButton from '@/components/VoiceButton';
import LanguageSelector from '@/components/LanguageSelector';
import ChatBot from '@/components/ChatBot';
import { useVoiceInteraction } from '@/hooks/useVoiceInteraction';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { speak } = useVoiceInteraction();
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaValid, setCaptchaValid] = useState(false);

  // Generate simple captcha
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
    setCaptchaInput('');
    setCaptchaValid(false);
  };

  // Initialize captcha on load
  useEffect(() => {
    generateCaptcha();
  }, []);

  // Validate captcha
  const validateCaptcha = (input: string) => {
    setCaptchaInput(input);
    setCaptchaValid(input.toUpperCase() === captcha);
  };

  // Welcome message when page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      speak(t('audio.welcomeMessage'));
    }, 1500);
    return () => clearTimeout(timer);
  }, [speak, t]);

  const handleVoiceCommand = (command: string, transcript: string) => {
    switch (command) {
      case 'LOGIN':
      case 'GO_DASHBOARD':
        handleLogin();
        break;
      case 'REGISTER':
        navigate('/register');
        break;
      case 'SHOW_HELP':
        speak(t('audio.loginGuide'));
        break;
      default:
        speak(`Sorry, I didn't understand: ${transcript}`);
    }
  };

  const handleLogin = () => {
    if (!captchaValid) {
      speak('Please enter the correct captcha first.');
      return;
    }
    // In a real app, this would validate credentials
    speak('Logging you in...');
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  const handleGoogleLogin = () => {
    // In a real app, this would integrate with Google OAuth
    speak('Connecting with Google...');
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      {/* Language Selector */}
      <div className="absolute top-4 right-4">
        <LanguageSelector variant="compact" />
      </div>

      {/* Voice Button */}
      <VoiceButton 
        variant="floating"
        onCommand={handleVoiceCommand}
        autoGuide={true}
        guideText={t('audio.loginGuide')}
      />

      <Card className="w-full max-w-md shadow-large border-0 bg-card/95 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-soft">
              <img src="/src/assets/gullak_logo.png" alt="Gullak" className="h-14 w-14 object-contain" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {t('common.welcome')}
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              {t('auth.welcomeBack')}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Google Login */}
          <Button 
            onClick={handleGoogleLogin}
            className="w-full btn-secondary"
            size="lg"
            aria-label={t('auth.loginWithGoogle')}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {t('auth.loginWithGoogle')}
          </Button>

          <div className="relative">
            <Separator />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-card px-3 text-sm text-muted-foreground">
                or
              </span>
            </div>
          </div>

          {/* Email Login Form */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="sr-only">
                {t('auth.email')}
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder={t('auth.email')}
                  className="pl-10 transition-smooth"
                  aria-label={t('auth.email')}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="sr-only">
                {t('auth.password')}
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder={t('auth.password')}
                  className="pl-10 transition-smooth"
                  aria-label={t('auth.password')}
                />
              </div>
            </div>

            {/* Captcha Section */}
            <div className="space-y-3">
              <Label htmlFor="captcha">{t('auth.captcha')}</Label>
              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-muted p-3 rounded-md border text-center font-mono text-lg tracking-widest select-none">
                  {captcha}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={generateCaptcha}
                  aria-label="Refresh captcha"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              <Input
                id="captcha"
                type="text"
                placeholder={t('auth.enterCaptcha')}
                value={captchaInput}
                onChange={(e) => validateCaptcha(e.target.value)}
                className={`transition-smooth ${captchaValid ? 'border-green-500' : captchaInput ? 'border-red-500' : ''}`}
                aria-label={t('auth.enterCaptcha')}
              />
            </div>

            <Button 
              onClick={handleLogin}
              className="w-full btn-primary"
              size="lg"
              disabled={!captchaValid}
              aria-label={t('auth.login')}
            >
              {t('auth.login')}
            </Button>
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('/register')}
              className="text-sm text-primary hover:text-primary-dark transition-smooth"
              aria-label={t('auth.dontHaveAccount')}
            >
              {t('auth.dontHaveAccount')}
            </button>
          </div>

          {/* Voice Instructions */}
          <div className="text-center pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">
              Voice commands: "Login", "Register", "Help"
            </p>
            <VoiceButton 
              variant="mini"
              onCommand={handleVoiceCommand}
              className="mx-auto"
            />
          </div>
        </CardContent>
      </Card>

      {/* ChatBot */}
      <ChatBot isLoggedIn={false} />
    </div>
  );
};

export default LoginPage;