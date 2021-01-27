export const getUserDetails = (username) => {
  const url = `https://api.tracker.gg/api/v2/warzone/standard/profile/psn/${username}?`;
  
  return fetch(url)
    .then((response) => response.json())
    .then(({ data }) => {
      const { platformInfo, segments } = data
      return {
        platformInfo,
        wz: { ...segments[0] }
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
