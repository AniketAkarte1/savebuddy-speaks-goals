import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Send, X, Bot, Mic, MicOff, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useVoiceInteraction } from '@/hooks/useVoiceInteraction';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatBotProps {
  isLoggedIn?: boolean;
  userAccountData?: {
    savings: number;
    goals: any[];
    totalSaved: number;
  };
}

const ChatBot: React.FC<ChatBotProps> = ({ isLoggedIn = false, userAccountData }) => {
  const { t, i18n } = useTranslation();
  const { speak, voiceState, startListening, stopListening } = useVoiceInteraction();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initial greeting message when chat opens
    if (isOpen && messages.length === 0) {
      const greeting = isLoggedIn 
        ? t('chatbot.loggedInGreeting')
        : t('chatbot.welcomeGreeting');
      
      addBotMessage(greeting);
      speak(greeting);
    }
  }, [isOpen, isLoggedIn, messages.length, t, speak]);

  // Handle voice recognition results
  useEffect(() => {
    if (voiceState.transcript && !voiceState.isListening && isListening) {
      setInputMessage(voiceState.transcript);
      setIsListening(false);
      // Auto-send the voice message
      setTimeout(() => {
        handleSendMessage(voiceState.transcript);
      }, 500);
    }
  }, [voiceState.transcript, voiceState.isListening, isListening]);

  const addBotMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (isLoggedIn) {
      // Personalized banking and investment guidance
      if (message.includes('investment') || message.includes('invest') || 
          message.includes('निवेश') || message.includes('गुंतवणूक') ||
          message.includes('inversión') || message.includes('investition')) {
        return t('chatbot.investmentAdvice', { 
          savings: userAccountData?.savings || 0 
        });
      }
      
      if (message.includes('goal') || message.includes('target') ||
          message.includes('लक्ष्य') || message.includes('ध्येय') ||
          message.includes('objetivo') || message.includes('ziel')) {
        const goalsCount = userAccountData?.goals?.length || 0;
        return t('chatbot.goalAdvice', { count: goalsCount });
      }
      
      if (message.includes('savings') || message.includes('save') ||
          message.includes('बचत') || message.includes('बचत') ||
          message.includes('ahorros') || message.includes('sparen')) {
        return t('chatbot.savingsAdvice', { 
          total: userAccountData?.totalSaved || 0 
        });
      }
      
      if (message.includes('budget') || message.includes('expense') ||
          message.includes('बजट') || message.includes('खर्च') ||
          message.includes('presupuesto') || message.includes('ausgaben')) {
        return t('chatbot.budgetAdvice');
      }
      
      if (message.includes('emergency') || message.includes('fund') ||
          message.includes('आपातकाल') || message.includes('आपत्कालीन') ||
          message.includes('emergencia') || message.includes('notfall')) {
        return t('chatbot.emergencyFundAdvice');
      }
      
      if (message.includes('risk') || message.includes('portfolio') ||
          message.includes('जोखीम') || message.includes('पोर्टफोलिओ') ||
          message.includes('riesgo') || message.includes('risiko')) {
        return t('chatbot.riskAdvice');
      }
      
      return t('chatbot.personalizedResponse');
    } else {
      // General banking guidance for login/registration pages
      if (message.includes('account') || message.includes('register') ||
          message.includes('खाते') || message.includes('नोंदणी') ||
          message.includes('cuenta') || message.includes('konto')) {
        return t('chatbot.accountHelp');
      }
      
      if (message.includes('login') || message.includes('sign in') ||
          message.includes('लॉगिन') || message.includes('प्रवेश') ||
          message.includes('iniciar') || message.includes('anmelden')) {
        return t('chatbot.loginHelp');
      }
      
      if (message.includes('savings') || message.includes('save') ||
          message.includes('बचत') || message.includes('बचत') ||
          message.includes('ahorros') || message.includes('sparen')) {
        return t('chatbot.savingsInfo');
      }
      
      if (message.includes('security') || message.includes('safe') ||
          message.includes('सुरक्षा') || message.includes('सुरक्षित') ||
          message.includes('seguridad') || message.includes('sicherheit')) {
        return t('chatbot.securityInfo');
      }
      
      if (message.includes('fee') || message.includes('charge') ||
          message.includes('शुल्क') || message.includes('फी') ||
          message.includes('tarifa') || message.includes('gebühr')) {
        return t('chatbot.feeInfo');
      }
      
      if (message.includes('help') || message.includes('support') ||
          message.includes('मदत') || message.includes('सहायता') ||
          message.includes('ayuda') || message.includes('hilfe')) {
        return t('chatbot.helpInfo');
      }
      
      return t('chatbot.generalResponse');
    }
  };

  const handleSendMessage = (messageText?: string) => {
    const textToSend = messageText || inputMessage;
    if (!textToSend.trim()) return;

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);

    addUserMessage(textToSend);
    
    // Simulate bot thinking time
    setTimeout(() => {
      const response = getBotResponse(textToSend);
      addBotMessage(response);
      speak(response);
    }, 1000);

    setInputMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
      setIsListening(false);
    } else {
      startListening();
      setIsListening(true);
    }
  };

  return (
    <>
      {/* Chat Toggle Button - Fixed positioning */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 rounded-full w-16 h-16 shadow-large",
          "bg-gradient-primary hover:shadow-glow transition-all duration-300",
          isOpen && "scale-95"
        )}
        aria-label={t('chatbot.toggleChat')}
        style={{ zIndex: 9999 }}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <div className="relative">
            <img 
              src="/src/assets/gullak_logo.png" 
              alt="Gullak Assistant" 
              className={cn(
                "h-8 w-8 object-contain transition-transform duration-2000",
                isAnimating ? "animate-spin" : "animate-pulse"
              )}
            />
            <div className="absolute inset-0 border-2 border-accent/30 rounded-full animate-spin" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
          </div>
        )}
      </Button>

      {/* Chat Window - Fixed positioning */}
      {isOpen && (
        <Card className={cn(
          "fixed bottom-24 right-6 z-40 w-80 h-96",
          "shadow-large border-0 bg-card/95 backdrop-blur-sm",
          "animate-scale-in"
        )}
        style={{ zIndex: 9998 }}
        >
          <CardHeader className="pb-3 border-b border-border">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="relative">
                <img 
                  src="/src/assets/gullak_logo.png" 
                  alt="Gullak" 
                  className={cn(
                    "h-8 w-8 object-contain transition-transform duration-1000",
                    isAnimating ? "animate-spin" : "animate-pulse"
                  )}
                />
              </div>
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                {t('chatbot.assistantName')}
              </span>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0 flex flex-col h-full">
            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-2",
                      message.isBot ? "justify-start" : "justify-end"
                    )}
                  >
                    {message.isBot && (
                      <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                        <img 
                          src="/src/assets/gullak_logo.png" 
                          alt="Bot" 
                          className="h-5 w-5 object-contain"
                        />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[70%] p-3 rounded-lg text-sm",
                        message.isBot
                          ? "bg-muted text-muted-foreground"
                          : "bg-primary text-primary-foreground"
                      )}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
              <div ref={messagesEndRef} />
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t('chatbot.typePlaceholder')}
                  className="flex-1 transition-smooth"
                />
                <Button
                  onClick={handleVoiceToggle}
                  size="icon"
                  variant={isListening ? "default" : "outline"}
                  className={cn(
                    "transition-smooth",
                    isListening && "bg-red-500 hover:bg-red-600"
                  )}
                  disabled={!voiceState.isSupported}
                >
                  {isListening ? (
                    <MicOff className="h-4 w-4" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  onClick={() => handleSendMessage()}
                  size="icon"
                  className="bg-gradient-primary hover:shadow-soft"
                  disabled={!inputMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              {isListening && (
                <div className="mt-2 text-xs text-center text-muted-foreground">
                  {t('voice.listening')}...
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ChatBot;