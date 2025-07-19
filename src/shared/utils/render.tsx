import {Option} from '@admiral-ds/react-ui'
export const renderOptions = (options: string[]) => {
    return options.map((option) => (
      <Option key={option} value={option}>
        {option}
      </Option>
    ));
  };