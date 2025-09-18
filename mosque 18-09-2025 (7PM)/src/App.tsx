import { useState } from 'react'
import { Button } from './components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './components/ui/sheet'
import { Home, BookOpen, MapPin, User, Users, GraduationCap, Shield, Heart, Sun, Menu, AlertTriangle, MessageCircle, HandHeart, DollarSign, UserPlus } from 'lucide-react'
import { HomeSection } from './components/HomeSection'
import { QuranSection } from './components/QuranSection'
import { MapsSection } from './components/MapsSection'
import { ProfileSection } from './components/ProfileSection'
import { CommunitySection } from './components/CommunitySection'
import { LearningSection } from './components/LearningSection'
import { LeadershipSection } from './components/LeadershipSection'
import { CharitySection } from './components/CharitySection'
import { DuasSection } from './components/DuasSection'
import { EmergencyAlertSection } from './components/EmergencyAlertSection'
import { ImamChatSection } from './components/ImamChatSection'
import { FamilyStreakSection } from './components/FamilyStreakSection'
import { MarriagePortalSection } from './components/MarriagePortalSection'
import { IslamicFinanceSection } from './components/IslamicFinanceSection'
import { VolunteerSection } from './components/VolunteerSection'
import { RunningTicker } from './components/RunningTicker'

const navigation = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'quran', label: 'Quran', icon: BookOpen },
  { id: 'maps', label: 'Maps', icon: MapPin },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'community', label: 'Community', icon: Users },
]

const moreNavigation = [
  { id: 'learning', label: 'Islamic Learning', icon: GraduationCap },
  { id: 'leadership', label: 'Leadership Portal', icon: Shield },
  { id: 'charity', label: 'Charity Tracker', icon: Heart },
  { id: 'duas', label: 'Daily Duas', icon: Sun },
  { id: 'emergency', label: 'Emergency Alerts', icon: AlertTriangle },
  { id: 'imam-chat', label: 'Ask Imam', icon: MessageCircle },
  { id: 'family-streak', label: 'Family Streak', icon: Users },
  { id: 'marriage', label: 'Marriage Portal', icon: UserPlus },
  { id: 'finance', label: 'Islamic Finance', icon: DollarSign },
  { id: 'volunteer', label: 'Volunteer Hub', icon: HandHeart },
]

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigateToPage = (pageId: string) => {
    setCurrentPage(pageId)
    setIsMenuOpen(false)
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomeSection onNavigate={navigateToPage} />
      case 'quran':
        return <QuranSection />
      case 'maps':
        return <MapsSection />
      case 'profile':
        return <ProfileSection />
      case 'community':
        return <CommunitySection />
      case 'learning':
        return <LearningSection />
      case 'leadership':
        return <LeadershipSection />
      case 'charity':
        return <CharitySection />
      case 'duas':
        return <DuasSection />
      case 'emergency':
        return <EmergencyAlertSection />
      case 'imam-chat':
        return <ImamChatSection />
      case 'family-streak':
        return <FamilyStreakSection />
      case 'marriage':
        return <MarriagePortalSection />
      case 'finance':
        return <IslamicFinanceSection />
      case 'volunteer':
        return <VolunteerSection />
      default:
        return <HomeSection onNavigate={navigateToPage} />
    }
  }

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-emerald-700">🕌 MosqueConnect</h1>
          </div>
          
          {/* Right Side Menu Trigger */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <Menu className="w-5 h-5 text-emerald-700" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900 border-l border-emerald-700 flex flex-col">
              <SheetHeader className="text-left mb-6 flex-shrink-0 border-b border-emerald-700 pb-4">
                <SheetTitle className="text-emerald-100 text-xl">🕌 MosqueConnect</SheetTitle>
                <SheetDescription className="text-emerald-300 text-sm">Community Unity Platform</SheetDescription>
              </SheetHeader>
              
              {/* Scrollable Menu Items with Custom Scrollbar */}
              <div className="flex-1 overflow-y-auto min-h-0 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-emerald-600 hover:scrollbar-thumb-emerald-500 pr-2">
                <div className="space-y-1 mb-6">
                  <div className="text-sm font-medium text-emerald-300 mb-4 px-1">Main Navigation</div>
                  
                  {/* Primary Navigation */}
                  <div className="space-y-1 mb-6">
                    {navigation.map((item) => {
                      const Icon = item.icon
                      return (
                        <button
                          key={item.id}
                          onClick={() => navigateToPage(item.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                            currentPage === item.id
                              ? 'bg-emerald-600 text-white shadow-lg transform scale-[0.98]'
                              : 'text-emerald-100 hover:bg-emerald-700/50 hover:text-white hover:transform hover:scale-[0.99]'
                          }`}
                        >
                          <Icon className={`w-5 h-5 transition-transform duration-200 ${
                            currentPage === item.id ? 'text-white' : 'text-emerald-300 group-hover:text-white group-hover:scale-110'
                          }`} />
                          <span className="font-medium">{item.label}</span>
                          {currentPage === item.id && (
                            <div className="ml-auto w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></div>
                          )}
                        </button>
                      )
                    })}
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-emerald-600 to-transparent my-4"></div>
                  
                  {/* Secondary Navigation */}
                  <div className="text-sm font-medium text-emerald-300 mb-3 px-1">More Features</div>
                  <div className="space-y-1">
                    {moreNavigation.map((item) => {
                      const Icon = item.icon
                      return (
                        <button
                          key={item.id}
                          onClick={() => navigateToPage(item.id)}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-all duration-200 group ${
                            currentPage === item.id
                              ? 'bg-emerald-600 text-white shadow-md'
                              : 'text-emerald-200 hover:bg-emerald-700/40 hover:text-white'
                          }`}
                        >
                          <Icon className={`w-4 h-4 transition-all duration-200 ${
                            currentPage === item.id ? 'text-white' : 'text-emerald-400 group-hover:text-white group-hover:scale-105'
                          }`} />
                          <span className="text-sm">{item.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Quick Stats - Fixed at bottom with Glass Effect */}
              <div className="relative p-4 bg-emerald-800/50 backdrop-blur-sm rounded-xl border border-emerald-600/30 flex-shrink-0 mt-4 shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-700/20 to-teal-700/20 rounded-xl"></div>
                <div className="relative">
                  <div className="text-sm font-medium text-emerald-100 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    Your Progress
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-200 text-sm">Prayer Streak</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-emerald-100">7 days</span>
                        <span className="text-amber-400">🔥</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-200 text-sm">Total Points</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-emerald-100">1,250</span>
                        <span className="text-amber-400">⭐</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main Content */}
      <main className="min-h-screen">
        {renderCurrentPage()}
      </main>

      {/* Bottom Navigation - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden">
        <div className="flex justify-around items-center py-2 px-1">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => navigateToPage(item.id)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-0 ${
                  currentPage === item.id
                    ? 'text-emerald-700 bg-emerald-50'
                    : 'text-gray-500 hover:text-emerald-600'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-xs truncate">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Running Ticker */}
      <RunningTicker />
    </div>
  )
}