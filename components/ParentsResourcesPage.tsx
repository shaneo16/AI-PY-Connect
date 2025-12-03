
import React from 'react';
import { BLOG_POSTS_PARENTS } from '../constants';
import { ArrowRight, BookOpen, Heart, Smile } from 'lucide-react';
import { Button } from './Button';

export const ParentsResourcesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-primaryDark text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">For Parents</h1>
          <p className="text-xl text-cyan-100">
            Guides, tips, and inspiration for raising happy, active kids in Berlin.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white border-b border-slate-200">
         <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 p-6 bg-cyan-50 rounded-xl border border-cyan-100">
               <div className="bg-white p-3 rounded-full text-primary shadow-sm"><BookOpen size={24}/></div>
               <div>
                  <h3 className="font-bold text-slate-900">Education</h3>
                  <p className="text-sm text-slate-500">Schooling & tutoring tips</p>
               </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-fuchsia-50 rounded-xl border border-fuchsia-100">
               <div className="bg-white p-3 rounded-full text-secondary shadow-sm"><Heart size={24}/></div>
               <div>
                  <h3 className="font-bold text-slate-900">Health & Wellness</h3>
                  <p className="text-sm text-slate-500">Nutrition & mental health</p>
               </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-amber-50 rounded-xl border border-amber-100">
               <div className="bg-white p-3 rounded-full text-amber-500 shadow-sm"><Smile size={24}/></div>
               <div>
                  <h3 className="font-bold text-slate-900">Activities</h3>
                  <p className="text-sm text-slate-500">Fun things to do in Berlin</p>
               </div>
            </div>
         </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
         <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Latest Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               {BLOG_POSTS_PARENTS.map(post => (
                  <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-200 flex flex-col">
                     <div className="h-48 overflow-hidden">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"/>
                     </div>
                     <div className="p-6 flex-1 flex flex-col">
                        <div className="flex gap-2 mb-3">
                           {post.tags.map(tag => (
                              <span key={tag} className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-1 rounded">{tag}</span>
                           ))}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">{post.title}</h3>
                        <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                           <span className="text-xs text-slate-400">{post.date} • {post.author}</span>
                           <button className="text-primary font-bold text-sm flex items-center hover:underline">Read More <ArrowRight size={16} className="ml-1"/></button>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* CTA */}
      <section className="bg-primaryDark py-16 text-center text-white">
         <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-4">Join our community</h2>
            <p className="mb-8 opacity-90">Sign up for Prime Youth Connect to access exclusive programs and events.</p>
            <Button className="bg-white text-primaryDark hover:bg-slate-100 shadow-xl">Sign Up Free</Button>
         </div>
      </section>
    </div>
  );
};
