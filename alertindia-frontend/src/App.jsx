import React, { useState, useEffect, useRef } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { 
  Bell, Shield, Activity, MessageSquare, ChevronRight, LayoutDashboard, 
  Home, Menu, X, Search, Database, AlertTriangle, CheckCircle, 
  TrendingUp, MapPin, Cpu, User, Headphones, LogIn, ArrowRight
} from 'lucide-react';

/**
 * MOCK DATA & CONFIGURATION
 */
const statePerformanceData = [
  { name: 'Maharashtra', updates: 12400, growth: 12, risk: 15 },
  { name: 'Karnataka', updates: 10200, growth: 8, risk: 20 },
  { name: 'Delhi', updates: 8500, growth: -2, risk: 45 },
  { name: 'Tamil Nadu', updates: 9100, growth: 5, risk: 10 },
  { name: 'UP', updates: 7600, growth: -15, risk: 78 },
  { name: 'Gujarat', updates: 6400, growth: 3, risk: 25 },
  { name: 'Bengal', updates: 5200, growth: -8, risk: 60 },
];

const trendData = [
  { month: 'Jan', updates: 4000 },
  { month: 'Feb', updates: 4500 },
  { month: 'Mar', updates: 3800 },
  { month: 'Apr', updates: 5100 },
  { month: 'May', updates: 4800 },
  { month: 'Jun', updates: 6200 },
];

const alertsData = [
  { id: 1, state: 'Uttar Pradesh', district: 'Lucknow', drop: '15%', status: 'critical', msg: 'Critical: Sharp decline in biometric updates.' },
  { id: 2, state: 'West Bengal', district: 'Kolkata', drop: '8%', status: 'warning', msg: 'Warning: Verify enrollment centers.' },
  { id: 3, state: 'Delhi', district: 'New Delhi', drop: '2%', status: 'warning', msg: 'Warning: Marginal dip in efficiency.' },
  { id: 4, state: 'Maharashtra', district: 'Pune', drop: '0%', status: 'stable', msg: 'Stable Performance. Operations normal.' },
  { id: 5, state: 'Karnataka', district: 'Bangalore', drop: '+5%', status: 'stable', msg: 'Stable Performance. Growth observed.' },
  { id: 6, state: 'Bihar', district: 'Patna', drop: '12%', status: 'critical', msg: 'Critical: Server sync latency high.' },
];

/**
 * COMPONENTS
 */

// 1. Navigation Bar
const Navbar = ({ activeTab, setActiveTab, setIsMobileMenuOpen, isMobileMenuOpen }) => (
  <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-white/60 border-b border-purple-100/50 transition-all duration-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-20">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="bg-gradient-to-tr from-violet-600 to-fuchsia-600 p-2 rounded-xl shadow-lg shadow-purple-500/20">
            <Bell className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-800 to-purple-800 tracking-tight">
            AlertIndia
          </span>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex space-x-1 items-center bg-white/50 px-2 py-1.5 rounded-full border border-purple-100 shadow-sm backdrop-blur-sm">
          {['Home', 'Dashboard', 'Alerts', 'AI Chatbot', 'About'].map((item) => {
            const tabKey = item.toLowerCase().replace(' ', '');
            const isActive = activeTab === (tabKey === 'aichatbot' ? 'chatbot' : tabKey);
            return (
              <button
                key={item}
                onClick={() => setActiveTab(tabKey === 'aichatbot' ? 'chatbot' : tabKey)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-purple-100 text-purple-700 font-semibold' 
                    : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button className="text-sm font-medium text-slate-600 hover:text-purple-700 transition-colors">
            Login
          </button>
          <button 
            onClick={() => setActiveTab('dashboard')}
            className="group bg-gradient-to-r from-violet-600 to-purple-600 text-white px-5 py-2.5 rounded-full shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all font-medium text-sm flex items-center gap-2"
          >
            Get Started <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-700 p-2">
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </div>

    {/* Mobile Nav */}
    {isMobileMenuOpen && (
      <div className="md:hidden bg-white border-b border-purple-100 px-4 py-6 space-y-4 shadow-xl animate-slide-down">
        {['Home', 'Dashboard', 'Alerts', 'AI Chatbot', 'About'].map((item) => (
          <button
            key={item}
            onClick={() => { 
              setActiveTab(item.toLowerCase().replace(' ', '') === 'aichatbot' ? 'chatbot' : item.toLowerCase()); 
              setIsMobileMenuOpen(false); 
            }}
            className="block w-full text-left px-4 py-3 text-slate-600 hover:bg-purple-50 hover:text-purple-700 rounded-xl font-medium transition-colors"
          >
            {item}
          </button>
        ))}
        <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
          <button className="w-full py-3 text-slate-600 font-medium hover:bg-slate-50 rounded-xl">Login</button>
          <button onClick={() => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }} className="w-full py-3 bg-purple-600 text-white rounded-xl font-medium shadow-md">Get Started</button>
        </div>
      </div>
    )}
  </nav>
);

// 2. Landing Page
const LandingPage = ({ setActiveTab }) => (
  <div className="pt-20 min-h-screen bg-[#f8f7ff] overflow-hidden relative">
    
    {/* --- Background Elements --- */}
    
    {/* REPLACED IMAGE WITH CSS/SVG WAVES */}
    <div className="absolute top-0 left-0 w-full h-[800px] -z-20 overflow-hidden pointer-events-none">
       {/* Base Gradient */}
       <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/50 to-white/0"></div>
       
       {/* Animated SVG Wave 1 (Deep Purple) */}
       <div className="absolute -top-[10%] -left-[10%] w-[120%] h-full opacity-20 animate-wave-slow">
         <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-purple-600 fill-current">
            <path d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,122.7C960,117,1056,171,1152,197.3C1248,224,1344,224,1392,224L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
         </svg>
       </div>

       {/* Animated SVG Wave 2 (Lighter Lavender) */}
       <div className="absolute -top-[5%] -left-[10%] w-[120%] h-full opacity-30 animate-wave-medium" style={{ animationDelay: '-5s' }}>
         <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-violet-400 fill-current">
            <path d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
         </svg>
       </div>
    </div>

    {/* Overlay Gradients for smooth blending */}
    <div className="absolute top-0 right-0 w-[60%] h-[800px] bg-gradient-to-b from-purple-200/30 via-fuchsia-100/20 to-transparent rounded-bl-[100px] blur-3xl -z-10" />
    <div className="absolute bottom-0 left-0 w-[50%] h-[600px] bg-gradient-to-t from-violet-200/20 via-indigo-100/10 to-transparent rounded-tr-[100px] blur-3xl -z-10" />
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-24 pb-20">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        
        {/* --- Left Column: Hero Text --- */}
        <div className="space-y-8 animate-fade-in-up z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-purple-200 shadow-sm text-purple-700 text-xs font-bold tracking-wide uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            National Intelligence System
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] text-slate-900 tracking-tight">
            Monitor Aadhaar <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600">
              Updates in Real Time
            </span>
          </h1>
          
          <p className="text-lg text-slate-600 max-w-lg leading-relaxed font-medium">
            Get data-driven insights and track Aadhaar activities across India instantly using our advanced AI-powered analytics platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-full shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/40 hover:-translate-y-1 transition-all duration-300 font-semibold flex items-center justify-center gap-2"
            >
              View Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('alerts')}
              className="px-8 py-4 bg-white/80 backdrop-blur-md border border-purple-200 text-purple-700 rounded-full shadow-lg shadow-purple-100/50 hover:bg-purple-50 hover:border-purple-300 hover:-translate-y-1 transition-all duration-300 font-semibold flex items-center justify-center gap-2 group"
            >
              <Activity className="h-5 w-5 group-hover:animate-pulse" /> Live Alerts
            </button>
          </div>

          <div className="pt-8 flex items-center gap-6 text-sm font-medium text-slate-500">
             <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-purple-${i*100+100} flex items-center justify-center text-[10px] text-white`}>
                     <User size={12} />
                  </div>
                ))}
             </div>
             <p>Used by <span className="text-purple-700 font-bold">2,000+</span> Analysts</p>
          </div>
        </div>

        {/* --- Right Column: Illustration --- */}
        <div className="relative hidden lg:flex justify-center items-center perspective-1000 h-[600px]">
          
          {/* Main Glass Panel (The "Screen") */}
          <div className="relative w-[480px] h-[340px] bg-white/40 backdrop-blur-xl rounded-2xl border border-white/60 shadow-[0_20px_50px_rgba(124,58,237,0.15)] z-20 animate-float flex flex-col overflow-hidden">
             {/* Window Header */}
             <div className="h-8 border-b border-white/30 bg-white/40 flex items-center px-4 gap-2">
               <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
             </div>
             
             {/* Content Area */}
             <div className="flex-1 relative flex items-center justify-center">
                
                {/* INDIA MAP SVG SILHOUETTE */}
                <svg viewBox="0 0 400 500" className="absolute w-[80%] h-[90%] opacity-20 text-purple-800 fill-current">
                   <path d="M156.4,12.7 C159.2,14.5 162.3,16.8 165.1,19.2 C168.6,22.2 171.4,25.9 173.2,30.2 C175.0,34.5 177.3,38.8 178.6,43.4 C179.9,48.0 180.1,52.8 181.2,57.5 C182.3,62.2 185.0,66.3 188.5,69.5 C192.0,72.7 196.3,74.9 200.9,76.4 C205.5,77.9 210.4,78.2 215.1,77.8 C219.8,77.4 224.2,75.9 228.3,73.4 C232.4,70.9 236.3,68.2 240.5,66.1 C244.7,64.0 249.2,63.1 253.9,63.5 C258.6,63.9 263.2,65.6 267.3,68.2 C271.4,70.8 275.0,74.2 278.4,77.9 C281.8,81.6 284.9,85.6 287.4,89.9 C289.9,94.2 291.5,98.9 292.0,103.8 C292.5,108.7 292.0,113.6 290.7,118.4 C289.4,123.2 287.3,127.7 284.8,131.9 C282.3,136.1 279.3,140.0 276.0,143.5 C272.7,147.0 269.1,150.2 265.4,153.1 C261.7,156.0 257.9,158.8 254.3,161.8 C250.7,164.8 247.3,168.2 244.5,172.0 C241.7,175.8 239.5,180.0 238.1,184.6 C236.7,189.2 236.2,194.0 236.6,198.8 C237.0,203.6 238.2,208.3 240.2,212.7 C242.2,217.1 245.1,221.1 248.6,224.6 C252.1,228.1 256.1,231.1 260.5,233.4 C264.9,235.7 269.8,237.3 274.7,238.1 C279.6,238.9 284.7,239.0 289.6,238.4 C294.5,237.8 299.3,236.4 303.8,234.2 C308.3,232.0 312.4,229.0 316.2,225.5 C320.0,222.0 323.5,218.1 326.6,213.9 C329.7,209.7 332.5,205.2 334.7,200.4 C336.9,195.6 338.5,190.6 339.5,185.5 C340.5,180.4 340.9,175.2 340.7,170.0 C340.5,164.8 339.7,159.7 338.3,154.7 C336.9,149.7 334.9,144.9 332.3,140.4 C329.7,135.9 326.6,131.7 323.0,127.9 C319.4,124.1 315.4,120.7 311.1,117.8 C306.8,114.9 302.2,112.4 297.4,110.4 C292.6,108.4 287.6,106.9 282.5,105.9 C277.4,104.9 272.2,104.4 267.0,104.4 C261.8,104.4 256.7,105.0 251.6,106.1 C246.5,107.2 241.6,108.9 236.9,111.1 C232.2,113.3 227.8,116.0 223.7,119.2 C219.6,122.4 216.0,126.1 212.8,130.2 C209.6,134.3 206.9,138.8 204.6,143.6 C202.3,148.4 200.5,153.4 199.3,158.6 C198.1,163.8 197.5,169.1 197.5,174.4 C197.5,179.7 198.1,185.0 199.4,190.2 C200.7,195.4 202.6,200.4 205.1,205.1 C207.6,209.8 210.7,214.2 214.4,218.1 C218.1,222.0 222.3,225.5 226.9,228.4 C231.5,231.3 236.5,233.7 241.7,235.5 C246.9,237.3 252.4,238.5 257.9,239.1 C263.4,239.7 269.0,239.7 274.5,239.1 C280.0,238.5 285.3,237.3 290.4,235.4 C295.5,233.5 300.3,231.0 304.8,227.9 C309.3,224.8 313.4,221.1 317.0,217.0 C320.6,212.9 323.7,208.4 326.2,203.6 C328.7,198.8 330.6,193.7 331.9,188.4 C333.2,183.1 333.9,177.7 333.9,172.2 C333.9,166.7 333.3,161.2 332.0,155.8 C330.7,150.4 328.8,145.2 326.3,140.3 C323.8,135.4 320.7,130.8 317.1,126.6 C313.5,122.4 309.4,118.6 304.9,115.3 C300.4,112.0 295.6,109.2 290.5,107.0 C285.4,104.8 280.1,103.2 274.6,102.2 C269.1,101.2 263.5,100.8 258.0,101.0 C252.5,101.2 247.1,102.0 241.8,103.4 C236.5,104.8 231.4,106.8 226.6,109.4 C221.8,112.0 217.3,115.1 213.2,118.8 C209.1,122.5 205.5,126.6 202.3,131.2 C199.1,135.8 196.5,140.7 194.4,145.9 C192.3,151.1 190.8,156.5 189.9,162.0 C189.0,167.5 188.7,173.1 189.1,178.6 C189.5,184.1 190.5,189.6 192.1,194.9 C193.7,200.2 196.0,205.3 198.8,210.1 C201.6,214.9 205.0,219.4 208.8,223.5 C212.6,227.6 216.9,231.3 221.5,234.5 C226.1,237.7 231.1,240.4 236.4,242.6 C241.7,244.8 247.2,246.4 252.9,247.5 C258.6,248.6 264.4,249.0 270.2,248.8 L257.9,248.8 Z" />
                </svg>

                {/* Abstract Map Dots on top of map */}
                <div className="absolute inset-0 z-10">
                   {[
                     {top: '30%', left: '35%'}, {top: '40%', left: '45%'}, {top: '55%', left: '40%'}, 
                     {top: '60%', left: '55%'}, {top: '25%', left: '40%'}, {top: '45%', left: '30%'},
                     {top: '35%', left: '55%'}, {top: '70%', left: '45%'}
                   ].map((pos, i) => (
                     <div key={i} className="absolute w-2 h-2 bg-purple-500 rounded-full animate-ping" style={{ ...pos, animationDuration: `${Math.random()*2 + 1}s` }} />
                   ))}
                   
                   {/* Static centers */}
                   {[
                     {top: '30%', left: '35%'}, {top: '40%', left: '45%'}, {top: '55%', left: '40%'}, 
                     {top: '60%', left: '55%'}, {top: '25%', left: '40%'}, {top: '45%', left: '30%'},
                     {top: '35%', left: '55%'}, {top: '70%', left: '45%'}
                   ].map((pos, i) => (
                     <div key={i} className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(168,85,247,1)]" style={{ ...pos }} />
                   ))}
                </div>
                
                {/* Floating Charts inside Screen */}
                <div className="flex gap-4 h-full items-end justify-center pb-4 opacity-90 z-20 absolute bottom-0 w-full">
                   {[40, 65, 34, 78, 56, 92].map((h, i) => (
                     <div key={i} className="w-8 bg-gradient-to-t from-violet-500/80 to-purple-400/80 rounded-t-lg shadow-lg hover:to-purple-300 transition-all backdrop-blur-sm border-t border-white/20" style={{ height: `${h}%` }}></div>
                   ))}
                </div>
             </div>
          </div>

          {/* AI Assistant Character (Abstract Composition) */}
          <div className="absolute -right-4 top-20 z-30 animate-float" style={{ animationDelay: '1s' }}>
             <div className="relative w-24 h-24 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-2xl shadow-2xl flex items-center justify-center border-4 border-white/80">
                <Headphones className="w-12 h-12 text-white" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 border-2 border-white rounded-full flex items-center justify-center">
                   <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
             </div>
          </div>

          {/* Floating UI Elements */}
          <div className="absolute top-10 left-0 bg-white p-3 rounded-xl shadow-xl animate-float border border-purple-50 z-30" style={{ animationDelay: '0.5s' }}>
             <Shield className="w-8 h-8 text-violet-500" />
          </div>

          <div className="absolute bottom-20 -left-8 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-2xl animate-float border border-white z-30 w-48" style={{ animationDelay: '1.5s' }}>
             <div className="flex items-center gap-3 mb-2">
               <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xs">98%</div>
               <div className="text-xs font-bold text-slate-700">System Stable</div>
             </div>
             <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
               <div className="w-[98%] h-full bg-green-500"></div>
             </div>
          </div>

          {/* Glow Behind */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[80px] -z-10"></div>
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="mt-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: <Activity className="w-6 h-6 text-white" />, 
              color: "from-blue-500 to-cyan-500", 
              title: "Interactive Graphs", 
              desc: "Visualize trends with dynamic charts and real-time data updates." 
            },
            { 
              icon: <MessageSquare className="w-6 h-6 text-white" />, 
              color: "from-violet-500 to-purple-500", 
              title: "AI Chatbot Insights", 
              desc: "Get instant answers with our AI assistant trained on national data." 
            },
            { 
              icon: <Bell className="w-6 h-6 text-white" />, 
              color: "from-fuchsia-500 to-pink-500", 
              title: "Real-Time Alerts", 
              desc: "Receive instant Aadhaar activity notifications and risk warnings." 
            }
          ].map((feature, idx) => (
            <div key={idx} className="group relative bg-white/40 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
               {/* Hover Gradient Overlay */}
               <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
               
               <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                 {feature.icon}
               </div>
               
               <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
               <p className="text-slate-600 mb-6 leading-relaxed">{feature.desc}</p>
               
               <button className="flex items-center gap-2 text-sm font-bold text-violet-700 group-hover:gap-3 transition-all">
                 Learn More <ArrowRight className="w-4 h-4" />
               </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// 3. Dashboard Page (Keeping style consistent but simplified for this demo)
const Dashboard = () => {
  const [selectedState, setSelectedState] = useState('All');
  return (
    <div className="pt-24 pb-12 min-h-screen bg-slate-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl border border-purple-50 p-6 mb-8">
           <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
             <div>
               <h2 className="text-2xl font-bold text-slate-800">Analytics Dashboard</h2>
               <p className="text-slate-500">Real-time Aadhaar update metrics.</p>
             </div>
             <select className="px-4 py-2 bg-slate-100 rounded-lg text-slate-700 font-medium outline-none focus:ring-2 focus:ring-purple-500">
               <option>All States</option>
               <option>Maharashtra</option>
               <option>Delhi</option>
             </select>
           </div>
           
           <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {[
                { title: "Total Updates", val: "1.4B+", color: "text-purple-600", bg: "bg-purple-50" },
                { title: "Active Centers", val: "42,000", color: "text-blue-600", bg: "bg-blue-50" },
                { title: "Avg. Process Time", val: "1.2s", color: "text-green-600", bg: "bg-green-50" },
              ].map((stat, i) => (
                <div key={i} className="p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                   <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                     <Activity size={20} />
                   </div>
                   <div>
                     <p className="text-slate-500 text-sm font-medium">{stat.title}</p>
                     <h3 className="text-2xl font-bold text-slate-800">{stat.val}</h3>
                   </div>
                </div>
              ))}
           </div>

           <div className="h-[400px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={trendData}>
                 <defs>
                   <linearGradient id="colorMain" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                 <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                 <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                 <Area type="monotone" dataKey="updates" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorMain)" />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
};

// 4. Alerts Page

const AlertsPage = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/preview")
      .then(res => res.json())
      .then(data => setAlerts(data));
  }, []);

  return (
    <div className="pt-24 pb-12 min-h-screen bg-slate-50 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">
          Live Aadhaar Data
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alerts.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-md border"
            >
              <h3 className="font-bold text-lg text-slate-800">
                {item.state}
              </h3>
              <p className="text-sm text-slate-500">{item.district}</p>

              <div className="mt-2 text-sm text-slate-700">
                <p>Pincode: {item.pincode}</p>
                <p>Age 5–17: {item.demo_age_5_17}</p>
                <p>Age 17+: {item.demo_age_17_}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 5. Chatbot
const ChatbotPage = () => {
  const [messages, setMessages] = useState([{ id: 1, type: 'ai', text: "Hello! I'm your Aadhaar Intelligence Assistant. Ask me anything." }]);
  const [input, setInput] = useState('');
  
  const handleSend = (e) => {
    e.preventDefault();
    if(!input.trim()) return;
    setMessages([...messages, { id: Date.now(), type: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now()+1, type: 'ai', text: "I've analyzed the national database. Updates in Maharashtra have increased by 12% this week." }]);
    }, 1000);
  };

  return (
    <div className="pt-24 pb-12 min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-purple-100 overflow-hidden h-[600px] flex flex-col">
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-6 flex items-center gap-4">
          <div className="p-2 bg-white/20 rounded-xl"><Headphones className="text-white" /></div>
          <div>
            <h3 className="text-white font-bold">AlertIndia Assistant</h3>
            <p className="text-purple-200 text-xs">Online • AI Powered</p>
          </div>
        </div>
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/50">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${msg.type === 'user' ? 'bg-purple-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex gap-2">
          <input 
            value={input} onChange={e => setInput(e.target.value)}
            className="flex-1 bg-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Type your question..."
          />
          <button type="submit" className="bg-purple-600 text-white p-3 rounded-xl hover:bg-purple-700"><ChevronRight /></button>
        </form>
      </div>
    </div>
  );
};

// Main App
const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <LandingPage setActiveTab={setActiveTab} />;
      case 'dashboard': return <Dashboard />;
      case 'alerts': return <AlertsPage />;
      case 'chatbot': return <ChatbotPage />;
      default: return <LandingPage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="font-sans text-slate-900 bg-[#f8f7ff] min-h-screen selection:bg-purple-200 selection:text-purple-900">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      <main className="animate-fade-in">{renderContent()}</main>
      
      <footer className="bg-white border-t border-purple-100 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-2">
             <Bell className="w-5 h-5 text-purple-600" />
             <span className="font-bold text-slate-700">AlertIndia</span>
          </div>
          <p className="text-slate-400 text-sm">© 2026 National Aadhaar Intelligence Platform.</p>
        </div>
      </footer>

      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes wave {
          0% { transform: translateX(0); }
          50% { transform: translateX(-20px); }
          100% { transform: translateX(0); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-fade-in-up { animation: slideUp 0.8s ease-out forwards; }
        .animate-slide-down { animation: slideDown 0.3s ease-out forwards; }
        .animate-wave-slow { animation: wave 10s ease-in-out infinite; }
        .animate-wave-medium { animation: wave 7s ease-in-out infinite; }
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </div>
  );
};

export default App;