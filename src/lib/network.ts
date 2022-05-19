const urlBase = "https://gxfutxmoc5.execute-api.ca-central-1.amazonaws.com/latest";
//const urlBase = "http://localhost:3000";

const sleep = (ms: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(ms), ms);
  });
};

const postData = async (url = "", data = {}, gatewayURI = urlBase, maxRetries = 5) => {
  const start = Date.now();
  while (maxRetries >= 0) {
    try {
      const uri = gatewayURI + url;
      const response = await fetch(uri, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return response.json().then(j => {
        console.log("Post took: ", Date.now() - start);
        return j;
      });
    } catch (err) {
      console.log(err.toString());
      maxRetries--;
      await sleep(500);
      console.log(`Network::postData -- Caught an error retrying ...`);
    }
  }
  return {status: false};
};

const getData = async (url = "", gatewayURI = urlBase, maxRetries = 5) => {
  const start = Date.now();
  while (maxRetries >= 0) {
    try {
      const response = await fetch(gatewayURI + url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      return response.json().then(j => {
        console.log("Get took: ", Date.now() - start);
        return j;
      });
    } catch (err) {
      console.log(err);
      maxRetries--;
      await sleep(500);
      console.log(`Network::getData -- Caught an error retrying ...`);
    }
  }
  return {status: false};
};

export {postData, getData};
