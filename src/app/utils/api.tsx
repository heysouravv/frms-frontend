import Cookies from 'js-cookie';
export const loginUser = async (email: string, password: string) => {
    const apiEndpoint = "http://100.28.40.109:8000/login/";
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Parse the JSON response
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  export const makePostRequest = async (body: object) => {
    const apiEndpoint = `http://100.28.40.109:8000/products/`;
    const token = Cookies.get("token"); // Ensure the token is always retrieved beforehand
  console.log(token);
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Directly include the token in the Authorization header
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Parse the JSON response
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("API request error:", error);
      throw error;
    }
  };