const LOCAL_STORAGE_ACCOUNT_KEY = "accountInfo";

export function saveAccountInfoToLocalStorage(accountInfo) {
  try {
    let storageaccountInfo = JSON.stringify(accountInfo);

    localStorage.setItem(LOCAL_STORAGE_ACCOUNT_KEY, storageaccountInfo);
  } catch (err) {
    // ignore errors
  }
}

export function deleteAccountInfoFromLocalStorage() {
  try {
    localStorage.removeItem(LOCAL_STORAGE_ACCOUNT_KEY);
  } catch (err) {
    // ignore errors
  }
}

export function loadAccountInfoFromLocalStorage() {
  try {
    let accountInfo = localStorage.getItem(LOCAL_STORAGE_ACCOUNT_KEY);
    return accountInfo !== null ? JSON.parse(accountInfo) : undefined;
  } catch (err) {
    // ignore errors
  }
}
