const getDefaultStartDate = () => {
    let currentDate = new Date();
    let oneWeekAgo = new Date(currentDate);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // Add 5 hours and 30 minutes to the date
    oneWeekAgo.setHours(oneWeekAgo.getHours() + 5);
    oneWeekAgo.setMinutes(oneWeekAgo.getMinutes() + 30);

    const formattedStartDate = oneWeekAgo.toISOString().slice(0, 16);

    return formattedStartDate;
};


const getCurrentDateTime = () => {
    // Get the current date and time
    let currentDate = new Date();

    // Add 5 hours and 30 minutes to the current date and time
    currentDate.setHours(currentDate.getHours() + 5);
    currentDate.setMinutes(currentDate.getMinutes() + 30);

    // Format the date and time as a string
    return currentDate.toISOString().slice(0, 16);
  };
export {getDefaultStartDate,getCurrentDateTime};

