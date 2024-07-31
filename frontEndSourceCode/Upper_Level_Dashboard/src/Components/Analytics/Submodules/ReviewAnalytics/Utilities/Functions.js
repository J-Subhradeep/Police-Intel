export function getDefaultEndDate() {
    const currentDate = new Date();
    return currentDate.toISOString().split('T')[0];
}

export function getDefaultStartDate() {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 7); // Subtract 7 days
    return currentDate.toISOString().split('T')[0]; // Get the resulting date in "YYYY-MM-DD" format
}