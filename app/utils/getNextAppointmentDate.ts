export function getNextAppointmentDate(day: string, time: string): Date {
  const daysMap: Record<string, number> = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };

  const targetDay = daysMap[day.toLowerCase()];
  if (targetDay === undefined) throw new Error(`Dia inválido: ${day}`);

  const now = new Date();
  const todayDay = now.getDay();

  let diff = targetDay - todayDay;
  const [hour, minute] = time.split(":").map(Number);

  if (
    diff < 0 ||
    (diff === 0 &&
      (hour < now.getHours() ||
        (hour === now.getHours() && minute <= now.getMinutes())))
  ) {
    diff += 7;
  }

  const nextDate = new Date(now);
  nextDate.setDate(now.getDate() + diff);
  nextDate.setHours(hour, minute, 0, 0);

  return nextDate;
}
