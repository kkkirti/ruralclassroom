import React from 'react';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import RoleBasedNavigation from '../../components/ui/RoleBasedNavigation';
import WelcomeHeader from './components/WelcomeHeader';
import UpcomingLecturesCard from './components/UpcomingLecturesCard';
import RecentRecordingsCard from './components/RecentRecordingsCard';
import ProgressTrackingPanel from './components/ProgressTrackingPanel';
import QuickAccessMenu from './components/QuickAccessMenu';

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header onToggleSidebar={() => {}} />
      {/* Main Content */}
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb Navigation */}
          <BreadcrumbNavigation className="mb-6" />
          
          {/* Welcome Header */}
          <WelcomeHeader />
          
          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Left Column - Main Content */}
            <div className="xl:col-span-3 space-y-8">
              {/* Role-Based Navigation */}
              <RoleBasedNavigation userRole="student" />
              
              {/* Upcoming Lectures */}
              <UpcomingLecturesCard />
              
              {/* Recent Recordings */}
              <RecentRecordingsCard />
            </div>
            
            {/* Right Column - Sidebar */}
            <div className="xl:col-span-1 space-y-8">
              {/* Quick Access Menu */}
              <QuickAccessMenu />
              
              {/* Progress Tracking Panel */}
              <ProgressTrackingPanel />
            </div>
          </div>
          
          {/* Mobile-Optimized Bottom Section */}
          <div className="mt-8 xl:hidden">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span>Connected</span>
                </div>
                <span>•</span>
                <span>Optimized for low bandwidth</span>
                <span>•</span>
                <span>Audio-first learning</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                  <span className="text-primary-foreground font-bold text-sm">RC</span>
                </div>
                <span className="text-lg font-semibold text-foreground">RuralClassroom</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Bridging the urban-rural education gap through bandwidth-optimized remote learning.
              </p>
            </div>
            
            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground">Quick Links</h4>
              <div className="space-y-2">
                <a href="/recorded-lectures" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Recorded Lectures
                </a>
                <a href="/assignments" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Assignments
                </a>
                <a href="/discussion" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Discussion Board
                </a>
                <a href="/support" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Technical Support
                </a>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground">Support</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Technical Help: 1800-123-4567</p>
                <p>Email: support@ruralclassroom.edu.in</p>
                <p>Available: 24/7 for students</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <p className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} RuralClassroom. All rights reserved.
              </p>
              <div className="mt-4 md:mt-0 flex items-center space-x-4 text-sm text-muted-foreground">
                <a href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a>
                <a href="/terms" className="hover:text-foreground transition-colors">Terms of Service</a>
                <a href="/accessibility" className="hover:text-foreground transition-colors">Accessibility</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StudentDashboard;