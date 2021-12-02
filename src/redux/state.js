export const initialState = {
  id: "n1",
  name: "Lao Lao",
  title: "general manager",
  doj: "2021-04-12",
  children: [
    {
      id: "n2",
      name: "Bo Miao",
      title: "department manager",
      doj: "2015-05-07",
    },
    {
      id: "n3",
      name: "Su Miao",
      title: "department manager",
      doj: "2019-08-09",
      children: [
        {
          id: "n4",
          name: "Tie Hua",
          title: "senior engineer",
          doj: "2020-04-12",
        },
        {
          id: "n5",
          name: "Hei Hei",
          title: "senior engineer",
          children: [
            {
              id: "n6",
              name: "Dan Dan",
              title: "engineer",
              doj: "2021-04-03",
            },
            {
              id: "n7",
              name: "Xiang Xiang",
              title: "engineer",
              doj: "2021-03-02",
            },
          ],
        },
        {
          id: "n8",
          name: "Pang Pang",
          title: "senior engineer",
          doj: "2021-02-12",
        },
      ],
    },
    {
      id: "n9",
      name: "Hong Miao",
      title: "department manager",
      doj: "2021-04-10",
    },
    {
      id: "n10",
      name: "Chun Miao",
      title: "department manager",
      doj: "2021-01-12",
      children: [
        {
          id: "n11",
          name: "Yue ss",
          title: "senior engineer",
          doj: "2021-04-12",
        },
      ],
    },
  ],
};
