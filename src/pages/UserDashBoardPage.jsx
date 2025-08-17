import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import BookShareForm from "../components/BookShareForm";
import Notification from "../components/Notification";
import useAxios from "../hooks/useAxios";

const UserDashBoardPage = () => {
  const [showShareForm, setShowShareForm] = useState(false);
  const [nearbyBooks, setNearbyBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    isVisible: false,
    message: '',
    type: 'success'
  });
  const api = useAxios();
  
  const handleBookShared = () => {
    setShowShareForm(false);
    setNotification({
      isVisible: true,
      message: 'Book shared successfully! 📚',
      type: 'success'
    });
  };

  const hideNotification = () => {
    setNotification(prev => ({
      ...prev,
      isVisible: false
    }));
  };
  
  const fetchNearbyBooks = async () => {
    try {
      setLoading(true);
      const response = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/books/nearby`);
      if(response.status === 200) {
        setNearbyBooks(response.data.books);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch nearby books');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNearbyBooks();
  }, []);
  

  return (
    <>
      {/* Notification */}
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
      
      <div className="px-4 py-6">
    {/* Header Section */}
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Book Sharing Dashboard</h1>
      <p className="text-gray-600">Share your books and discover what others are reading nearby</p>
    </div>

    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center">
          <div className="p-3 bg-blue-100 rounded-lg">
            <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-600">Nearby Books</p>
            <p className="text-2xl font-bold text-gray-800">{nearbyBooks.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center">
          <div className="p-3 bg-green-100 rounded-lg">
            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-600">Search Radius</p>
            <p className="text-2xl font-bold text-gray-800">10 km</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <button
          onClick={() => setShowShareForm(true)}
          className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
        >
          <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Share a Book
        </button>
      </div>
    </div>

    {/* Share Book Form Modal */}
    {showShareForm && (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
          <div className="flex justify-between items-center p-6 border-b">
            <h3 className="text-xl font-bold text-gray-800">Share a Book</h3>
            <button
              onClick={() => setShowShareForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <BookShareForm onSuccess={handleBookShared} onCancel={() => setShowShareForm(false)} />
        </div>
      </div>
    )}

    {/* Nearby Books Section */}
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Books Near You</h2>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : nearbyBooks.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <svg className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <p className="text-gray-600 text-lg">No books found nearby</p>
          <p className="text-gray-500 mt-2">Be the first to share a book in your area!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nearbyBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  </div>
    </>
  )
}

export default UserDashBoardPage
