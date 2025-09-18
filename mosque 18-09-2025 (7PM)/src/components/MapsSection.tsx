import image_b6c9bd2c8cc1cafd274b2dfaca5aad7fbdc5b39c from 'figma:asset/b6c9bd2c8cc1cafd274b2dfaca5aad7fbdc5b39c.png';
import image_6ef797bf6b329a19920ab4f21795c021c1a3e3c6 from 'figma:asset/6ef797bf6b329a19920ab4f21795c021c1a3e3c6.png';
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { MapPin, Search, Clock, Users, Calendar, Star, Navigation, Utensils, GraduationCap, Phone, Globe, ExternalLink } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

const nearbyMosques = [
  {
    name: "Jama Masjid Delhi",
    distance: "0.3 km",
    rating: 4.8,
    nextPrayer: "Asr - 3:45 PM",
    features: ["Parking", "Wudu Area", "Separate Prayer Area"],
    address: "Chandni Chowk, Old Delhi",
    phone: "+91 11 2326 4540",
    image: "https://images.unsplash.com/photo-1713691132931-1cc66e362cdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYW1hJTIwbWFzamlkJTIwZGVsaGklMjBpbmRpYXxlbnwxfHx8fDE3NTgxMjY2NzB8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    name: "Masjid-e-Noor",
    distance: "0.7 km", 
    rating: 4.9,
    nextPrayer: "Asr - 3:50 PM",
    features: ["Parking", "Children's Area", "Islamic Library"],
    address: "New Delhi, Central Delhi",
    phone: "+91 11 4567 8901",
    image: "https://images.unsplash.com/photo-1750490987045-8ddc04a5f505?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtb3NxdWUlMjBhcmNoaXRlY3R1cmUlMjBiZWF1dGlmdWx8ZW58MXx8fHwxNzU4MTI2NjU2fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    name: "Masjid Al-Hidayah",
    distance: "1.2 km",
    rating: 4.7,
    nextPrayer: "Asr - 3:55 PM", 
    features: ["Parking", "Community Kitchen", "Madrasa"],
    address: "South Delhi, India",
    phone: "+91 11 2345 6789",
    image: "https://images.unsplash.com/photo-1750490987045-8ddc04a5f505?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwYXJjaGl0ZWN0dXJlJTIwaW5kaWElMjBiZWF1dGlmdWwlMjBtb3NxdWV8ZW58MXx8fHwxNzU4MTI2NjgyfDA&ixlib=rb-4.1.0&q=80&w=1080"
  }
]

const upcomingEvents = [
  {
    title: "Jummah Khutbah",
    mosque: "Jama Masjid Delhi",
    time: "1:00 PM",
    date: "Tomorrow",
    type: "Prayer",
    attendees: 180,
    image: "https://images.unsplash.com/photo-1705320941669-4909d97cb5cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtdXNsaW0lMjBtZW4lMjBjb21tdW5pdHklMjBwcmF5ZXJ8ZW58MXx8fHwxNzU4MTI2NjYwfDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    title: "Quran Majlis",
    mosque: "Masjid-e-Noor", 
    time: "7:00 PM",
    date: "Jan 15",
    type: "Education",
    attendees: 25,
    image: "https://images.unsplash.com/photo-1683828936774-73fc3aafd6d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtdXNsaW0lMjBjb21tdW5pdHklMjBpbmRpYSUyMGJyb3RoZXJzJTIwZ2F0aGVyaW5nfGVufDF8fHx8MTc1ODEyNjY4N3ww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    title: "Community Iftar",
    mosque: "Masjid Al-Hidayah",
    time: "6:30 PM", 
    date: "Jan 18",
    type: "Social",
    attendees: 120,
    image: "https://images.unsplash.com/photo-1683828936774-73fc3aafd6d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtdXNsaW0lMjBjb21tdW5pdHklMjBpbmRpYSUyMGJyb3RoZXJzJTIwZ2F0aGVyaW5nfGVufDF8fHx8MTc1ODEyNjY4N3ww&ixlib=rb-4.1.0&q=80&w=1080"
  }
]

const services = [
  { name: "Halal Restaurants", count: 23, icon: "🍽️" },
  { name: "Islamic Schools", count: 8, icon: "🏫" },
  { name: "Halal Markets", count: 15, icon: "🛒" },
  { name: "Islamic Libraries", count: 5, icon: "📚" }
]

const halalRestaurants = [
  { 
    name: "Bismillah Biryani House", 
    cuisine: "Indian Muslim", 
    rating: 4.8, 
    distance: "0.5 km", 
    price: "₹₹",
    address: "Old Delhi, Chandni Chowk",
    phone: "+91 11 2345 1111",
    image: "https://images.unsplash.com/photo-1718114243715-8252d5382319?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWxhbCUyMHJlc3RhdXJhbnQlMjBpbmRpYW4lMjBtdXNsaW0lMjBmb29kfGVufDF8fHx8MTc1ODEyNjY3OXww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  { 
    name: "Al-Jawahar Restaurant", 
    cuisine: "Mughlai", 
    rating: 4.6, 
    distance: "0.8 km", 
    price: "₹₹",
    address: "Jama Masjid Road, Delhi",
    phone: "+91 11 2326 4444",
    image: "https://images.unsplash.com/photo-1718114243715-8252d5382319?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWxhbCUyMHJlc3RhdXJhbnQlMjBpbmRpYW4lMjBtdXNsaW0lMjBmb29kfGVufDF8fHx8MTc1ODEyNjY3OXww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  { 
    name: "Karim's Restaurant", 
    cuisine: "Mughlai", 
    rating: 4.9, 
    distance: "1.2 km", 
    price: "₹₹₹",
    address: "Gali Kababian, Jama Masjid",
    phone: "+91 11 2326 9880",
    image: "https://images.unsplash.com/photo-1718114243715-8252d5382319?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWxhbCUyMHJlc3RhdXJhbnQlMjBpbmRpYW4lMjBtdXNsaW0lMjBmb29kfGVufDF8fHx8MTc1ODEyNjY3OXww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  { 
    name: "Shahjahanabad Biryani", 
    cuisine: "Indian Muslim", 
    rating: 4.7, 
    distance: "1.5 km", 
    price: "₹₹",
    address: "Ballimaran, Old Delhi",
    phone: "+91 11 4567 7777",
    image: "https://images.unsplash.com/photo-1718114243715-8252d5382319?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWxhbCUyMHJlc3RhdXJhbnQlMjBpbmRpYW4lMjBtdXNsaW0lMjBmb29kfGVufDF8fHx8MTc1ODEyNjY3OXww&ixlib=rb-4.1.0&q=80&w=1080"
  }
]

const islamicSchools = [
  { 
    name: "Jamia Millia Islamia", 
    type: "University", 
    students: 15000, 
    established: "1920",
    address: "Jamia Nagar, New Delhi",
    phone: "+91 11 2698 1717",
    image: "https://images.unsplash.com/photo-1643429096345-9de0d2ab7e7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwc2Nob29sJTIwaW5kaWElMjBtYWRyYXNhJTIwZWR1Y2F0aW9ufGVufDF8fHx8MTc1ODEyNjY2Nnww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  { 
    name: "Darul Uloom Delhi", 
    type: "Madrasa", 
    students: 450, 
    established: "1982",
    address: "Okhla, New Delhi",
    phone: "+91 11 2632 4545",
    image: "https://images.unsplash.com/photo-1643429096345-9de0d2ab7e7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwc2Nob29sJTIwaW5kaWElMjBtYWRyYXNhJTIwZWR1Y2F0aW9ufGVufDF8fHx8MTc1ODEyNjY2Nnww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  { 
    name: "Al-Huda Islamic Academy", 
    type: "Smart School", 
    students: 800, 
    established: "2010",
    address: "Batla House, Jamia Nagar",
    phone: "+91 11 2692 8080",
    image: "https://images.unsplash.com/photo-1643429096345-9de0d2ab7e7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwc2Nob29sJTIwaW5kaWElMjBtYWRyYXNhJTIwZWR1Y2F0aW9ufGVufDF8fHx8MTc1ODEyNjY2Nnww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  { 
    name: "Modern Islamic School", 
    type: "CBSE Affiliated", 
    students: 600, 
    established: "2005",
    address: "Abul Fazal Enclave, Delhi",
    phone: "+91 11 2697 9999",
    image: "https://images.unsplash.com/photo-1643429096345-9de0d2ab7e7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwc2Nob29sJTIwaW5kaWElMjBtYWRyYXNhJTIwZWR1Y2F0aW9ufGVufDF8fHx8MTc1ODEyNjY2Nnww&ixlib=rb-4.1.0&q=80&w=1080"
  }
]

const searchSuggestions = [
  "Jama Masjid Delhi",
  "Masjid-e-Noor", 
  "Masjid Al-Hidayah",
  "Old Delhi",
  "New Delhi",
  "South Delhi",
  "Bismillah Biryani House",
  "Halal restaurants near me",
  "Jummah prayer",
  "Islamic schools Delhi",
  "Jamia Millia Islamia",
  "Al-Jawahar Restaurant",
  "Karim's Restaurant"
]

export function MapsSection() {
  const [searchLocation, setSearchLocation] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("mosques")
  const [showSuggestions, setShowSuggestions] = useState(false)

  const filteredSuggestions = searchSuggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(searchLocation.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <ImageWithFallback 
            src={image_b6c9bd2c8cc1cafd274b2dfaca5aad7fbdc5b39c}
            alt="Indian Muslim community"
            className="w-16 h-16 md:w-24 md:h-24 rounded-full mx-auto mb-4 md:mb-6 object-cover border-4 border-indigo-300"
          />
          <h1 className="text-2xl md:text-4xl mb-2 md:mb-4 text-indigo-900 font-bold">Maps & Discovery</h1>
          <p className="text-indigo-800 max-w-2xl mx-auto text-sm md:text-base px-4">
            Find nearby mosques, Islamic services, and community events in India
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 md:mb-8">
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-indigo-500" />
                <Input 
                  placeholder="Search location or mosque name..."
                  value={searchLocation}
                  onChange={(e) => {
                    setSearchLocation(e.target.value)
                    setShowSuggestions(e.target.value.length > 0)
                  }}
                  onFocus={() => setShowSuggestions(searchLocation.length > 0)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="pl-10"
                />
                
                {/* Search Suggestions */}
                {showSuggestions && filteredSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                    {filteredSuggestions.slice(0, 5).map((suggestion, index) => (
                      <button
                        key={index}
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm"
                        onClick={() => {
                          setSearchLocation(suggestion)
                          setShowSuggestions(false)
                        }}
                      >
                        <Search className="w-3 h-3 mr-2 inline text-gray-400" />
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Places</SelectItem>
                  <SelectItem value="mosques">Mosques</SelectItem>
                  <SelectItem value="restaurants">Halal Restaurants</SelectItem>
                  <SelectItem value="schools">Islamic Schools</SelectItem>
                  <SelectItem value="markets">Halal Markets</SelectItem>
                </SelectContent>
              </Select>

              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <Navigation className="w-4 h-4 mr-2" />
                Use My Location
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 md:mb-8 h-auto">
            <TabsTrigger value="mosques" className="flex flex-col md:flex-row items-center text-xs md:text-sm p-2 md:p-3 gap-1 md:gap-2">
              <MapPin className="w-4 h-4 md:w-4 md:h-4 text-emerald-600 flex-shrink-0" />
              <span className="leading-tight text-center">Mosques</span>
            </TabsTrigger>
            <TabsTrigger value="restaurants" className="flex flex-col md:flex-row items-center text-xs md:text-sm p-2 md:p-3 gap-1 md:gap-2">
              <Utensils className="w-4 h-4 md:w-4 md:h-4 text-orange-600 flex-shrink-0" />
              <span className="leading-tight text-center">Restaurants</span>
            </TabsTrigger>
            <TabsTrigger value="schools" className="flex flex-col md:flex-row items-center text-xs md:text-sm p-2 md:p-3 gap-1 md:gap-2">
              <GraduationCap className="w-4 h-4 md:w-4 md:h-4 text-blue-600 flex-shrink-0" />
              <span className="leading-tight text-center">Schools</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex flex-col md:flex-row items-center text-xs md:text-sm p-2 md:p-3 gap-1 md:gap-2">
              <Calendar className="w-4 h-4 md:w-4 md:h-4 text-purple-600 flex-shrink-0" />
              <span className="leading-tight text-center">Events</span>
            </TabsTrigger>
          </TabsList>

          {/* Mosques Tab */}
          <TabsContent value="mosques">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Map Area */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-indigo-900 flex items-center text-base md:text-lg">
                      <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-2 text-emerald-600" />
                      Bangalore Interactive Map
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Demo Interactive Map - Bangalore */}
                    <div className="h-64 md:h-96 bg-gradient-to-br from-emerald-100 via-blue-100 to-purple-100 rounded-lg relative overflow-hidden border-2 border-emerald-200">
                      {/* Map Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="grid grid-cols-8 grid-rows-6 h-full">
                          {Array.from({length: 48}).map((_, i) => (
                            <div key={i} className="border border-gray-300"></div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Bangalore Islamic Locations */}
                      <div className="absolute top-6 left-20 group cursor-pointer">
                        <div className="w-6 h-6 bg-emerald-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center animate-pulse">
                          <MapPin className="w-3 h-3 text-white" />
                        </div>
                        <div className="absolute top-8 left-0 bg-white rounded-lg shadow-lg p-2 min-w-40 hidden group-hover:block">
                          <div className="text-xs font-medium">Masjid-e-Khadria</div>
                          <div className="text-xs text-gray-600">Fraser Town • Next prayer: 3:45 PM</div>
                        </div>
                      </div>
                      
                      <div className="absolute top-16 right-16 group cursor-pointer">
                        <div className="w-6 h-6 bg-orange-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                          <Utensils className="w-3 h-3 text-white" />
                        </div>
                        <div className="absolute top-8 right-0 bg-white rounded-lg shadow-lg p-2 min-w-40 hidden group-hover:block">
                          <div className="text-xs font-medium">Nagarjuna Restaurant</div>
                          <div className="text-xs text-gray-600">Shivaji Nagar • Halal South Indian • ⭐ 4.6</div>
                        </div>
                      </div>
                      
                      <div className="absolute top-20 left-12 group cursor-pointer">
                        <div className="w-6 h-6 bg-emerald-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                          <MapPin className="w-3 h-3 text-white" />
                        </div>
                        <div className="absolute top-8 left-0 bg-white rounded-lg shadow-lg p-2 min-w-40 hidden group-hover:block">
                          <div className="text-xs font-medium">Jamia Masjid</div>
                          <div className="text-xs text-gray-600">Russell Market • Historic Mosque</div>
                        </div>
                      </div>
                      
                      <div className="absolute bottom-16 left-28 group cursor-pointer">
                        <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                          <GraduationCap className="w-3 h-3 text-white" />
                        </div>
                        <div className="absolute bottom-8 left-0 bg-white rounded-lg shadow-lg p-2 min-w-40 hidden group-hover:block">
                          <div className="text-xs font-medium">Al-Ameen College</div>
                          <div className="text-xs text-gray-600">Hosur Road • Islamic Education • 2500 students</div>
                        </div>
                      </div>
                      
                      <div className="absolute bottom-20 right-20 group cursor-pointer">
                        <div className="w-6 h-6 bg-orange-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                          <Utensils className="w-3 h-3 text-white" />
                        </div>
                        <div className="absolute bottom-8 right-0 bg-white rounded-lg shadow-lg p-2 min-w-40 hidden group-hover:block">
                          <div className="text-xs font-medium">Adyar Ananda Bhavan</div>
                          <div className="text-xs text-gray-600">Brigade Road • Halal Certified • ⭐ 4.4</div>
                        </div>
                      </div>
                      
                      <div className="absolute bottom-12 right-8 group cursor-pointer">
                        <div className="w-6 h-6 bg-purple-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                          <Calendar className="w-3 h-3 text-white" />
                        </div>
                        <div className="absolute bottom-8 right-0 bg-white rounded-lg shadow-lg p-2 min-w-40 hidden group-hover:block">
                          <div className="text-xs font-medium">Eid Celebration</div>
                          <div className="text-xs text-gray-600">Jan 20 • Palace Grounds • 500+ attendees</div>
                        </div>
                      </div>

                      <div className="absolute top-32 right-32 group cursor-pointer">
                        <div className="w-6 h-6 bg-emerald-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                          <MapPin className="w-3 h-3 text-white" />
                        </div>
                        <div className="absolute top-8 right-0 bg-white rounded-lg shadow-lg p-2 min-w-40 hidden group-hover:block">
                          <div className="text-xs font-medium">Bagh-e-Noor Masjid</div>
                          <div className="text-xs text-gray-600">RT Nagar • Community Mosque</div>
                        </div>
                      </div>
                      
                      {/* Current Location Indicator - Bangalore City Center */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                          MG Road, Bangalore
                        </div>
                      </div>
                      
                      {/* Map Controls */}
                      <div className="absolute top-4 right-4 space-y-2">
                        <Button size="sm" variant="outline" className="bg-white shadow-md">+</Button>
                        <Button size="sm" variant="outline" className="bg-white shadow-md">-</Button>
                      </div>
                    </div>

                    {/* Map Legend */}
                    <div className="flex flex-wrap gap-3 md:gap-4 mt-4 text-xs md:text-sm">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                        Mosques
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                        Halal Restaurants
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        Islamic Schools
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                        Community Events
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        Your Location
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Services Overview */}
                <Card className="mt-4 md:mt-6">
                  <CardHeader>
                    <CardTitle className="text-indigo-900 text-base md:text-lg">Islamic Services Nearby</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                      {services.map((service, index) => (
                        <div key={index} className="text-center p-3 md:p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors cursor-pointer">
                          <div className="text-xl md:text-2xl mb-2">{service.icon}</div>
                          <div className="text-base md:text-lg text-indigo-900 mb-1">{service.count}</div>
                          <div className="text-xs md:text-sm text-indigo-600">{service.name}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-4 md:space-y-6">
                {/* Nearby Mosques */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-indigo-900 text-base md:text-lg">Nearby Mosques</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 md:space-y-4">
                    {nearbyMosques.map((mosque, index) => (
                      <div key={index} className="border border-indigo-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="relative h-24 md:h-32">
                          <ImageWithFallback
                            src={mosque.image}
                            alt={mosque.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2 flex items-center bg-white bg-opacity-90 rounded px-2 py-1">
                            <Star className="w-3 h-3 mr-1 text-amber-500 fill-current" />
                            <span className="text-xs">{mosque.rating}</span>
                          </div>
                        </div>
                        
                        <div className="p-3 md:p-4">
                          <h3 className="text-indigo-900 text-sm font-medium mb-1">{mosque.name}</h3>
                          <div className="text-xs text-indigo-600 mb-2">{mosque.address}</div>
                          
                          <div className="flex justify-between items-center mb-2">
                            <Badge variant="outline" className="text-xs border-indigo-300 text-indigo-700">
                              {mosque.distance}
                            </Badge>
                            <div className="flex items-center text-xs text-green-600">
                              <Clock className="w-3 h-3 mr-1" />
                              {mosque.nextPrayer}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1 mb-3">
                            {mosque.features.map((feature, idx) => (
                              <Badge key={idx} className="text-xs bg-indigo-100 text-indigo-700">
                                {feature}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs">
                              <Navigation className="w-3 h-3 mr-1" />
                              Directions
                            </Button>
                            <Button size="sm" variant="outline" className="border-indigo-300 text-indigo-700 hover:bg-indigo-100 text-xs">
                              <Phone className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Upcoming Events */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-indigo-900 flex items-center text-base md:text-lg">
                      <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2 text-purple-600" />
                      Upcoming Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 md:space-y-4">
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="border border-indigo-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="relative h-20 md:h-24">
                          <ImageWithFallback
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                          <Badge className={`absolute top-2 right-2 text-xs ${
                            event.type === 'Prayer' ? 'bg-green-500 text-white' :
                            event.type === 'Education' ? 'bg-blue-500 text-white' :
                            'bg-purple-500 text-white'
                          }`}>
                            {event.type}
                          </Badge>
                        </div>
                        
                        <div className="p-3 md:p-4">
                          <h3 className="text-indigo-900 text-sm font-medium mb-1">{event.title}</h3>
                          <div className="text-xs text-indigo-600 mb-2">{event.mosque}</div>
                          
                          <div className="flex justify-between items-center mb-3">
                            <div className="text-xs text-indigo-700">
                              {event.date} at {event.time}
                            </div>
                            <div className="flex items-center text-xs text-green-600">
                              <Users className="w-3 h-3 mr-1" />
                              {event.attendees}
                            </div>
                          </div>

                          <Button variant="outline" size="sm" className="w-full text-xs border-indigo-300 text-indigo-700 hover:bg-indigo-100">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Restaurants Tab */}
          <TabsContent value="restaurants">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-indigo-900 text-base md:text-lg">Halal Restaurants Near You</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {halalRestaurants.map((restaurant, index) => (
                        <div key={index} className="border border-indigo-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                          <div className="md:flex">
                            <div className="relative h-32 md:h-24 md:w-32 flex-shrink-0">
                              <ImageWithFallback
                                src={restaurant.image}
                                alt={restaurant.name}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-2 right-2 flex items-center bg-white bg-opacity-90 rounded px-2 py-1">
                                <Star className="w-3 h-3 mr-1 text-amber-500 fill-current" />
                                <span className="text-xs">{restaurant.rating}</span>
                              </div>
                            </div>
                            
                            <div className="p-3 md:p-4 flex-1">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="text-indigo-900 text-base md:text-lg">{restaurant.name}</h3>
                                <div className="text-xs text-indigo-600">
                                  {restaurant.distance} • {restaurant.price}
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="text-xs border-indigo-300 text-indigo-700">
                                  {restaurant.cuisine}
                                </Badge>
                              </div>
                              
                              <div className="text-xs text-indigo-600 mb-3">{restaurant.address}</div>

                              <div className="flex gap-2">
                                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                  <Navigation className="w-3 h-3 mr-1" />
                                  Directions
                                </Button>
                                <Button size="sm" variant="outline" className="border-indigo-300 text-indigo-700">
                                  Menu
                                </Button>
                                <Button size="sm" variant="outline" className="border-indigo-300 text-indigo-700">
                                  <Phone className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-indigo-900 text-base md:text-lg">Filter Restaurants</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm text-indigo-700 mb-2 block">Cuisine Type</label>
                      <select className="w-full p-2 border border-indigo-300 rounded-md text-sm">
                        <option>All Cuisines</option>
                        <option>Middle Eastern</option>
                        <option>Pakistani</option>
                        <option>Turkish</option>
                        <option>Indian</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm text-indigo-700 mb-2 block">Price Range</label>
                      <select className="w-full p-2 border border-indigo-300 rounded-md text-sm">
                        <option>All Prices</option>
                        <option>$ - Budget</option>
                        <option>$$ - Moderate</option>
                        <option>$$$ - Upscale</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm text-indigo-700 mb-2 block">Distance</label>
                      <select className="w-full p-2 border border-indigo-300 rounded-md text-sm">
                        <option>Within 5 miles</option>
                        <option>Within 10 miles</option>
                        <option>Within 25 miles</option>
                      </select>
                    </div>

                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                      Apply Filters
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Schools Tab */}
          <TabsContent value="schools">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {islamicSchools.map((school, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <div className="relative h-32 md:h-40">
                    <ImageWithFallback
                      src={school.image}
                      alt={school.name}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-2 right-2 bg-blue-500 text-white text-xs">
                      {school.type}
                    </Badge>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-indigo-900 text-base md:text-lg">{school.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 md:space-y-3 mb-3 md:mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-indigo-600">Students:</span>
                        <span className="text-indigo-900">{school.students}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-indigo-600">Established:</span>
                        <span className="text-indigo-900">{school.established}</span>
                      </div>
                      <div className="text-xs text-indigo-600">{school.address}</div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">
                        Learn More
                      </Button>
                      <Button size="sm" variant="outline" className="border-indigo-300 text-indigo-700">
                        <Phone className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <div>
                <h2 className="text-lg md:text-xl text-indigo-900 mb-4 md:mb-6">Upcoming Events</h2>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow overflow-hidden">
                      <div className="md:flex">
                        <div className="relative h-32 md:h-24 md:w-32 flex-shrink-0">
                          <ImageWithFallback
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                          <Badge className={`absolute top-2 right-2 text-xs ${
                            event.type === 'Prayer' ? 'bg-green-500 text-white' :
                            event.type === 'Education' ? 'bg-blue-500 text-white' :
                            'bg-purple-500 text-white'
                          }`}>
                            {event.type}
                          </Badge>
                        </div>
                        
                        <CardContent className="p-3 md:p-4 flex-1">
                          <h3 className="text-indigo-900 text-base md:text-lg mb-1">{event.title}</h3>
                          <p className="text-indigo-700 text-sm mb-2">{event.mosque}</p>
                          
                          <div className="flex justify-between items-center text-sm text-indigo-600">
                            <span>{event.date} at {event.time}</span>
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {event.attendees}
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-indigo-900 text-base md:text-lg">Event Map</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 md:h-64 bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100 rounded-lg relative overflow-hidden border-2 border-dashed border-purple-300">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-purple-600">
                          <Calendar className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-4" />
                          <div className="text-base md:text-lg mb-2">Event Locations</div>
                          <div className="text-sm">Interactive map showing all upcoming events</div>
                        </div>
                      </div>
                      
                      {/* Event Markers */}
                      <div className="absolute top-4 left-8 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                      <div className="absolute top-8 right-12 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
                      <div className="absolute bottom-8 left-16 w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow-lg"></div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-4 md:mt-6">
                  <CardHeader>
                    <CardTitle className="text-indigo-900 text-base md:text-lg">Event Filters</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm text-indigo-700 mb-2 block">Event Type</label>
                      <select className="w-full p-2 border border-indigo-300 rounded-md text-sm">
                        <option>All Events</option>
                        <option>Prayer Events</option>
                        <option>Educational</option>
                        <option>Social Events</option>
                        <option>Community Service</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm text-indigo-700 mb-2 block">Date Range</label>
                      <select className="w-full p-2 border border-indigo-300 rounded-md text-sm">
                        <option>This Week</option>
                        <option>This Month</option>
                        <option>Next 3 Months</option>
                      </select>
                    </div>

                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                      Apply Filters
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}