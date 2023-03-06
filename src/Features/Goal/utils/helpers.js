export function calculateDaysLeft(createdAt, deadline) {
    const ONE_DAY = 1000 * 60 * 60 * 24; // milliseconds in one day
    const today = new Date();

    const createdDate = new Date(createdAt);
    const deadlineDate = new Date(deadline);

    // Calculate the difference in days between today and the deadline
    const daysLeft = Math.ceil((deadlineDate.getTime() - today.getTime()) / ONE_DAY);

    // If the deadline has passed, return 0 days left
    if (daysLeft < 0) {
        return 'Overdue';
    }

    // If the goal was created after the deadline, return the number of days since the creation date
    if (createdDate.getTime() > deadlineDate.getTime()) {
        return Math.ceil((today.getTime() - createdDate.getTime()) / ONE_DAY);
    }

    return daysLeft;
}

export function calculateDailyTargetPercentage(dueDate) {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
    const dailyTarget = 100 / diffDays;
    return dailyTarget.toFixed(2);
}
