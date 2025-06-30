// A simple fetch wrapper for making API calls

interface ApiOptions extends RequestInit {
  data?: any;
}

export const api = async <T>(endpoint: string, options: ApiOptions = {}): Promise<T> => {
  const { data, headers: customHeaders, ...restOptions } = options;
  
  const headers = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };

  const config: RequestInit = {
    ...restOptions,
    headers,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(endpoint, config);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    }

    return response.json();
  } catch (error) {
    console.error(`API call failed: ${error}`);
    throw error;
  }
}; 