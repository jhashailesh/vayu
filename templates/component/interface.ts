
import { Document } from "mongoose";
export interface ICCOMPONENT {
  email: string;
  name: string;
  age: number;
};

export interface ICCOMPONENTModel extends ICCOMPONENT, Document {
  fullName(): string;
  addNewCCOMPONENT():ICCOMPONENTModel;
  isEmailExist(): Promise<boolean>;
}


export interface ICCOMPONENTCustomModel {
  fetchAll():Promise<ICCOMPONENTModel[]>;
  fetch(id:string):Promise<ICCOMPONENTModel | null>;
  add(data: ICCOMPONENTModel):Promise<ICCOMPONENTModel | null>;
  update(id: string, body: ICCOMPONENTModel):Promise<ICCOMPONENTModel | null>;
  remove(id: string):Promise<ICCOMPONENTModel | null>;
}