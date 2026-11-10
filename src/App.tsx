import { useTranslation } from 'react-i18next';
import './i18n';
import { useState, useEffect, useRef } from 'react';
import {
  Power,
  Crosshair,
  Mic,
  MousePointerClick,
  Keyboard,
  Activity,
  Zap,
  Shield,
  Cpu,
  Target,
  Scan,
  Volume2,
  Gamepad2,
  Menu,
  X,
  Sparkles,
  Crown,
  Terminal,
  Lock,
  User,
  CreditCard,
  DollarSign,
  TrendingUp,
  Users,
  LogOut,
  EyeOff,
  Fingerprint,
  Key,
  Wallet,
  Gift,
  BarChart3,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import './App.css';

// ============== TYPES ==============
interface FeatureState {
  enabled: boolean;
  intensity: number;
  sensitivity: number;
}

interface SystemStatus {
  cpu: number;
  memory: number;
  fps: number;
  latency: number;
}

interface UserData {
  id: string;
  username: string;
  subscription: 'free' | 'basic' | 'premium' | 'elite';
  expiryDate: string;
}

interface DeveloperStats {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  donations: number;
  subscriptions: {
    basic: number;
    premium: number;
    elite: number;
  };
  monthlyRevenue: number[];
}

// ============== CONSTANTS ==============
const DEVELOPER_CREDENTIALS = {
  snapchat: "AFTH966",
  Support: "+965 67657617",
  name: "عبدالله العنزي",
  title: "Elite Developer",
  username: "admin",
  password: "123"
};

const SUBSCRIPTION_PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    price: 29.99,
    duration: 'شهر',
    features: ['Aim Assist', 'Screen Analysis', 'Voice Assistant'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 79.99,
    duration: '3 أشهر',
    features: ['كل مميزات Basic', 'Auto Actions', 'Stealth Mode', 'Priority Support'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 199.99,
    duration: 'سنة',
    features: ['كل المميزات', 'Anti-Ban Protection', 'Custom Scripts', 'Lifetime Updates'],
    color: 'from-yellow-400 to-orange-500'
  }
];

const BANK_ACCOUNTS = [
  {
    bank: 'بنك الراجحي',
    accountName: 'عبدالله العنزي',
    accountNumber: 'SA6680000026608010167519',
    iban: 'SA66 8000 0026 6080 1016 7519'
  }
];

// ============== MAIN APP ==============
function App() {
  const { t } = useTranslation();
  // ========== AUTH STATE ==========
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDeveloper, setIsDeveloper] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  // ========== APP STATE ==========
  const [isActive, setIsActive] = useState(false);
  const [selectedGame, setSelectedGame] = useState('FPS Games');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stealthMode, setStealthMode] = useState(true);
  const [antiDetection, setAntiDetection] = useState(true);
  const [hwidLocked, setHwidLocked] = useState(true);

  // ========== FEATURE STATES ==========
  const [aimAssist, setAimAssist] = useState<FeatureState>({
    enabled: false,
    intensity: 75,
    sensitivity: 50
  });

  const [screenAnalysis, setScreenAnalysis] = useState<FeatureState>({
    enabled: false,
    intensity: 80,
    sensitivity: 60
  });

  const [voiceAssistant, setVoiceAssistant] = useState<FeatureState>({
    enabled: false,
    intensity: 70,
    sensitivity: 40
  });

  const [automation, setAutomation] = useState<FeatureState>({
    enabled: false,
    intensity: 60,
    sensitivity: 50
  });

  // ========== HOTKEYS ==========
  const [hotkeys] = useState({
    toggle: 'F1',
    aimLock: 'F2',
    screenScan: 'F3',
    voiceCmd: 'F4',
    panicKey: 'DELETE'
  });

  // ========== SYSTEM STATUS ==========
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    cpu: 15,
    memory: 32,
    fps: 144,
    latency: 12
  });

  // ========== ACTIVITY LOG ==========
  const [activityLog, setActivityLog] = useState<string[]>([
    '🔐 System initialized with encryption',
    '🛡️ Anti-detection modules loaded',
    '⏳ Waiting for authentication...'
  ]);

  // ========== DEVELOPER STATS ==========
  const [devStats] = useState<DeveloperStats>({
    totalUsers: 1247,
    activeUsers: 892,
    totalRevenue: 45680.50,
    donations: 3250.00,
    subscriptions: {
      basic: 456,
      premium: 312,
      elite: 124
    },
    monthlyRevenue: [3200, 4100, 3800, 5200, 4800, 6100, 5500, 7200, 6800, 8100, 7600, 8900]
  });

  // ========== SUBSCRIPTION DIALOG ==========
  const [showSubscription, setShowSubscription] = useState(false);
  const [showDeveloperPanel, setShowDeveloperPanel] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<typeof SUBSCRIPTION_PLANS[0] | null>(null);

  const logEndRef = useRef<HTMLDivElement>(null);

  // ========== EFFECTS ==========
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activityLog]);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        cpu: Math.max(5, Math.min(95, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(10, Math.min(90, prev.memory + (Math.random() - 0.5) * 5)),
        fps: Math.max(60, Math.min(240, prev.fps + Math.floor((Math.random() - 0.5) * 10))),
        latency: Math.max(5, Math.min(50, prev.latency + Math.floor((Math.random() - 0.5) * 3)))
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, [isActive]);

  // ========== HELPERS ==========
  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setActivityLog(prev => [...prev.slice(-20), `[${timestamp}] ${message}`]);
  };

  const encryptLog = (message: string) => {
    return `🔒 ${message}`;
  };

  // ========== AUTH HANDLERS ==========
  const handleLogin = () => {
    if (loginForm.username === DEVELOPER_CREDENTIALS.username &&
        loginForm.password === DEVELOPER_CREDENTIALS.password) {
      setIsDeveloper(true);
      setIsAuthenticated(true);
      setShowLogin(false);
      setCurrentUser({
        id: 'DEV-001',
        username: DEVELOPER_CREDENTIALS.username,
        subscription: 'elite',
        expiryDate: 'Lifetime'
      });
      addLog('🔐 Developer authentication successful');
      addLog('👑 Developer privileges granted');
      toast.success(`Welcome back, ${DEVELOPER_CREDENTIALS.name}!`);
      return;
    }

    if (loginForm.username && loginForm.password) {
      setIsAuthenticated(true);
      setShowLogin(false);
      setCurrentUser({
        id: 'USR-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        username: loginForm.username,
        subscription: 'premium',
        expiryDate: '2025-12-31'
      });
      addLog('✅ User authentication successful');
      addLog('🔓 Access granted');
      toast.success('Welcome back!');
    } else {
      toast.error('Invalid credentials');
      addLog('❌ Authentication failed');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsDeveloper(false);
    setShowLogin(true);
    setIsActive(false);
    setCurrentUser(null);
    addLog('👋 User logged out');
    toast.info('Logged out successfully');
  };

  const toggleMain = () => {
    if (!isAuthenticated) {
      toast.error('Please login first');
      return;
    }
    const newState = !isActive;
    setIsActive(newState);
    addLog(encryptLog(newState ? 'AI Assistant ACTIVATED' : 'AI Assistant DEACTIVATED'));
    toast.success(newState ? 'Game AI Assistant Activated!' : 'Game AI Assistant Deactivated');
  };

  const toggleFeature = (feature: string, currentState: FeatureState, setState: React.Dispatch<React.SetStateAction<FeatureState>>) => {
    if (!isAuthenticated) {
      toast.error('Please login first');
      return;
    }
    const newEnabled = !currentState.enabled;
    setState({ ...currentState, enabled: newEnabled });
    addLog(encryptLog(`${feature} ${newEnabled ? 'ENABLED' : 'DISABLED'}`));
    toast.info(`${feature} ${newEnabled ? 'Enabled' : 'Disabled'}`);
  };

  const games = ['FPS Games', 'Battle Royale', 'MOBA', 'Racing', 'Strategy', 'RPG'];

  if (showLogin) {
    return (
      <TooltipProvider>
        <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center p-4">
          <div className="absolute inset-0 grid-bg opacity-50" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

          <Card className="w-full max-w-md bg-black/80 border-white/10 backdrop-blur-xl relative z-10">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center neon-glow">
                  <Lock className="w-10 h-10 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-gradient">AI-G KSA</CardTitle>
              <p className="text-gray-400 mt-2">Secure Authentication Required</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    type="text"
                    placeholder="Enter username"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                    className="pl-10 bg-white/5 border-white/10 text-white"
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">Password</label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    type="password"
                    placeholder="Enter password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    className="pl-10 bg-white/5 border-white/10 text-white"
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  />
                </div>
              </div>

              <Button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold py-6"
              >
                <Fingerprint className="w-5 h-5 mr-2" />
                Authenticate
              </Button>

              <div className="text-center">
                <button
                  onClick={() => setShowSubscription(true)}
                  className="text-sm text-cyan-400 hover:text-cyan-300 underline"
                >
                  Don't have an account? Subscribe now
                </button>
              </div>

              <div className="pt-4 border-t border-white/10 text-center">
                <p className="text-xs text-gray-500">
                  © 2026 عبدالله العنزي • Developed by {DEVELOPER_CREDENTIALS.name}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </TooltipProvider>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gradient">AI-G KSA Dashboard</h1>
          <Button onClick={handleLogout} variant="destructive">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
        <Card className="bg-black/50 border-white/10">
          <CardContent className="p-6">
            <p className="text-xl">Welcome, {currentUser?.username}!</p>
            <Button onClick={toggleMain} className="mt-4 bg-cyan-500">
              {isActive ? 'Deactivate AI' : 'Activate AI'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
