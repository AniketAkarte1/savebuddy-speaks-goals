import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  PiggyBank, 
  Target, 
  TrendingUp, 
  Gift, 
  Plus, 
  Settings, 
  LogOut,
  Calendar,
  Star,
  Wallet
} from 'lucide-react';
import VoiceButton from '@/components/VoiceButton';
import LanguageSelector from '@/components/LanguageSelector';
import { useVoiceInteraction } from '@/hooks/useVoiceInteraction';

interface SavingsGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
  category: string;
}

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { speak } = useVoiceInteraction();

  const [savingsData] = useState({
    totalSavings: 15750,
    weeklyGrowth: 8.5,
    monthlyGrowth: 12.3,
    yearlyGrowth: 34.7,
    rewardPoints: 2340,
    savingStreak: 23
  });

  const [goals] = useState<SavingsGoal[]>([
    {
      id: '1',
      name: 'Emergency Fund',
      target: 50000,
      current: 15750,
      deadline: '2024-12-31',
      category: 'emergency'
    },
    {
      id: '2',
      name: 'Vacation to Goa',
      target: 25000,
      current: 8500,
      deadline: '2024-10-15',
      category: 'vacation'
    },
    {
      id: '3',
      name: 'New Laptop',
      target: 75000,
      current: 22000,
      deadline: '2024-11-30',
      category: 'gadget'
    }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      speak(t('audio.dashboardGuide'));
    }, 1000);
    return () => clearTimeout(timer);
  }, [speak, t]);

  const handleVoiceCommand = (command: string, transcript: string) => {
    switch (command) {
      case 'ADD_MONEY':
        navigate('/payment');
        break;
      case 'CREATE_GOAL':
        speak('Goal creation feature coming soon!');
        break;
      case 'CHECK_BALANCE':
        speak(`Your total savings is ₹${savingsData.totalSavings.toLocaleString()}`);
        break;
      case 'SHOW_REWARDS':
        speak(`You have ${savingsData.rewardPoints} reward points!`);
        break;
      case 'OPEN_SETTINGS':
        navigate('/settings');
        break;
      case 'LOGOUT':
        handleLogout();
        break;
      case 'SHOW_HELP':
        speak('You can say: Add money, Create goal, Check balance, Show rewards, or Open settings');
        break;
      default:
        speak(`Sorry, I didn't understand: ${transcript}`);
    }
  };

  const handleLogout = () => {
    speak('Signing you out...');
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  const getDaysLeft = (deadline: string) => {
    const today = new Date();
    const endDate = new Date(deadline);
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary shadow-soft">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <PiggyBank className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Gullak</h1>
                <p className="text-primary-foreground/80 text-sm">Welcome back!</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <LanguageSelector variant="icon" className="bg-white/10 border-white/20 text-white hover:bg-white/20" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/settings')}
                className="text-white hover:bg-white/10"
                aria-label={t('nav.settings')}
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-white hover:bg-white/10"
                aria-label={t('nav.logout')}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Savings */}
          <Card className="savings-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {t('dashboard.totalSavings')}
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    {formatCurrency(savingsData.totalSavings)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Wallet className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Growth */}
          <Card className="savings-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {t('dashboard.thisWeek')}
                  </p>
                  <p className="text-2xl font-bold text-success">
                    +{savingsData.weeklyGrowth}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-success rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-success-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reward Points */}
          <Card className="savings-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {t('dashboard.rewardPoints')}
                  </p>
                  <p className="text-2xl font-bold text-secondary">
                    {savingsData.rewardPoints.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center">
                  <Gift className="h-6 w-6 text-secondary-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Saving Streak */}
          <Card className="savings-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {t('dashboard.savingStreak')}
                  </p>
                  <p className="text-2xl font-bold text-warning">
                    {savingsData.savingStreak} days
                  </p>
                </div>
                <div className="w-12 h-12 bg-warning rounded-full flex items-center justify-center">
                  <Star className="h-6 w-6 text-warning-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t('dashboard.quickActions')}</CardTitle>
            <CardDescription>
              Manage your savings and goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                onClick={() => navigate('/payment')}
                className="btn-primary h-auto py-4 flex-col space-y-2"
                aria-label={t('dashboard.addMoney')}
              >
                <Plus className="h-6 w-6" />
                <span>{t('dashboard.addMoney')}</span>
              </Button>
              
              <Button 
                onClick={() => speak('Goal creation feature coming soon!')}
                variant="outline"
                className="h-auto py-4 flex-col space-y-2 hover:bg-accent"
                aria-label={t('dashboard.setGoal')}
              >
                <Target className="h-6 w-6" />
                <span>{t('dashboard.setGoal')}</span>
              </Button>
              
              <Button 
                onClick={() => speak(`You have ${savingsData.rewardPoints} reward points!`)}
                variant="outline"
                className="h-auto py-4 flex-col space-y-2 hover:bg-accent"
                aria-label={t('dashboard.viewRewards')}
              >
                <Gift className="h-6 w-6" />
                <span>{t('dashboard.viewRewards')}</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Active Goals */}
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.activeGoals')}</CardTitle>
            <CardDescription>
              Track your progress towards your savings goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {goals.map((goal) => {
                const progress = (goal.current / goal.target) * 100;
                const daysLeft = getDaysLeft(goal.deadline);
                
                return (
                  <div key={goal.id} className="goal-card">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{goal.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(goal.current)} of {formatCurrency(goal.target)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{daysLeft} {t('goals.daysLeft')}</span>
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{t('goals.progress')}</span>
                        <span>{progress.toFixed(1)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Voice Button */}
      <VoiceButton 
        variant="floating"
        onCommand={handleVoiceCommand}
      />

      {/* Voice Instructions Overlay */}
      <div className="fixed bottom-20 right-6 max-w-xs">
        <Card className="bg-primary text-primary-foreground shadow-large">
          <CardContent className="p-3">
            <p className="text-xs">
              💬 Say: "Add money", "Check balance", "Show rewards", "Settings"
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;