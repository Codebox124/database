'use client'
import Link from 'next/link';
import { useState } from 'react';
import actorsData from '../data/actors.json';
import { Search, Film, Calendar, User } from 'lucide-react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter actors based on search term
  const filteredActors = actorsData.filter(actor => 
    actor.Actor_Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              <span className="text-blue-600">Movies</span> Database
            </h1>
            <div className="mt-4 md:mt-0 relative flex items-center w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-black" />
              </div>
              <input
                type="text"
                placeholder="Search actors..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 text-black bg-white  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActors.length > 0 ? (
              filteredActors.map((actor) => (
                <Link
                  key={actor.ID}
                  href={`/actor/${actor.ID}`}
                  className="block bg-white overflow-hidden rounded-lg shadow hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-102"
                >
                  <div className="bg-blue-600 h-3"></div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{actor.Actor_Name}</h2>
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="font-medium text-gray-700">Born:</span>
                        <span className="ml-2">{actor.Birth_Date}</span>
                      </div>
                      <div className="flex items-center">
                        <Film className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="font-medium text-gray-700">First Movie:</span>
                        <span className="ml-2">{actor.Name_First_Movie}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="font-medium text-gray-700">Total Movies:</span>
                        <span className="ml-2">{actor.Total_Movies}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-6 py-3">
                    <div className="text-sm font-medium text-blue-600 hover:text-blue-500">
                      View Profile →
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <div className="text-gray-500 text-lg">No actors found matching "{searchTerm}"</div>
                <button 
                  onClick={() => setSearchTerm('')} 
                  className="mt-4 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
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