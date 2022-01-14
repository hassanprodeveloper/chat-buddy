//
export function timeSince(sec = 0) {
  let date = new Date(sec * 1000);
  var seconds = Math.ceil((new Date() - date) / 1000);
  var interval = seconds / 31536000;
  if (interval > 1) {
    return Math.ceil(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.ceil(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.ceil(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.ceil(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.ceil(interval) + " minutes ago";
  }
  if (interval < 0) {
    return " just now";
  }
  return Math.ceil(seconds) + " seconds ago";
}
