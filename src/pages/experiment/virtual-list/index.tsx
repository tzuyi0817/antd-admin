import { List } from './components/list';

const data = Array.from({ length: 1000 }, (_, index) => ({ id: index, name: index + 1 }));

export default function VirtualList() {
  return (
    <div className="box-border p-4">
      <List
        data={data}
        itemHeight={50}
        getKey={item => item.id}
        renderItem={item => item.name}
      />
    </div>
  );
}
