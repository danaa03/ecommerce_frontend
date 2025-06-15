export function isLoggedIn()
{
    console.log("present",localStorage.getItem('token'));
    return localStorage.getItem('token')?true : false;
}

export function logout() 
{
    localStorage.removeItem('token');
}