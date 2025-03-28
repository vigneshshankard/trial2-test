import React, { useEffect, useState } from 'react';
import { getStudyMaterials, getCurrentAffairs, saveBookmark, getRecommendedMaterials } from '../services/contentManagementService';

const ContentManagementPage: React.FC = () => {
  const [studyMaterials, setStudyMaterials] = useState<any[]>([]);
  const [currentAffairs, setCurrentAffairs] = useState<any[]>([]);
  const [recommendedMaterials, setRecommendedMaterials] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      setError(null);
      try {
        const materials = await getStudyMaterials();
        const affairs = await getCurrentAffairs();
        setStudyMaterials(materials);
        setCurrentAffairs(affairs);
      } catch (err) {
        setError('Error fetching content.');
      }
    };

    const fetchRecommendedMaterials = async () => {
      try {
        const recommendations = await getRecommendedMaterials();
        setRecommendedMaterials(recommendations);
      } catch (err) {
        console.error('Error fetching recommended materials:', err);
      }
    };

    fetchContent();
    fetchRecommendedMaterials();
  }, []);

  const handleBookmark = async (affair: any) => {
    try {
      await saveBookmark(affair);
      alert('Article bookmarked successfully!');
    } catch (err) {
      alert('Failed to bookmark the article.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Content Management</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mt-4">
        <h2 className="text-2xl font-bold">Study Materials</h2>
        <ul>
          {studyMaterials.map((material, index) => (
            <li key={index}>{material}</li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h2 className="text-2xl font-bold">Current Affairs</h2>
        <ul>
          {currentAffairs.map((affair, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{affair}</span>
              <button
                className="ml-4 px-2 py-1 bg-blue-500 text-white rounded"
                onClick={() => handleBookmark(affair)}
              >
                Bookmark
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h2 className="text-2xl font-bold">Recommended for You</h2>
        <ul>
          {recommendedMaterials.map((material, index) => (
            <li key={index}>{material}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContentManagementPage;