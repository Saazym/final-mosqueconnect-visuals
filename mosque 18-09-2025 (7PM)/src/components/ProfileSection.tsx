import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { CheckCircle, Circle, MapPin, Trophy, Star, Calendar, Target, TrendingUp, Settings, BookOpen, Users, Activity, Flame, Award, BarChart3, Upload, MessageSquare, Play } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

const prayerTimes = [
  { name: 'Fajr', time: '5:30 AM', completed: true, inMosque: true },
  { name: 'Dhuhr', time: '12:45 PM', completed: true, inMosque: true },
  { name: 'Asr', time: '3:45 PM', completed: false, inMosque: false },
  { name: 'Maghrib', time: '6:20 PM', completed: false, inMosque: false },
  { name: 'Isha', time: '8:00 PM', completed: false, inMosque: false }
]

const weeklyPrayerData = [
  { day: 'Mon', prayers: 5, mosque: 3 },
  { day: 'Tue', prayers: 5, mosque: 4 },
  { day: 'Wed', prayers: 4, mosque: 2 },
  { day: 'Thu', prayers: 5, mosque: 5 },
  { day: 'Fri', prayers: 5, mosque: 4 },
  { day: 'Sat', prayers: 5, mosque: 3 },
  { day: 'Sun', prayers: 4, mosque: 2 }
]

const monthlyProgressData = [
  { month: 'Oct', prayers: 142, quran: 28 },
  { month: 'Nov', prayers: 138, quran: 35 },
  { month: 'Dec', prayers: 145, quran: 42 },
  { month: 'Jan', prayers: 89, quran: 18 }
]

const emaanTestResults = [
  { category: 'Prayer', score: 92, color: '#10b981' },
  { category: 'Quran', score: 78, color: '#f59e0b' },
  { category: 'Community', score: 85, color: '#3b82f6' },
  { category: 'Character', score: 88, color: '#8b5cf6' }
]

const leaderboard = [
  { rank: 1, name: 'Ahmed Hassan', points: 1247, badge: '🥇' },
  { rank: 2, name: 'Fatima Al-Zahra', points: 1156, badge: '🥈' },
  { rank: 3, name: 'Omar Abdullah', points: 1089, badge: '🥉' },
  { rank: 4, name: 'You', points: 982, badge: '👤' },
  { rank: 5, name: 'Aisha Rahman', points: 934, badge: '' }
]

const achievements = [
  { title: "Prayer Warrior", description: "30 consecutive days of 5 daily prayers", icon: "🏆", earned: true },
  { title: "Community Helper", description: "Volunteered for 10 community events", icon: "🤝", earned: true },
  { title: "Quran Scholar", description: "Read 100 pages of Quran", icon: "📖", earned: false, progress: 67 },
  { title: "Charity Champion", description: "Donated to 5 different causes", icon: "💝", earned: false, progress: 80 }
]

const profileSettings = {
  notifications: {
    prayerReminders: true,
    eventAlerts: true,
    communityUpdates: false,
    weeklyReports: true
  },
  privacy: {
    showInLeaderboards: true,
    shareProgress: true,
    publicProfile: false
  },
  preferences: {
    language: "English",
    prayerCalculation: "ISNA",
    hijriCalendar: true
  }
}

// Mock user points - in real app this would come from user data
const USER_POINTS = 105000 // Qualified user with 100k+ points

export function ProfileSection() {
  const [selectedPrayer, setSelectedPrayer] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [youtubeLink, setYoutubeLink] = useState("")
  const [uploadMessage, setUploadMessage] = useState("")
  
  const togglePrayer = (prayerName: string) => {
    // In real app, would check location and mosque proximity
    console.log(`Toggled ${prayerName}`)
  }

  const isQualifiedForUpload = USER_POINTS >= 100000

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 py-8 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-4xl mb-2 md:mb-4 text-purple-900 font-bold">Profile & Prayer Tracking</h1>
          <p className="text-purple-800 max-w-2xl mx-auto text-sm md:text-base px-4">
            Track your spiritual journey, monitor prayer consistency, and see your community ranking
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6 md:mb-8 h-auto">
            <TabsTrigger value="overview" className="flex flex-col sm:flex-row items-center gap-1 text-xs md:text-sm p-1.5 sm:p-2 md:p-3">
              <Activity className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 text-emerald-600" />
              <span className="leading-tight">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="prayers" className="flex flex-col sm:flex-row items-center gap-1 text-xs md:text-sm p-1.5 sm:p-2 md:p-3">
              <MapPin className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 text-blue-600" />
              <span className="leading-tight hidden sm:inline">Prayer Tracking</span>
              <span className="leading-tight sm:hidden">Prayers</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex flex-col sm:flex-row items-center gap-1 text-xs md:text-sm p-1.5 sm:p-2 md:p-3">
              <Trophy className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 text-amber-600" />
              <span className="leading-tight hidden sm:inline">Achievements</span>
              <span className="leading-tight sm:hidden">Awards</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex flex-col sm:flex-row items-center gap-1 text-xs md:text-sm p-1.5 sm:p-2 md:p-3">
              <Settings className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 text-gray-600" />
              <span className="leading-tight">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Profile Overview */}
              <div className="lg:col-span-1 space-y-4 md:space-y-6">
                <Card>
                  <CardContent className="p-4 md:p-6 text-center">
                    <Avatar className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 md:mb-4 bg-gradient-to-br from-purple-400 to-pink-400">
                      <AvatarFallback className="text-white text-lg md:text-xl">AH</AvatarFallback>
                    </Avatar>
                    <h2 className="text-lg md:text-xl text-purple-900 mb-1">Ahmad Hassan</h2>
                    <p className="text-purple-600 text-sm mb-3 md:mb-4">Al-Noor Islamic Center</p>
                    
                    <div className="grid grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
                      <div className="text-center p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg text-white">
                        <Flame className="w-4 h-4 md:w-5 md:h-5 mx-auto mb-1" />
                        <div className="text-lg md:text-2xl font-bold">15</div>
                        <div className="text-xs opacity-90">Day Streak</div>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg text-white">
                        <Star className="w-4 h-4 md:w-5 md:h-5 mx-auto mb-1" />
                        <div className="text-lg md:text-2xl font-bold">{USER_POINTS.toLocaleString()}</div>
                        <div className="text-xs opacity-90">Total Points</div>
                      </div>
                    </div>

                    <Badge className="bg-purple-600 text-white mb-3 md:mb-4">
                      Rank #4 in Community
                    </Badge>
                    
                    <div className="text-left">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-purple-700">Emaan Level</span>
                        <span className="text-purple-900">Level 7</span>
                      </div>
                      <Progress value={73} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                {/* Today's Prayer Tracker */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-purple-900 flex items-center text-base md:text-lg">
                      <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-2 text-blue-600" />
                      Today's Prayers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 md:space-y-3">
                      {prayerTimes.map((prayer, index) => (
                        <div key={index} className="flex items-center justify-between p-2 md:p-3 bg-purple-50 rounded-lg">
                          <div className="flex items-center">
                            <button
                              onClick={() => togglePrayer(prayer.name)}
                              className="mr-3"
                            >
                              {prayer.completed ? (
                                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                              ) : (
                                <Circle className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                              )}
                            </button>
                            <div>
                              <div className="text-sm text-purple-900">{prayer.name}</div>
                              <div className="text-xs text-purple-600">{prayer.time}</div>
                            </div>
                          </div>
                          {prayer.inMosque && prayer.completed && (
                            <Badge className="bg-green-100 text-green-700 text-xs">
                              🕌 Mosque
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-3 md:mt-4 p-2 md:p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="text-xs text-yellow-700 mb-1">📍 Location Required</div>
                      <div className="text-xs text-yellow-600">
                        Enable location to mark prayers as "in mosque" for bonus points
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Emaan Assessment */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-purple-900 flex items-center text-base md:text-lg">
                      <Star className="w-4 h-4 md:w-5 md:h-5 mr-2 text-amber-600" />
                      Emaan Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {emaanTestResults.map((result, index) => (
                        <div key={index}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-purple-700">{result.category}</span>
                            <span className="text-purple-900">{result.score}%</span>
                          </div>
                          <Progress value={result.score} className="h-2" />
                        </div>
                      ))}
                    </div>
                    
                    <Button variant="outline" className="w-full mt-4 border-purple-300 text-purple-700 hover:bg-purple-50">
                      Retake Assessment
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Charts and Analytics */}
              <div className="lg:col-span-2 space-y-4 md:space-y-6">
                {/* Weekly Prayer Chart */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-purple-900 flex items-center text-base md:text-lg">
                      <BarChart3 className="w-4 h-4 md:w-5 md:h-5 mr-2 text-emerald-600" />
                      Weekly Prayer Consistency
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={weeklyPrayerData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="prayers" fill="#a855f7" name="Total Prayers" />
                        <Bar dataKey="mosque" fill="#10b981" name="In Mosque" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Monthly Progress */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-purple-900 flex items-center text-base md:text-lg">
                      <TrendingUp className="w-4 h-4 md:w-5 md:h-5 mr-2 text-blue-600" />
                      Monthly Progress Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={monthlyProgressData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="prayers" stroke="#a855f7" strokeWidth={2} name="Prayers" />
                        <Line type="monotone" dataKey="quran" stroke="#f59e0b" strokeWidth={2} name="Quran Pages" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Leaderboard */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-purple-900 flex items-center text-base md:text-lg">
                      <Trophy className="w-4 h-4 md:w-5 md:h-5 mr-2 text-amber-600" />
                      Community Leaderboard
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 md:space-y-3">
                      {leaderboard.map((user, index) => (
                        <div key={index} className={`flex items-center justify-between p-2 md:p-3 rounded-lg ${
                          user.name === 'You' ? 'bg-purple-100 border-2 border-purple-300' : 'bg-purple-50'
                        }`}>
                          <div className="flex items-center">
                            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-xs md:text-sm mr-2 md:mr-3">
                              {user.badge || user.rank}
                            </div>
                            <div>
                              <div className={`text-sm ${user.name === 'You' ? 'text-purple-900 font-medium' : 'text-purple-800'}`}>
                                {user.name}
                              </div>
                              <div className="text-xs text-purple-600">Rank #{user.rank}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-purple-900">{user.points}</div>
                            <div className="text-xs text-purple-600">points</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Goals and Achievements */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-purple-900 flex items-center text-base md:text-lg">
                      <Target className="w-4 h-4 md:w-5 md:h-5 mr-2 text-rose-600" />
                      Current Goals & Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                      <div className="p-3 md:p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center mb-2">
                          <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 mr-2" />
                          <span className="text-sm text-green-700">Prayer Streak Goal</span>
                        </div>
                        <div className="text-xs text-green-600">Completed: 15/14 days</div>
                        <Progress value={100} className="h-2 mt-2" />
                      </div>
                      
                      <div className="p-3 md:p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Circle className="w-4 h-4 md:w-5 md:h-5 text-blue-500 mr-2" />
                          <span className="text-sm text-blue-700">Monthly Quran Goal</span>
                        </div>
                        <div className="text-xs text-blue-600">Progress: 18/30 pages</div>
                        <Progress value={60} className="h-2 mt-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Prayer Tracking Tab */}
          <TabsContent value="prayers">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-purple-900 flex items-center text-base md:text-lg">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    Today's Prayer Tracker
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 md:space-y-4">
                    {prayerTimes.map((prayer, index) => (
                      <div key={index} className="flex items-center justify-between p-3 md:p-4 bg-purple-50 rounded-lg">
                        <div className="flex items-center">
                          <button onClick={() => togglePrayer(prayer.name)} className="mr-3 md:mr-4">
                            {prayer.completed ? (
                              <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
                            ) : (
                              <Circle className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
                            )}
                          </button>
                          <div>
                            <div className="text-sm text-purple-900">{prayer.name}</div>
                            <div className="text-xs text-purple-600">{prayer.time}</div>
                          </div>
                        </div>
                        {prayer.inMosque && prayer.completed && (
                          <Badge className="bg-green-100 text-green-700 text-xs">
                            🕌 In Mosque (+5 pts)
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-purple-900 text-base md:text-lg">Weekly Consistency</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={weeklyPrayerData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="prayers" fill="#a855f7" name="Total Prayers" />
                      <Bar dataKey="mosque" fill="#10b981" name="In Mosque" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className={`hover:shadow-lg transition-shadow ${
                  achievement.earned ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' : ''
                }`}>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start justify-between mb-3 md:mb-4">
                      <div className="text-3xl md:text-4xl">{achievement.icon}</div>
                      {achievement.earned && (
                        <Badge className="bg-green-100 text-green-700">Earned!</Badge>
                      )}
                    </div>
                    
                    <h3 className="text-base md:text-lg text-purple-900 mb-2">{achievement.title}</h3>
                    <p className="text-purple-700 text-sm mb-3 md:mb-4">{achievement.description}</p>
                    
                    {!achievement.earned && achievement.progress && (
                      <div>
                        <div className="flex justify-between text-sm text-purple-700 mb-1">
                          <span>Progress</span>
                          <span>{achievement.progress}%</span>
                        </div>
                        <Progress value={achievement.progress} className="h-2" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-6 md:mt-8">
              <CardHeader>
                <CardTitle className="text-purple-900 text-base md:text-lg">Leaderboard Ranking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 md:space-y-3">
                  {leaderboard.slice(0, 5).map((user, index) => (
                    <div key={index} className={`flex items-center justify-between p-2 md:p-3 rounded-lg ${
                      user.name === 'You' ? 'bg-purple-100 border-2 border-purple-300' : 'bg-purple-50'
                    }`}>
                      <div className="flex items-center">
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-xs md:text-sm mr-2 md:mr-3">
                          {user.badge || user.rank}
                        </div>
                        <div>
                          <div className={`text-sm ${user.name === 'You' ? 'text-purple-900 font-medium' : 'text-purple-800'}`}>
                            {user.name}
                          </div>
                          <div className="text-xs text-purple-600">Rank #{user.rank}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-purple-900">{user.points}</div>
                        <div className="text-xs text-purple-600">points</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {/* Video Upload Section - Only for qualified users */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-purple-900 flex items-center text-base md:text-lg">
                    <Play className="w-4 h-4 md:w-5 md:h-5 mr-2 text-purple-600" />
                    Islamic Content Contribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isQualifiedForUpload ? (
                    <div>
                      <div className="mb-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                        <div className="flex items-center mb-2">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                          <span className="text-green-800 font-medium">Congratulations! You're eligible to contribute content</span>
                        </div>
                        <p className="text-green-700 text-sm">
                          With {USER_POINTS.toLocaleString()} points, you can submit Islamic educational videos for imam review and community approval.
                        </p>
                      </div>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                            <Upload className="w-4 h-4 mr-2" />
                            Submit Video Content
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Submit Islamic Content</DialogTitle>
                            <DialogDescription>
                              Share inspiring Islamic content for imam review and community approval. Only high-quality, educational content will be featured.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Link</label>
                              <input
                                type="url"
                                placeholder="https://youtube.com/watch?v=..."
                                value={youtubeLink}
                                onChange={(e) => setYoutubeLink(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Message to Imam</label>
                              <textarea
                                placeholder="Explain why this content would benefit our community..."
                                value={uploadMessage}
                                onChange={(e) => setUploadMessage(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm h-20 resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              />
                            </div>
                          </div>
                          
                          <div className="flex gap-3">
                            <Button 
                              className="bg-purple-600 hover:bg-purple-700 text-white flex-1"
                              onClick={() => {
                                // Submit logic here
                                setYoutubeLink("")
                                setUploadMessage("")
                              }}
                              disabled={!youtubeLink || !uploadMessage}
                            >
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Submit for Review
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  ) : (
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Circle className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-gray-800 font-medium">Content Contribution Requirements</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        To maintain quality and trust, only members with 100,000+ points can submit videos for community review.
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 text-sm">Your Progress:</span>
                        <span className="text-gray-900 font-medium">{USER_POINTS.toLocaleString()} / 100,000 points</span>
                      </div>
                      <Progress value={(USER_POINTS / 100000) * 100} className="h-2 mt-2" />
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-purple-900 text-base md:text-lg">Notification Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-800">Prayer Reminders</span>
                    <div className={`w-10 h-6 rounded-full relative cursor-pointer ${
                      profileSettings.notifications.prayerReminders ? 'bg-purple-600' : 'bg-gray-300'
                    }`}>
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${
                        profileSettings.notifications.prayerReminders ? 'right-1' : 'left-1'
                      }`}></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-800">Event Alerts</span>
                    <div className={`w-10 h-6 rounded-full relative cursor-pointer ${
                      profileSettings.notifications.eventAlerts ? 'bg-purple-600' : 'bg-gray-300'
                    }`}>
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${
                        profileSettings.notifications.eventAlerts ? 'right-1' : 'left-1'
                      }`}></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-800">Community Updates</span>
                    <div className={`w-10 h-6 rounded-full relative cursor-pointer ${
                      profileSettings.notifications.communityUpdates ? 'bg-purple-600' : 'bg-gray-300'
                    }`}>
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${
                        profileSettings.notifications.communityUpdates ? 'right-1' : 'left-1'
                      }`}></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-800">Weekly Reports</span>
                    <div className={`w-10 h-6 rounded-full relative cursor-pointer ${
                      profileSettings.notifications.weeklyReports ? 'bg-purple-600' : 'bg-gray-300'
                    }`}>
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${
                        profileSettings.notifications.weeklyReports ? 'right-1' : 'left-1'
                      }`}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-purple-900 text-base md:text-lg">Privacy Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-800">Show in Leaderboards</span>
                    <div className={`w-10 h-6 rounded-full relative cursor-pointer ${
                      profileSettings.privacy.showInLeaderboards ? 'bg-purple-600' : 'bg-gray-300'
                    }`}>
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${
                        profileSettings.privacy.showInLeaderboards ? 'right-1' : 'left-1'
                      }`}></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-800">Share Progress</span>
                    <div className={`w-10 h-6 rounded-full relative cursor-pointer ${
                      profileSettings.privacy.shareProgress ? 'bg-purple-600' : 'bg-gray-300'
                    }`}>
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${
                        profileSettings.privacy.shareProgress ? 'right-1' : 'left-1'
                      }`}></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-800">Public Profile</span>
                    <div className={`w-10 h-6 rounded-full relative cursor-pointer ${
                      profileSettings.privacy.publicProfile ? 'bg-purple-600' : 'bg-gray-300'
                    }`}>
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${
                        profileSettings.privacy.publicProfile ? 'right-1' : 'left-1'
                      }`}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}