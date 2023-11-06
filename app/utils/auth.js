
export function checkUser() {
    const user = localStorage.getItem('user');
    return user !== null;
  }