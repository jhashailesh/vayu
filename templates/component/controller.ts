import { Request, Response, NextFunction } from "express";

import msg from "./SCOMPONENT.message";
import responseHandler from "../../lib/helpers/responseHandler";
import { inject, injectable } from "inversify";
import { CCOMPONENTModel } from "./SCOMPONENT.model";
import {ICCOMPONENTCustomModel} from './SCOMPONENT.interface';


// const userModel: any = {};


@injectable()
export class CCOMPONENTController {
  protected model: ICCOMPONENTCustomModel;

  constructor(
    @inject(CCOMPONENTModel) CCOMPONENTModel : ICCOMPONENTCustomModel
  ) {
    this.model = CCOMPONENTModel;
  }

  public fetchAll = async (req: Request, res: Response, next: NextFunction) => {

    try {
      responseHandler
        .reqRes(req, res)
        .onFetch(msg.FETCH_ALL, await this.model.fetchAll())
        .send();
    } catch (e) {
      next(responseHandler.sendError(e));
    }
  };

  /**
   * createUser
   */
  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      responseHandler
        .reqRes(req, res)
        .onCreate(msg.CREATED, await this.model.add(req.body), msg.CREATED_DEC)
        .send();
    } catch (e) {
      next(responseHandler.sendError(e));
    }
  };

  public fetch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      responseHandler
        .reqRes(req, res)
        .onFetch(msg.CREATED,await this.model.fetch(req.params.id)
        )
        .send();
    } catch (e) {
      next(responseHandler.sendError(e));
    }
  };
  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      responseHandler
        .reqRes(req, res)
        .onCreate(msg.CREATED,await this.model.update(req.params.id, req.body), msg.CREATED_DEC
        )
        .send();
    } catch (e) {
      next(responseHandler.sendError(e));
    }
  };
}

