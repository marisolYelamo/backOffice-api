import ServiceError from "../services/utils/serviceError";

const pagination = (
  page = 1,
  quantityOfItems = 10,
  minItems = 1,
  maxItems = 50
) => {
  if (page < 1)
    throw new ServiceError("bad_input", "Page can't be less than 1");
  if (quantityOfItems < minItems)
    throw new ServiceError("bad_input", `Limit can't be less than ${minItems}`);
  if (quantityOfItems > maxItems)
    throw new ServiceError("bad_input", `Limit can't be more than ${maxItems}`);

  const offset = (page - 1) * quantityOfItems;

  return {
    offset,
    limit: quantityOfItems,
    currentPage: Number(page),
  };
};

export default pagination;
