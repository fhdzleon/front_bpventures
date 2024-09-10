const getDeliverableExtension = (path: string | null | undefined) => {
  if (!path) {
    return "";
  }

  const deliverableSplit = path.split(".");
  return deliverableSplit.length > 1 ? deliverableSplit.pop() : "";
};

export default getDeliverableExtension;
