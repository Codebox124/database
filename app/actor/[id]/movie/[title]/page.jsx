"use client"
import React from 'react';
import actors from '@/data/actors.json';
import Link from 'next/link';
import { ArrowLeft, Calendar, Star, Clock, Play, Heart, Share2, Award, Film, Users, Trophy, Sparkles } from 'lucide-react';

export default function MoviePage({ params }) {
    const { id, title } = params;

    const actor = actors.find((a) => a.ID === id);
    if (!actor) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black">
                <div className="text-center p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl shadow-2xl">
                    <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
                        <Film className="w-8 h-8 text-red-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Actor Not Found</h2>
                    <p className="text-gray-400 mb-6">We couldn't find the actor you're looking for.</p>
                    <Link href="/" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-200 font-semibold">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Return Home
                    </Link>
                </div>
            </div>
        );
    }

    const movie = actor.Movies.find((m) => m.title === decodeURIComponent(title));
    if (!movie) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black">
                <div className="text-center p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl shadow-2xl">
                    <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
                        <Film className="w-8 h-8 text-red-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Movie Not Found</h2>
                    <p className="text-gray-400 mb-6">We couldn't find the movie you're looking for.</p>
                    <Link href={`/actor/${id}`} className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-200 font-semibold">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Return to {actor.Actor_Name}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white">

            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-blue-900/10 to-teal-900/10"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,119,198,0.05),transparent_50%)]"></div>

            <div className="relative max-w-7xl mx-auto p-4 md:p-6">

                <Link
                    href={`/actor/${id}`}
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-all duration-200 mb-8 group bg-white/5 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/10 hover:bg-white/10"
                >
                    <ArrowLeft className="w-5 h-5 mr-3 group-hover:translate-x-[-3px] transition-transform duration-200" />
                    <span className="font-medium">Back to {actor.Actor_Name}</span>
                </Link>

                {/* Main Content */}
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden shadow-2xl">

                    <div className="relative">
                        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 h-56 md:h-96 relative o">
                            <div className="absolute inset-0 bg-black/30"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>




                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                                <div className="max-w-5xl flex justify-between items-center">


                                    <div>
                                        <h1 className="text-2xl md:text-6xl font-bold mb-4">
                                            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                                                {movie.title}
                                            </span>
                                        </h1>

                                        <div className="flex flex-wrap items-center gap-4 text-white/90 mb-6">
                                            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                                                <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                                                <span className="font-medium">{movie.year}</span>
                                            </div>
                                            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                                                <Star className="w-4 h-4 mr-2 fill-yellow-400 text-yellow-400" />
                                                <span className="font-medium">8.2</span>
                                            </div>
                                            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                                                <Clock className="w-4 h-4 mr-2 text-green-400" />
                                                <span className="font-medium">2h 15m</span>
                                            </div>
                                            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                                                <Trophy className="w-4 h-4 mr-2 text-purple-400" />
                                                <span className="font-medium">Drama</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="">
                                        {movie.images && Array.isArray(movie.images) && movie.images.length > 0 && (
                                            <section className="">



                                                <div >
                                                    {movie.images.some(img => img && img.trim() !== '') ? (
                                                        // Show actual images if there are valid image URLs
                                                        movie.images
                                                            .filter(img => img && img.trim() !== '') // Filter out empty strings
                                                            .map((img, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="relative overflow-hidden rounded-xlshadow-lg hover:scale-105 transform transition duration-300 ease-in-out"
                                                                >
                                                                    <img
                                                                        src={`${img}`}
                                                                        alt={movie.title || 'Movie image'}
                                                                        className="w-32 h-48 object-cover rounded-lg shadow-2xl "
                                                                    />
                                                                </div>
                                                            ))
                                                    ) : (

                                                        <div className="relative overflow-hidden rounded-xl  ">
                                                            <img
                                                                src="/no-image.jpg"
                                                                alt="No image available"
                                                                className="w-32 h-48 object-cover rounded-lg shadow-2xl "
                                                            />
                                                        </div>
                                                    )}
                                                </div>

                                            </section>
                                        )}
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Sections */}
                    <div className="p-6 md:p-10">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-10">
                                {/* Synopsis */}
                                <section>
                                    <h2 className="text-3xl font-bold mb-6 flex items-center">
                                        <Film className="w-7 h-7 mr-4 text-blue-400" />
                                        <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                            Synopsis
                                        </span>
                                    </h2>
                                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                                        <p className="text-gray-300 leading-relaxed text-lg">
                                            {movie.description || 'This compelling cinematic masterpiece showcases exceptional storytelling and remarkable performances that have captivated audiences worldwide. The film explores deep themes of human nature, relationships, and the complexities of life through masterful direction and brilliant acting.'}
                                        </p>
                                    </div>
                                </section>

                                {/* Cast & Crew */}
                                <section>
                                    <h2 className="text-3xl font-bold mb-6 flex items-center">
                                        <Users className="w-7 h-7 mr-4 text-purple-400" />
                                        <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                            Cast & Crew
                                        </span>
                                    </h2>
                                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                                        <Link
                                            href={`/actor/${id}`}
                                            className="group flex items-center bg-white/5 hover:bg-white/10 p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:-translate-y-1"
                                        >
                                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl mr-6">
                                                {actor.Actor_Name.charAt(0)}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-1">
                                                    {actor.Actor_Name}
                                                </h3>
                                                <p className="text-gray-400 font-medium">Lead Actor</p>
                                                <div className="flex items-center mt-2 text-sm text-gray-500">
                                                    <Trophy className="w-4 h-4 mr-2" />
                                                    <span>{actor.Total_Movies} Films</span>
                                                </div>
                                            </div>
                                            <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-blue-400 rotate-180 transition-colors" />
                                        </Link>
                                    </div>
                                </section>

                                {/* Movie Images */}
                                {movie.images && Array.isArray(movie.images) && movie.images.length > 0 && (
                                    <section className="relative my-12">
                                        <h2 className="text-3xl font-bold mb-6 flex items-center">
                                            <Award className="w-7 h-7 mr-4 text-yellow-400" />
                                            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                                Gallery
                                            </span>
                                        </h2>

                                        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                                {movie.images.some(img => img && img.trim() !== '') ? (
                                                    // Show actual images if there are valid image URLs
                                                    movie.images
                                                        .filter(img => img && img.trim() !== '') // Filter out empty strings
                                                        .map((img, index) => (
                                                            <div
                                                                key={index}
                                                                className="relative overflow-hidden rounded-xl border border-white/20 shadow-lg hover:scale-105 transform transition duration-300 ease-in-out"
                                                            >
                                                                <img
                                                                    src={`${img}`}
                                                                    alt={movie.title || 'Movie image'}
                                                                    className="w-full h-64 object-cover"
                                                                />
                                                            </div>
                                                        ))
                                                ) : (
                                                    // Show "no image" placeholder if no valid images exist
                                                    <div className="relative overflow-hidden rounded-xl border border-white/20 shadow-lg">
                                                        <img
                                                            src="/no-image.jpg"
                                                            alt="No image available"
                                                            className="w-full h-64 object-cover"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </section>
                                )}

                                {/* Media Preview Section */}
                                <section>
                                    <h2 className="text-3xl font-bold mb-6 flex items-center">
                                        <Play className="w-7 h-7 mr-4 text-pink-400" />
                                        <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                            Watch Preview
                                        </span>
                                    </h2>
                                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 flex flex-col sm:flex-row items-center gap-6">
                                        {/* Thumbnail that links to video or fallback image */}
                                        <a
                                            href={movie.video || "#"} // dynamic video link from JSON
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block group relative overflow-hidden rounded-2xl shadow-lg hover:scale-105 transform transition duration-300 ease-in-out"
                                        >
                                            <video
                                                src={movie.video} // dynamic video URL from JSON
                                                poster={movie.images?.[0] || ""} // use first image as poster
                                                className="w-64 h-40 object-cover rounded-xl shadow-lg"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    const img = document.getElementById(`fallback-${movie.title}`);
                                                    if (img) img.style.display = 'block';
                                                }}
                                                muted
                                                playsInline
                                            />
                                            <img
                                                id={`fallback-${movie.title}`}
                                                src={movie.images?.[0] || "/fallback.jpg"} // use same image as fallback
                                                alt="Movie preview"
                                                className="w-64 h-40 object-cover rounded-xl shadow-lg hidden"
                                            />
                                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                                <Play className="w-10 h-10 text-white opacity-80" />
                                            </div>
                                        </a>

                                        <div className="text-gray-300 text-lg">
                                            Click the thumbnail to preview the movie. If available, it will play a short clip; otherwise, it displays a poster image.
                                        </div>
                                    </div>

                                </section>

                            </div>

                            {/* Sidebar */}
                            <div className="space-y-8">
                                {/* Movie Info Card */}
                                <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20">
                                    <h3 className="text-2xl font-bold mb-6 flex items-center">
                                        <Sparkles className="w-6 h-6 mr-3 text-yellow-400" />
                                        <span className="text-white">Movie Details</span>
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center py-3 border-b border-white/10">
                                            <span className="text-gray-400 font-medium">Release Year</span>
                                            <span className="text-white font-bold">{movie.year}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-white/10">
                                            <span className="text-gray-400 font-medium">Genre</span>
                                            <span className="text-purple-400 font-bold">Drama</span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-white/10">
                                            <span className="text-gray-400 font-medium">Rating</span>
                                            <div className="flex items-center">
                                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-2" />
                                                <span className="text-yellow-400 font-bold">8.2/10</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center py-3">
                                            <span className="text-gray-400 font-medium">Duration</span>
                                            <span className="text-green-400 font-bold">2h 15m</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Related Movies */}
                                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                                    <h3 className="text-2xl font-bold mb-6 flex items-center text-white">
                                        <Film className="w-6 h-6 mr-3 text-blue-400" />
                                        More from {actor.Actor_Name}
                                    </h3>
                                    <div className="space-y-4">
                                        {actor.Movies.filter(m => m.title !== movie.title).slice(0, 3).map((relatedMovie, index) => (
                                            <Link
                                                key={index}
                                                href={`/actor/${id}/movie/${encodeURIComponent(relatedMovie.title)}`}
                                                className="group block bg-white/5 hover:bg-white/10 p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:-translate-y-1"
                                            >
                                                <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
                                                    {relatedMovie.title}
                                                </h4>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-gray-400 font-medium">
                                                        {relatedMovie.year}
                                                    </p>
                                                    <ArrowLeft className="w-4 h-4 text-gray-400 group-hover:text-blue-400 rotate-180 transition-colors" />
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    );
}