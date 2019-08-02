import "reflect-metadata";
import {Container} from 'inversify';
import { CCOMPONENTModel } from './SCOMPONENT.model';
import {CCOMPONENTController} from "./SCOMPONENT.controller";
import {ICCOMPONENTCustomModel} from './SCOMPONENT.interface';

const DIContainer = new Container();

DIContainer.bind<ICCOMPONENTCustomModel>(CCOMPONENTModel).toSelf();

// export default DIContainer;


export const SCOMPONENTModel:ICCOMPONENTCustomModel = DIContainer.get<ICCOMPONENTCustomModel>(CCOMPONENTModel);

export const SCOMPONENTController: CCOMPONENTController = DIContainer.resolve<CCOMPONENTController>(CCOMPONENTController);
