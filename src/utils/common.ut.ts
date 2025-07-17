export const formatDate = (isoDate: string) =>
  new Date(isoDate).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
