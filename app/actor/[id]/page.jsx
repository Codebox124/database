// app/actor/[id]/page.jsx
import React from 'react';
import actors from '@/data/actors.json';
import Link from 'next/link';
import { ArrowLeft, Calendar, Film, Star, Award } from 'lucide-react';

export default function ActorPage({ params }) {
  const actor = actors.find((a) => a.ID === params.id);

  if (!actor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 max-w-md">
          <div className="text-red-500 text-5xl mb-4">404</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Actor Not Found</h1>
          <p className="text-gray-600 mb-6">We couldn't find the actor you're looking for.</p>
          <Link 
            href="/" 
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Actors
          </Link>
        </div>
      </div>
    );
  }

  // Sort movies by year (most recent first)
  const sortedMovies = [...actor.Movies].sort((a, b) => b.year - a.year);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center text-sm font-medium">
            <Link href="/" className="text-gray-500 hover:text-gray-700 flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Actors
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="bg-blue-600 px-6 py-4">
            <h1 className="text-2xl md:text-3xl font-bold text-white">{actor.Actor_Name}</h1>
          </div>
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                  <span className="font-medium">Birth Date:</span>
                  <span className="ml-2">{actor.Birth_Date}</span>
                </div>
                <div className="flex items-center">
                  <Film className="h-5 w-5 mr-2 text-blue-500" />
                  <span className="font-medium">First Movie:</span>
                  <span className="ml-2">{actor.Name_First_Movie}</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-blue-500" />
                  <span className="font-medium">Total Movies:</span>
                  <span className="ml-2">{actor.Total_Movies}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-0">
            Filmography
            <span className="ml-2 text-lg font-normal text-gray-500">({actor.Movies.length} movies)</span>
          </h2>
          <div className="text-sm text-gray-500">
            Sorted by most recent
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedMovies.map((movie, index) => (
            <Link
              key={index}
              href={`/actor/${actor.ID}/movie/${encodeURIComponent(movie.title)}`}
              className="block bg-white overflow-hidden rounded-lg shadow hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
            >
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{movie.title}</h3>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="text-gray-600">{movie.year}</span>
                </div>
                
                {movie.role && (
                  <div className="mt-2 flex items-center">
                    <Star className="h-4 w-4 mr-2 text-blue-500" />
                    <span className="text-gray-600">Role: {movie.role}</span>
                  </div>
                )}
              </div>
              <div className="bg-gray-50 px-6 py-3">
                <div className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  View Details →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Movies Database - All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}