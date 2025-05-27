'use client'
import Link from 'next/link';
import { useState } from 'react';
import actorsData from '../data/actors.json';
import { Search, Film, Calendar, User, Star, Trophy, Sparkles, TrendingUp } from 'lucide-react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter actors based on search term
  const filteredActors = actorsData.filter(actor =>
    actor.Actor_Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get some featured stats
  const totalMovies = actorsData.reduce((sum, actor) => sum + actor.Total_Movies, 0);
  const featuredActors = actorsData.slice(0, 3); // First 3 actors as featured

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-teal-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.2),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,119,198,0.1),transparent_50%)]"></div>
        
        <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
                 Movie
              </span>
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Database 
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover the world's greatest actors and their cinematic journeys
            </p>
          

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search "
                className="block w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl leading-5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

    

      {/* All Actors Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">
            {searchTerm ? `Search Results for "${searchTerm}"` : 'All Actors'}
            <span className="ml-2 text-gray-400 text-lg font-normal">
              ({filteredActors.length} {filteredActors.length === 1 ? 'actor' : 'actors'})
            </span>
          </h2>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-sm font-medium transition-all"
            >
              Clear Search
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredActors.length > 0 ? (
            filteredActors.map((actor) => (
              <Link
                key={actor.ID}
                href={`/actor/${actor.ID}`}
                className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:from-white/10 hover:to-white/15 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <User className="h-12 w-12 text-blue-400 bg-blue-400/20 rounded-xl p-2" />
                    
                  </div>
                  
                  <h3 className="text-lg font-bold group-hover:text-blue-400 transition-colors mb-3">
                    {actor.Actor_Name}
                  </h3>
                  
                  <div className="space-y-2 text-sm text-gray-400 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span>Born: {actor.Birth_Date}</span>
                    </div>
                    <div className="flex items-center">
                      <Film className="h-4 w-4 mr-2 text-gray-500" />
                      <span>Debut: {actor.Name_First_Movie}</span>
                    </div>
                    <div className="flex items-center">
                      <Trophy className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{actor.Total_Movies} Movies</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 px-6 py-4 border-t border-white/10">
                  <div className="text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors">
                    View Profile →
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full">
              <div className="text-center py-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl">
                <Search className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                <div className="text-gray-400 text-xl mb-2">No actors found</div>
                <div className="text-gray-500 mb-6">
                  No actors match your search for "{searchTerm}"
                </div>
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-semibold transition-all"
                >
                  Clear Search
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/80 border-t border-gray-800 mt-16">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                   Movie Database 
                </span>
              </h3>
            
            </div>
           
          </div>
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()}  Movie Database  - All rights reserved. 
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}