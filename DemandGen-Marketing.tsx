import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  Target, 
  Zap, 
  Trophy, 
  ShieldCheck, 
  Activity,
  ArrowUpRight,
  MonitorPlay,
  Wifi,
  WifiOff,
  RefreshCw
} from 'lucide-react';

// --- Types ---

interface MetricsState {
  growthRoi: number;
  totalLeads: number;
  conversionLift: number;
  cplReduction: number;
  confidence: number;
  deviation: number;
}

type ConnectionStatus = 'connecting' | 'connected' | 'reconnecting';

// --- Helper Components ---

const SparklineBar = ({ height, colorClass, delay }: { height: string; colorClass?: string; delay: number }) => (
  <motion.div
    initial={{ height: "0%" }}
    animate={{ height }}
    transition={{ duration: 0.5, delay }}
    className={`w-1 rounded-t-sm ${colorClass || 'bg-primary/40'}`}
  />
);

const Gauge = ({ percentage }: { percentage: number }) => {
  // Calculate dash offset based on percentage (0-100 map to approx stroke-dashoffset)
  // 100 dasharray. 30 offset is approx 70% filled visually in the design.
  // We'll approximate: 100 - percentage
  const dashOffset = 100 - percentage;
  
  return (
    <div className="relative w-10 h-10">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
        <circle className="stroke-white/5" cx="18" cy="18" fill="none" r="16" strokeWidth="3"></circle>
        <motion.circle 
          className="stroke-accent" 
          cx="18" 
          cy="18" 
          fill="none" 
          r="16" 
          strokeLinecap="round" 
          strokeWidth="3"
          strokeDasharray="100"
          initial={{ strokeDashoffset: 100 }}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[8px] font-bold">{percentage}%</span>
      </div>
    </div>
  );
};

// --- Main Component ---

export default function DemandGenMarketing() {
  const [metrics, setMetrics] = useState<MetricsState>({
    growthRoi: 300.2,
    totalLeads: 50284,
    conversionLift: 24.8,
    cplReduction: 42.0,
    confidence: 99.2,
    deviation: 0.4
  });

  const [socketStatus, setSocketStatus] = useState<ConnectionStatus>('connecting');
  const [lastPing, setLastPing] = useState<number>(0);

  // Simulate WebSocket Connection Lifecycle
  useEffect(() => {
    // Initial connection simulation
    const connectTimer = setTimeout(() => {
      setSocketStatus('connected');
    }, 2000); // 2s delay to simulate handshake

    return () => clearTimeout(connectTimer);
  }, []);

  // Simulate Data Feed
  useEffect(() => {
    if (socketStatus !== 'connected') return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const updateMetrics = () => {
      // Simulate fake latency spike occasionally
      const isLagSpike = Math.random() > 0.95;
      
      if (isLagSpike) {
        setSocketStatus('reconnecting');
        setTimeout(() => setSocketStatus('connected'), 800);
        timeoutId = setTimeout(updateMetrics, 1000);
        return;
      }

      setMetrics(prev => ({
        growthRoi: +(prev.growthRoi + (Math.random() - 0.4) * 0.8).toFixed(1), // Trend slightly upwards
        totalLeads: Math.floor(prev.totalLeads + (Math.random() * 12)), // Bursty growth
        conversionLift: +(prev.conversionLift + (Math.random() - 0.5) * 0.3).toFixed(1),
        cplReduction: +(prev.cplReduction + (Math.random() - 0.5) * 0.15).toFixed(1),
        confidence: +(Math.min(99.9, Math.max(98.0, prev.confidence + (Math.random() - 0.5) * 0.1))).toFixed(1),
        deviation: 0.4 
      }));
      
      setLastPing(Math.floor(Math.random() * 40) + 12); // Random ping 12-52ms

      // Randomize next update time for organic "socket push" feel
      // Sometimes fast bursts (200ms), sometimes slow (1500ms)
      const nextUpdate = Math.random() > 0.7 ? 200 : Math.random() * 1500 + 500;
      timeoutId = setTimeout(updateMetrics, nextUpdate);
    };

    timeoutId = setTimeout(updateMetrics, 500);

    return () => clearTimeout(timeoutId);
  }, [socketStatus]);

  // Status Indicator Logic
  const getStatusColor = () => {
    switch (socketStatus) {
      case 'connected': return 'text-[#0bda54]';
      case 'reconnecting': return 'text-amber-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusText = () => {
     switch (socketStatus) {
      case 'connected': return 'LIVE SCALING';
      case 'reconnecting': return 'RECONNECTING...';
      default: return 'INITIALIZING SOCKET';
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#0f171a] font-display text-white p-4">
      
      {/* Dashboard Container - Fixed 600x600 as per design */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "circOut" }}
        className="w-[600px] h-[600px] bg-charcoal border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col relative"
      >
        
        {/* Header */}
        <header className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Activity className="text-black w-4 h-4" strokeWidth={3} />
            </div>
            <div>
              <h1 className="text-sm font-black tracking-tight uppercase">
                Experiment Engine <span className="text-primary">v2.0</span>
              </h1>
              <p className="text-[9px] text-gray-500 font-bold -mt-0.5 tracking-wider">
                PROJECT APEX REAL-TIME
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-[8px] font-bold text-gray-500 uppercase tracking-tighter">
                Engine Status
              </span>
              <span className={`text-[10px] font-bold ${getStatusColor()} flex items-center gap-1 transition-colors duration-300`}>
                <motion.span 
                  animate={{ opacity: socketStatus === 'connected' ? [1, 0.4, 1] : 1 }}
                  transition={{ duration: socketStatus === 'connected' ? 2 : 0, repeat: Infinity }}
                  className={`h-1.5 w-1.5 rounded-full ${socketStatus === 'connected' ? 'bg-[#0bda54]' : socketStatus === 'reconnecting' ? 'bg-amber-400' : 'bg-gray-400'}`} 
                />
                {getStatusText()}
              </span>
            </div>
          </div>
        </header>

        {/* Main Grid Content */}
        <div className="flex-1 p-4 grid grid-cols-2 grid-rows-[1fr_1fr_0.8fr] gap-3">
          
          {/* Card 1: Growth ROI */}
          <div className="glass-card rounded-xl p-3 flex flex-col justify-between group hover:border-white/20 transition-colors duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-0.5">Growth ROI</p>
                <motion.h2 
                  key={metrics.growthRoi} // Trigger slight animation on change
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 1 }}
                  className="text-2xl font-black text-white"
                >
                  {metrics.growthRoi}%
                </motion.h2>
              </div>
              <BarChart3 className="text-primary w-5 h-5" />
            </div>
            
            {/* Sparkline Visualization */}
            <div className="h-10 flex items-end gap-1 mt-2">
              <SparklineBar height="40%" delay={0.1} />
              <SparklineBar height="60%" delay={0.15} />
              <SparklineBar height="35%" delay={0.2} />
              <SparklineBar height="80%" delay={0.25} />
              <SparklineBar height="100%" colorClass="bg-primary" delay={0.3} />
              <SparklineBar height="70%" delay={0.35} />
              <SparklineBar height="90%" colorClass="bg-accent" delay={0.4} />
              <SparklineBar height="100%" colorClass="bg-primary" delay={0.45} />
            </div>
            
            <p className="text-[9px] font-bold text-primary mt-1 flex items-center gap-1">
              +14.2% Week over Week
            </p>
          </div>

          {/* Card 2: Total Leads */}
          <div className="glass-card rounded-xl p-3 flex flex-col justify-between group hover:border-white/20 transition-colors duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-0.5">Total Leads</p>
                <motion.h2 
                   key={metrics.totalLeads}
                   initial={{ opacity: 0.8 }}
                   animate={{ opacity: 1 }}
                   className="text-2xl font-black text-white"
                >
                  {metrics.totalLeads.toLocaleString()}
                </motion.h2>
              </div>
              <Users className="text-accent w-5 h-5" />
            </div>
            
            <div className="mt-2">
              <div className="flex justify-between text-[9px] font-bold text-gray-400 mb-1 uppercase">
                <span>Target: 60k</span>
                <span>84%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "84%" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full data-gradient rounded-full"
                />
              </div>
            </div>
            
            <p className="text-[9px] font-bold text-accent mt-1">Velocity: High Impact</p>
          </div>

          {/* Card 3: Conversion Lift */}
          <div className="glass-card rounded-xl p-3 flex flex-col justify-between group hover:border-white/20 transition-colors duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-0.5">Conversion Lift</p>
                <motion.h2 
                   key={metrics.conversionLift}
                   initial={{ opacity: 0.8 }}
                   animate={{ opacity: 1 }}
                   className="text-2xl font-black text-white"
                >
                  +{metrics.conversionLift}%
                </motion.h2>
              </div>
              <Target className="text-primary w-5 h-5" />
            </div>
            
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-white/5 pt-2">
              <div>
                <span className="text-[8px] text-gray-500 uppercase block">Confidence</span>
                <span className="text-[11px] font-bold text-primary">{metrics.confidence}%</span>
              </div>
              <div>
                <span className="text-[8px] text-gray-500 uppercase block text-right">Deviation</span>
                <span className="text-[11px] font-bold text-gray-300 text-right block">±{metrics.deviation}%</span>
              </div>
            </div>
            
            <div className="text-[9px] bg-primary/10 text-primary py-0.5 px-2 rounded w-fit font-bold uppercase">
              Statistically Significant
            </div>
          </div>

          {/* Card 4: CPL Reduction */}
          <div className="glass-card rounded-xl p-3 flex flex-col justify-between group hover:border-white/20 transition-colors duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-0.5">CPL Reduction</p>
                <motion.h2 
                   key={metrics.cplReduction}
                   initial={{ opacity: 0.8 }}
                   animate={{ opacity: 1 }}
                   className="text-2xl font-black text-white"
                >
                  -{metrics.cplReduction}%
                </motion.h2>
              </div>
              <Zap className="text-accent w-5 h-5" fill="currentColor" />
            </div>
            
            <div className="flex items-center gap-3">
              <Gauge percentage={70} />
              <div>
                <p className="text-[10px] font-bold text-white">Optimization</p>
                <p className="text-[9px] text-gray-500">Tier 1 Efficiency</p>
              </div>
            </div>
            
            <p className="text-[9px] font-bold text-gray-400">Lowering acquisition overhead</p>
          </div>

          {/* Card 5: Winning Strategy (Spans 2 columns) */}
          <div className="col-span-2 glass-card rounded-xl p-3 flex flex-col gap-2 border-l-2 border-l-primary relative overflow-hidden group">
             {/* Background Decoration */}
            <div className="absolute -right-4 -top-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity duration-500">
              <Trophy className="w-24 h-24" />
            </div>

            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-primary w-4 h-4" />
                <h3 className="text-xs font-black uppercase tracking-tight">
                  Winning Strategy: <span className="italic text-primary">Variant B-102</span>
                </h3>
              </div>
              <span className="text-[9px] font-bold bg-white/5 px-2 py-0.5 rounded text-gray-400 border border-white/5">
                ACTIVE CYCLE
              </span>
            </div>

            <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 z-10">
              {[
                { label: "Hyper-personalized landing headlines (+12% lift)", color: "bg-primary" },
                { label: "Predictive CTA intent triggers enabled", color: "bg-primary" },
                { label: "Zero-latency API middleware integration", color: "bg-accent" },
                { label: "Segmented multi-channel attribution model", color: "bg-accent" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className={`w-1 h-1 rounded-full ${item.color}`}></span>
                  <span className="text-[10px] text-gray-300">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="p-3 bg-white/5 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              <div className="w-5 h-5 rounded-full border border-charcoal bg-gray-600"></div>
              <div className="w-5 h-5 rounded-full border border-charcoal bg-primary/20 flex items-center justify-center text-primary">
                <span className="text-[6px] font-black">JD</span>
              </div>
              <div className="w-5 h-5 rounded-full border border-charcoal bg-accent/20 flex items-center justify-center text-accent">
                <span className="text-[6px] font-black">+4</span>
              </div>
            </div>
            
            {/* Status Text Area */}
            <div className="flex items-center gap-1.5">
              {socketStatus === 'connected' ? (
                 <Wifi className="w-3 h-3 text-primary animate-pulse" />
              ) : (
                 <RefreshCw className="w-3 h-3 text-gray-500 animate-spin" />
              )}
              <span className="text-[9px] text-gray-500 font-medium italic">
                 {socketStatus === 'connected' ? `Live feed active (${lastPing}ms)` : 'Establishing secure connection...'}
              </span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button className="text-[10px] font-black px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5 uppercase flex items-center gap-1 group">
              Export
            </button>
            <button className="text-[10px] font-black px-3 py-1.5 rounded-lg bg-gradient-to-r from-primary to-accent text-black hover:brightness-110 transition-all uppercase flex items-center gap-1">
              Full Report
              <ArrowUpRight className="w-2.5 h-2.5" />
            </button>
          </div>
        </footer>

      </motion.div>
    </div>
  );
}