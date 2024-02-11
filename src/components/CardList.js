import { Card } from "./Card";

export const CardList = ({ tasks }) => {
  return (
    <div className="card-list-wrapper">
      <div className="card-list">
        {tasks.map((task) => (
          <Card task={task} key={task.id} />
        ))}
      </div>
    </div>
  );
};
