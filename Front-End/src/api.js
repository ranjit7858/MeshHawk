import axios from "axios";

// GenerateGraph Pcap APi
export const getPcap = async () => {
  const response = await fetch(import.meta.env.VITE_BACKEND_URL);
  return response.json();
};
export const FileUpload = async (file) => {
  if (!file) return;

  const formData = new FormData();
  formData.append("pcapng_file", file);

  try {
    const response = await axios.post(
      import.meta.env.VITE_BACKEND_URL+"/upload/pcap",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to upload the file.");
    }
  } catch (error) {
    throw new Error("Error occurred during pcap upload:");
  }
};

export const csvUpload = async (file) => {
  if (!file) return;
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(
      import.meta.env.VITE_BACKEND_URL + "/upload/csv",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to upload the csv.");
    }
  } catch (error) {
    throw new Error("Error occurred during csv upload:" + error.message);
  }
};

export const getLoginToken = async (loginFormData) => {
  try {
    if (!loginFormData) return;
    const params = new URLSearchParams(loginFormData);

    const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
    throw new Error("Error occurred during login request.");
  }
};

export const getUser = async (token) => {
  const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/get_userid", {
    methods: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export const scanNetwork = async (duration) => {
  try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/run_script/?duration=${duration}`, {
      method: 'POST',
      redirect: 'follow'
    });
    const result = await response.json();

    return result; 
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};


export const getScannedPcap = async () => {
  try{
    const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/get_file_pcap")
    return res
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
} 

export const getScannedCsv = async () => {
  try{
    const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/get_file_csv")
    return res
  } catch (error) {
    console.error('Error:', error);
    return error
    
  }
} 

export const updateFireBase = async () => {
  try {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/update_database/?userid="sanskardwivedi003@gmail.com`, {
    method: 'POST',

  });
  const result = await response.json();

  return result; 
} catch (error) {
  console.error('Error:', error);
  throw error;
}
}