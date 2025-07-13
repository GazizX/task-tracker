import { MenuItem, type RenderOptionProps } from "@admiral-ds/react-ui";

interface RenderItem {
    id: string;
    display: string;
}

export const createRenderItems = (items: RenderItem[]) => {
    return items.map((item) => ({
          id: item.id,
          render: (itemsStatus: RenderOptionProps) => (
            <MenuItem {...itemsStatus} key={item.id}>
              {item.display}
            </MenuItem>
          ),
        }));
}

export const itemsStatus = [
  {
    id: '1',
    display: 'To Do',
  },
  {
    id: '2',
    display: 'In Progress',
  },
  {
    id: '3',
    display: 'Done',
  }
];
export const itemsPriority = [
  {
    id: '1',
    display: 'Low',
  },
  {
    id: '2',
    display: 'Medium',
  },
  {
    id: '3',
    display: 'High',
  }
];

export const itemsCategory = [
  {
    id: '1',
    display: 'Bug',
  },
  {
    id: '2',
    display: 'Feature',
  },
  {
    id: '3',
    display: 'Documentation',
  },
  {
    id: '4',
    display: 'Refactor',
  },
  {
    id: '5',
    display: 'Test',
  }
];


export const StatusModel = createRenderItems(itemsStatus)
export const PriorityModel = createRenderItems(itemsPriority)
export const CategoryModel = createRenderItems(itemsCategory)