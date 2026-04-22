import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LectureSearch = ({ onSearch, onFilterChange, className = "" }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    subject: 'all',
    duration: 'all',
    difficulty: 'all',
    hasQuiz: false,
    isOfflineAvailable: false
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const subjects = [
    { value: 'all', label: 'All Subjects' },
    { value: 'ai', label: 'Artificial Intelligence' },
    { value: 'vlsi', label: 'VLSI Design' },
    { value: 'renewable', label: 'Renewable Energy' },
    { value: 'embedded', label: 'Embedded Systems' },
    { value: 'iot', label: 'Internet of Things' },
    { value: 'robotics', label: 'Robotics' }
  ];

  const durations = [
    { value: 'all', label: 'Any Duration' },
    { value: 'short', label: 'Under 30 min' },
    { value: 'medium', label: '30-60 min' },
    { value: 'long', label: 'Over 60 min' }
  ];

  const difficulties = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const mockSuggestions = [
    'Machine Learning Basics',
    'Neural Networks Introduction',
    'VLSI Circuit Design',
    'Solar Panel Technology',
    'Microcontroller Programming',
    'IoT Sensor Networks',
    'Robotics Control Systems',
    'Digital Signal Processing'
  ];

  useEffect(() => {
    if (searchQuery?.length > 2) {
      const filtered = mockSuggestions?.filter(suggestion =>
        suggestion?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
      setSearchSuggestions(filtered?.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearch = (query = searchQuery) => {
    onSearch(query);
    setShowSuggestions(false);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...activeFilters, [filterType]: value };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const defaultFilters = {
      subject: 'all',
      duration: 'all',
      difficulty: 'all',
      hasQuiz: false,
      isOfflineAvailable: false
    };
    setActiveFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (activeFilters?.subject !== 'all') count++;
    if (activeFilters?.duration !== 'all') count++;
    if (activeFilters?.difficulty !== 'all') count++;
    if (activeFilters?.hasQuiz) count++;
    if (activeFilters?.isOfflineAvailable) count++;
    return count;
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
      {/* Search Input */}
      <div className="relative mb-4">
        <div className="relative">
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <input
            type="text"
            placeholder="Search lectures, topics, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            onKeyPress={(e) => e?.key === 'Enter' && handleSearch()}
            className="w-full pl-10 pr-12 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setSearchQuery('');
                handleSearch('');
              }}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 w-8 h-8"
            >
              <Icon name="X" size={14} />
            </Button>
          )}
        </div>

        {/* Search Suggestions */}
        {showSuggestions && searchSuggestions?.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-200">
            {searchSuggestions?.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg"
              >
                <div className="flex items-center space-x-2">
                  <Icon name="Search" size={12} className="text-muted-foreground" />
                  <span>{suggestion}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Filter Toggle */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2"
        >
          <Icon name="Filter" size={14} />
          <span>Filters</span>
          {getActiveFilterCount() > 0 && (
            <span className="bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full text-xs">
              {getActiveFilterCount()}
            </span>
          )}
          <Icon name={showFilters ? "ChevronUp" : "ChevronDown"} size={14} />
        </Button>

        {getActiveFilterCount() > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear All
          </Button>
        )}
      </div>
      {/* Filters */}
      {showFilters && (
        <div className="space-y-4 pt-4 border-t border-border">
          {/* Subject Filter */}
          <div>
            <label className="text-xs font-medium text-foreground mb-2 block">Subject</label>
            <select
              value={activeFilters?.subject}
              onChange={(e) => handleFilterChange('subject', e?.target?.value)}
              className="w-full p-2 border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              {subjects?.map((subject) => (
                <option key={subject?.value} value={subject?.value}>
                  {subject?.label}
                </option>
              ))}
            </select>
          </div>

          {/* Duration and Difficulty */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-foreground mb-2 block">Duration</label>
              <select
                value={activeFilters?.duration}
                onChange={(e) => handleFilterChange('duration', e?.target?.value)}
                className="w-full p-2 border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                {durations?.map((duration) => (
                  <option key={duration?.value} value={duration?.value}>
                    {duration?.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-foreground mb-2 block">Difficulty</label>
              <select
                value={activeFilters?.difficulty}
                onChange={(e) => handleFilterChange('difficulty', e?.target?.value)}
                className="w-full p-2 border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                {difficulties?.map((difficulty) => (
                  <option key={difficulty?.value} value={difficulty?.value}>
                    {difficulty?.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Checkbox Filters */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="hasQuiz"
                checked={activeFilters?.hasQuiz}
                onChange={(e) => handleFilterChange('hasQuiz', e?.target?.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary/20"
              />
              <label htmlFor="hasQuiz" className="text-sm text-foreground cursor-pointer">
                Has Quiz
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isOfflineAvailable"
                checked={activeFilters?.isOfflineAvailable}
                onChange={(e) => handleFilterChange('isOfflineAvailable', e?.target?.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary/20"
              />
              <label htmlFor="isOfflineAvailable" className="text-sm text-foreground cursor-pointer">
                Available Offline
              </label>
            </div>
          </div>
        </div>
      )}
      {/* Quick Search Tags */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="text-xs font-medium text-foreground mb-2">Popular Topics</div>
        <div className="flex flex-wrap gap-2">
          {['Machine Learning', 'Circuit Design', 'Solar Energy', 'IoT Basics', 'Robotics']?.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setSearchQuery(tag);
                handleSearch(tag);
              }}
              className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LectureSearch;