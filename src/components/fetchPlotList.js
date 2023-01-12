const fetchPlotList = async ({ queryKey }) => {
  const DEV_ENDPOINT = "http://localhost:5000/get_stocks";
  const request = queryKey[1];

  if (!request.start || !request.end) return [];

  const apiRes = await fetch(DEV_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!apiRes.ok) {
    throw new Error(`Plot fetch not ok`);
  }

  return apiRes.json();
};

export default fetchPlotList;
