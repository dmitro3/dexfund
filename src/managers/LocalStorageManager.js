const LOCAL_STORAGE_USERINFO_KEY = "userInfo";

export function saveUserInfoToLocalStorage(userInfo) {
    try {
        let storageUserInfo = JSON.stringify(userInfo);
        localStorage.setItem(LOCAL_STORAGE_USERINFO_KEY, storageUserInfo);
    } catch(err) {
        // ignore errors
    }
}

export function deleteUserInfoFromLocalStorage() {
    try {
        localStorage.removeItem(LOCAL_STORAGE_USERINFO_KEY);
    } catch(err) {
        // ignore errors
    }
}

export function loadUserInfoFromLocalStorage() {
    try {
        let userInfo = localStorage.getItem(LOCAL_STORAGE_USERINFO_KEY);
        return userInfo !== null ? JSON.parse(userInfo) : undefined;
    } catch(err) {
        // ignore errors
    }
}