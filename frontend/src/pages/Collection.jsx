// Collection.jsx
import React, { useState, useEffect, useContext } from 'react'
import ProductItem from '../components/ProductItem';
import { ShopContext } from '../context/ShopContext';

const Collection = () => {
  const { products, currency, search } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [sortOption, setSortOption] = useState('relevant');

  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .trim();
  };

  const calculateSimilarity = (str1, str2) => {
    str1 = normalizeText(str1);
    str2 = normalizeText(str2);

    if (!str1.length || !str2.length) return 0;
    if (str1 === str2) return 1;
    if (str1.includes(str2) || str2.includes(str1)) return 0.9;

    const str1Chars = str1.split('');
    const str2Chars = str2.split('');
    const commonChars = str1Chars.filter(char => str2Chars.includes(char));

    const commonLength = commonChars.length;
    const avgLength = (str1.length + str2.length) / 2;
    const charSimilarity = commonLength / avgLength;

    let positionSimilarity = 0;
    const minLength = Math.min(str1.length, str2.length);
    for (let i = 0; i < minLength; i++) {
      if (str1[i] === str2[i]) positionSimilarity++;
    }
    positionSimilarity /= avgLength;

    return (charSimilarity * 0.6) + (positionSimilarity * 0.4);
  };

  useEffect(() => {
    if (products && products.length > 0) {
      let filtered = [...products];

      // Apply fuzzy search filter
      if (search.trim()) {
        const searchTerm = search.toLowerCase();
        filtered = products
          .map(product => {
            const nameScore = calculateSimilarity(product.name, searchTerm);
            const categoryScore = calculateSimilarity(product.category, searchTerm);
            const subCategoryScore = calculateSimilarity(product.subCategory, searchTerm);

            const productWords = product.name.toLowerCase().split(' ');
            const searchWords = searchTerm.split(' ');
            const wordScores = searchWords.map(searchWord =>
              Math.max(...productWords.map(productWord =>
                calculateSimilarity(productWord, searchWord)
              ))
            );
            const wordScore = wordScores.reduce((a, b) => a + b, 0) / wordScores.length;

            return {
              product,
              score: Math.max(
                nameScore,
                wordScore * 1.2,
                categoryScore * 0.8,
                subCategoryScore * 0.8
              )
            };
          })
          .filter(item => item.score > 0.3)
          .sort((a, b) => b.score - a.score)
          .map(item => item.product);
      }

      // Apply existing filters
      if (selectedCategories.length > 0) {
        filtered = filtered.filter(product =>
          selectedCategories.includes(product.category)
        );
      }

      if (selectedSubCategories.length > 0) {
        filtered = filtered.filter(product =>
          selectedSubCategories.includes(product.subCategory)
        );
      }

      // Apply sorting
      switch (sortOption) {
        case 'price-asc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        default:
          break;
      }

      setFilteredProducts(filtered);
    }
  }, [products, selectedCategories, selectedSubCategories, sortOption, search]);

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(cat => cat !== category);
      }
      return [...prev, category];
    });
  };

  const handleSubCategoryChange = (subCategory) => {
    setSelectedSubCategories(prev => {
      if (prev.includes(subCategory)) {
        return prev.filter(sub => sub !== subCategory);
      }
      return [...prev, subCategory];
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters */}
        <div className="w-full md:w-1/4">
          <div className="mt-7">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden w-full py-2 px-4 border rounded-lg mb-4 flex justify-between items-center"
            >
              <span>Filters</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transform transition-transform ${showFilters ? 'rotate-180' : ''}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Filter Content */}
            <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
              <h3 className="text-gray-700 text-2xl mb-4">FILTERS</h3>

              <div className="space-y-4 md:block">
                <div className='border p-4 rounded-lg'>
                  <h4 className="font-medium mb-2">CATEGORIES</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={selectedCategories.includes('Men')}
                        onChange={() => handleCategoryChange('Men')}
                      />
                      <span>Men</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={selectedCategories.includes('Women')}
                        onChange={() => handleCategoryChange('Women')}
                      />
                      <span>Women</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={selectedCategories.includes('Kids')}
                        onChange={() => handleCategoryChange('Kids')}
                      />
                      <span>Kids</span>
                    </label>
                  </div>
                </div>

                <div className='border p-4 rounded-lg'>
                  <h4 className="font-medium mb-2">SUBCATEGORIES</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={selectedSubCategories.includes('Topwear')}
                        onChange={() => handleSubCategoryChange('Topwear')}
                      />
                      <span>Topwear</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={selectedSubCategories.includes('Bottomwear')}
                        onChange={() => handleSubCategoryChange('Bottomwear')}
                      />
                      <span>Bottomwear</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={selectedSubCategories.includes('Winterwear')}
                        onChange={() => handleSubCategoryChange('Winterwear')}
                      />
                      <span>Winterwear</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="/4">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 sm:gap-0 min-w-[48px]">
            <h1 className="text-2xl sm:text-3xl">
              <span className="text-gray-500">ALL</span>
              <span className="font-medium"> COLLECTIONS</span>
            </h1>
            <div className="border-2 rounded-md px-2 sm:px-4 py-2 w-full sm:w-auto">
              <select
                className="outline-none bg-transparent w-full sm:w-auto text-sm sm:text-base"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="relevant">Sort by: Relevant</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Collection
