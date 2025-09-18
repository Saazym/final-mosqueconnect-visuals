import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Textarea } from './ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { BookOpen, Star, Heart, Search, Play, Volume2, Bookmark, Trophy, Clock, User } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { QuickNav } from './QuickNav'

interface QuranSectionProps {
  onNavigate?: (page: string) => void
}

const weeklyAchievers = [
  { name: "Aisha Rahman", location: "Local", pages: 47, rank: 1 },
  { name: "Muhammad Ali", location: "State", pages: 156, rank: 1 },
  { name: "Zainab Hassan", location: "National", pages: 289, rank: 1 }
]

const bookmarkedVerses = [
  { surah: "Al-Fatiha", ayah: 6, text: "Guide us to the straight path", notes: "Daily guidance prayer" },
  { surah: "Al-Baqarah", ayah: 255, text: "Allah - there is no deity except Him...", notes: "Ayat ul-Kursi - protection" },
  { surah: "Al-Ikhlas", ayah: 1, text: "Say, He is Allah, [who is] One", notes: "Declaration of Unity" }
]

const studyGroups = [
  { name: "Weekend Tafseer Circle", members: 24, meeting: "Saturday 2 PM", leader: "Imam Ahmad" },
  { name: "Youth Quran Study", members: 18, meeting: "Wednesday 7 PM", leader: "Sister Fatima" },
  { name: "Morning Reflection Group", members: 32, meeting: "Daily 6 AM", leader: "Brother Omar" }
]

const memorization = [
  { surah: "Al-Fatiha", progress: 100, verses: 7 },
  { surah: "Al-Baqarah", progress: 45, verses: 286 },
  { surah: "Al-Imran", progress: 12, verses: 200 },
  { surah: "An-Nisa", progress: 0, verses: 176 }
]

export function QuranSection({ onNavigate }: QuranSectionProps) {
  const [selectedSurah, setSelectedSurah] = useState("2")
  const [selectedTranslation, setSelectedTranslation] = useState("sahih")
  const [searchQuery, setSearchQuery] = useState("")
  const [personalNote, setPersonalNote] = useState("")
  const [readingProgress, setReadingProgress] = useState(23)
  const [activeTab, setActiveTab] = useState("reader")

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 py-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1728484704808-a26b19641e8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdXJhbiUyMGJvb2slMjBnb2xkZW4lMjBwYWdlcyUyMGlzbGFtaWMlMjBjYWxsaWdyYXBoeXxlbnwxfHx8fDE3NTc3NTY3OTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Quran with golden pages"
            className="w-24 h-24 rounded-full mx-auto mb-6 object-cover border-4 border-amber-300"
          />
          <h1 className="text-4xl mb-4 text-amber-900 font-bold">Quran Reader & Study Hub</h1>
          <p className="text-amber-800 max-w-2xl mx-auto">
            Read, study, and reflect upon the Holy Quran with translations, transliterations, and community insights
          </p>
        </div>

        {/* Weekly Achievers Banner */}
        <Card className="mb-8 bg-gradient-to-r from-amber-100 to-yellow-100 border-amber-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl flex items-center text-amber-900">
                <Trophy className="w-6 h-6 mr-2 text-amber-600" />
                Weekly Quran Reading Champions
              </h2>
              <Badge className="bg-amber-600 text-white">Week 2, 2025</Badge>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {weeklyAchievers.map((achiever, index) => (
                <div key={index} className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl mb-1">{achiever.pages}</div>
                  <div className="text-sm text-amber-700 mb-1">Pages Read</div>
                  <div className="font-medium text-amber-900">{achiever.name}</div>
                  <Badge variant="outline" className="text-xs mt-1 border-amber-300 text-amber-700">
                    #{achiever.rank} {achiever.location}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 md:mb-8 h-auto">
            <TabsTrigger value="reader" className="flex flex-col md:flex-row items-center text-xs md:text-sm p-2 md:p-3 gap-1 md:gap-2">
              <BookOpen className="w-4 h-4 md:w-4 md:h-4 text-amber-600 flex-shrink-0" />
              <span className="leading-tight text-center">Quran Reader</span>
            </TabsTrigger>
            <TabsTrigger value="study" className="flex flex-col md:flex-row items-center text-xs md:text-sm p-2 md:p-3 gap-1 md:gap-2">
              <User className="w-4 h-4 md:w-4 md:h-4 text-blue-600 flex-shrink-0" />
              <span className="leading-tight text-center">Study Groups</span>
            </TabsTrigger>
            <TabsTrigger value="memorization" className="flex flex-col md:flex-row items-center text-xs md:text-sm p-2 md:p-3 gap-1 md:gap-2">
              <Star className="w-4 h-4 md:w-4 md:h-4 text-purple-600 flex-shrink-0" />
              <span className="leading-tight text-center">Memorization</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex flex-col md:flex-row items-center text-xs md:text-sm p-2 md:p-3 gap-1 md:gap-2">
              <Trophy className="w-4 h-4 md:w-4 md:h-4 text-emerald-600 flex-shrink-0" />
              <span className="leading-tight text-center">My Progress</span>
            </TabsTrigger>
          </TabsList>

          {/* Quran Reader Tab */}
          <TabsContent value="reader">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-amber-900">Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-amber-700 mb-2 block">Select Surah</label>
                  <Select value={selectedSurah} onValueChange={setSelectedSurah}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1. Al-Fatiha</SelectItem>
                      <SelectItem value="2">2. Al-Baqarah</SelectItem>
                      <SelectItem value="3">3. Al-Imran</SelectItem>
                      <SelectItem value="4">4. An-Nisa</SelectItem>
                      <SelectItem value="112">112. Al-Ikhlas</SelectItem>
                      <SelectItem value="113">113. Al-Falaq</SelectItem>
                      <SelectItem value="114">114. An-Nas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-amber-700 mb-2 block">Translation</label>
                  <Select value={selectedTranslation} onValueChange={setSelectedTranslation}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sahih">Sahih International</SelectItem>
                      <SelectItem value="yusuf">Yusuf Ali</SelectItem>
                      <SelectItem value="pickthall">Pickthall</SelectItem>
                      <SelectItem value="shakir">Shakir</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-amber-500" />
                  <Input 
                    placeholder="Search verses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm text-amber-700 mb-2">
                    <span>Reading Progress</span>
                    <span>{readingProgress}%</span>
                  </div>
                  <Progress value={readingProgress} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Bookmarked Verses */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-amber-900 flex items-center">
                  <Bookmark className="w-5 h-5 mr-2" />
                  Bookmarks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {bookmarkedVerses.map((verse, index) => (
                    <div key={index} className="p-3 bg-amber-50 rounded-lg cursor-pointer hover:bg-amber-100 transition-colors">
                      <div className="text-sm text-amber-900 mb-1">{verse.surah} {verse.ayah}</div>
                      <div className="text-xs text-amber-600 mb-1">{verse.text.slice(0, 30)}...</div>
                      <div className="text-xs text-amber-500">{verse.notes}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Reading Area */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-amber-900">Surah Al-Baqarah (The Cow)</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Play className="w-4 h-4 mr-1" />
                      Play Audio
                    </Button>
                    <Button variant="outline" size="sm">
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Verse Display */}
                <div className="space-y-6">
                  {[1, 2, 3].map((ayah) => (
                    <div key={ayah} className="border-l-4 border-amber-300 pl-6 py-4 bg-gradient-to-r from-amber-50 to-transparent">
                      <div className="flex items-start justify-between mb-4">
                        <Badge className="bg-amber-600 text-white">{ayah}</Badge>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Star className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Bookmark className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Heart className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Arabic Text */}
                      <div className="text-right text-2xl leading-loose text-amber-900 mb-4" dir="rtl">
                        {ayah === 1 && "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ"}
                        {ayah === 2 && "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ"}
                        {ayah === 3 && "الرَّحْمَنِ الرَّحِيمِ"}
                      </div>

                      {/* Transliteration */}
                      <div className="text-amber-700 italic mb-3">
                        {ayah === 1 && "Bismillahi r-rahmani r-raheem"}
                        {ayah === 2 && "Alhamdu lillahi rabbi l-alameen"}
                        {ayah === 3 && "Ar-rahmani r-raheem"}
                      </div>

                      {/* Translation */}
                      <div className="text-amber-900 leading-relaxed">
                        {ayah === 1 && "In the name of Allah, the Entirely Merciful, the Especially Merciful."}
                        {ayah === 2 && "[All] praise is [due] to Allah, Lord of the worlds -"}
                        {ayah === 3 && "The Entirely Merciful, the Especially Merciful,"}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Personal Notes Section */}
                <Card className="bg-amber-50 border-amber-200">
                  <CardHeader>
                    <CardTitle className="text-amber-900 text-lg">Personal Reflection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea 
                      placeholder="Add your personal notes and reflections about these verses..."
                      value={personalNote}
                      onChange={(e) => setPersonalNote(e.target.value)}
                      className="min-h-[100px] border-amber-200"
                    />
                    <Button className="mt-3 bg-amber-600 hover:bg-amber-700 text-white">
                      Save Reflection
                    </Button>
                  </CardContent>
                </Card>

                {/* Navigation */}
                <div className="flex justify-between">
                  <Button variant="outline" className="border-amber-300 text-amber-700">
                    ← Previous Ayah
                  </Button>
                  <Button variant="outline" className="border-amber-300 text-amber-700">
                    Next Ayah →
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
          </TabsContent>

          {/* Study Groups Tab */}
          <TabsContent value="study">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studyGroups.map((group, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-amber-900 text-lg">{group.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-amber-600">Members:</span>
                        <span className="text-amber-900">{group.members}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-amber-600">Meeting:</span>
                        <span className="text-amber-900">{group.meeting}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-amber-600">Leader:</span>
                        <span className="text-amber-900">{group.leader}</span>
                      </div>
                    </div>
                    <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                      Join Group
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Memorization Tab */}
          <TabsContent value="memorization">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-amber-900">Memorization Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {memorization.map((surah, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-amber-900">{surah.surah}</span>
                          <span className="text-amber-600">{surah.progress}% ({Math.floor(surah.verses * surah.progress / 100)}/{surah.verses} verses)</span>
                        </div>
                        <Progress value={surah.progress} className="h-3" />
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline" className="border-amber-300 text-amber-700">
                            Practice
                          </Button>
                          <Button size="sm" variant="outline" className="border-amber-300 text-amber-700">
                            Test
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-amber-900">Daily Practice</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-amber-50 rounded-lg">
                      <h3 className="text-amber-900 mb-2">Today's Goal</h3>
                      <p className="text-amber-700 text-sm mb-3">Memorize 3 verses from Al-Baqarah</p>
                      <Progress value={67} className="h-2 mb-2" />
                      <p className="text-xs text-amber-600">2/3 verses completed</p>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h3 className="text-green-900 mb-2">Streak: 15 days 🔥</h3>
                      <p className="text-green-700 text-sm">Keep it up! You're on track for a 30-day milestone.</p>
                    </div>

                    <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                      Start Practice Session
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-amber-900">Reading Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-6 mb-6">
                      <div className="text-center">
                        <div className="text-3xl text-amber-900 mb-1">23%</div>
                        <div className="text-sm text-amber-600">Quran Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl text-amber-900 mb-1">142</div>
                        <div className="text-sm text-amber-600">Pages Read</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl text-amber-900 mb-1">28</div>
                        <div className="text-sm text-amber-600">Days Active</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-amber-900 mb-2">Monthly Goals</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-amber-700">Read 50 pages</span>
                            <span className="text-amber-900">34/50</span>
                          </div>
                          <Progress value={68} className="h-2" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-amber-700">Complete 5 surahs</span>
                          <span className="text-amber-900">3/5</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-amber-900">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-sm">
                        <div className="text-amber-900">Al-Baqarah completed</div>
                        <div className="text-amber-600 text-xs">2 hours ago</div>
                      </div>
                      <div className="text-sm">
                        <div className="text-amber-900">Added 3 bookmarks</div>
                        <div className="text-amber-600 text-xs">Yesterday</div>
                      </div>
                      <div className="text-sm">
                        <div className="text-amber-900">Joined study group</div>
                        <div className="text-amber-600 text-xs">3 days ago</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <QuickNav onNavigate={onNavigate} currentPage="quran" />
    </div>
  )
}