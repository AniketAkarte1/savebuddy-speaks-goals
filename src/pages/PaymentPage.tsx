import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Smartphone, 
  Building2, 
  CreditCard, 
  Check,
  Wallet,
  IndianRupee,
  Plus
} from 'lucide-react';
import VoiceButton from '@/components/VoiceButton';
import LanguageSelector from '@/components/LanguageSelector';
import ChatBot from '@/components/ChatBot';
import { useVoiceInteraction } from '@/hooks/useVoiceInteraction';

type PaymentMethod = 'upi' | 'bank' | 'card';

interface PaymentDetails {
  upiId?: string;
  bankAccount?: string;
  ifscCode?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
}

const PaymentPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { speak } = useVoiceInteraction();

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({});
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      speak(t('audio.paymentGuide'));
    }, 1000);
    return () => clearTimeout(timer);
  }, [speak, t]);

  const handleVoiceCommand = (command: string, transcript: string) => {
    // Check for amount in voice command
    const amountMatch = transcript.match(/(\d+)/);
    if (amountMatch && command === 'ADD_MONEY') {
      setAmount(amountMatch[1]);
      speak(`Amount set to ${amountMatch[1]} rupees. Please select a payment method.`);
      return;
    }

    switch (command) {
      case 'ADD_MONEY':
        if (selectedMethod && amount) {
          handleAddMoney();
        } else {
          speak('Please enter amount and select payment method first.');
        }
        break;
      case 'UPI':
        setSelectedMethod('upi');
        speak('UPI payment method selected. Please enter your UPI ID.');
        break;
      case 'BANK_TRANSFER':
        setSelectedMethod('bank');
        speak('Bank transfer selected. Please enter your bank details.');
        break;
      case 'CARD':
        setSelectedMethod('card');
        speak('Card payment selected. Please enter your card details.');
        break;
      case 'GO_BACK':
      case 'GO_DASHBOARD':
        navigate('/dashboard');
        break;
      case 'SHOW_HELP':
        speak('Enter amount, select UPI, Bank transfer, or Card payment, then say "add money" to proceed.');
        break;
      default:
        speak(`Sorry, I didn't understand: ${transcript}`);
    }
  };

  const handleAddMoney = async () => {
    if (!amount || !selectedMethod) {
      speak('Please enter amount and select payment method.');
      return;
    }

    setIsProcessing(true);
    speak(`Processing payment of ₹${amount}...`);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      speak(`Successfully added ₹${amount} to your savings!`);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }, 3000);
  };

  const paymentMethods = [
    {
      id: 'upi' as PaymentMethod,
      name: 'UPI',
      description: 'Pay using UPI ID',
      icon: Smartphone,
      popular: true
    },
    {
      id: 'bank' as PaymentMethod,
      name: 'Bank Transfer',
      description: 'Direct bank transfer',
      icon: Building2,
      popular: false
    },
    {
      id: 'card' as PaymentMethod,
      name: 'Credit/Debit Card',
      description: 'Pay with card',
      icon: CreditCard,
      popular: false
    }
  ];

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case 'upi':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="upiId">UPI ID</Label>
              <Input
                id="upiId"
                type="text"
                placeholder="your-name@upi"
                value={paymentDetails.upiId || ''}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, upiId: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>
        );

      case 'bank':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="bankAccount">Bank Account Number</Label>
              <Input
                id="bankAccount"
                type="text"
                placeholder="Account number"
                value={paymentDetails.bankAccount || ''}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, bankAccount: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="ifscCode">IFSC Code</Label>
              <Input
                id="ifscCode"
                type="text"
                placeholder="IFSC Code"
                value={paymentDetails.ifscCode || ''}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, ifscCode: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>
        );

      case 'card':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                type="text"
                placeholder="1234 5678 9012 3456"
                value={paymentDetails.cardNumber || ''}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  type="text"
                  placeholder="MM/YY"
                  value={paymentDetails.expiryDate || ''}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  type="text"
                  placeholder="123"
                  value={paymentDetails.cvv || ''}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary shadow-soft">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t('common.back')}
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-white">{t('payments.addMoney')}</h1>
                <p className="text-primary-foreground/80 text-sm">Add money to your savings</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <LanguageSelector variant="icon" className="bg-white/10 border-white/20 text-white hover:bg-white/20" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Amount Input */}
          <Card className="savings-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <IndianRupee className="h-5 w-5" />
                <span>{t('payments.amount')}</span>
              </CardTitle>
              <CardDescription>
                {t('payments.enterAmount')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="amount" className="sr-only">Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-lg text-muted-foreground">₹</span>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-8 text-lg h-12 transition-smooth"
                      min="1"
                      step="1"
                    />
                  </div>
                </div>

                {/* Quick Amount Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  {[500, 1000, 2000, 5000, 10000, 15000].map((quickAmount) => (
                    <Button
                      key={quickAmount}
                      variant="outline"
                      size="sm"
                      onClick={() => setAmount(quickAmount.toString())}
                      className="transition-smooth hover:bg-accent"
                    >
                      ₹{quickAmount.toLocaleString()}
                    </Button>
                  ))}
                </div>

                {amount && (
                  <div className="bg-accent rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Wallet className="h-4 w-4 text-accent-foreground" />
                      <span className="text-sm font-medium">
                        Amount to add: ₹{parseInt(amount).toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card className="savings-card">
            <CardHeader>
              <CardTitle>{t('payments.selectMethod')}</CardTitle>
              <CardDescription>
                Choose your preferred payment method
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  const isSelected = selectedMethod === method.id;
                  
                  return (
                    <Button
                      key={method.id}
                      variant={isSelected ? "default" : "outline"}
                      className={`w-full h-auto p-4 justify-start transition-smooth ${
                        isSelected ? 'btn-primary' : 'hover:bg-accent'
                      }`}
                      onClick={() => setSelectedMethod(method.id)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-3">
                          <Icon className="h-5 w-5" />
                          <div className="text-left">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{method.name}</span>
                              {method.popular && (
                                <Badge variant="secondary" className="text-xs">
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {method.description}
                            </p>
                          </div>
                        </div>
                        {isSelected && (
                          <Check className="h-5 w-5" />
                        )}
                      </div>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Details Form */}
        {selectedMethod && (
          <Card className="mt-8 savings-card">
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>
                Enter your {paymentMethods.find(m => m.id === selectedMethod)?.name} details
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderPaymentForm()}
              
              <Separator className="my-6" />
              
              <Button
                onClick={handleAddMoney}
                disabled={!amount || isProcessing}
                className="w-full btn-primary"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Add ₹{amount ? parseInt(amount).toLocaleString() : '0'}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Voice Button */}
      <VoiceButton 
        variant="floating"
        onCommand={handleVoiceCommand}
      />

      {/* Voice Instructions */}
      <div className="fixed bottom-20 right-6 max-w-xs">
        <Card className="bg-primary text-primary-foreground shadow-large">
          <CardContent className="p-3">
            <p className="text-xs">
              💬 Say: "Add 1000", "UPI", "Bank transfer", "Card"
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ChatBot */}
      <ChatBot 
        isLoggedIn={true} 
        userAccountData={{
          savings: 15000,
          goals: [],
          totalSaved: 45000
        }}
      />
    </div>
  );
};

export default PaymentPage;