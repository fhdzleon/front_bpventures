export const fetchDeliverables = async (
  userId: number,
  token: string | undefined,
  currentPage: number,
  itemsPerPage: number,
  currentFolder: string | null,
  setDeliverableData: { (deliverableData: any): void; (arg0: any): void }
) => {
  try {
    const url = `${
      process.env.NEXT_PUBLIC_API_URL
    }/deliverables/user/${userId}?page=${currentPage}&limit=100${
      currentFolder ? `&parentId=${currentFolder}` : ""
    }`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    setDeliverableData(data);
  } catch (error) {
    console.error("Error fetching deliverables", error);
  }
};
