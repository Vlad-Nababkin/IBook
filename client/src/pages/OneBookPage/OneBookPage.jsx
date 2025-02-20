import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router';
import { TaskApi } from '../../entities/task/TaskApi';

export default function OneTaskPage() {
  let { id } = useParams();
  const [task, setTask] = useState({});

  useEffect(() => {
    TaskApi.getById(id).then(({ statusCode, error, data, message }) => {
      if (error) alert(message);
      if (statusCode === 200) setTask(data);
    });
  }, [id]);

  let [searchParams] = useSearchParams();
  console.log(searchParams.get('test'));
  console.log(searchParams.get('user'));

  return (
    <div>
      <h3>{task.title}</h3>
      <h3>{task.body}</h3>
    </div>
  );
}
