import { CCOMPONENT} from "./SCOMPONENT.schema";
import { injectable } from "inversify";
import { ICCOMPONENTCustomModel, ICCOMPONENTModel } from "./SCOMPONENT.interface";
// import { HTTP400Error } from "../../lib/utils/httpErrors";

@injectable()
export class CCOMPONENTModel implements ICCOMPONENTCustomModel {

  async fetchAll() {
    // throw new HTTP400Error("nahi hai bhai");
    
    return CCOMPONENT.find({}, 'name email age createdAt');
  }

  async fetch(id: string) {
    return CCOMPONENT.findById(id, 'name email age');
  }

  async add(body: ICCOMPONENTModel) {
    const q: ICCOMPONENTModel = new CCOMPONENT(body);
    return q.addNewCCOMPONENT();
  }

  async update(id: string, body: ICCOMPONENTModel) {
    return CCOMPONENT.findByIdAndUpdate(id, body, { new: true, runValidators: true });
  }

  async remove(id: string) {
    const q: ICCOMPONENTModel = new CCOMPONENT({ _id: id });
    return q.remove();
  }
}


// export default new UserModel;
