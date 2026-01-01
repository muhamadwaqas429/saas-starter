// src/data/menu.mock.js

export const menuData = [
  {
    id: "section-1",
    name: "Lunch Specials",
    items: [
      {
        id: "item-1",
        name: "Chicken Over Rice",
        options: [
          {
            id: "option-1",
            name: "Grain",
            choices: [
              { id: "choice-1", name: "White Rice" },
              { id: "choice-2", name: "Brown Rice" },
            ],
          },
          {
            id: "option-2",
            name: "Sauce",
            choices: [
              { id: "choice-3", name: "White Sauce" },
              { id: "choice-4", name: "Hot Sauce" },
            ],
          },
        ],
      },
      {
        id: "item-2",
        name: "Lamb with Salad",
        options: [
          {
            id: "option-3",
            name: "Dressing",
            choices: [
              { id: "choice-5", name: "Italian" },
              { id: "choice-6", name: "Caesar" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "section-2",
    name: "Dinner Specials",
    items: [
      {
        id: "item-3",
        name: "Grilled Chicken Plate",
        options: [
          {
            id: "option-4",
            name: "Side",
            choices: [
              { id: "choice-7", name: "Fries" },
              { id: "choice-8", name: "Rice" },
            ],
          },
        ],
      },
    ],
  },
];
