// src/services/productsService.ts
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { Product } from "../utils/types"; // Предположим, тип Product был определен в вашем проекте
import { DocumentData } from "firebase/firestore";

// Получаем данные о продуктах из Firestore и приводим их к типу Product[]
export const fetchProducts = async (): Promise<Product[]> => {
  const productsCollection = collection(db, "products");
  const productsSnapshot = await getDocs(productsCollection);
  
  const productsList = productsSnapshot.docs.map((doc): Product => {
    const data = doc.data() as DocumentData;

    // Проверяем, что все необходимые поля существуют в документе
    return {
      id: doc.id,
      name: data.name || "No name",
      price: data.price || 0,
      description: data.description || "No description",
      image: data.image || "",
    };
  });

  return productsList;
};
