const courseMapper = (course) => {
  const { type, name, tag, ...data } = course;
  return { ...data, type: { id: type, name, tag } };
};

export default courseMapper;
