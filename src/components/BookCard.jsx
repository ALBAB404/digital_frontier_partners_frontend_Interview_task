const BookCard = ({ book, showDelete, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-800 line-clamp-2">{book.title}</h3>
        {showDelete && (
          <button
            onClick={() => onDelete(book.id)}
            className="text-red-500 hover:text-red-700 ml-2"
            title="Delete book"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>
      
      <p className="text-gray-600 mb-3">by {book.author}</p>
      
      <p className="text-gray-700 text-sm mb-4 line-clamp-3">
        {book.description}
      </p>
      
      {book.user && (
        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg className="h-4 w-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-sm text-gray-600">{book.user.name}</span>
            </div>
            {book.distance_km !== undefined && (
              <div className="flex items-center">
                <svg className="h-4 w-4 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm text-gray-600">{book.distance_km.toFixed(1)} km</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookCard;
