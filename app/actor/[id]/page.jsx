'use client'
import React, { useState } from 'react';
import actors from '@/data/actors.json';
import Link from 'next/link';
import { ArrowLeft, Calendar, Film, Star, Award, Play, Info, Heart, Share2, Trophy, Clock } from 'lucide-react';

export default function ActorPage({ params }) {
  const [activeTab, setActiveTab] = useState('filmography');
  const [isLiked, setIsLiked] = useState(false);

  const actor = actors.find((a) => a.ID === params.id);

  if (!actor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black">
        <div className="text-center p-8 max-w-7xl">
          <div className="text-red-500 text-6xl mb-4 font-bold">404</div>
          <h1 className="text-3xl font-bold text-white mb-4">Actor Not Found</h1>
          <p className="text-gray-400 mb-6">We couldn't find the actor you're looking for.</p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-white font-semibold transition-all"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Actors
          </Link>
        </div>
      </div>
    );
  }

  // Sort movies by year (most recent first)
  const sortedMovies = [...actor.Movies].sort((a, b) => b.year - a.year);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white">
      {/* Navigation */}
      <nav className="relative z-20 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center text-gray-300 hover:text-white transition-colors group">
            <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Back to All Actors
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-teal-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Actor Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-4">
                  {actor.Actor_Name}
                </h1>
                <div className="flex items-center space-x-4 text-gray-300 mb-6">
                  <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium">
                    Actor
                  </span>
                  <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                    {actor.Movies.length} Films
                  </span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="h-5 w-5 text-blue-400" />
                    <span className="text-gray-400 text-sm">Born</span>
                  </div>
                  <p className="text-white font-semibold">{actor.Birth_Date}</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
                  <div className="flex items-center space-x-2 mb-2">
                    <Film className="h-5 w-5 text-green-400" />
                    <span className="text-gray-400 text-sm">First Film</span>
                  </div>
                  <p className="text-white font-semibold text-sm">{actor.Name_First_Movie}</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
                  <div className="flex items-center space-x-2 mb-2">
                    <Award className="h-5 w-5 text-yellow-400" />
                    <span className="text-gray-400 text-sm">Total Films</span>
                  </div>
                  <p className="text-white font-semibold">{actor.Total_Movies}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
           
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-black/50 backdrop-blur-md border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'filmography', label: 'Filmography', icon: Film },
              { id: 'info', label: 'Info', icon: Info }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${activeTab === id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                  }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'filmography' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">
                Complete Filmography
                <span className="ml-2 text-gray-400 font-normal">({actor.Movies.length} films)</span>
              </h2>
              <div className="flex items-center space-x-2 text-gray-400">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Sorted by most recent</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedMovies.map((movie, index) => (
                <Link
                  key={index}
                  href={`/actor/${actor.ID}/movie/${encodeURIComponent(movie.title)}`}
                  className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:from-white/10 hover:to-white/15 transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold group-hover:text-blue-400 transition-colors mb-2">
                          {movie.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {movie.year}
                          </span>
                        </div>
                      </div>
                      <Play className="h-8 w-8 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {movie.role && (
                      <div className="bg-white/5 rounded-lg p-3 mb-4">
                        <p className="text-sm text-gray-300">
                          <span className="text-blue-400 font-medium">Role:</span> {movie.role}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-6 py-4 border-t border-white/10">
                    <div className="text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors">
                      View Details →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'info' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Info className="h-6 w-6 mr-2 text-blue-400" />
                Personal Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-3 text-blue-400" />
                  <span className="font-medium text-gray-300">Birth Date:</span>
                  <span className="ml-2 text-white">{actor.Birth_Date}</span>
                </div>
                <div className="flex items-center">
                  <Film className="h-5 w-5 mr-3 text-green-400" />
                  <span className="font-medium text-gray-300">First Movie:</span>
                  <span className="ml-2 text-white">{actor.Name_First_Movie}</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-5 w-5 mr-3 text-yellow-400" />
                  <span className="font-medium text-gray-300">Total Movies:</span>
                  <span className="ml-2 text-white">{actor.Total_Movies}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Trophy className="h-6 w-6 mr-2 text-yellow-400" />
                Career Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Active Years:</span>
                  <span className="text-white font-semibold">
                    {Math.min(...actor.Movies.map(m => m.year))} - {Math.max(...actor.Movies.map(m => m.year))}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Movies in Database:</span>
                  <span className="text-white font-semibold">{actor.Movies.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Latest Film:</span>
                  <span className="text-white font-semibold">{sortedMovies[0]?.title}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}