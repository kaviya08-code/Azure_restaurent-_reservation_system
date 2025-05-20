// src/firebase/firestore.js
import { db } from './config';
import { collection, addDoc } from 'firebase/firestore';

export const addItem = async (name, price) => {
  try {
    await addDoc(collection(db, 'items'), {
      name,
      price: parseFloat(price),
    });
    console.log('Item added successfully');
  } catch (e) {
    console.error('Error adding document:', e);
  }
};
