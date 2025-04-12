import {
  collection,
  DocumentData,
  getDocs,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { db } from "../../firestore/config.ts";
import { Postcard, ProductCategory } from "../../generated/graphql.ts";

export const postcardsDataMapper = (
  docs: QuerySnapshot<DocumentData, DocumentData>
) => {
  const finalArray: Postcard[] = docs.docs.map((doc) => {
    const record = doc.data();

    const size = record.productSize?.split("x");

    return {
      category: record.productCategory as ProductCategory,
      productId: record.productId,
      createdAt: record.createdAt,
      description: record.description,
      name: record.productName,
      price: record.productPrice,
      size: size
        ? {
            x: parseInt(size[0]),
            y: parseInt(size[1]),
          }
        : undefined,
      stock: record.productStock,
      uuid: record.uuid,
    };
  });

  return finalArray;
};

export const fetchPostcards = async (): Promise<Postcard[]> => {
  const collectionRef = collection(db, "postcards-product-shop");

  const docs = await getDocs(collectionRef);

  const finalArray: Postcard[] = postcardsDataMapper(docs);

  return finalArray;
};

export const fetchPostcardsByIds = async (
  cardIds: string[]
): Promise<Postcard[]> => {
  if (!cardIds.length) {
    return [];
  }

  const collectionRef = collection(db, "postcards-product-shop");

  const q = query(collectionRef, where("uuid", "in", cardIds));
  const docs = await getDocs(q);

  const finalArray: Postcard[] = postcardsDataMapper(docs);

  return finalArray;
};
