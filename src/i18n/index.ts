import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Common
      'common.welcome': 'Welcome to Gullak',
      'common.loading': 'Loading...',
      'common.save': 'Save',
      'common.cancel': 'Cancel',
      'common.continue': 'Continue',
      'common.back': 'Back',
      'common.next': 'Next',
      'common.submit': 'Submit',
      'common.close': 'Close',
      
      // Navigation
      'nav.dashboard': 'Dashboard',
      'nav.goals': 'Goals',
      'nav.payments': 'Payments',
      'nav.rewards': 'Rewards',
      'nav.settings': 'Settings',
      'nav.logout': 'Logout',
      
      // Authentication
      'auth.login': 'Login',
      'auth.register': 'Register',
      'auth.loginWithGoogle': 'Login with Google',
      'auth.email': 'Email',
      'auth.password': 'Password',
      'auth.confirmPassword': 'Confirm Password',
      'auth.name': 'Full Name',
      'auth.upiId': 'UPI ID (Optional)',
      'auth.welcomeBack': 'Welcome back!',
      'auth.createAccount': 'Create your account',
      'auth.alreadyHaveAccount': 'Already have an account? Login',
      'auth.dontHaveAccount': "Don't have an account? Register",
      
      // Dashboard
      'dashboard.totalSavings': 'Total Savings',
      'dashboard.thisWeek': 'This Week',
      'dashboard.thisMonth': 'This Month',
      'dashboard.thisYear': 'This Year',
      'dashboard.activeGoals': 'Active Goals',
      'dashboard.rewardPoints': 'Reward Points',
      'dashboard.savingStreak': 'Saving Streak',
      'dashboard.quickActions': 'Quick Actions',
      'dashboard.addMoney': 'Add Money',
      'dashboard.setGoal': 'Set Goal',
      'dashboard.viewRewards': 'View Rewards',
      
      // Goals
      'goals.createGoal': 'Create Savings Goal',
      'goals.goalName': 'Goal Name',
      'goals.targetAmount': 'Target Amount',
      'goals.deadline': 'Deadline',
      'goals.category': 'Category',
      'goals.description': 'Description',
      'goals.progress': 'Progress',
      'goals.daysLeft': 'days left',
      'goals.categories.emergency': 'Emergency Fund',
      'goals.categories.vacation': 'Vacation',
      'goals.categories.gadget': 'Gadget',
      'goals.categories.education': 'Education',
      'goals.categories.other': 'Other',
      
      // Payments
      'payments.addMoney': 'Add Money',
      'payments.selectMethod': 'Select Payment Method',
      'payments.upi': 'UPI',
      'payments.bankTransfer': 'Bank Transfer',
      'payments.card': 'Credit/Debit Card',
      'payments.amount': 'Amount',
      'payments.enterAmount': 'Enter amount to add',
      
      // Voice
      'voice.listening': 'Listening...',
      'voice.processing': 'Processing...',
      'voice.tapToSpeak': 'Tap to speak',
      'voice.sayCommand': 'Say a command',
      'voice.commands.addMoney': 'Add money',
      'voice.commands.createGoal': 'Create goal',
      'voice.commands.checkBalance': 'Check balance',
      'voice.commands.showRewards': 'Show rewards',
      'voice.commands.openSettings': 'Open settings',
      
      // Audio guides
      'audio.welcomeMessage': 'Welcome to Gullak, your voice-enabled savings companion. You can navigate using voice commands or touch. Say "help" to learn voice commands.',
      'audio.loginGuide': 'This is the login screen. You can sign in with Google or create a new account.',
      'audio.dashboardGuide': 'This is your savings dashboard. Here you can see your total savings, active goals, and reward points.',
      'audio.goalGuide': 'This is the goals section where you can create and manage your savings goals.',
      'audio.paymentGuide': 'This is the payment section where you can add money to your savings.',
      'audio.settingsGuide': 'This is the settings section where you can manage your preferences and voice commands.',
    }
  },
  es: {
    translation: {
      'common.welcome': 'Bienvenido a Gullak',
      'common.loading': 'Cargando...',
      'common.save': 'Guardar',
      'common.cancel': 'Cancelar',
      'common.continue': 'Continuar',
      'common.back': 'Atrás',
      'common.next': 'Siguiente',
      'common.submit': 'Enviar',
      'common.close': 'Cerrar',
      
      'nav.dashboard': 'Panel',
      'nav.goals': 'Objetivos',
      'nav.payments': 'Pagos',
      'nav.rewards': 'Recompensas',
      'nav.settings': 'Configuración',
      'nav.logout': 'Cerrar sesión',
      
      'auth.login': 'Iniciar sesión',
      'auth.register': 'Registrarse',
      'auth.loginWithGoogle': 'Iniciar sesión con Google',
      'auth.email': 'Correo electrónico',
      'auth.password': 'Contraseña',
      'auth.confirmPassword': 'Confirmar contraseña',
      'auth.name': 'Nombre completo',
      'auth.upiId': 'ID UPI (Opcional)',
      'auth.welcomeBack': '¡Bienvenido de nuevo!',
      'auth.createAccount': 'Crea tu cuenta',
      'auth.alreadyHaveAccount': '¿Ya tienes cuenta? Inicia sesión',
      'auth.dontHaveAccount': '¿No tienes cuenta? Regístrate',
      
      'dashboard.totalSavings': 'Ahorros Totales',
      'dashboard.thisWeek': 'Esta Semana',
      'dashboard.thisMonth': 'Este Mes',
      'dashboard.thisYear': 'Este Año',
      'dashboard.activeGoals': 'Objetivos Activos',
      'dashboard.rewardPoints': 'Puntos de Recompensa',
      'dashboard.savingStreak': 'Racha de Ahorro',
      'dashboard.quickActions': 'Acciones Rápidas',
      'dashboard.addMoney': 'Agregar Dinero',
      'dashboard.setGoal': 'Establecer Objetivo',
      'dashboard.viewRewards': 'Ver Recompensas',
      
      'voice.listening': 'Escuchando...',
      'voice.processing': 'Procesando...',
      'voice.tapToSpeak': 'Toca para hablar',
      'voice.sayCommand': 'Di un comando',
      
      'audio.welcomeMessage': 'Bienvenido a Gullak, tu compañero de ahorros habilitado por voz. Puedes navegar usando comandos de voz o toque. Di "ayuda" para aprender comandos de voz.',
      'audio.loginGuide': 'Esta es la pantalla de inicio de sesión. Puedes iniciar sesión con Google o crear una nueva cuenta.',
      'audio.dashboardGuide': 'Este es tu panel de ahorros. Aquí puedes ver tus ahorros totales, objetivos activos y puntos de recompensa.',
    }
  },
  de: {
    translation: {
      'common.welcome': 'Willkommen bei Gullak',
      'common.loading': 'Laden...',
      'common.save': 'Speichern',
      'common.cancel': 'Abbrechen',
      'common.continue': 'Weiter',
      'common.back': 'Zurück',
      'common.next': 'Weiter',
      'common.submit': 'Senden',
      'common.close': 'Schließen',
      
      'auth.login': 'Anmelden',
      'auth.register': 'Registrieren',
      'auth.loginWithGoogle': 'Mit Google anmelden',
      'auth.welcomeBack': 'Willkommen zurück!',
      'auth.createAccount': 'Konto erstellen',
      
      'dashboard.totalSavings': 'Gesamtersparnisse',
      'dashboard.thisWeek': 'Diese Woche',
      'dashboard.thisMonth': 'Diesen Monat',
      'dashboard.thisYear': 'Dieses Jahr',
      
      'voice.listening': 'Höre zu...',
      'voice.processing': 'Verarbeitung...',
      'voice.tapToSpeak': 'Zum Sprechen tippen',
      
      'audio.welcomeMessage': 'Willkommen bei Gullak, Ihrem sprachgesteuerten Spar-Begleiter. Sie können mit Sprachbefehlen oder Berührung navigieren. Sagen Sie "Hilfe" für Sprachbefehle.',
    }
  },
  mr: {
    translation: {
      'common.welcome': 'गुल्लकमध्ये आपले स्वागत',
      'common.loading': 'लोड होत आहे...',
      'common.save': 'सेव्ह करा',
      'common.cancel': 'रद्द करा',
      'common.continue': 'पुढे चला',
      'common.back': 'मागे',
      'common.next': 'पुढील',
      'common.submit': 'सबमिट करा',
      'common.close': 'बंद करा',
      
      'auth.login': 'लॉगिन',
      'auth.register': 'नोंदणी करा',
      'auth.loginWithGoogle': 'Google सह लॉगिन करा',
      'auth.welcomeBack': 'परत आपले स्वागत!',
      'auth.createAccount': 'आपले खाते तयार करा',
      
      'dashboard.totalSavings': 'एकूण बचत',
      'dashboard.thisWeek': 'या आठवड्यात',
      'dashboard.thisMonth': 'या महिन्यात',
      'dashboard.thisYear': 'या वर्षी',
      
      'voice.listening': 'ऐकत आहे...',
      'voice.processing': 'प्रक्रिया करत आहे...',
      'voice.tapToSpeak': 'बोलण्यासाठी टॅप करा',
      
      'audio.welcomeMessage': 'गुल्लकमध्ये आपले स्वागत, आपला आवाज-सक्षम बचत साथीदार. आपण आवाज आदेश किंवा स्पर्शाचा वापर करून नेव्हिगेट करू शकता.',
    }
  },
  hi: {
    translation: {
      'common.welcome': 'गुल्लक में आपका स्वागत है',
      'common.loading': 'लोड हो रहा है...',
      'common.save': 'सेव करें',
      'common.cancel': 'रद्द करें',
      'common.continue': 'जारी रखें',
      'common.back': 'वापस',
      'common.next': 'अगला',
      'common.submit': 'सबमिट करें',
      'common.close': 'बंद करें',
      
      'auth.login': 'लॉगिन',
      'auth.register': 'रजिस्टर करें',
      'auth.loginWithGoogle': 'Google से लॉगिन करें',
      'auth.welcomeBack': 'वापस आपका स्वागत है!',
      'auth.createAccount': 'अपना खाता बनाएं',
      
      'dashboard.totalSavings': 'कुल बचत',
      'dashboard.thisWeek': 'इस सप्ताह',
      'dashboard.thisMonth': 'इस महीने',
      'dashboard.thisYear': 'इस साल',
      
      'voice.listening': 'सुन रहा है...',
      'voice.processing': 'प्रोसेसिंग...',
      'voice.tapToSpeak': 'बोलने के लिए टैप करें',
      
      'audio.welcomeMessage': 'गुल्लक में आपका स्वागत है, आपका आवाज-सक्षम बचत साथी। आप आवाज कमांड या स्पर्श का उपयोग करके नेविगेट कर सकते हैं।',
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  });

export default i18n;