import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import './Menu.css';

const Menu = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [filterSort, setFilterSort] = useState('All');
  const [categories, setCategories] = useState(['All']);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'items'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(data);

      const uniqueCategories = [
        'All',
        ...new Set(data.map((item) => item.category).filter(Boolean)),
      ];
      setCategories(uniqueCategories);
    });

    return () => unsubscribe();
  }, []);

  const getFilteredAndSortedItems = () => {
    let result = [...items];

    // Handle search
    result = result.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

    // Handle category filter
    if (filterSort.startsWith('Category:')) {
      const category = filterSort.split('Category: ')[1];
      result = result.filter((item) => item.category === category);
    }

    // Handle sorting
    if (filterSort === 'Price: Low to High') {
      result.sort((a, b) => a.price - b.price);
    } else if (filterSort === 'Price: High to Low') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  };

  const filteredItems = getFilteredAndSortedItems();

  return (
    <div className="menu-container">
      <h2 className="menu-title">MENU</h2>

      <div className="menu-controls">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="menu-search"
        />

        <select
          value={filterSort}
          onChange={(e) => setFilterSort(e.target.value)}
          className="menu-filter"
        >
          <option value="All">Filter</option>
          {categories.map((cat, idx) =>
            cat !== 'All' ? (
              <option key={idx} value={`Category: ${cat}`}>
                Category: {cat}
              </option>
            ) : null
          )}
          <option value="Price: Low to High">Price: Low to High</option>
          <option value="Price: High to Low">Price: High to Low</option>
        </select>
      </div>

      <div className="menu-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className="menu-card">
              <img src={item.imageUrl} alt={item.name} className="menu-image" />
              <div className="menu-info">
                <h3 className="menu-name">{item.name}</h3>
                <p className="menu-price">${item.price.toFixed(2)}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-items">No items match your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Menu;
