import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type FrameSize = {
  __typename?: 'FrameSize';
  x?: Maybe<Scalars['Int']['output']>;
  y?: Maybe<Scalars['Int']['output']>;
};

export type Order = {
  __typename?: 'Order';
  orderID: Scalars['ID']['output'];
  orderStatus?: Maybe<Scalars['String']['output']>;
  orderedAt?: Maybe<Scalars['String']['output']>;
  orderedPostcardsUUID: Array<OrderedPostcards>;
  paymentStatus?: Maybe<Scalars['Boolean']['output']>;
  postcards?: Maybe<Array<Postcard>>;
  totalAmount?: Maybe<Scalars['Int']['output']>;
};

export type OrderedPostcards = {
  __typename?: 'OrderedPostcards';
  buyingQuantity?: Maybe<Scalars['Int']['output']>;
  uuid: Scalars['ID']['output'];
};

export type Postcard = {
  __typename?: 'Postcard';
  category: ProductCategory;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Int']['output']>;
  productId: Scalars['ID']['output'];
  size?: Maybe<FrameSize>;
  stock?: Maybe<Scalars['Int']['output']>;
  uuid: Scalars['ID']['output'];
};

export enum ProductCategory {
  Postcards = 'postcards'
}

export type Query = {
  __typename?: 'Query';
  getAllOrders?: Maybe<Array<Order>>;
  getAllPostcards?: Maybe<Array<Postcard>>;
  getPostcardByID?: Maybe<Array<Postcard>>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  FrameSize: ResolverTypeWrapper<FrameSize>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Order: ResolverTypeWrapper<Order>;
  OrderedPostcards: ResolverTypeWrapper<OrderedPostcards>;
  Postcard: ResolverTypeWrapper<Postcard>;
  ProductCategory: ProductCategory;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  FrameSize: FrameSize;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Order: Order;
  OrderedPostcards: OrderedPostcards;
  Postcard: Postcard;
  Query: {};
  String: Scalars['String']['output'];
};

export type FrameSizeResolvers<ContextType = any, ParentType extends ResolversParentTypes['FrameSize'] = ResolversParentTypes['FrameSize']> = {
  x?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  y?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = {
  orderID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  orderStatus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  orderedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  orderedPostcardsUUID?: Resolver<Array<ResolversTypes['OrderedPostcards']>, ParentType, ContextType>;
  paymentStatus?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  postcards?: Resolver<Maybe<Array<ResolversTypes['Postcard']>>, ParentType, ContextType>;
  totalAmount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderedPostcardsResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderedPostcards'] = ResolversParentTypes['OrderedPostcards']> = {
  buyingQuantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostcardResolvers<ContextType = any, ParentType extends ResolversParentTypes['Postcard'] = ResolversParentTypes['Postcard']> = {
  category?: Resolver<ResolversTypes['ProductCategory'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes['FrameSize']>, ParentType, ContextType>;
  stock?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAllOrders?: Resolver<Maybe<Array<ResolversTypes['Order']>>, ParentType, ContextType>;
  getAllPostcards?: Resolver<Maybe<Array<ResolversTypes['Postcard']>>, ParentType, ContextType>;
  getPostcardByID?: Resolver<Maybe<Array<ResolversTypes['Postcard']>>, ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  FrameSize?: FrameSizeResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  OrderedPostcards?: OrderedPostcardsResolvers<ContextType>;
  Postcard?: PostcardResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

