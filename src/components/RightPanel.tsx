'use client';

import { TrendingUp, Users, Calendar, Bell } from 'lucide-react';

export default function RightPanel() {
  return (
    <div className="space-y-6">
      {/* Trending Topics */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center mb-4">
          <TrendingUp className="h-5 w-5 text-indigo-600 mr-2" />
          <h3 className="font-semibold text-gray-900">Sujets Tendances</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
            <span className="text-sm text-gray-700">#Informatique</span>
            <span className="text-xs text-gray-500">234 posts</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
            <span className="text-sm text-gray-700">#Mathématiques</span>
            <span className="text-xs text-gray-500">189 posts</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
            <span className="text-sm text-gray-700">#Marketing</span>
            <span className="text-xs text-gray-500">156 posts</span>
          </div>
        </div>
      </div>

      {/* Who to Follow */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center mb-4">
          <Users className="h-5 w-5 text-indigo-600 mr-2" />
          <h3 className="font-semibold text-gray-900">Suggestions</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              JD
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Jean Dupont</p>
              <p className="text-sm text-gray-500">Informatique • 3ème année</p>
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-full text-xs font-medium transition-colors">
              Suivre
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
              MC
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Marie Curie</p>
              <p className="text-sm text-gray-500">Physique • 2ème année</p>
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-full text-xs font-medium transition-colors">
              Suivre
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              PL
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Pierre Lavoisier</p>
              <p className="text-sm text-gray-500">Chimie • 1ère année</p>
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-full text-xs font-medium transition-colors">
              Suivre
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center mb-4">
          <Calendar className="h-5 w-5 text-indigo-600 mr-2" />
          <h3 className="font-semibold text-gray-900">Événements</h3>
        </div>
        <div className="space-y-3">
          <div className="border-l-4 border-indigo-600 pl-4">
            <p className="font-medium text-gray-900">Forum Carrières</p>
            <p className="text-sm text-gray-600">15 Mars 2024 • 14:00</p>
            <p className="text-xs text-gray-500">Amphi A</p>
          </div>
          <div className="border-l-4 border-purple-600 pl-4">
            <p className="font-medium text-gray-900">Tournoi de Code</p>
            <p className="text-sm text-gray-600">18 Mars 2024 • 18:00</p>
            <p className="text-xs text-gray-500">Labo Info</p>
          </div>
          <div className="border-l-4 border-pink-600 pl-4">
            <p className="font-medium text-gray-900">Soirée Intégration</p>
            <p className="text-sm text-gray-600">20 Mars 2024 • 19:00</p>
            <p className="text-xs text-gray-500">Salle B200</p>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Bell className="h-5 w-5 text-indigo-600 mr-2" />
            <h3 className="font-semibold text-gray-900">Notifications</h3>
          </div>
          <span className="text-xs text-gray-500">Voir tout</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-start space-x-3 p-3 bg-indigo-50 rounded-xl">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              !
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Nouveau message de JD</p>
              <p className="text-xs text-gray-500">Il y a 2 minutes</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-xl">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              📚
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Nouveau cours publié</p>
              <p className="text-xs text-gray-500">Physique Quantique</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
