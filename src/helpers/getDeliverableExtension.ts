const getDeliverableExtension = (path: string) => {
  const deliverableSplit = path.split(".");
  return deliverableSplit.length > 1 ? deliverableSplit.pop() : "";
};

export default getDeliverableExtension;
