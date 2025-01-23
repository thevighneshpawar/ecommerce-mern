import { useContext, useState, useEffect, useRef } from 'react';
import { ShopContext } from '../context/ShopContext';
import { IoSearchOutline } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import { Link, useLocation } from 'react-router-dom';

const SearchBar = ({ onClose }) => {
    const { search, setSearch, products } = useContext(ShopContext);
    const [showResults, setShowResults] = useState(false);
    const [visible,setVisible] = useState(true);
    const [searchResults, setSearchResults] = useState([]);
    const searchRef = useRef(null);
    const location = useLocation();
    

   


   useEffect(()=>{

         if(location.pathname.includes('collection') ){
           setVisible(false);
         }
         else{
           setVisible(true);
         }
       },[location]) 
    

    // Normalize text for better matching
    const normalizeText = (text) => {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '') // Remove all non-alphanumeric characters
            .trim();
    };

    // Calculate similarity between two strings
    const calculateSimilarity = (str1, str2) => {
        // Normalize both strings
        str1 = normalizeText(str1);
        str2 = normalizeText(str2);

        // If either string is empty, return 0
        if (!str1.length || !str2.length) return 0;

        // If strings are equal, return 1
        if (str1 === str2) return 1;

        // If one string contains the other, return 0.9
        if (str1.includes(str2) || str2.includes(str1)) return 0.9;

        // Calculate common characters
        const str1Chars = str1.split('');
        const str2Chars = str2.split('');
        const commonChars = str1Chars.filter(char => str2Chars.includes(char));

        // Calculate similarity based on common characters
        const commonLength = commonChars.length;
        const avgLength = (str1.length + str2.length) / 2;
        const charSimilarity = commonLength / avgLength;

        // Calculate position-based similarity
        let positionSimilarity = 0;
        const minLength = Math.min(str1.length, str2.length);
        for (let i = 0; i < minLength; i++) {
            if (str1[i] === str2[i]) positionSimilarity++;
        }
        positionSimilarity /= avgLength;

        // Combine similarities with weights
        return (charSimilarity * 0.6) + (positionSimilarity * 0.4);
    };

    // Handle search with enhanced fuzzy matching
    useEffect(() => {
        if (search.trim()) {
            const searchTerm = search.toLowerCase();
            
            const filtered = products
                .map(product => {
                    // Calculate similarity scores for different fields
                    const nameScore = calculateSimilarity(product.name, searchTerm);
                    const categoryScore = calculateSimilarity(product.category, searchTerm);
                    const subCategoryScore = calculateSimilarity(product.subCategory, searchTerm);
                    
                    // Calculate word-by-word similarity for product name
                    const productWords = product.name.toLowerCase().split(' ');
                    const searchWords = searchTerm.split(' ');
                    const wordScores = searchWords.map(searchWord => 
                        Math.max(...productWords.map(productWord => 
                            calculateSimilarity(productWord, searchWord)
                        ))
                    );
                    const wordScore = wordScores.reduce((a, b) => a + b, 0) / wordScores.length;
                    
                    // Take the highest similarity score
                    const maxScore = Math.max(
                        nameScore,
                        wordScore * 1.2, // Give higher weight to word matches
                        categoryScore * 0.8,
                        subCategoryScore * 0.8
                    );
                    
                    return {
                        product,
                        score: maxScore
                    };
                })
                .filter(item => item.score > 0.3) // Lower threshold for more results
                .sort((a, b) => b.score - a.score) // Sort by similarity score
                .map(item => item.product);

            setSearchResults(filtered.slice(0, 5)); // Limit to 5 results
            setShowResults(true);
        } else {
            setSearchResults([]);
            setShowResults(false);
        }
    }, [search, products]);

    const handleSearchClear = () => {
        setSearch('');
        setShowResults(false);
    };

    return (
        <div className="relative w-full" ref={searchRef}>
            {/* Search Input */}
            <div className="relative flex items-center w-full">
                <IoSearchOutline className="absolute left-3 text-gray-400" size={20} />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setShowResults(true)}
                    placeholder="Search products..."
                    className="w-full pl-10 pr-10 py-2 border rounded-full 
                             focus:outline-none focus:border-blue-500 bg-gray-50 text-sm"
                    autoFocus
                />
                {search && (
                    <IoMdClose
                        className="absolute right-3 text-gray-400 cursor-pointer 
                                 hover:text-gray-600 transition-colors"
                        size={20}
                        onClick={handleSearchClear}
                    />
                )}
            </div>

            {/* Search Results Dropdown */}
            {showResults && visible && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg 
                              shadow-lg border max-h-[400px] overflow-y-auto z-50">
                    {searchResults.length > 0 ? (
                        searchResults.map((product) => (
                            <Link
                                key={product._id}
                                to={`/product/${product._id}`}
                                onClick={() => setShowResults(false)}
                                className="flex items-center gap-3 p-2 hover:bg-gray-50 
                                         transition-colors border-b last:border-b-0"
                            >
                                <img
                                    src={product.image[0]}
                                    alt={product.name}
                                    className="w-10 h-10 object-cover rounded"
                                />
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-medium text-sm truncate">{product.name}</h3>
                                    <p className="text-xs text-gray-500 truncate">
                                        {product.category} • {product.subCategory}
                                    </p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="p-3 text-center text-sm text-gray-500">
                            No products found
                        </div>
                    )}
                </div>
            ) }
        </div>
    );
};

export default SearchBar;
