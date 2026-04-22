import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgressTrackingPanel = () => {
  const [progressData] = useState({
    overallProgress: 68,
    coursesInProgress: 3,
    completedCourses: 2,
    totalCourses: 5,
    currentStreak: 12,
    totalStudyHours: 145,
    averageQuizScore: 82,
    attendanceRate: 89
  });

  const [courseProgress] = useState([
    {
      id: 1,
      name: "AI & Machine Learning",
      instructor: "Dr. Priya Sharma",
      progress: 75,
      totalLectures: 20,
      completedLectures: 15,
      nextLecture: "2025-09-10T20:00:00",
      averageScore: 88,
      status: "active"
    },
    {
      id: 2,
      name: "VLSI Design",
      instructor: "Prof. Rajesh Kumar",
      progress: 60,
      totalLectures: 18,
      completedLectures: 11,
      nextLecture: "2025-09-11T14:30:00",
      averageScore: 79,
      status: "active"
    },
    {
      id: 3,
      name: "Renewable Energy",
      instructor: "Dr. Anita Verma",
      progress: 45,
      totalLectures: 16,
      completedLectures: 7,
      nextLecture: "2025-09-11T16:00:00",
      averageScore: 85,
      status: "active"
    }
  ]);

  const [achievements] = useState([
    { id: 1, title: "Perfect Attendance", icon: "Award", earned: true, date: "2025-09-01" },
    { id: 2, title: "Quiz Master", icon: "Trophy", earned: true, date: "2025-08-28" },
    { id: 3, title: "Study Streak", icon: "Flame", earned: false, progress: 80 },
    { id: 4, title: "Course Completion", icon: "GraduationCap", earned: false, progress: 40 }
  ]);

  const getProgressColor = (progress) => {
    if (progress < 30) return 'bg-error';
    if (progress < 70) return 'bg-warning';
    return 'bg-success';
  };

  const getScoreColor = (score) => {
    if (score < 60) return 'text-error';
    if (score < 80) return 'text-warning';
    return 'text-success';
  };

  const formatNextLecture = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.ceil((date - now) / (1000 * 60 * 60));
    
    if (diffHours < 24) {
      return `in ${diffHours}h`;
    } else {
      const diffDays = Math.ceil(diffHours / 24);
      return `in ${diffDays}d`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress Card */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
              <Icon name="TrendingUp" size={20} className="text-success" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Progress Overview</h2>
              <p className="text-sm text-muted-foreground">Your learning journey</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-foreground">{progressData?.overallProgress}%</div>
            <div className="text-xs text-muted-foreground">Overall Progress</div>
          </div>
        </div>

        {/* Progress Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-lg font-semibold text-foreground">{progressData?.coursesInProgress}</div>
            <div className="text-xs text-muted-foreground">Active Courses</div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-lg font-semibold text-success">{progressData?.completedCourses}</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-lg font-semibold text-primary">{progressData?.currentStreak}</div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-lg font-semibold text-accent">{progressData?.totalStudyHours}h</div>
            <div className="text-xs text-muted-foreground">Study Time</div>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Overall Completion</span>
            <span className="font-medium text-foreground">{progressData?.overallProgress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(progressData?.overallProgress)}`}
              style={{ width: `${progressData?.overallProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Icon name="Target" size={14} className="text-success" />
              <span className={`font-medium ${getScoreColor(progressData?.averageQuizScore)}`}>
                {progressData?.averageQuizScore}% Avg Score
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={14} className="text-primary" />
              <span className={`font-medium ${getScoreColor(progressData?.attendanceRate)}`}>
                {progressData?.attendanceRate}% Attendance
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Course Progress Details */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Course Progress</h3>
          <Button variant="outline" size="sm">
            <Icon name="BarChart3" size={16} className="mr-2" />
            Detailed View
          </Button>
        </div>

        <div className="space-y-4">
          {courseProgress?.map((course) => (
            <div key={course?.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground truncate mb-1">
                    {course?.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    by {course?.instructor}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>{course?.completedLectures}/{course?.totalLectures} lectures</span>
                    <span>Next: {formatNextLecture(course?.nextLecture)}</span>
                    <span className={`font-medium ${getScoreColor(course?.averageScore)}`}>
                      {course?.averageScore}% avg
                    </span>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <div className="text-sm font-semibold text-foreground">{course?.progress}%</div>
                </div>
              </div>

              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(course?.progress)}`}
                  style={{ width: `${course?.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Achievements */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Achievements</h3>
          <Button variant="outline" size="sm">
            <Icon name="Award" size={16} className="mr-2" />
            View All
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {achievements?.map((achievement) => (
            <div 
              key={achievement?.id} 
              className={`p-3 rounded-lg border transition-colors duration-200 ${
                achievement?.earned 
                  ? 'bg-success/10 border-success/20' :'bg-muted/30 border-border'
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Icon 
                  name={achievement?.icon} 
                  size={16} 
                  className={achievement?.earned ? 'text-success' : 'text-muted-foreground'} 
                />
                <span className={`text-sm font-medium ${
                  achievement?.earned ? 'text-success' : 'text-muted-foreground'
                }`}>
                  {achievement?.title}
                </span>
              </div>
              
              {achievement?.earned ? (
                <p className="text-xs text-success/80">
                  Earned on {new Date(achievement.date)?.toLocaleDateString('en-IN')}
                </p>
              ) : (
                <div className="space-y-1">
                  <div className="w-full bg-muted rounded-full h-1">
                    <div 
                      className="bg-primary h-1 rounded-full transition-all duration-300"
                      style={{ width: `${achievement?.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {achievement?.progress}% complete
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressTrackingPanel;