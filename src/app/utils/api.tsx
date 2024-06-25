import Cookies from 'js-cookie';
import { useState } from 'react';
import axios from 'axios';

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

  export const fetchData = async (setProducts: (arg0: any) => void, setIsLoading: (arg0: boolean) => void) => {
    const token = Cookies.get("token");
    try {
      const response = await fetch('http://100.28.40.109:8000/products/', {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`, // Use the token from Cookies
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data, "this is data");
      setProducts(data); // Update your state with the fetched products
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    } finally {
      setIsLoading(false); // Ensure loading state is updated in the finally block
    }
  };

  export const fetchTrackChangeData = async (setProducts: (arg0: any) => void, setIsLoading: (arg0: boolean) => void) => {
    const token = Cookies.get("token");
    try {
      const response = await fetch('http://100.28.40.109:8000/product-price-history/', {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`, // Use the token from Cookies
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data, "this is data");
      setProducts(data); // Update your state with the fetched products
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    } finally {
      setIsLoading(false); // Ensure loading state is updated in the finally block
    }
  };

  //export const updateProduct = async (productId: any, productData: any, handleUpdateStatus: (isSuccessful: boolean) => void): Promise<Response> => {
  //  const token = Cookies.get("token");
  //  try {
  //    const response = await fetch(`http://100.28.40.109:8000/products/${productId}/`, {
  //      method: "PUT",
  //      headers: {
  //        'Content-Type': 'application/json',
  //        'Authorization': `Bearer ${token}`,
  //      },
  //      body: JSON.stringify(productData),
  //    });
  //    if (!response.ok) {
  //      throw new Error('Network response was not ok');
  //    }
  //    const data = await response.json();
  //    console.log(data, "Product update successful");
  //    handleUpdateStatus(true);
  //    return response;
  //  } catch (error: any) {
  //    console.error('There was a problem with your fetch operation:', error);
  //    handleUpdateStatus(false);
  //    throw error;
  //  }
  //};

  export const useUpdateProduct = () => {
    const [response, setResponse] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
  
    const updateProduct = async (productId: any, productData: any ) => {
      const token = Cookies.get('token');
      setIsLoading(true);
  
      try {
        const res = await axios.put(`http://100.28.40.109:8000/products/${productId}/`, productData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        setResponse(res.data);
        setError(null);

      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
  
    return { response, error, isLoading, updateProduct };
  };