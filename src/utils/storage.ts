class Storage {
  get(key: string) {
    return localStorage.getItem(key);
  }

  set(key: string, value: string) {
    return localStorage.setItem(key, value);
  }

  clear() {
    return localStorage.clear();
  }

  remove(key: string) {
    return localStorage.removeItem(key);
  }
}

export default Storage;