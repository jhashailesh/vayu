import { SCOMPONENTController } from "./SCOMPONENT.service";

export default [
  {
    path: "SCOMPONENT",
    method: "get",
    escapeAuth:true,
    handler: [SCOMPONENTController.fetchAll]
  },
  {
    path: "/SCOMPONENT",
    method: "post",
    escapeAuth: true,
    handler: [SCOMPONENTController.create]
  },
  {
    path: "/SCOMPONENT/:id",
    method: "get",
    handler: [SCOMPONENTController.fetch]
  },
  {
    path: "/SCOMPONENT/:id",
    method: "put",
    handler: [SCOMPONENTController.update]
  },
  {
    path: "/SCOMPONENT/:id",
    method: "delete",
    handler: [SCOMPONENTController.fetchAll]
  }
];
