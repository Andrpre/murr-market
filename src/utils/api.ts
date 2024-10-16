import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { OrderData, Product } from "../utils/types";
import { DocumentData } from "firebase/firestore";

// Получаем данные о продуктах из Firestore и приводим их к типу Product[]
export const fetchProducts = async (): Promise<Product[]> => {
  const productsCollection = collection(db, "products");
  const productsSnapshot = await getDocs(productsCollection);

  const productsList = productsSnapshot.docs.map((doc): Product => {
    const data = doc.data() as DocumentData;

    return {
      id: doc.id,
      name: data.name,
      price: {
        current: data.price.current,
        old: data.price.old,
      },
      description: {
        main: data.description.main,
        advantages: data.description.advantages,
        usage: data.description.usage,
      },
      image: {
        url: {
          main: data.image.url.main,
          catalog: data.image.url.catalog,
          additional: data.image.url.additional,
        },
        bgColor: data.image.bgColor,
      },
      tags: data.tags,
    };
  });

  return productsList;
};

// Функция для отправки заказа в Firestore
export const submitOrderToFirestore = async (
  orderData: OrderData
): Promise<void> => {
  try {
    await addDoc(collection(db, "orders"), {
      ...orderData,
      creatsubmitOrderToFirestoreedAt: new Date(),
    });
  } catch (error) {
    console.error("Error submitting order: ", error);
    throw error;
  }
};
