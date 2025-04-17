import {
  collection,
  DocumentData,
  getDocs,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { db } from "../../firestore/config.ts";
import { Order } from "../../generated/graphql.ts";

export const ordersDataMapper = (
  docs: QuerySnapshot<DocumentData, DocumentData>
) => {
  const finalArray: Order[] = docs.docs.map((doc) => {
    const record = doc.data();

    return {
      orderedPostcardsUUID: record.orderedPostcardsUUID,
      orderID: record.orderID,
      __typename: "Order",
      orderedAt: record.orderedAt,
      orderStatus: record.orderStatus,
      paymentStatus: record.paymentStatus,
      totalAmount: record.totalAmount,
    };
  });

  return finalArray;
};

export const fetchOrders = async (): Promise<Order[]> => {
  const collectionRef = collection(db, "postcard-orders");

  const docs = await getDocs(collectionRef);

  const finalArray: Order[] = ordersDataMapper(docs);

  return finalArray;
};

export const fetchSingleOrderById = async (id: string) => {
  const collectionRef = collection(db, "postcard-orders");

  const q = query(collectionRef, where("orderID", "==", id));
  const docs = await getDocs(q);

  const finalArray: Order[] = ordersDataMapper(docs);

  return finalArray;
};
