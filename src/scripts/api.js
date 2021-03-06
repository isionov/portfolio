import axios from "axios";

const instance = axios.create({
  baseURL: "http://www.iliaion-dev.ru/api",
  // baseURL: "https://webdev-api.loftschool.com",
  headers: {
    "Content-Type": "application/json"
  }
});

const getAllCards = async () => {
  const rawData = await instance.get(`/categories`);

  return rawData.data;
};

const getAllSkills = async () => {
  const rawData = await instance.get(`/skills`);

  return rawData.data;
};

export const getAllWorks = async () => {
  const rawData = await instance.get(`/works`);

  return rawData.data;
};

export const getAllRevs = async () => {
  const rawData = await instance.get(`/reviews`);

  return rawData.data;
};

export const getSkillsArr = async () => {
  const categoriesArr = await getAllCards();
  const skillsArr = await getAllSkills();
  const resArr = categoriesArr.map(item => {
    const filteredSkills = skillsArr.filter(value => {
      return item.id === value.category;
    });
    let skills = {};
    filteredSkills.forEach(item => {
      skills[item.title] = item.percent;
    });
    return { skillsGroup: item.category, skills };
  });

  return resArr;
};
