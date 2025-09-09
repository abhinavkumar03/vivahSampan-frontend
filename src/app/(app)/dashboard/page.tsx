'use client';

import { useAuth } from '@/hooks/useAuth';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Welcome to VivahSampan Dashboard
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Your wedding planning journey begins here.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Quick Actions */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
            <div className="mt-6 space-y-4">
              <button className="w-full rounded-md bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700">
                Find Vendors
              </button>
              <button className="w-full rounded-md bg-pink-100 px-4 py-2 text-sm font-medium text-pink-700 hover:bg-pink-200">
                Create Event
              </button>
              <button className="w-full rounded-md bg-pink-100 px-4 py-2 text-sm font-medium text-pink-700 hover:bg-pink-200">
                Manage Guest List
              </button>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900">Upcoming Events</h3>
            <div className="mt-6">
              <p className="text-sm text-gray-500">No upcoming events</p>
            </div>
          </div>
        </div>

        {/* Tasks */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900">Tasks</h3>
            <div className="mt-6">
              <p className="text-sm text-gray-500">No pending tasks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
