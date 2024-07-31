import { fetchTasks } from "./Queries";

export const getDefaultStartDate = () => {
  const currentDate = new Date();
  const oneWeekAgo = new Date(currentDate);
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  // Clear time portion
  oneWeekAgo.setHours(0, 0, 0, 0);

  const formattedStartDate = oneWeekAgo.toISOString().slice(0, 10);
  return formattedStartDate;
};

export const getCurrentDate = () => {
  // Get the current date
  const currentDate = new Date();

  // Add 5 hours and 30 minutes to the current date
  currentDate.setHours(currentDate.getHours() + 5);
  currentDate.setMinutes(currentDate.getMinutes() + 30);

  // Extract the date part
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(currentDate.getDate()).padStart(2, '0');

  // Format the date as a string (YYYY-MM-DD)
  const formattedCurrentDate = `${year}-${month}-${day}`;

  return formattedCurrentDate;
};

export const handleSubmit = (pageNo, rows, setTableOpen, status, setPageCount, setTableData, dateTime) => {
  setTableOpen(true)
  let queryOptions = []

  queryOptions.push({
    match: {
      assigned_to_id: localStorage.getItem("subordinateId")
    }
  })

  if (status === "true") {
    queryOptions.push({
      match: {
        is_done: true
      }
    });
  }

  if (status === "false") {
    queryOptions.push({
      match: {
        is_done: false
      }
    });
  }

  if (status === "passed") {
    queryOptions.push({
      "range": {
        "deadline": {
          "lt": getCurrentDate()
        }
      }
    });
  }
  fetchTasks(queryOptions, pageNo, rows, setPageCount, setTableData, dateTime);
};