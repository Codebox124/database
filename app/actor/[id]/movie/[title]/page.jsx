// app/actor/[id]/movie/[title]/page.jsx
import React from 'react';
import actors from '@/data/actors.json';
import Link from 'next/link';
import { ArrowLeft, Calendar, Star, Clock } from 'lucide-react';

export default function MoviePage({ params }) {
    const { id, title } = params;

    const actor = actors.find((a) => a.ID === id);
    if (!actor) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-red-500 mb-2">Actor Not Found</h2>
                    <p className="text-gray-600 mb-4">We couldn't find the actor you're looking for.</p>
                    <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                        Return Home
                    </Link>
                </div>
            </div>
        );
    }

    const movie = actor.Movies.find((m) => m.title === decodeURIComponent(title));
    if (!movie) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-red-500 mb-2">Movie Not Found</h2>
                    <p className="text-gray-600 mb-4">We couldn't find the movie you're looking for.</p>
                    <Link href={`/actor/${id}`} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                        Return to {actor.Actor_Name}
                    </Link>
                </div>
            </div>
        );
    }



    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto p-6">
                <Link
                    href={`/actor/${id}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-6 group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:translate-x-[-3px] transition-transform" />
                    <span>Back to {actor.Actor_Name}</span>
                </Link>

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Movie Poster/Header Area */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-40 md:h-64 relative flex items-end">
                        <div className="absolute inset-0 opacity-20 bg-[url('/api/placeholder/400/320')] bg-center bg-cover"></div>
                        <div className="p-6 text-white relative z-10 w-full">
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.title}</h1>
                            <div className="flex items-center space-x-4 text-white/90">
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    <span>{movie.year}</span>
                                </div>


                            </div>
                        </div>
                    </div>

                    {/* Movie Details */}
                    <div className="p-6">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-3">Synopsis</h2>
                            <p className="text-gray-700 leading-relaxed">
                                {movie.description || 'No description is currently available for this film.'}
                            </p>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-3">Cast</h2>
                            <div className="flex items-center space-x-1">
                                <Link
                                    href={`/actor/${id}`}
                                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-800 transition"
                                >
                                    {actor.Actor_Name}
                                </Link>
                                <span className="text-gray-400 px-2">•</span>
                                <span className="text-gray-500">Actor</span>
                            </div>
                        </div>

                        {/* 
                        <img src={`https://res.cloudinary.com/dfjm3z7es/image/upload/v1747841020/${movie.images}`} alt={actor.Actor_Name} className="w-32 h-32 object-cover rounded-md" /> 
                        */}

                    </div>
                </div>

                <div className="mt-8 text-center text-gray-500 text-sm">
                    © {new Date().getFullYear()} Movie Database. All rights reserved.
                </div>
            </div>
        </div>
    );
}