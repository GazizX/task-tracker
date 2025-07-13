export const getDisplayValue = (items: any[], id: string) => {
    const item = items.find(item => item.id === id);
    return item ? item.display : '';
  };