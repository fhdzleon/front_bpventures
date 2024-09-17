export const fetchDeliverables = async (
  userId: number,
  token: string | undefined,
  currentPage: number,
  currentFolder: string | null,
  setDeliverableData: { (deliverableData: any): void; (arg0: any): void },
  itemsPerPage?: any,
  companyId?: any
) => {
  /*   console.log("ID", userId); */

  try {
    let url = `${
      process.env.NEXT_PUBLIC_API_URL
    }/deliverables/user/${userId}?page=${currentPage}&limit=${
      itemsPerPage || 100
    }`;

    if (currentFolder) {
      url += `&parentId=${currentFolder}`;
    }

    if (companyId) {
      url += `&companyId=${companyId}`;
    }

    /* console.log("Fetching deliverables with URL:", url); */

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    /*    console.log(data); */

    setDeliverableData(data);
  } catch (error) {
    console.error("Error fetching deliverables", error);
  }
};
