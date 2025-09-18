import { useState, useEffect } from 'react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Star, Trophy, Users, BookOpen, Clock, Flame, Target, Check, Play, ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface HomeSectionProps {
  onNavigate?: (page: string) => void
}

interface PrayerTime {
  name: string
  time: string
  status: 'completed' | 'current' | 'upcoming'
  next: boolean
}

interface Location {
  latitude: number
  longitude: number
  city: string
  country: string
}

const weeklyChampions = [
  {
    name: "Ahmed Hassan",
    mosque: "Al-Noor Mosque",
    achievement: "Most Prayers This Week",
    points: 98,
    streak: 15
  },
  {
    name: "Fatima Al-Zahra",
    mosque: "Masjid As-Salam", 
    achievement: "Quran Reading Champion",
    points: 156,
    streak: 22
  },
  {
    name: "Omar Abdullah",
    mosque: "Islamic Center",
    achievement: "Community Volunteer",
    points: 89,
    streak: 8
  }
]

const stats = [
  { label: "Active Mosques", value: "1,247", icon: "🕌" },
  { label: "Community Members", value: "45,892", icon: "👥" },
  { label: "Prayers Logged Today", value: "8,934", icon: "🤲" },
  { label: "Quran Sessions", value: "2,156", icon: "📖" }
]

const islamicInfluencers = [
  {
    id: 1,
    name: "Sheikh Yasir Qadhi",
    title: "Islamic Theology & History",
    thumbnail: "https://images.unsplash.com/photo-1547807277-7fa9b944effe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtdXNsaW0lMjBicm90aGVyJTIwbWFuJTIwdHJhZGl0aW9uYWx8ZW58MXx8fHwxNzU4MTI2Njc0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    videoTitle: "Understanding Islamic Finance in Modern Times",
    duration: "15:30",
    views: "125K"
  },
  {
    id: 2,
    name: "Ustadh Nouman Ali Khan",
    title: "Quran Translation & Tafseer",
    thumbnail: "https://images.unsplash.com/photo-1705320941669-4909d97cb5cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtdXNsaW0lMjBtZW4lMjBjb21tdW5pdHklMjBwcmF5ZXJ8ZW58MXx8fHwxNzU4MTI2NjYwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    videoTitle: "Beautiful Lessons from Surah Al-Kahf",
    duration: "22:45",
    views: "89K"
  },
  {
    id: 3,
    name: "Mufti Menk",
    title: "Motivational Islamic Speaker",
    thumbnail: "https://images.unsplash.com/photo-1683828936774-73fc3aafd6d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtdXNsaW0lMjBjb21tdW5pdHklMjBpbmRpYSUyMGJyb3RoZXJzJTIwZ2F0aGVyaW5nfGVufDF8fHx8MTc1ODEyNjY4N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    videoTitle: "How to Make Every Day Count",
    duration: "12:20",
    views: "205K"
  },
  {
    id: 4,
    name: "Dr. Omar Suleiman",
    title: "Islamic Ethics & Society",
    thumbnail: "https://images.unsplash.com/photo-1547807277-7fa9b944effe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtdXNsaW0lMjBicm90aGVyJTIwbWFuJTIwdHJhZGl0aW9uYWx8ZW58MXx8fHwxNzU4MTI2Njc0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    videoTitle: "Dealing with Hardships: Islamic Perspective",
    duration: "18:10",
    views: "167K"
  }
]

// Prayer time calculation based on location (simplified Islamic calculation)
const calculatePrayerTimes = (location: Location, date: Date): PrayerTime[] => {
  const { latitude, longitude } = location
  
  // Simplified calculation - in real app would use proper Islamic calculation methods
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000)
  const solarDeclination = 23.45 * Math.sin((360 / 365) * (dayOfYear - 81) * Math.PI / 180)
  
  // Calculate sun times (simplified)
  const timeZoneOffset = date.getTimezoneOffset() / 60
  const noon = 12 - timeZoneOffset - (longitude / 15)
  
  // Calculate prayer times (approximate)
  const fajrTime = noon - 6.5
  const dhuhrTime = noon + 0.5
  const asrTime = noon + 4
  const maghribTime = noon + 6.5
  const ishaTime = noon + 8
  
  const formatTime = (time: number) => {
    const hours = Math.floor(time)
    const minutes = Math.floor((time - hours) * 60)
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  }
  
  const currentHour = date.getHours() + date.getMinutes() / 60
  
  const prayers = [
    { name: "Fajr", time: formatTime(fajrTime), rawTime: fajrTime },
    { name: "Dhuhr", time: formatTime(dhuhrTime), rawTime: dhuhrTime },
    { name: "Asr", time: formatTime(asrTime), rawTime: asrTime },
    { name: "Maghrib", time: formatTime(maghribTime), rawTime: maghribTime },
    { name: "Isha", time: formatTime(ishaTime), rawTime: ishaTime },
  ]
  
  // Determine current prayer status
  let nextPrayerIndex = prayers.findIndex(p => p.rawTime > currentHour)
  if (nextPrayerIndex === -1) nextPrayerIndex = 0 // Next day Fajr
  
  return prayers.map((prayer, index) => ({
    name: prayer.name,
    time: prayer.time,
    status: index < nextPrayerIndex ? 'completed' : 
            index === nextPrayerIndex ? 'current' : 'upcoming',
    next: index === nextPrayerIndex
  })) as PrayerTime[]
}

// Default location (Bangalore, India)
const DEFAULT_LOCATION: Location = {
  latitude: 12.9716,
  longitude: 77.5946,
  city: "Bangalore",
  country: "India"
}

export function HomeSection({ onNavigate }: HomeSectionProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [location, setLocation] = useState<Location>(DEFAULT_LOCATION)
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([])
  const [nextPrayer, setNextPrayer] = useState<PrayerTime | null>(null)
  const [timeUntilNext, setTimeUntilNext] = useState("")
  const [currentInfluencerIndex, setCurrentInfluencerIndex] = useState(0)
  const [locationError, setLocationError] = useState<string | null>(null)

  // Get user location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          
          try {
            // Try to get city name using reverse geocoding (simplified)
            // In real app, you'd use a proper geocoding service
            const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
            const data = await response.json()
            
            setLocation({
              latitude,
              longitude,
              city: data.city || data.locality || "Unknown City",
              country: data.countryName || "Unknown Country"
            })
          } catch (error) {
            // If geocoding fails, use coordinates
            setLocation({
              latitude,
              longitude,
              city: `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`,
              country: "Unknown"
            })
          }
        },
        (error) => {
          setLocationError("Location access denied. Using default location (Bangalore).")
          console.log("Location error:", error.message)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      )
    } else {
      setLocationError("Geolocation not supported. Using default location (Bangalore).")
    }
  }, [])

  // Calculate prayer times when location or date changes
  useEffect(() => {
    const prayers = calculatePrayerTimes(location, currentTime)
    setPrayerTimes(prayers)
    
    const next = prayers.find(p => p.next) || prayers[0] // If no next prayer today, use Fajr tomorrow
    setNextPrayer(next)
  }, [location, currentTime])

  // Update current time and countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now)
      
      if (nextPrayer) {
        const [hours, minutes] = nextPrayer.time.split(':').map(Number)
        const prayerTime = new Date()
        prayerTime.setHours(hours, minutes, 0, 0)
        
        // If prayer time has passed, it's for tomorrow
        if (prayerTime < now) {
          prayerTime.setDate(prayerTime.getDate() + 1)
        }
        
        const diff = prayerTime.getTime() - now.getTime()
        const hoursLeft = Math.floor(diff / (1000 * 60 * 60))
        const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        
        if (hoursLeft >= 0 && minutesLeft >= 0) {
          setTimeUntilNext(`${hoursLeft}h ${minutesLeft}m`)
        } else {
          // Recalculate prayer times if we've passed into a new prayer time
          const prayers = calculatePrayerTimes(location, now)
          setPrayerTimes(prayers)
          const next = prayers.find(p => p.next) || prayers[0]
          setNextPrayer(next)
        }
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [nextPrayer, location])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100 text-gray-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-emerald-600 rounded-full"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-emerald-600 transform rotate-45"></div>
        <div className="absolute bottom-32 left-1/3 w-16 h-16 border-2 border-emerald-600 rounded-full"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 md:px-6 md:py-20">
        {/* User Dashboard Section - Mobile First */}
        <div className="mb-8 md:hidden">
          <div className="bg-white rounded-xl p-4 border border-emerald-200 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Assalamu Alaikum, Ahmed</h2>
                <p className="text-sm text-gray-600">Keep up your amazing streak! 🔥</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-emerald-600">7</div>
                <div className="text-xs text-gray-500">Day Streak</div>
              </div>
            </div>
            
            {/* Points and Streak */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg p-3 text-white text-center">
                <Flame className="w-5 h-5 mx-auto mb-1" />
                <div className="text-lg font-bold">35</div>
                <div className="text-xs opacity-90">Prayer Streak</div>
              </div>
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg p-3 text-white text-center">
                <Star className="w-5 h-5 mx-auto mb-1" />
                <div className="text-lg font-bold">1,250</div>
                <div className="text-xs opacity-90">Total Points</div>
              </div>
            </div>

            {/* Islamic Influencers Video Carousel */}
            <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg p-3 border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-800">Islamic Influencers</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-purple-300 text-purple-700 hover:bg-purple-100 p-1"
                    onClick={() => setCurrentInfluencerIndex(prev => prev > 0 ? prev - 1 : islamicInfluencers.length - 1)}
                  >
                    <ChevronLeft className="w-3 h-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-purple-300 text-purple-700 hover:bg-purple-100 p-1"
                    onClick={() => setCurrentInfluencerIndex(prev => prev < islamicInfluencers.length - 1 ? prev + 1 : 0)}
                  >
                    <ChevronRight className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <ImageWithFallback
                  src={islamicInfluencers[currentInfluencerIndex].thumbnail}
                  alt={islamicInfluencers[currentInfluencerIndex].name}
                  className="w-full h-20 object-cover rounded"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <div className="absolute bottom-1 left-1 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  {islamicInfluencers[currentInfluencerIndex].duration}
                </div>
                <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  {islamicInfluencers[currentInfluencerIndex].views}
                </div>
              </div>
              
              <div className="mt-2">
                <p className="text-xs font-medium text-purple-800">{islamicInfluencers[currentInfluencerIndex].name}</p>
                <p className="text-xs text-purple-700">{islamicInfluencers[currentInfluencerIndex].videoTitle}</p>
              </div>
            </div>
          </div>

          {/* Prayer Status - Mobile with Live Time and Location */}
          <div className="mt-4 bg-white rounded-xl p-4 border border-emerald-200 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-700">Today's Prayers</h3>
              <div className="text-right">
                <div className="text-lg font-bold text-emerald-600">
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </div>
                <div className="text-xs text-gray-500">
                  {currentTime.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
                </div>
              </div>
            </div>

            {/* Location Display */}
            <div className="mb-3 p-2 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center text-xs text-blue-800">
                <MapPin className="w-3 h-3 mr-1" />
                <span className="font-medium">{location.city}, {location.country}</span>
                {locationError && (
                  <span className="ml-2 text-orange-600">({locationError.split('.')[0]})</span>
                )}
              </div>
            </div>
            
            {nextPrayer && (
              <div className="mb-3 p-2 bg-amber-50 rounded-lg border border-amber-200">
                <div className="text-xs text-amber-800">
                  Next Prayer: <span className="font-medium">{nextPrayer.name}</span> in {timeUntilNext}
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-5 gap-2">
              {prayerTimes.map((prayer, index) => (
                <div key={index} className="text-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-1 ${
                    prayer.status === 'completed' ? 'bg-green-500 text-white' :
                    prayer.status === 'current' ? 'bg-amber-500 text-white animate-pulse' :
                    'bg-gray-200 text-gray-500'
                  }`}>
                    {prayer.status === 'completed' ? (
                      <Check className="w-4 h-4" />
                    ) : prayer.status === 'current' ? (
                      <Clock className="w-3 h-3" />
                    ) : (
                      <Target className="w-3 h-3" />
                    )}
                  </div>
                  <div className={`text-xs ${
                    prayer.status === 'current' ? 'text-amber-600 font-medium' : 'text-gray-600'
                  }`}>{prayer.name}</div>
                  <div className={`text-xs ${
                    prayer.status === 'current' ? 'text-amber-500 font-medium' : 'text-gray-500'
                  }`}>{prayer.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Hero Section - Desktop */}
        <div className="text-center mb-16 hidden md:block">
          <div className="mb-8">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1608658125338-f956286fb827?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjBtb3NxdWUlMjBzdW5zZXQlMjBpc2xhbWljJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc1Nzc1Njc5NHww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Beautiful mosque at sunset"
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-yellow-300 shadow-2xl"
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent font-bold">
            MosqueConnect
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Strengthening the Ummah through Technology, Unity, and Faith
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 px-4 py-2">
              ✨ Connect with your Community
            </Badge>
            <Badge className="bg-teal-100 text-teal-800 border-teal-200 px-4 py-2">
              📿 Track Your Spiritual Journey
            </Badge>
            <Badge className="bg-green-100 text-green-800 border-green-200 px-4 py-2">
              🤝 Make a Difference Together
            </Badge>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3"
              onClick={() => onNavigate?.('quran')}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Start Reading Quran
            </Button>
            <Button 
              variant="outline" 
              className="border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white px-8 py-3"
              onClick={() => onNavigate?.('community')}
            >
              <Users className="w-5 h-5 mr-2" />
              Find Local Events
            </Button>
          </div>
        </div>

        {/* Quick Action Cards - Mobile */}
        <div className="grid grid-cols-2 gap-4 mb-6 md:hidden">
          <Button 
            className="bg-emerald-600 hover:bg-emerald-700 text-white h-20 flex-col gap-2"
            onClick={() => onNavigate?.('quran')}
          >
            <BookOpen className="w-6 h-6" />
            <span className="text-sm">Read Quran</span>
          </Button>
          <Button 
            variant="outline" 
            className="border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white h-20 flex-col gap-2"
            onClick={() => onNavigate?.('community')}
          >
            <Users className="w-6 h-6" />
            <span className="text-sm">Community</span>
          </Button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white border-emerald-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-3 md:p-6 text-center">
                <div className="text-2xl md:text-3xl mb-1 md:mb-2">{stat.icon}</div>
                <div className="text-lg md:text-2xl mb-1 text-gray-900 font-bold">{stat.value}</div>
                <div className="text-gray-600 text-xs md:text-sm">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Weekly Champions */}
        <div className="bg-white rounded-xl p-4 md:p-8 border border-emerald-200 shadow-lg">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="text-xl md:text-3xl flex items-center text-gray-900">
              <Trophy className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-amber-500" />
              Weekly Champions
            </h2>
            <Badge className="bg-amber-500 text-white px-2 md:px-3 py-1 text-xs md:text-sm">
              This Week
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {weeklyChampions.map((champion, index) => (
              <Card key={index} className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 hover:shadow-lg transition-all">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center mb-3 md:mb-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center mr-3 md:mr-4">
                      <Star className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg text-gray-900 font-medium">{champion.name}</h3>
                      <p className="text-gray-600 text-sm">{champion.mosque}</p>
                    </div>
                  </div>
                  
                  <div className="mb-3 md:mb-4">
                    <Badge className="bg-emerald-600 text-white text-xs mb-2">
                      {champion.achievement}
                    </Badge>
                    <div className="flex justify-between text-sm text-gray-700">
                      <span>Points: <strong className="text-gray-900">{champion.points}</strong></span>
                      <span>Streak: <strong className="text-gray-900">{champion.streak} days</strong></span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8 md:mt-16 hidden md:block">
          <h3 className="text-2xl mb-4 text-gray-900">Ready to Strengthen Your Faith Community?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of Muslims using MosqueConnect to enhance their spiritual journey, 
            connect with their community, and make a positive impact.
          </p>
          <Button 
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-12 py-3"
            onClick={() => onNavigate?.('profile')}
          >
            Join the Community
          </Button>
        </div>
      </div>
    </div>
  )
}