const Header = ({ header }) => {
  return <h2>{header}</h2>;
};

const Content = ({ content }) => {
  const total = content.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <div>
      {content.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
      <h4>Total of {total} exercises</h4>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header header={course.name} />
      <Content content={course.parts} />
    </div>
  );
};

export default Course;
