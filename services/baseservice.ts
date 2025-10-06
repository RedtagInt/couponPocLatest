import { BASE_URL } from "@/constants/appConstants";




export const fetchData = async (endpoint: string) => {
  try {
    // console.log('baseurl', `${BASE_URL}/${endpoint}`);
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      headers: {
        'Authorization': "Basic Y21wQWRtaW46Y21wI2FkbWluJDEyMw=="
      }
    });
    const data = await response.json();
    if(response)
      console.log('response', data);
    if (!response.ok) {
      handleResponseErrors(response, data);
      // throw new Error(`HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    // console.error('Error fetching data:', JSON.stringify(error));  
    console.log(error);
    throw error; // Re-throw to allow component to h andle
  }
};

export const postData = async (endpoint: string, payload: any) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': "Basic Y21wQWRtaW46Y21wI2FkbWluJDEyMw==",
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok) {
      handleResponseErrors(response, data);
      // throw new Error(`HTTP error! status: ${response.status}`);
    }
    return data;
  } catch (error) {
    console.error('Error posting data:', error);
    handleErrors(error);
    // throw error;
  }
};

// You can add more functions for PUT, DELETE, etc.

const handleResponseErrors = (response: any, data: any) => {
  // console.log(JSON.stringify(response.status));
  if (response.status === 404 || response.status === 409) {
    alert(data.status.message);
  }
}

const handleErrors = (error: any) => {
  console.dir('error', error);
  console.log('error', JSON.stringify(error));
}