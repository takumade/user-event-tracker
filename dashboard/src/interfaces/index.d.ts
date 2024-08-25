export interface ICategory {
  id: number;
  title: string;
}

export type IStatus = "published" | "draft" | "rejected";

export interface IPost {
  id: number;
  title: string;
  content: string;
  status: IStatus;
  category: ICategory;
}

export interface IUser {
  _id: string
  username: string
  email:string
}

export interface IEvent {
  _id: string
  userId: string
  event_type: string
  description: description 
  data: any 
  date: Date
  duration: number

}

export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};
