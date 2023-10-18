import acl from "express-acl";
//needs ts fix

const configObject: any = {
  filename: "nacl.yaml",
  path: "src",
  defaultRole: "anonymous",
  roleSearchPath: "role",
};

const responseObject: any = {
  code: 403,
  message: "You are not authorized to access this resource",
};

acl.config(configObject, responseObject);

export default acl;
