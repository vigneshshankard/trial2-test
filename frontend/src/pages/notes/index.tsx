import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { 
  BookOpen, Search, Filter, Bookmark, FolderPlus, Tag, 
  Edit, Trash2, Share, Download, Archive, Star, Clock,
  ChevronDown, FileText, PlusCircle, Folder, List, Grid
} from 'lucide-react';
import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';

// Types
interface Note {
  id: string;
  title: string;
  content: string;
  subject: string;
  topic?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isBookmarked: boolean;
  isFavorite: boolean;
  color?: string;
}

interface Subject {
  id: string;
  name: string;
  color: string;
}

interface Tag {
  id: string;
  name: string;
  count: number;
}

// Mock data
const mockSubjects: Subject[] = [
  { id: 'polity', name: 'Indian Polity', color: '#4F46E5' },
  { id: 'history', name: 'History', color: '#EC4899' },
  { id: 'geography', name: 'Geography', color: '#10B981' },
  { id: 'economics', name: 'Economics', color: '#F59E0B' },
  { id: 'science', name: 'Science & Technology', color: '#6366F1' }
];

const mockTags: Tag[] = [
  { id: 'important', name: 'Important', count: 12 },
  { id: 'revision', name: 'Revision', count: 8 },
  { id: 'prelims', name: 'Prelims', count: 15 },
  { id: 'mains', name: 'Mains', count: 7 },
  { id: 'current-affairs', name: 'Current Affairs', count: 10 },
  { id: 'conceptual', name: 'Conceptual', count: 5 }
];

const mockNotes: Note[] = [
  {
    id: 'note-1',
    title: 'Constitutional Framework - Key Amendments',
    content: 'The 73rd and 74th Constitutional Amendments Act gave constitutional status to the Panchayati Raj Institutions (PRIs) in rural areas and Urban Local Bodies (ULBs) in urban areas respectively, thereby creating institutions of self-government at the local level.',
    subject: 'Indian Polity',
    topic: 'Constitutional Framework',
    tags: ['important', 'prelims', 'mains'],
    createdAt: '2025-03-15T09:00:00Z',
    updatedAt: '2025-03-20T15:30:00Z',
    isBookmarked: true,
    isFavorite: true,
    color: '#EBF4FF'
  },
  {
    id: 'note-2',
    title: 'Modern Indian History - Freedom Movement Timeline',
    content: 'Key events in Indian freedom struggle: 1857 - First War of Independence, 1885 - Formation of Indian National Congress, 1905 - Bengal Partition, 1915 - Gandhi returns from South Africa, 1919 - Jallianwala Bagh Massacre...',
    subject: 'History',
    topic: 'Modern India',
    tags: ['important', 'revision'],
    createdAt: '2025-03-10T11:20:00Z',
    updatedAt: '2025-04-01T14:15:00Z',
    isBookmarked: true,
    isFavorite: false
  },
  {
    id: 'note-3',
    title: 'Monetary Policy Framework - RBI Functions',
    content: 'The Reserve Bank of India\'s monetary policy framework aims to set policy rates to achieve inflation targets while supporting growth. The Monetary Policy Committee (MPC) is entrusted with the task of fixing the benchmark policy rate (repo rate) required to contain inflation within the specified target level.',
    subject: 'Economics',
    topic: 'Monetary Policy',
    tags: ['mains', 'conceptual'],
    createdAt: '2025-02-28T10:45:00Z',
    updatedAt: '2025-03-25T09:30:00Z',
    isBookmarked: false,
    isFavorite: true,
    color: '#FEF3C7'
  },
  {
    id: 'note-4',
    title: 'Climate Types and Weather Patterns',
    content: 'India has six major climatic subtypes, ranging from arid desert in the west, alpine tundra and glaciers in the north, and humid tropical regions supporting rainforests in the southwest and island territories.',
    subject: 'Geography',
    topic: 'Climatology',
    tags: ['prelims', 'revision'],
    createdAt: '2025-03-05T16:30:00Z',
    updatedAt: '2025-03-28T11:10:00Z',
    isBookmarked: true,
    isFavorite: false,
    color: '#D1FAE5'
  },
  {
    id: 'note-5',
    title: 'Nanotechnology and its Applications',
    content: 'Nanotechnology involves manipulation of matter on an atomic and molecular scale. Applications include medicine (drug delivery, diagnostics), electronics (smaller, faster devices), energy (improved batteries, solar cells), and environmental remediation.',
    subject: 'Science & Technology',
    topic: 'Emerging Technologies',
    tags: ['current-affairs', 'prelims'],
    createdAt: '2025-04-02T08:15:00Z',
    updatedAt: '2025-04-05T13:20:00Z',
    isBookmarked: false,
    isFavorite: false
  }
];

const NotesPage: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState('updated');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  
  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('userToken');
    
    if (!token) {
      router.push('/login?redirect=/notes');
      return;
    }
    
    // Fetch data
    fetchNotesData();
  }, [router]);
  
  useEffect(() => {
    // Apply filters whenever filter conditions change
    applyFilters();
  }, [notes, searchQuery, selectedSubjects, selectedTags, sortOption, showBookmarkedOnly]);
  
  const fetchNotesData = async () => {
    setIsLoading(true);
    
    try {
      // In a real app, these would be API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setNotes(mockNotes);
      setSubjects(mockSubjects);
      setTags(mockTags);
      setFilteredNotes(mockNotes);
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching notes data:', error);
      setIsLoading(false);
    }
  };
  
  const applyFilters = () => {
    let filtered = [...notes];
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(note => 
        note.title.toLowerCase().includes(query) || 
        note.content.toLowerCase().includes(query) ||
        note.subject.toLowerCase().includes(query) ||
        (note.topic && note.topic.toLowerCase().includes(query)) ||
        note.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply subject filter
    if (selectedSubjects.length > 0) {
      filtered = filtered.filter(note => selectedSubjects.includes(note.subject));
    }
    
    // Apply tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(note => 
        note.tags.some(tag => selectedTags.includes(tag))
      );
    }
    
    // Apply bookmark filter
    if (showBookmarkedOnly) {
      filtered = filtered.filter(note => note.isBookmarked);
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'updated':
        filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        break;
      case 'created':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'subject':
        filtered.sort((a, b) => a.subject.localeCompare(b.subject));
        break;
    }
    
    setFilteredNotes(filtered);
  };
  
  const toggleSubjectFilter = (subject: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subject) 
        ? prev.filter(s => s !== subject) 
        : [...prev, subject]
    );
  };
  
  const toggleTagFilter = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };
  
  const handleCreateNote = () => {
    // In a real app, this would open a note editor or redirect to a create note page
    alert('Create note functionality would be implemented here');
  };
  
  const toggleBookmark = (noteId: string) => {
    setNotes(prev => 
      prev.map(note => 
        note.id === noteId 
          ? { ...note, isBookmarked: !note.isBookmarked } 
          : note
      )
    );
  };
  
  const toggleFavorite = (noteId: string) => {
    setNotes(prev => 
      prev.map(note => 
        note.id === noteId 
          ? { ...note, isFavorite: !note.isFavorite } 
          : note
      )
    );
  };
  
  const deleteNote = (noteId: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      setNotes(prev => prev.filter(note => note.id !== noteId));
    }
  };
  
  const editNote = (noteId: string) => {
    // In a real app, this would open a note editor with the selected note
    alert(`Edit note ${noteId}`);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <Layout userRole="free">
      <Head>
        <title>Notes & Bookmarks | UPSCMONK</title>
      </Head>
      
      <div className="bg-neutral-50 min-h-screen pb-12">
        {/* Header */}
        <div className="bg-white border-b border-neutral-200 py-8">
          <div className="container">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-neutral-800">Notes & Bookmarks</h1>
                <p className="text-neutral-600 mt-1">
                  Organize your study materials, create notes, and save important resources
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search notes..."
                    className="pl-10 pr-4 py-2 border border-neutral-300 rounded-lg w-full lg:w-64 focus:outline-none focus:ring-2 focus:ring-primary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Button 
                  variant="outline" 
                  leftIcon={<Filter size={18} />}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  Filters
                </Button>
                
                <Button 
                  variant="primary" 
                  leftIcon={<PlusCircle size={18} />}
                  onClick={handleCreateNote}
                >
                  Create Note
                </Button>
              </div>
            </div>
            
            {/* Filters section */}
            {showFilters && (
              <div className="mt-6 p-4 bg-white rounded-lg border border-neutral-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Subject filter */}
                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <BookOpen size={16} className="mr-1" />
                      Subjects
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {subjects.map(subject => (
                        <button
                          key={subject.id}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            selectedSubjects.includes(subject.name)
                              ? 'bg-primary text-white'
                              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                          }`}
                          onClick={() => toggleSubjectFilter(subject.name)}
                        >
                          <div className="flex items-center">
                            <div 
                              className="w-2 h-2 rounded-full mr-1" 
                              style={{ backgroundColor: subject.color }}
                            ></div>
                            {subject.name}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Tags filter */}
                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <Tag size={16} className="mr-1" />
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {tags.map(tag => (
                        <button
                          key={tag.id}
                          className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${
                            selectedTags.includes(tag.id)
                              ? 'bg-primary text-white'
                              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                          }`}
                          onClick={() => toggleTagFilter(tag.id)}
                        >
                          {tag.name}
                          <span className="ml-1 text-xs opacity-70">({tag.count})</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Other filters */}
                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <Filter size={16} className="mr-1" />
                      Options
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="bookmarked"
                          checked={showBookmarkedOnly}
                          onChange={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
                          className="rounded text-primary focus:ring-primary"
                        />
                        <label htmlFor="bookmarked" className="ml-2 text-sm">
                          Bookmarked only
                        </label>
                      </div>
                      
                      <div>
                        <label htmlFor="sort" className="block text-sm mb-1">
                          Sort by:
                        </label>
                        <select
                          id="sort"
                          className="w-full p-2 text-sm border border-neutral-300 rounded-md"
                          value={sortOption}
                          onChange={(e) => setSortOption(e.target.value)}
                        >
                          <option value="updated">Last Updated</option>
                          <option value="created">Date Created</option>
                          <option value="title">Title (A-Z)</option>
                          <option value="subject">Subject</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Main Content */}
        <div className="container py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">
              {filteredNotes.length} {filteredNotes.length === 1 ? 'Note' : 'Notes'}
            </h2>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <button
                  className={`p-2 rounded-l-md ${viewMode === 'grid' 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-neutral-600 hover:bg-neutral-100'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid size={18} />
                </button>
                <button
                  className={`p-2 rounded-r-md ${viewMode === 'list' 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-neutral-600 hover:bg-neutral-100'}`}
                  onClick={() => setViewMode('list')}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
                  <div className="h-6 bg-neutral-200 rounded w-3/4 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-neutral-200 rounded w-full"></div>
                    <div className="h-4 bg-neutral-200 rounded w-full"></div>
                    <div className="h-4 bg-neutral-200 rounded w-2/3"></div>
                  </div>
                  <div className="flex justify-between mt-6">
                    <div className="h-5 bg-neutral-200 rounded w-1/3"></div>
                    <div className="h-5 bg-neutral-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredNotes.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm">
              <FolderPlus size={48} className="mx-auto text-neutral-300 mb-4" />
              <h3 className="text-xl font-bold mb-2">No notes found</h3>
              <p className="text-neutral-600 mb-6">
                {searchQuery || selectedSubjects.length > 0 || selectedTags.length > 0
                  ? 'Try adjusting your filters or search query'
                  : "You haven't created any notes yet"}
              </p>
              <Button
                variant="primary"
                leftIcon={<PlusCircle size={18} />}
                onClick={handleCreateNote}
              >
                Create Your First Note
              </Button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note) => (
                <div 
                  key={note.id} 
                  className={`bg-white rounded-xl shadow-sm overflow-hidden border-l-4 hover:shadow-md transition-shadow ${
                    note.color ? '' : 'border-neutral-200'
                  }`}
                  style={note.color ? { borderLeftColor: note.color === '#EBF4FF' ? '#4F46E5' : 
                    note.color === '#FEF3C7' ? '#F59E0B' :
                    note.color === '#D1FAE5' ? '#10B981' : '#6366F1' } : {}}
                >
                  <div className="p-6" style={note.color ? { backgroundColor: note.color } : {}}>
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-lg line-clamp-2">{note.title}</h3>
                      <div className="flex space-x-1">
                        <button
                          className={`p-1 rounded-full ${note.isFavorite ? 'text-amber-500' : 'text-neutral-400 hover:text-neutral-600'}`}
                          onClick={() => toggleFavorite(note.id)}
                        >
                          <Star size={18} fill={note.isFavorite ? 'currentColor' : 'none'} />
                        </button>
                        <button
                          className={`p-1 rounded-full ${note.isBookmarked ? 'text-primary' : 'text-neutral-400 hover:text-neutral-600'}`}
                          onClick={() => toggleBookmark(note.id)}
                        >
                          <Bookmark size={18} fill={note.isBookmarked ? 'currentColor' : 'none'} />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-neutral-600 text-sm line-clamp-3 mb-4">
                      {note.content}
                    </p>
                    
                    <div className="flex items-center text-xs text-neutral-500 space-x-3 mb-3">
                      <span className="flex items-center">
                        <BookOpen size={12} className="mr-1" />
                        {note.subject}
                      </span>
                      {note.topic && (
                        <span>{note.topic}</span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {note.tags.map((tagId, i) => {
                        const tag = mockTags.find(t => t.id === tagId);
                        return tag && (
                          <span key={i} className="text-xs px-2 py-0.5 bg-neutral-100 text-neutral-700 rounded-full">
                            #{tag.name}
                          </span>
                        );
                      })}
                    </div>
                    
                    <div className="flex justify-between items-center pt-3 border-t border-neutral-100">
                      <div className="text-xs text-neutral-500">
                        Updated {formatDate(note.updatedAt)}
                      </div>
                      
                      <div className="flex space-x-1">
                        <button
                          className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
                          onClick={() => editNote(note.id)}
                        >
                          <Edit size={15} />
                        </button>
                        <button
                          className="p-1.5 rounded-full text-neutral-400 hover:text-error hover:bg-neutral-100"
                          onClick={() => deleteNote(note.id)}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotes.map((note) => (
                <div 
                  key={note.id} 
                  className={`bg-white rounded-lg shadow-sm overflow-hidden border-l-4 hover:shadow-md transition-shadow ${
                    note.color ? '' : 'border-neutral-200'
                  }`}
                  style={note.color ? { borderLeftColor: note.color === '#EBF4FF' ? '#4F46E5' : 
                    note.color === '#FEF3C7' ? '#F59E0B' :
                    note.color === '#D1FAE5' ? '#10B981' : '#6366F1' } : {}}
                >
                  <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4" style={note.color ? { backgroundColor: note.color } : {}}>
                    <div className="flex-grow">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                        <h3 className="font-bold text-lg">{note.title}</h3>
                        
                        <div className="flex space-x-2 items-center">
                          <span className="text-xs text-neutral-500">
                            Updated {formatDate(note.updatedAt)}
                          </span>
                          <div className="flex">
                            <button
                              className={`p-1 rounded-full ${note.isFavorite ? 'text-amber-500' : 'text-neutral-400 hover:text-neutral-600'}`}
                              onClick={() => toggleFavorite(note.id)}
                            >
                              <Star size={16} fill={note.isFavorite ? 'currentColor' : 'none'} />
                            </button>
                            <button
                              className={`p-1 rounded-full ${note.isBookmarked ? 'text-primary' : 'text-neutral-400 hover:text-neutral-600'}`}
                              onClick={() => toggleBookmark(note.id)}
                            >
                              <Bookmark size={16} fill={note.isBookmarked ? 'currentColor' : 'none'} />
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-neutral-600 text-sm line-clamp-2 mb-3">
                        {note.content}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="flex items-center text-xs bg-primary-50 text-primary-800 px-2 py-0.5 rounded-full">
                          <BookOpen size={12} className="mr-1" />
                          {note.subject}
                        </span>
                        {note.topic && (
                          <span className="text-xs bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded-full">
                            {note.topic}
                          </span>
                        )}
                        
                        {note.tags.map((tagId, i) => {
                          const tag = mockTags.find(t => t.id === tagId);
                          return tag && (
                            <span key={i} className="text-xs px-2 py-0.5 bg-neutral-100 text-neutral-700 rounded-full">
                              #{tag.name}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div className="flex sm:flex-col sm:justify-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        leftIcon={<Edit size={14} />}
                        onClick={() => editNote(note.id)}
                      >
                        Edit
                      </Button>
                      <div className="flex gap-1">
                        <button
                          className="p-2 rounded text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100"
                          title="Share note"
                        >
                          <Share size={16} />
                        </button>
                        <button
                          className="p-2 rounded text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100"
                          title="Download note"
                        >
                          <Download size={16} />
                        </button>
                        <button
                          className="p-2 rounded text-neutral-500 hover:text-error hover:bg-neutral-100"
                          onClick={() => deleteNote(note.id)}
                          title="Delete note"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default NotesPage;