import {Schema, Model, model} from "mongoose";
import { ICCOMPONENTModel } from "./SCOMPONENT.interface";


export const CCOMPONENTSchema: Schema = new Schema({
  email: String,
  name: String,
  age:Number
},
{
  timestamps: true
});


CCOMPONENTSchema.pre("save", async (next)=>{
  // Anything you want to do 
  // before saving anything
  next();
});

CCOMPONENTSchema.methods.fullName = function(): string {
  return (this.name.trim() + " " + this.age.trim());
};

CCOMPONENTSchema.methods.isEmailExist = async function():Promise<boolean> {
  return 0 < await CCOMPONENT.findOne({email: this.email}).countDocuments();
};

CCOMPONENTSchema.methods.addNewCCOMPONENT = async function () {
  return this.save();
}

export const CCOMPONENT: Model<ICCOMPONENTModel> = model<ICCOMPONENTModel>("CCOMPONENT", CCOMPONENTSchema);
