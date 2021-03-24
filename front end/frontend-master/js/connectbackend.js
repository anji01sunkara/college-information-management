
const sendrequest = async (BASE_URL) => {
    try {
      const res = await axios.get(`${BASE_URL}`);
      const data = res.data;
      return data;
    } catch (e) {
    
      console.error(".......AN ERROR OCCURED IN REQUEST.........\n",e);
      return e;
    }
 
  };
 