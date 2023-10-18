const mapperUser = (data) => {
  const userData = data[0];
  const user = {
    id: userData.id,
    firstname: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    password: userData.password,
    secretKey: userData.secretKey,
    roles: {},
  };

  data.forEach((userData) => {
    const { roles } = user;
    if (!roles[userData.role]) roles[userData.role] = [];
    roles[userData.role].push(userData.module);
  });

  return user;
};

export default mapperUser;
