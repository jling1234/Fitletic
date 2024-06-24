function getLocalDetails() {
  const localDetails = localStorage.getItem("localDetails");
  if (!localDetails) {
    return {};
  }

  return JSON.parse(localDetails);
}

function setLocalDetails(localDetails) {
  localStorage.setItem("localDetails", JSON.stringify(localDetails));
}

export function deleteUserRecord(username) {
  const localDetails = getLocalDetails();

  if (localDetails[username]) {
    delete localDetails[username];
  }

  setLocalDetails(localDetails);
}

export function getUserRecord(username) {
  const localDetails = getLocalDetails();

  if (localDetails[username]) {
    return localDetails[username];
  }
  return null;
}

export function setUserRecord(username, record) {
  const localDetails = getLocalDetails();

  localDetails[username] = record;

  setLocalDetails(localDetails);
}
