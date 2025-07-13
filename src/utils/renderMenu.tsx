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