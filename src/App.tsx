/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Dashboard from './components/Dashboard';
import Schedule from './components/Schedule';
import Grades from './components/Grades';
import ServicesGrid from './components/ServicesGrid';
import Profile from './components/Profile';
import HEMISAI from './components/HEMISAI';
import Login from './components/Login';
import Assignments from './components/Assignments';
import Contract from './components/Contract';
import Materials from './components/Materials';
import Certificates from './components/Certificates';
import Notifications from './components/Notifications';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [subScreen, setSubScreen] = useState<string | null>(null);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSubScreen(null);
  };

  const renderContent = () => {
    if (subScreen === 'assignments') return <Assignments />;
    if (subScreen === 'contract') return <Contract />;
    if (subScreen === 'materials') return <Materials />;
    if (subScreen === 'certificates') return <Certificates />;
    if (subScreen === 'notifications') return <Notifications />;
    if (subScreen === 'profile') return <Profile onLogout={() => setIsLoggedIn(false)} />;

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={setSubScreen} onOpenNotifications={() => setSubScreen('notifications')} />;
      case 'schedule':
        return <Schedule onOpenNotifications={() => setSubScreen('notifications')} />;
      case 'ai':
        return <HEMISAI />;
      case 'subjects':
        return <Grades />;
      case 'all':
        return <ServicesGrid onLogout={() => setIsLoggedIn(false)} onNavigate={setSubScreen} />;
      default:
        return <Dashboard onNavigate={setSubScreen} onOpenNotifications={() => setSubScreen('notifications')} />;
    }
  };

  const getTitle = () => {
    if (subScreen === 'assignments') return 'Задания';
    if (subScreen === 'contract') return 'Контракт';
    if (subScreen === 'materials') return 'Материалы';
    if (subScreen === 'certificates') return 'Справки';
    if (subScreen === 'notifications') return 'Уведомления';
    if (subScreen === 'profile') return 'Профиль';

    switch (activeTab) {
      case 'dashboard':
        return 'HEMIS Dashboard';
      case 'schedule':
        return 'Расписание';
      case 'ai':
        return 'HEMIS AI';
      case 'subjects':
        return 'Предметы';
      case 'all':
        return 'Все';
      default:
        return 'HEMIS';
    }
  };

  return (
    <div className="min-h-screen bg-[#b0c8e8] flex items-center justify-center p-4">
      <div className="w-[393px] h-[852px] bg-[#F2F2F7] rounded-[52px] overflow-hidden relative shadow-2xl border-[2.5px] border-black/10 flex flex-col">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[124px] h-[34px] bg-[#111] rounded-b-[22px] z-[100]"></div>
        
        {(activeTab !== 'dashboard' || subScreen) && (
          <Header 
            title={getTitle()} 
            onOpenNotifications={() => setSubScreen('notifications')} 
            onNavigate={setSubScreen}
          />
        )}
        
        <main className={cn("flex-1 overflow-y-auto", (activeTab === 'dashboard' && !subScreen) ? "" : "pb-24")}>
          {renderContent()}
        </main>

        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

