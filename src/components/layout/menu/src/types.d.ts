export interface MenuItem {
  key: string;
  label: React.ReactNode;
  children?: MenuItem[];
  icon?: React.ReactNode;
  disabled?: boolean;
}
