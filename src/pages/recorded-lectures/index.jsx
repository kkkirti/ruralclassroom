import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import ConnectionStatusIndicator from '../../components/ui/ConnectionStatusIndicator';
import VideoPlayer from './components/VideoPlayer';
import LectureMaterials from './components/LectureMaterials';
import ProgressSidebar from './components/ProgressSidebar';
import DownloadManager from './components/DownloadManager';
import LectureSearch from './components/LectureSearch';
import RelatedLectures from './components/RelatedLectures';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const RecordedLectures = () => {
  const location = useLocation();
  const [currentLecture, setCurrentLecture] = useState(null);
  const [progress, setProgress] = useState({});
  const [bookmarks, setBookmarks] = useState([]);
  const [showDownloadManager, setShowDownloadManager] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock lecture data
  const mockLecture = {
    id: 'lec-001',
    title: 'Introduction to Machine Learning Algorithms',
    instructor: 'Dr. Priya Sharma',
    subject: 'Artificial Intelligence',
    difficulty: 'Intermediate',
    duration: 3600, // 60 minutes
    uploadDate: '2025-09-08',
    views: 1850,
    rating: 4.8,
    description: `This comprehensive lecture introduces the fundamental concepts of machine learning algorithms.\n\nTopics covered include:\n• Supervised vs Unsupervised Learning\n• Classification and Regression Techniques\n• Model Evaluation and Validation\n• Practical Implementation Examples\n\nPerfect for students beginning their journey in AI and machine learning.`,
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=450&fit=crop',
    hasQuiz: true,
    quiz: {
      questionCount: 10,
      estimatedTime: 15
    },
    chapters: [
      { id: 'ch1', title: 'Introduction to ML', duration: 900, completed: true, started: true },
      { id: 'ch2', title: 'Supervised Learning', duration: 1200, completed: true, started: true },
      { id: 'ch3', title: 'Unsupervised Learning', duration: 900, completed: false, started: true },
      { id: 'ch4', title: 'Model Evaluation', duration: 600, completed: false, started: false }
    ],
    materials: {
      slides: [
        {
          id: 'slide1',
          title: 'Course Introduction',
          description: 'Overview of machine learning concepts and applications',
          timestamp: 0,
          thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=150&fit=crop',
          isOfflineAvailable: true
        },
        {
          id: 'slide2',
          title: 'Types of Learning',
          description: 'Supervised, unsupervised, and reinforcement learning',
          timestamp: 900,
          thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&h=150&fit=crop',
          isOfflineAvailable: true
        },
        {
          id: 'slide3',
          title: 'Algorithm Categories',
          description: 'Classification, regression, and clustering algorithms',
          timestamp: 1800,
          thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=200&h=150&fit=crop',
          isOfflineAvailable: false
        }
      ],
      notes: [
        {
          id: 'note1',
          title: 'Key Definitions',
          content: 'Machine Learning is a subset of AI that enables computers to learn and improve from experience without being explicitly programmed.',
          timestamp: 300,
          author: 'Dr. Priya Sharma',
          isOfflineAvailable: true
        },
        {
          id: 'note2',
          title: 'Important Algorithms',
          content: 'Linear Regression, Decision Trees, Random Forest, SVM, and Neural Networks are fundamental algorithms every ML practitioner should understand.',
          timestamp: 1500,
          author: 'Dr. Priya Sharma',
          isOfflineAvailable: true
        }
      ],
      documents: [
        {
          id: 'doc1',
          name: 'ML_Algorithms_Reference.pdf',
          type: 'pdf',
          size: 2.1 * 1024 * 1024,
          isOfflineAvailable: true
        },
        {
          id: 'doc2',
          name: 'Python_Code_Examples.zip',
          type: 'zip',
          size: 5.3 * 1024 * 1024,
          isOfflineAvailable: false
        },
        {
          id: 'doc3',
          name: 'Dataset_Samples.csv',
          type: 'csv',
          size: 1.8 * 1024 * 1024,
          isOfflineAvailable: true
        }
      ],
      transcript: [
        {
          id: 'trans1',
          timestamp: 0,
          text: 'Welcome to this comprehensive introduction to machine learning algorithms. Today we will explore the fundamental concepts that form the backbone of artificial intelligence.'
        },
        {
          id: 'trans2',
          timestamp: 30,
          text: 'Machine learning is essentially about teaching computers to recognize patterns in data and make predictions or decisions based on those patterns.'
        },
        {
          id: 'trans3',
          timestamp: 60,
          text: 'There are three main types of machine learning: supervised learning, unsupervised learning, and reinforcement learning. Let us start with supervised learning.'
        }
      ]
    }
  };

  const mockProgress = {
    currentTime: 1200, // 20 minutes
    watchedTime: 2100, // 35 minutes
    totalTime: 2400, // 40 minutes total watched
    percentage: 58.3,
    sessions: 3,
    quizCompleted: false,
    quizScore: 0,
    quizCompletedAt: null,
    notes: [
      {
        id: 'mynote1',
        content: 'Remember to practice these algorithms with real datasets',
        timestamp: 800,
        createdAt: '2025-09-09T10:30:00Z'
      }
    ]
  };

  const mockBookmarks = [
    {
      id: 'bm1',
      time: 450,
      title: 'Definition of Machine Learning',
      timestamp: '2025-09-09T10:15:00Z'
    },
    {
      id: 'bm2',
      time: 1350,
      title: 'Types of Learning Algorithms',
      timestamp: '2025-09-09T10:45:00Z'
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setCurrentLecture(mockLecture);
      setProgress(mockProgress);
      setBookmarks(mockBookmarks);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleProgressUpdate = (currentTime, duration) => {
    const percentage = duration > 0 ? (currentTime / duration) * 100 : 0;
    setProgress(prev => ({
      ...prev,
      currentTime,
      percentage: Math.min(percentage, 100)
    }));
  };

  const handleBookmarkAdd = (bookmark) => {
    const newBookmark = {
      ...bookmark,
      id: `bm${Date.now()}`
    };
    setBookmarks(prev => [...prev, newBookmark]);
  };

  const handleBookmarkClick = (time) => {
    // This would seek the video to the bookmarked time
    console.log('Seeking to time:', time);
  };

  const handleTimestampClick = (timestamp) => {
    // This would seek the video to the clicked timestamp
    console.log('Seeking to timestamp:', timestamp);
  };

  const handleQuizStart = () => {
    // Navigate to quiz or open quiz modal
    console.log('Starting quiz for lecture:', currentLecture?.id);
  };

  const handleNoteAdd = (note) => {
    const newNote = {
      ...note,
      id: `note${Date.now()}`
    };
    setProgress(prev => ({
      ...prev,
      notes: [...(prev?.notes || []), newNote]
    }));
  };

  const handleSearch = (query) => {
    // Mock search results
    const mockResults = [
      {
        id: 'search1',
        title: 'Advanced Neural Networks',
        instructor: 'Prof. Kumar',
        duration: 3420,
        subject: 'AI'
      },
      {
        id: 'search2',
        title: 'Deep Learning Basics',
        instructor: 'Dr. Patel',
        duration: 2880,
        subject: 'AI'
      }
    ];
    setSearchResults(mockResults);
  };

  const handleFilterChange = (filters) => {
    console.log('Filters changed:', filters);
    // Apply filters to search results
  };

  const handleLectureSelect = (lecture) => {
    setCurrentLecture(lecture);
    setShowSearch(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <Icon name="Loader" size={32} className="animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Loading lecture content...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onToggleSidebar={() => {}} />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-6">
          {/* Top Navigation */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <BreadcrumbNavigation />
              <ConnectionStatusIndicator />
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSearch(!showSearch)}
              >
                <Icon name="Search" size={16} className="mr-2" />
                Search Lectures
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDownloadManager(true)}
              >
                <Icon name="Download" size={16} className="mr-2" />
                Download
              </Button>
            </div>
          </div>

          {/* Search Section */}
          {showSearch && (
            <div className="mb-6">
              <LectureSearch
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
              />
            </div>
          )}

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Video and Materials - Left Column */}
            <div className="xl:col-span-3 space-y-6">
              {/* Video Player */}
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <VideoPlayer
                  lecture={currentLecture}
                  onProgressUpdate={handleProgressUpdate}
                  onBookmarkAdd={handleBookmarkAdd}
                />
                
                {/* Lecture Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h1 className="text-2xl font-bold text-foreground mb-2">
                        {currentLecture?.title}
                      </h1>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Icon name="User" size={16} />
                          <span>{currentLecture?.instructor}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="BookOpen" size={16} />
                          <span>{currentLecture?.subject}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={16} />
                          <span>{Math.floor(currentLecture?.duration / 60)} minutes</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Eye" size={16} />
                          <span>{currentLecture?.views?.toLocaleString()} views</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Star" size={16} className="text-warning fill-current" />
                          <span>{currentLecture?.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Icon name="Share" size={16} className="mr-2" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="Bookmark" size={16} className="mr-2" />
                        Save
                      </Button>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="prose prose-sm max-w-none">
                    <p className="text-muted-foreground whitespace-pre-line">
                      {currentLecture?.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Lecture Materials */}
              <LectureMaterials
                materials={currentLecture?.materials}
                currentTime={progress?.currentTime}
                onTimestampClick={handleTimestampClick}
              />
            </div>

            {/* Sidebar - Right Column */}
            <div className="space-y-6">
              {/* Progress Sidebar */}
              <ProgressSidebar
                lecture={currentLecture}
                progress={progress}
                bookmarks={bookmarks}
                onBookmarkClick={handleBookmarkClick}
                onQuizStart={handleQuizStart}
                onNoteAdd={handleNoteAdd}
              />

              {/* Related Lectures */}
              <RelatedLectures
                currentLecture={currentLecture}
                onLectureSelect={handleLectureSelect}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Download Manager Modal */}
      <DownloadManager
        lecture={currentLecture}
        isOpen={showDownloadManager}
        onClose={() => setShowDownloadManager(false)}
      />
    </div>
  );
};

export default RecordedLectures;