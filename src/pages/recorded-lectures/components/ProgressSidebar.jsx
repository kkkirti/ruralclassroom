import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgressSidebar = ({ lecture, progress, bookmarks, onBookmarkClick, onQuizStart, onNoteAdd }) => {
  const [activeSection, setActiveSection] = useState('progress');
  const [newNote, setNewNote] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);

  const sections = [
    { id: 'progress', label: 'Progress', icon: 'TrendingUp' },
    { id: 'bookmarks', label: 'Bookmarks', icon: 'Bookmark' },
    { id: 'quizzes', label: 'Quizzes', icon: 'HelpCircle' },
    { id: 'notes', label: 'My Notes', icon: 'StickyNote' }
  ];

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds?.toString()?.padStart(2, '0')}`;
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 50) return 'text-warning';
    return 'text-primary';
  };

  const handleAddNote = () => {
    if (newNote?.trim()) {
      onNoteAdd({
        content: newNote,
        timestamp: progress?.currentTime,
        createdAt: new Date()?.toISOString()
      });
      setNewNote('');
      setShowNoteInput(false);
    }
  };

  const renderProgress = () => (
    <div className="space-y-4">
      {/* Overall Progress */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Overall Progress</span>
          <span className={`text-sm font-semibold ${getProgressColor(progress?.percentage)}`}>
            {Math.round(progress?.percentage)}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress?.percentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>{formatTime(progress?.watchedTime)}</span>
          <span>{formatTime(lecture?.duration)}</span>
        </div>
      </div>

      {/* Watch Statistics */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card border border-border rounded-lg p-3 text-center">
          <Icon name="Play" size={20} className="text-primary mx-auto mb-1" />
          <div className="text-lg font-semibold text-foreground">{progress?.sessions}</div>
          <div className="text-xs text-muted-foreground">Sessions</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-3 text-center">
          <Icon name="Clock" size={20} className="text-accent mx-auto mb-1" />
          <div className="text-lg font-semibold text-foreground">{formatTime(progress?.totalTime)}</div>
          <div className="text-xs text-muted-foreground">Total Time</div>
        </div>
      </div>

      {/* Chapter Progress */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Chapter Progress</h4>
        <div className="space-y-2">
          {lecture?.chapters?.map((chapter, index) => (
            <div key={chapter?.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  chapter?.completed ? 'bg-success' : chapter?.started ? 'bg-warning' : 'bg-muted'
                }`}></div>
                <span className="text-sm text-foreground">{chapter?.title}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground">{formatTime(chapter?.duration)}</span>
                {chapter?.completed && <Icon name="Check" size={12} className="text-success" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <h4 className="text-sm font-medium text-foreground mb-2 flex items-center">
          <Icon name="Target" size={16} className="mr-2 text-primary" />
          Next Steps
        </h4>
        <div className="space-y-2">
          {progress?.percentage < 100 && (
            <div className="text-xs text-muted-foreground">
              • Continue watching from {formatTime(progress?.currentTime)}
            </div>
          )}
          {lecture?.hasQuiz && !progress?.quizCompleted && (
            <div className="text-xs text-muted-foreground">
              • Complete the quiz to test your knowledge
            </div>
          )}
          {progress?.percentage >= 80 && (
            <div className="text-xs text-muted-foreground">
              • Review your notes and bookmarks
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderBookmarks = () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-foreground">Saved Bookmarks</h4>
        <span className="text-xs text-muted-foreground">{bookmarks?.length} saved</span>
      </div>
      
      {bookmarks?.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Bookmark" size={32} className="text-muted-foreground mx-auto mb-2 opacity-50" />
          <p className="text-sm text-muted-foreground">No bookmarks yet</p>
          <p className="text-xs text-muted-foreground mt-1">
            Click the bookmark button while watching to save important moments
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {bookmarks?.map((bookmark) => (
            <div
              key={bookmark?.id}
              className="p-3 border border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() => onBookmarkClick(bookmark?.time)}
            >
              <div className="flex items-start justify-between mb-1">
                <span className="text-xs text-primary font-medium">
                  {formatTime(bookmark?.time)}
                </span>
                <Button variant="ghost" size="icon" className="w-6 h-6 -mt-1">
                  <Icon name="MoreVertical" size={12} />
                </Button>
              </div>
              <p className="text-sm text-foreground">{bookmark?.title}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Added {new Date(bookmark.timestamp)?.toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderQuizzes = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-foreground">Knowledge Check</h4>
        {lecture?.hasQuiz && (
          <div className={`w-2 h-2 rounded-full ${
            progress?.quizCompleted ? 'bg-success' : 'bg-warning animate-pulse'
          }`}></div>
        )}
      </div>

      {lecture?.hasQuiz ? (
        <div className="space-y-3">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="HelpCircle" size={20} className="text-primary flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h5 className="text-sm font-medium text-foreground mb-1">
                  Lecture Quiz
                </h5>
                <p className="text-xs text-muted-foreground mb-3">
                  Test your understanding with {lecture?.quiz?.questionCount} questions
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    Duration: ~{lecture?.quiz?.estimatedTime} min
                  </div>
                  {progress?.quizCompleted ? (
                    <div className="flex items-center space-x-1 text-xs text-success">
                      <Icon name="Check" size={12} />
                      <span>Completed</span>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onQuizStart}
                      disabled={progress?.percentage < 80}
                    >
                      Start Quiz
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {progress?.quizCompleted && (
            <div className="bg-success/5 border border-success/20 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Trophy" size={16} className="text-success" />
                <span className="text-sm font-medium text-success">Quiz Completed!</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Score: {progress?.quizScore}% • Completed on {new Date(progress.quizCompletedAt)?.toLocaleDateString()}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <Icon name="HelpCircle" size={32} className="text-muted-foreground mx-auto mb-2 opacity-50" />
          <p className="text-sm text-muted-foreground">No quiz available</p>
          <p className="text-xs text-muted-foreground mt-1">
            Some lectures include knowledge checks
          </p>
        </div>
      )}
    </div>
  );

  const renderNotes = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-foreground">My Notes</h4>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowNoteInput(!showNoteInput)}
        >
          <Icon name="Plus" size={14} className="mr-1" />
          Add
        </Button>
      </div>

      {showNoteInput && (
        <div className="bg-muted/50 rounded-lg p-3">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e?.target?.value)}
            placeholder="Add a note at current time..."
            className="w-full p-2 border border-border rounded text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
            rows={3}
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-muted-foreground">
              At {formatTime(progress?.currentTime)}
            </span>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" onClick={() => setShowNoteInput(false)}>
                Cancel
              </Button>
              <Button variant="default" size="sm" onClick={handleAddNote}>
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {progress?.notes?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="StickyNote" size={32} className="text-muted-foreground mx-auto mb-2 opacity-50" />
            <p className="text-sm text-muted-foreground">No notes yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Add notes while watching to remember key points
            </p>
          </div>
        ) : (
          progress?.notes?.map((note) => (
            <div key={note?.id} className="p-3 border border-border rounded-lg">
              <div className="flex items-start justify-between mb-1">
                <span className="text-xs text-primary font-medium">
                  {formatTime(note?.timestamp)}
                </span>
                <Button variant="ghost" size="icon" className="w-6 h-6 -mt-1">
                  <Icon name="MoreVertical" size={12} />
                </Button>
              </div>
              <p className="text-sm text-foreground">{note?.content}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(note.createdAt)?.toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'progress':
        return renderProgress();
      case 'bookmarks':
        return renderBookmarks();
      case 'quizzes':
        return renderQuizzes();
      case 'notes':
        return renderNotes();
      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg h-fit">
      {/* Section Navigation */}
      <div className="border-b border-border p-2">
        <div className="grid grid-cols-2 gap-1">
          {sections?.map((section) => (
            <button
              key={section?.id}
              onClick={() => setActiveSection(section?.id)}
              className={`flex items-center justify-center space-x-1 px-2 py-2 text-xs font-medium rounded transition-colors ${
                activeSection === section?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={section?.icon} size={14} />
              <span className="hidden sm:inline">{section?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Section Content */}
      <div className="p-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default ProgressSidebar;