import { Request, Response, NextFunction } from "express";

export function ValidateBody(dtoClass: any): MethodDecorator {
  return (target, propertyKey, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;

    descriptor.value = function (req: Request, res: Response, next: NextFunction) {
      const dto = new dtoClass(req.body);
      const errors = dto.validate();

      if (errors.length > 0) {
        return res.status(400).json({ message: "Validation failed", errors });
      }

      req.body = dto; 
      return original.call(this, req, res, next);
    };

    return descriptor;
  };
}
