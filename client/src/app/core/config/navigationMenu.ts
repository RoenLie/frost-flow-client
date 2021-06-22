import { Menu, MenuGroup } from "@core/services/menu.service";


const entry: MenuGroup = {
  name: "entry",
  options: {
    order: 5
  },
  menuItems: [
    {
      displayName: "Entry",
      name: "entry",
      route: ""
    }
  ]
};
const episode: MenuGroup = {
  name: "episode",
  options: {
    order: 5
  },
  menuItems: [
    {
      displayName: "Episode",
      name: "episode",
      menu: [
        {
          displayName: "Workspace",
          name: "workspace",
          route: "episode/workspace"
        },
      ]
    }
  ]

};
const inventory: MenuGroup = {
  name: "inventory",
  options: {
    order: 7
  },
  menuItems: [
    {
      displayName: "Inventory",
      name: "inventory",
      menu: [
        {
          displayName: "Portal",
          name: "portal",
          route: "inv/portal"
        },
        {
          displayName: "Manager",
          name: "manager",
          route: "inv/manager"
        },
        {
          displayName: "Interface",
          name: "interface",
          route: "inv/interface"
        },
        {
          displayName: "Options",
          name: "options",
          route: "inv/options"
        }
      ]
    }
  ]
};
export const nagivationMenu: Menu = [
  entry,
  episode,
  inventory
];